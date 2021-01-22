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

    <p>分组：</p>
    <div class="item">
      <user-selector
        v-model="groupValue"
        :formatFunc="formatGroup"
        @change="handleChangeGroup"
      >
        <template #default="{dataList}">
          <el-option-group
            v-for="group in dataList"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-option-group>
        </template>
      </user-selector>
      <span>value: {{ groupValue }}</span>
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
      groupValue: "",
    };
  },
  methods: {
    handleChange(data) {
      this.user = data;
    },
    handleChange2(data) {
      this.user2 = data;
    },
    formatGroup({ data }) {
      let result = [];
      data.forEach((item) => {
        const matchItem = result.filter(
          (alItem) => alItem.label === item.department
        );
        if (matchItem.length) {
          matchItem[0].options.push({
            value: item.id,
            label: item.name,
          });
        } else {
          result.push({
            label: item.department,
            options: [
              {
                value: item.id,
                label: item.name,
              },
            ],
          });
        }
      });
      console.log(result)
      return result;
    },
    handleChangeGroup(data) {
      this.groupValue = data;
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
