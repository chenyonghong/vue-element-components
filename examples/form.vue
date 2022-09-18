<template>
    <ve-form ref="form" :config="config" :fields="fields" :model="model">
        <template #header>
            <h3 style="text-align: left">测试表单</h3>
        </template>
        <template #field-select-sex="scope">
            <span style="float: left">{{ scope.label }}</span>
            <span style="
                      float: right;
                      color: var(--el-text-color-secondary);
                      font-size: 13px;
                    ">{{ scope.value }}</span>
        </template>
        <!-- <template #field-input-name-prepend="scope">
            Http://
        </template>
        <template #field-input-name-append="scope">
            .com
        </template> -->
        <template #field-input-name-suffix>
            <el-icon class="el-input__icon">
                <search />
            </el-icon>
        </template>
        <template #footer>
            <el-button @click="getFormModel">提交</el-button>
        </template>
    </ve-form>
    
</template>
<script setup lang="ts">
import { ref, shallowRef, onMounted, watch, watchEffect, nextTick, reactive } from "vue";
import { VeForm } from "../packages";
import { Calendar, Search } from '@element-plus/icons-vue'

console.log(VeForm)
const config = reactive({
    labelPosition: 'top',
    grid: {
        row: {
            gutter: 20
        },
        col: {
            span: 12
        }
    }
})
const fields = [
    {
        type: 'text',
        prop: 'name',
        label: '姓名',
        rows: 12,
        maxlength: 100,
        showWordLimit: '',
        clearable: true,
        hidden: false,
        rule: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
        ]
    },
    {
        type: 'input-number',
        prop: 'age',
        label: '年龄',
        min: 1,
        max: 200,
        clearable: true,
        col: {
            span: 6
        }
    },
    {
        type: 'select',
        prop: 'sex',
        label: '性别',
        clearable: true,
        options: [
            {
                label: '男',
                value: 1
            },
            {
                label: '女',
                value: 2,
                // disabled: true
            }
        ],
        col: {
            span: 6
        },
        
    },
    {
        type: 'select',
        prop: 'like',
        label: '兴趣爱好',
        clearable: true,
        multiple: '',
        group: true,
        options: [
            {
                label: '运动',
                options: [
                    {
                        value: 1,
                        label: '篮球'
                    },
                    {
                        value: 2,
                        label: '足球'
                    },
                    {
                        value: 3,
                        label: '乒乓球'
                    }
                ]
            },
            {
                label: '音乐',
                options: [
                    {
                        value: 10,
                        label: '摇滚'
                    },
                    {
                        value: 11,
                        label: '流行'
                    },
                    {
                        value: 12,
                        label: '抒情'
                    }
                ]
            }
        ],
        rule: [
            {
                type: 'array',
                required: true,
                message: 'Please select at least one activity type',
                trigger: 'change',
            },
        ],
        events: {
            change: (value)=> {
                console.log(value)
            },
            clear: ()=> {
                console.log('clear')
            },
            'visible-change': (value)=> {
                console.log('visible: ', value)
            }
        }
    }
]
const model = reactive({
    name: '',
    age: 0,
    sex: 1,
    like: []
})

const form = ref();
const getFormModel = () => {
    // console.log(form.value.formEl);
    form.value.formEl.validate((isValid: boolean)=> {
        console.log(isValid)
    })
}
</script>