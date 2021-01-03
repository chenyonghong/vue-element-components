<!--
 * @Descripttion: BaseSelect Demo
 * @Author: WingHong
 * @version: 1.0.0
 * @Date: 2020-12-18 11:17:49
 * @LastEditors: WingHong
 * @LastEditTime: 2020-12-21 18:00:48
-->
<template>
  <div class="page-container">
    <p>主键值：</p>
    <div class="item">
      <user-selector v-model="user" @change="handleChange"></user-selector>
      <span>value: {{ user }}</span>
    </div>

    <p>对象值：</p>
    <div class="item">
      <user-selector
        v-model="user2"
        :with-full-data="true"
        :updateDefaultValue="true"
        @change="handleChange2"
      ></user-selector>
      <span>value: {{ user2 }}</span>
    </div>
  </div>
</template>

<script>
import UserSelector from "@/views/common/components/select/userSelector.vue";
export default {
  components: {
    UserSelector,
  },
  data() {
    return {
      user: 5,
      user2: {
        id: 2,
      },
    };
  },
  methods: {
    handleChange(data) {
      this.user = data;
    },
    handleChange2(data) {
      this.user2 = data;
    },
  },
};
</script>

<style scoped>
.item {
  display: flex;
}
.item span {
  line-height: 40px;
  margin-left: 10px;
}
p {
  text-align: left;
}
</style>
