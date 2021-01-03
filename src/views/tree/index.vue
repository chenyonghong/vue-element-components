<template>
  <div class="page-container">
    <div class="multiple-box">
      <region-tree
        :showToolBar="true"
        :defaultCheckeds="checkList"
        @change="handleMultipleChange"
      >
        <!-- <template #tree-self-tool-bar>
          <div class="custom-tool-bar">
            <el-button type="primary">新增</el-button>
          </div>
        </template> -->
      </region-tree>
      <div class="selected-result">
        <p><el-checkbox v-model="fullPath">全路径</el-checkbox></p>

        <el-tag
          :key="index"
          closable
          v-for="(item, index) in checkList"
          @close="handleClose(index)"
          >{{ fullPath ? item.fullPathName : item.region_name }}</el-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
import RegionTree from "@/views/common/components/tree/regionTree.vue";
export default {
  components: {
    RegionTree,
  },
  data() {
    return {
      checkList: [],
      fullPath: false,
    };
  },

  methods: {
    handleMultipleChange(data) {
      this.checkList = data;
    },
    handleClose(index) {
      this.checkList.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.page-container > div {
  display: flex;
}
.page-container > div .region-tree {
  width: 500px;
}
.page-container > div .selected-result {
  flex: 1;
  background-color: #fff;
  margin-left: 20px;
  padding: 20px;
  border-left: 1px solid #e3e3e3;
}
.page-container > div .selected-result .el-tag {
  margin: 5px;
}
</style>
