<template>
    <el-input-number v-model="formModel[props.prop as string]" :placeholder="placeholder" v-bind="attrs">
    </el-input-number>
</template>

<script setup lang="ts">
import { ref, defineProps, useAttrs, inject } from "vue";
import { IGlobalProperty } from "../../types/common";
import useInitFieldPhr from "../../hooks/useInitFieldPhr";

const props = defineProps({
    prop: {
        type: String,
        default: ''
    }
})
const { model: formModel, config } = inject<IGlobalProperty>('globalProperties')!

const attrs = useAttrs();

// 设置默认占位符
const placeholder = useInitFieldPhr();
</script>