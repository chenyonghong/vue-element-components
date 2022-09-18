<template>
    <el-input-number v-model="formModel[props.prop as string]" v-bind="attrs">
    </el-input-number>
</template>

<script setup lang="ts">
import { defineComponent, defineProps, useAttrs, inject } from "vue";

const props = defineProps({
    prop: {
        type: String,
        default: ''
    }
})

const formModel = inject<Record<string | number, any>>('formModel')!

const attrs = useAttrs();
</script>