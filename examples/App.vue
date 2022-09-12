<script setup lang="ts">
import { ref, onMounted, watch, watchEffect, nextTick } from "vue";
import { VeTable } from "../packages";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
interface User {
  name: string;
  phone: string;
  gender: string;
  age: number;
  province: string;
  city: string;
  district: string;
  address: string;
  detail: string;
}
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const columns = [
  {
    type: "index",
    fixed: "",
  },
  {
    type: "selection",
    width: 55,
    fixed: "",
  },
  {
    prop: "name",
    label: "姓名",
    width: 80,
    fixed: true,
  },
  {
    prop: "phone",
    label: "电话",
    width: 100,
  },
  {
    prop: "gender",
    label: "性别",
    width: 80,
    sortable: "",
  },
  {
    prop: "age",
    label: "年龄",
    width: 80,
  },
  {
    label: "地址",
    width: 380,
    children: [
      {
        prop: "province",
        label: "省",
        width: 80,
      },
      {
        prop: "city",
        label: "市",
        width: 80,
      },
      {
        prop: "district",
        label: "区",
        width: 80,
      },
      {
        prop: "address",
        label: "详细地址",
      },
    ],
  },
  {
    prop: "detail",
    label: "描述",
    width: 280,
    formatter: (row: User, column: TableColumnCtx<User>) => {
      return "p:" + row.detail;
    },
  },
];

const table = ref();
// onMounted(() => {
//   const data1 = table.value;

//   console.log(data1);

//   table.value?.el_table?.toggleRowSelection(data1, undefined);
// });
watch(
  () => table.value?.loading,
  (n, o) => {
    if (!n && o) {
      nextTick(() => {
        const data1 = table.value?.el_table?.data[1];

        console.log(data1);

        table.value?.el_table?.toggleRowSelection(data1, undefined);
      });
    }
  }
);
function handleEdit(i, row) {
  console.log(i, row);
}
function handleDelete(i, row) {
  console.log(i, row);
}
</script>

<template>
  <ve-table
    ref="table"
    :config="{ api: { url: '/api/table/getData', method: 'get' }, pagination: true }"
    :columns="columns"
    stripe
    border
    style="width: 100%"
  >
    <template #left>
      <el-table-column type="expand" fixed>
        <template #default="props">
          <div m="4">
            <p m="t-0 b-2">State: {{ props.row.province }}</p>
            <p m="t-0 b-2">City: {{ props.row.city }}</p>
            <p m="t-0 b-2">Address: {{ props.row.address }}</p>
            <p m="t-0 b-2">Zip: {{ props.row.detail }}</p>
            <h3>Family</h3>
            <el-table :data="props.row.family">
              <el-table-column label="Name" prop="name" />
              <el-table-column label="State" prop="state" />
              <el-table-column label="City" prop="city" />
              <el-table-column label="Address" prop="address" />
              <el-table-column label="Zip" prop="zip" />
            </el-table>
          </div>
        </template>
      </el-table-column>
    </template>

    <template #column-name="scope">
      <p>姓名：{{ scope.row.name }}</p>
    </template>
    <template #header-name>
      <p>姓名(姓+名)</p>
    </template>
    <template #column-address="scope">
      <p>街道：{{ scope.row.address }}</p>
    </template>

    <template #right>
      <el-table-column align="right">
        <template #header>
          <span>操作</span>
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </template>

    <!-- <template #columns="scope">
      <el-table-column label="Name" prop="name" />
    </template> -->
  </ve-table>
</template>

<style scoped></style>
