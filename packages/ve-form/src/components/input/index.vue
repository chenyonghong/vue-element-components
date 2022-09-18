<template>
    <el-input v-model="formModel[props.prop as string]" :placeholder="placeholder" v-bind="attrs">
        <template #prepend v-if="slots.prepend">
            <slot name="prepend"></slot>
        </template>
        <template #append v-if="slots.append">
            <slot name="append"></slot>
        </template>
        <template #prefix v-if="slots.prefix">
            <slot name="prefix" />
        </template>
        <template #suffix v-if="slots.suffix">
            <slot name="suffix" />
        </template>
    </el-input>
</template>

<script setup lang="ts">
import { ref, defineProps, useAttrs, inject, useSlots } from "vue";
import { inputAttrs } from "./attrs";
import useInitFieldPhr from "../../hooks/useInitFieldPhr";
import { IGlobalProperty } from "../../types/common";

// const props = defineProps({...inputAttrs})
const props = defineProps({
    prop: {
        type: String,
        default: ''
    }
})

// 初始化input组件属性,去除空属性
// const { refProps } = useInitFieldAttrs(props, inputAttrs)

const { model: formModel } = inject<IGlobalProperty>('globalProperties')!

const attrs = useAttrs();

// 设置默认占位符
const placeholder = useInitFieldPhr();

const slots = useSlots();
</script>