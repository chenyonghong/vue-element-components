<template>
    <el-input v-model="formModel[props.prop as string]" v-bind="attrs">
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
import { defineComponent, defineProps, useAttrs, inject, useSlots } from "vue";
import { inputAttrs } from "./attrs";
import useInitFieldAttrs from "../../hooks/useInitFieldAttrs";

// const props = defineProps({...inputAttrs})
const props = defineProps({
    prop: {
        type: String,
        default: ''
    }
})

// 初始化input组件属性,去除空属性ks
// const { refProps } = useInitFieldAttrs(props, inputAttrs)

const formModel = inject<Record<string | number, any>>('formModel')!

const attrs = useAttrs();

const slots = useSlots();
</script>