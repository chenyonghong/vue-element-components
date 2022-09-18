<template>
<el-row :gutter="gutter">
    <el-col :span="span" v-for="idx in length" :key="idx">
        <slot :name="idx" />
    </el-col>
</el-row>
</template>
<script setup lang="ts">
import { defineProps, toRefs } from "vue";
import { number } from "yargs";

const props = defineProps({
    length: {
        type: Number,
        default: 0
    },
    span: {
        type: Number,
        default: 6,
    },
    gutter: {
        type: Number,
        default: 0
    }
})

const { length, span, gutter } = toRefs(props);
</script>