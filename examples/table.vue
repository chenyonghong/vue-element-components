
<template>
    <ve-table ref="table" :config="config" :columns="columns" stripe border style="width: 100%;">
        <template #filter-buttons>
            <el-button type="warning" @click="table.handleReset()">重置</el-button>
            <el-button type="primary" @click="table.handleSearch()">查询</el-button>
        </template>
        <template #prepend>
            <div style="padding: 10px; text-align: left">
                <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
            </div>
        </template>
        <!-- <template #table-header>
            <p>自定义表头内容</p>
        </template> -->
        <template #left>
            <el-table-column type="expand" fixed label="展开" width="100">
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
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                    </el-button>
                </template>
            </el-table-column>
        </template>
    </ve-table>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, watchEffect, nextTick } from "vue";
import { VeTable } from "../packages";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

// 性别选项
const genderOptions = [{
    id: 1,
    name: '男'
}, {
    id: 2,
    name: '女'
}]
interface User {
    name: string;
    phone: string;
    gender: number;
    age: number;
    province: string;
    city: string;
    district: string;
    address: string;
    detail: string;
}
const config = {
    // filter 搜索条件表单，配置同form config
    filter: {
        labelPosition: 'left',
        labelSuffix: '：',
        grid: {
            row: {
                gutter: 20
            },
            col: {
                span: 8
            }
        },
        footerCol: {
            span: 6,
            textAlign: 'right'
        }
    },
    api: { url: '/api/table/getData', method: 'get' },
    // pagination: true,
    "row-key": 'id',
    // 'show-summary': true
}
const columns = [
    {
        type: "index",
        label: '序号',
        fixed: "",
        width: 80
    },
    {
        type: "selection",
        width: 55,
        fixed: "",
        crossPage: true, // 跨页多选
    },
    {
        prop: "name",
        label: "姓名",
        width: 150,
        fixed: true,
        filter: {
            type: 'input',
            // placeholder: '请输入姓名222'
        }
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
        // 搜索项配置，同form-fields
        filter: {
            type: 'select',
            clearable: true,
            placeholder: '请选择性别222',
            col: {
                span: 10,
            },
            style: {
                width: '100%'
            },
            options: genderOptions.map(gender => ({ value: gender.id, label: gender.name }))
        },
        formatter: (row: User, column: TableColumnCtx<User>) => {
            return genderOptions.filter(g => g.id === row.gender)[0].name;
        },
    },
    {
        prop: "age",
        label: "年龄",
        width: 80,
    },
    {
        label: "地址",
        // width: 380,
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
        // width: 280,
        formatter: (row: User, column: TableColumnCtx<User>) => {
            return "p:" + row.detail;
        },
    },
];
const table = ref();

function handleEdit(i, row) {
    console.log(i, row);
}
function handleDelete(i, row) {
    console.log(i, row);
}
function handleBatchDelete() {
    console.log('选择删除的数据为: ', table.value?.selections)
}
</script>

