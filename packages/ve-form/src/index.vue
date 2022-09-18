<template>
    <div>
        <slot name="header" />
        <form-entry :config="defaultConfig" :fields="fields">
            <template #footer-button v-if="defaultConfig.footerCol">
                <slot name="footer"></slot>
            </template>
        </form-entry>

        <slot v-if="!defaultConfig.footerCol" name="footer" />
    </div>
</template>
<script setup lang="ts" name="VeForm" scoped>
import { ElForm } from 'element-plus';
import { getCurrentInstance, reactive, useSlots, ref, toRefs, PropType, onMounted, onBeforeUnmount, provide } from 'vue';
import FormEntry from "./form.vue";
import { IFormConfig } from "./types/form";
import { IFormField } from "./types/form-field";
import useInitFormModel from "./hooks/useInitFormModel";
import { deepClone } from "pkg/utils";

const props = defineProps({
    config: {
        type: Object as PropType<IFormConfig>,
        default: {
        }
    },
    fields: {
        type: Array as PropType<IFormField[]>,
        default: []
    },
    model: {
        type: Object as PropType<Record<string | number, any>>,
        default: null
    }
})

let { config, fields, model } = props;

const instance = getCurrentInstance();
const { globalProperties } = instance!.appContext.config;

// 合并全局配置
const defaultConfig: IFormConfig = config
const { form: gConfig } = globalProperties.vec_config ?? {};
if (gConfig) {
    for (let key in gConfig) {
        if (!defaultConfig[key]) {
            defaultConfig[key] = gConfig[key]
        }
    }
}

// 初始化model(调用组件没传model时使用)
if (!model || Reflect.ownKeys(model).length === 0) {
    model = reactive({})
    useInitFormModel(model, fields);
}

provide<Record<string | number, unknown>>('formModel', model)

const slots = useSlots();
// const fieldKeys = Object.keys(slots).filter(key=> key.startsWith('field-')).map(key=> key.slice(6));
const fieldSlots: Record<string, any> = {};
for (let slotKey in slots) {
    if (slotKey.startsWith('field-')) {
        fieldSlots[slotKey.slice(6)] = slots[slotKey]
    }
}
provide('fieldSlots', fieldSlots)

let formEl = ref<InstanceType<typeof ElForm>>();
provide('setInstance', (instance: InstanceType<typeof ElForm>) => {
    formEl.value = instance;
})
defineExpose({
    model,
    formEl,
    reset: () => useInitFormModel(model, fields)
})

// onBeforeUnmount(() => {
//     console.log('unMounted!!')
//     model = {};
// })
</script>