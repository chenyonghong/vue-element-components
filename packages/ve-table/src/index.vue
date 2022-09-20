<template>
  <div>
    <slot name="table-header">
      <ve-form ref="searchForm" v-if="filters.length" :config="filter" :fields="filters"
        :style="{ ...filter.style || searchFormStyle}">
        <template #footer>
          <slot name="filter-buttons">
            <el-button type="warning" @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </slot>
        </template>

      </ve-form>
    </slot>
    <slot name="prepend"></slot>
    <table-core ref="tableRef" :data="data?.data" :columns="columns" :loading="loading" v-bind="mergedConfig">
      <template v-for="(item, key, index) in $slots" :key="index" v-slot:[key]="slotScope">
        <slot :name="key" v-bind="slotScope"></slot>
      </template>
    </table-core>
    <el-pagination v-if="!isNullable(props.config.pagination)" v-model:currentPage="params.pageNum"
      :page-size="params.pageSize" layout="total, prev, pager, next, jumper, sizes" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" style="margin: 10px; float: right" />
  </div>
</template>
<script setup lang="ts" name="VeTable">
import useInitData from "./hooks/useInitData";
import {
  PropType,
  toRefs,
  watch,
  ref,
  onMounted,
  defineExpose,
  provide,
  toRaw,
  reactive,
  computed,
  useSlots,
  nextTick,
  useAttrs
} from "vue";
import tableCore from "./table.vue";
import VeForm from '@/ve-form';
import { TTableData, ExposeAttrs, IColumn } from "./types/table.d";
import { IConfig, IRes, IReq } from "./types/common.d";
import { ElTable } from "element-plus";
import { isNullable } from "@/utils";
import useInitConfig from "@/hooks/useInitConfig";

const props = defineProps({
  config: {
    type: Object as PropType<IConfig>,
    default: {
      api: {},
    },
  },
  data: {
    type: Object as PropType<IRes>,
    default: {},
  },
  // columns: {
  //   type: Array as PropType<IColumn<TTableData>[]>,
  //   default: [],
  // },
});

const { filter, pagination, ...config } = props.config;
const mergedConfig = useInitConfig('table', config)
const { columns } = useAttrs() as { columns: IColumn<TTableData>[] };

const params = ref<IReq>({
  pageNum: 1,
  pageSize: 10
});
const { data, loading } = useInitData({ ...props, data: null, params });

// 暴露数据和api
const tableRef = ref<ExposeAttrs<TTableData>>();
const instance = ref<InstanceType<typeof ElTable>>();

// *******多选start
const selectionCol = columns!.find(col=> col.type==='selection');
const selections = ref<TTableData>([]); // 选择结果
const selectionSet = ref(new Set()); // 选择结果Set结构，用于跨页多选场景去重

let prePageData = ''; // 上次缓存的table数据
let initFinished = false;
/*
  @desc: el-table的selection-change回调
  @params: 
    slts: 选择的数据（el-table的selections)
*/
function handleSelectionChange(slts: TTableData) {
  // 单页模式
  if (!selectionCol?.crossPage) {
    selections.value = slts;
    return;
  }
  // 跨页模式
  const tableData = instance.value?.data; // 当前页的table数据
  const tableDataStr = JSON.stringify(tableData); // 当前页table数据序列化
  /*
    本函数执行的外在条件有二：
      1. 触发selection-change，即选择数据的改变；
      2. 分页切换（此时若el-table内置的selections数据在新的表格数据上找不到时，触发）
    如果当前表格数据与上一次缓存的数据不匹配，说明是刚分页跳转重新获取数据后执行到此（即上述条件2），跳过后续逻辑
  */
  if (tableDataStr !== prePageData) {
    prePageData = tableDataStr;
    return;
  }
  const slts_str = slts.map(item => JSON.stringify(item)); // 选择数据序列化
  // 去重添加到Set结构
  slts_str.forEach(item => {
    selectionSet.value.add(item)
  })
  /*
    取消勾选
    遍历Set结构数据，若数据项包含在当前表格数据，并不在选择中时，将其删除
  */
  initFinished && selectionSet.value.forEach(item => {
    if (tableData?.map(item => JSON.stringify(item)).includes(item as string) && !(slts_str.includes(item as string))) {
      selectionSet.value.delete(item)
    }
  })
  // 结果转换
  selections.value = Array.from(selectionSet.value).map(item => JSON.parse(item as string)) as TTableData
};
// 数据加载完成
watch(loading,
  (n, o) => {
    if (selectionCol?.crossPage && !n && o) {
      initFinished = false;
      const tableData = instance.value?.data!;
      const tableDataStr = tableData.map(item => JSON.stringify(item));
      // 缓存数据
      prePageData = JSON.stringify(tableData);
      // 切换已选择数据的勾选状态
      selectionSet.value.forEach(row => {
        let i = tableDataStr.findIndex(td => td === row)
        if (i > -1) {
          instance.value?.toggleRowSelection(tableData[i], true);
        }
      })
      initFinished = true;
    }
  }
);
// *******多选end

const handleInstanceChange = (ins: InstanceType<typeof ElTable>) => {
  instance.value = ins;
};
provide("methods", {
  handleInstanceChange,
  handleSelectionChange,
});

defineExpose({
  tableEl: instance,
  selections,
  loading,
  handleSearch,
  handleReset
});

// 分页
// const currentPage = ref(0);
const total = computed(() => {
  return data.value?.total || data.value?.data.length || 0;
});

function handleSizeChange(val: number) {
  console.log("size: ", val);
  params.value.pageSize = val;
}
function handleCurrentChange(val: number) {
  // console.log("currentPage: ", val);
  params.value.pageNum = val;
}

// 搜索条件表单
const searchForm = ref();
// 带有过滤条件的列
const filters = columns.filter(c => c.filter).map(c => ({ prop: c.prop, label: c.label, ...c.filter }));

// default form's style
const searchFormStyle = {
  margin: '10px 0 30px 0',
  padding: '10px 20px 0 20px',
  border: '1px solid #dcdfe6',
  borderRadius: '4px',
}

// search event
function handleSearch() {
  params.value.pageNum = 1;
  const filterModel = searchForm.value?.model;
  console.log(filterModel)
  params.value = { ...params.value, ...filterModel };
}
// reset event
function handleReset() {
  searchForm.value.reset();
  handleSearch();
}
</script>
