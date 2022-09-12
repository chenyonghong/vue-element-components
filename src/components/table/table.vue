<template>
  <el-table
    ref="table_instance"
    v-loading="loading"
    v-bind="$attrs"
    :data="data"
    @selection-change="handleSelectionChange"
  >
    <slot name="left"></slot>
    <column v-for="column in showColumns" :column="column">
      <template
        v-for="(item, key, index) in columnSlots"
        :key="index"
        v-slot:[key]="slotScope"
      >
        <slot :name="key" v-bind="slotScope"></slot>
      </template>
    </column>
    <slot name="right" />
  </el-table>
</template>

<script lang="ts" setup>
import {
  defineProps,
  useAttrs,
  PropType,
  ref,
  computed,
  toRefs,
  defineExpose,
  inject,
  onMounted,
  getCurrentInstance,
  useSlots,
  type Slot,
} from "vue";
import { IColumn, TTableData, ExposeAttrs } from "../../types/table.d";
import { ElTable } from "element-plus";
import column from "./column.vue";

const props = defineProps({
  data: {
    type: Array as PropType<TTableData>,
    default: [],
  },
  columns: {
    type: Array as PropType<IColumn<TTableData>[]>,
    default: [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
});

const { columns, data } = toRefs(props);

// 初始化columns
const showColumns = computed<IColumn<TTableData>[]>(() => {
  // 使用data的数据作为默认columns
  if (!columns.value.length && data.value.length) {
    let ret = [];
    for (let dataKey in data.value[0]) {
      ret.push({
        prop: dataKey,
        label: dataKey,
      });
    }
    return ret;
  } else {
    return columns.value.slice();
  }
});

// 选择
const table_instance = ref<InstanceType<typeof ElTable>>();
// const selections = ref<TTableData>([]);
// const handleSelectionChange = (val: TTableData[]) => {
//   selections.value = val;
// };
const { handleSelectionChange, handleInstanceChange } = inject<any>("methods");
onMounted(() => {
  handleInstanceChange(table_instance.value);
});

const slots = useSlots();

const columnSlots = computed(() => {
  const ret: Record<any, Slot | undefined> = {};
  for (let key in slots) {
    if (key.startsWith("column-") || key.startsWith("header-")) {
      ret[key] = slots[key];
    }
  }
  return ret;
});
</script>
