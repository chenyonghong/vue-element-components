<template>
  <div>
    <ve-form ref="searchForm" v-if="filters.length" :config="props.config.filter" :fields="filters"
      :style="{ ...props.config.filter.style || searchFormStyle}">
      <template #footer>
        <slot name="filter-footer">
          <el-button type="warning" @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </slot>
      </template>

    </ve-form>
    <table-core ref="tableRef" :data="data?.data" v-bind="$attrs" :loading="loading">
      <template v-for="(item, key, index) in $slots" :key="index" v-slot:[key]="slotScope">
        <slot :name="key" v-bind="slotScope"></slot>
      </template>
    </table-core>
    <el-pagination v-if="!isNullable(props.config.pagination)" v-model:currentPage="params.pageNum" :page-size="params.pageSize"
      layout="total, prev, pager, next, jumper, sizes" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" style="margin: 10px; float: right" />
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
import VeForm from 'pkg/ve-form';
import { TTableData, ExposeAttrs, IColumn } from "./types/table.d";
import { IConfig, IRes, IReq } from "./types/common.d";
import { ElTable } from "element-plus";
import { isNullable } from "pkg/utils";

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
const params = ref<IReq>({
  pageNum: 1,
  pageSize: 10
});
const { data, loading } = useInitData({ ...props, data: null, params });

// 暴露数据和api
const tableRef = ref<ExposeAttrs<TTableData>>();
const instance = ref<InstanceType<typeof ElTable>>();
const selections = ref<TTableData>([]);
const handleInstanceChange = (ins: InstanceType<typeof ElTable>) => {
  instance.value = ins;
};
const handleSelectionChange = (slts: TTableData) => {
  selections.value = slts;
};
provide("methods", {
  handleInstanceChange,
  handleSelectionChange,
});

defineExpose({
  tableEl: instance,
  selections,
  loading,
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
const { columns } = useAttrs();
// 带有过滤条件的列
const filters = (columns as any[]).filter(c => c.filter).map(c => ({ prop: c.prop, label: c.label, ...c.filter }));

// default form's style
const searchFormStyle = {
  margin: '10px 0 30px 0',
  padding: '10px 20px 0 20px',
  border: '1px solid #dcdfe6',
  borderRadius: '4px',
}

// search event
const handleSearch = ()=> {
  params.value.pageNum = 1;
  const filterModel = searchForm.value?.model;
  console.log(filterModel)
  params.value = {...params.value, ...filterModel};
}
// reset event
const handleReset = ()=> {
  searchForm.value.reset();
  handleSearch();
}
</script>
