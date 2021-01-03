<!--
 * @Descripttion: 用户下拉选择器
 * @Author: WingHong
 * @version: 1.0.0
 * @Date: 2020-12-18 11:20:48
 * @LastEditors: WingHong
 * @LastEditTime: 2020-12-21 16:58:49
-->
<template>
  <div class="container">
    <base-select
      :el-select-attrs="{
        value: $attrs.value,
        placeholder: $attrs.placeholder,
        valueKey: $attrs.valueKey || ($attrs['with-full-data'] ? 'id' : ''),
      }"
      :updateDefaultValue="$attrs.updateDefaultValue"
      :item-prop="{ value: 'id', label: 'name' }"
      :remoteFunc="getUserList"
      :remoteFormat="formatData"
      @change="$listeners.change"
    ></base-select>
  </div>
</template>

<script>
import BaseSelect from "@/components/Dropdown/BaseSelect.vue";
import { getUserList } from "@/api/test.js";
export default {
  components: {
    BaseSelect
  },
  methods: {
    getUserList,
    formatData(res) {
      return res.data;
    }
  }
};
</script>
