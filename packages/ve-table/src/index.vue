<template>
  <div>
    <table-core ref="tableRef" :data="data?.data" v-bind="$attrs" :loading="loading">
      <template
        v-for="(item, key, index) in $slots"
        :key="index"
        v-slot:[key]="slotScope"
      >
        <slot :name="key" v-bind="slotScope"></slot>
      </template>
    </table-core>
    <el-pagination
      v-if="!isNullable(props.config.pagination)"
      v-model:currentPage="currentPage"
      :page-size="100"
      layout="total, prev, pager, next, jumper, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin: 10px; float: right"
    />
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
} from "vue";
import tableCore from "./table.vue";
import { TTableData, ExposeAttrs } from "./types/table.d";
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
});
const params = ref<IReq>({});
const { data, loading } = useInitData({ ...props, params });

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
  el_table: instance,
  selections,
  loading,
});

// 分页
const currentPage = ref(0);
const total = computed(() => {
  return data.value?.total || data.value?.data.length || 0;
});

function handleSizeChange(val: number) {
  console.log("size: ", val);
  params.value.size = val;
}
function handleCurrentChange(val: number) {
  console.log("currentPage: ", val);
  params.value.page = val;
}
</script>
