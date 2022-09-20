<template>
    <div>
        <slot name="header" />
        <form-entry :config="mergedConfig" :fields="fields">
            <template #footer-button v-if="mergedConfig.footerCol">
                <slot name="footer"></slot>
            </template>
        </form-entry>

        <slot v-if="!mergedConfig.footerCol" name="footer" />
    </div>
</template>
<script setup lang="ts" name="VeForm" scoped>
import { ElForm } from 'element-plus';
import { getCurrentInstance, reactive, useSlots, ref, toRefs, PropType, onMounted, onBeforeUnmount, provide } from 'vue';
import FormEntry from "./form.vue";
import { IFormConfig } from "./types/form";
import { IFormField } from "./types/form-field";
import useInitFormModel from "./hooks/useInitFormModel";
import { deepClone } from "@/utils";
import { IGlobalProperty } from './types/common';
import useInitConfig from "@/hooks/useInitConfig";

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

const mergedConfig = useInitConfig('form', config)

// 初始化model(调用组件没传model时使用)
if (!model || Reflect.ownKeys(model).length === 0) {
    model = reactive({})
    useInitFormModel(model, fields);
}

provide<IGlobalProperty>('globalProperties', { model, config: mergedConfig })

const slots = useSlots();
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
</script>