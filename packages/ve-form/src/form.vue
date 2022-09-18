<template>
    <el-form :model="formModel" ref="formInstance" v-bind="innerConfig">
        <!-- <form-item-wrapper v-for="field in fields" key="filed.name" :config="config" :field="field" /> -->
        <el-row v-bind="grid.row" v-if="grid">
            <el-col v-bind="field.col || grid.col" v-for="field in fields" v-show="!field.hidden">
                <form-item-wrapper :field="field" />
            </el-col>
            <el-col v-if="footerCol" v-bind="footerCol" :style="{ textAlign: footerCol.textAlign || 'center'}">
                <slot name="footer-button" />
            </el-col>
        </el-row>
        <template v-else>
            <form-item-wrapper v-for="field in fields" :config="config" :field="field" v-show="!field.hidden" />
        </template>
    </el-form>
</template>
<script setup lang="ts">
import { defineProps, toRefs, PropType, ref, inject, onMounted } from "vue";
import { IFormConfig } from "./types/form";
import { IFormField } from "./types/form-field";
import formItemWrapper from "./form-item-wrapper.vue";
import { _filterObj } from "pkg/utils";
import type { ElForm, FormInstance, FormRules } from 'element-plus'

const props = defineProps({
    config: {
        type: Object as PropType<IFormConfig>,
        default: {}
    },
    fields: {
        type: Array as PropType<IFormField[]>,
        default: []
    }
})

const { config, fields } = toRefs(props);

const { apis, grid, footerCol, ...innerConfig } = config.value;

const rules = ref<Record<string, any[]>>({});
fields.value.forEach(field => {
    const rule = field.rule;
    if (rule) {
        rules.value[field.prop] = rule
        field = _filterObj(field, 'exclude', 'rule')
    }
})
innerConfig.rules = rules.value;

// 初始化formModel
const formModel = inject('formModel');

const onSubmit = () => {
    console.log('submit')
}
console.log(formModel)

// form 实例
const formInstance = ref<FormInstance>();

const setInstance: (arg: InstanceType<typeof ElForm>) => void = inject('setInstance')!
onMounted(() => {
    setInstance(formInstance.value!)
})

console.log('fc: ', footerCol)
</script>
<style>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>