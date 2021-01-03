<template>
  <el-select v-model="selected">
    <el-option value="1" label="男"></el-option>
    <el-option value="2" label="女"></el-option>
  </el-select>
</template>
<script >
export default {
  props: {
    defaultValue: String,
  },
  data() {
    return {
      selected: "",
    };
  },
  watch: {
    defaultValue(newVal) {
      this.selected = newVal;
    },
    selected(newVal) {
      this.$emit("change", newVal);
    },
  },
};
</script>
