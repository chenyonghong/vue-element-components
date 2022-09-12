<template>
  <el-table-column v-bind="otherProps">
    <template #header v-if="headerSlot">
      <slot :name="'header-' + otherProps.prop" />
    </template>
    <template #default="scope" v-if="slot">
      <slot :name="'column-' + otherProps.prop" v-bind="scope" />
    </template>
    <template v-if="children">
      <column v-for="child in children" :key="child.prop" :column="child">
        <template
          v-for="(item, key, index) in $slots"
          :key="index"
          v-slot:[key]="slotScope"
        >
          <slot :name="key" v-bind="slotScope"></slot>
        </template>
      </column>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import { defineProps, PropType, toRefs, useSlots, computed } from "vue";
import { IColumn, TTableData } from "@/types/table.d";

const props = defineProps({
  column: {
    type: Object as PropType<IColumn<TTableData>>,
    default: {},
  },
});

const { children, ...otherProps } = toRefs(props).column.value;

const slots = useSlots();

const slot = computed(() => {
  for (let key in slots) {
    if (key.startsWith("column-") && key.slice(7) === otherProps.prop) {
      return slots[key];
    }
  }
});
const headerSlot = computed(() => {
  for (let key in slots) {
    if (key.startsWith("header-") && key.slice(7) === otherProps.prop) {
      return slots[key];
    }
  }
});
// console.log(otherProps);
</script>
