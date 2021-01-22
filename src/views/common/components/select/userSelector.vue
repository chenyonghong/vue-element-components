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
    <ve-select
      :el='{
        attrs: {
          value: this.$attrs.value,
          placeholder: this.$attrs.placeholder,
          valueKey:
            this.$attrs.valueKey || (this.$attrs["with-full-data"] ? "id" : ""),
        }
      }'
      :config='{
        updateDefaultValue: this.$attrs.updateDefaultValue,
        optionAttrs: {
          value: "id",
          label: "name",
        },
      }'
      :remoteFunc="getUserList"
      :remoteFormat="$attrs.formatFunc||formatData"
      @change="$listeners.change"
    >
      <template #default="{scope}">
        <slot :dataList="scope" />
      </template>
    </ve-select>
  </div>
</template>

<script>
import VeSelect from "@/components/Select";
import { getUserList } from "@/api/test.js";
export default {
  components: {
    VeSelect,
  },
  methods: {
    getUserList,
    formatData(res) {
      return res.data;
    },
  },
};
</script>
