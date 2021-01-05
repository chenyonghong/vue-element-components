<!--
 * @Descripttion: $1
 * @Author: WingHong
 * @version: 1.0.0
 * @Date: 2020-12-22 09:57:34
 * @LastEditors: WingHong
 * @LastEditTime: 2021-01-04 15:32:13
-->
<template>
  <div class="region-tree">
    <div class="tool-bar" v-if="$attrs.showToolBar">
      <el-checkbox v-model="ElTreeAttrs.lazy">数据懒加载</el-checkbox>
      <el-checkbox v-model="ElTreeAttrs.showCheckbox">多选</el-checkbox>
      <el-checkbox v-model="config.showCheckAll" :disabled="disabled.checkAll"
        >显示全选</el-checkbox
      >
      <el-checkbox
        v-model="config.showCheckedNum"
        :disabled="disabled.showCheckedNum"
        >显示选择节点数量</el-checkbox
      >
      <el-checkbox
        v-model="config.subNodeNumber.show"
        :disabled="disabled.subNodeNumber"
        >显示子节点数量</el-checkbox
      >
      <el-checkbox
        v-model="config.subNodeNumber.onlySon"
        :disabled="disabled.subNodeNumber"
        >仅显示次级子节点数量</el-checkbox
      >
      <el-checkbox v-model="ElTreeAttrs.draggable">可拖拽排序</el-checkbox>
      <el-checkbox v-model="config.allExpand">显示全部展开/收起</el-checkbox>

      <el-checkbox v-model="config.filter">显示搜索框</el-checkbox>
      <el-checkbox v-model="config.filterWithChildNodes"
        >搜索结果显示匹配节点的子节点</el-checkbox
      >
      <el-checkbox v-model="showOp">显示右边操作栏</el-checkbox>
    </div>
    <base-tree
      ref="regionTree"
      :config="config"
      :ElTreeAttrs="ElTreeAttrs"
      @select="handleSelect"
      v-if="!refresh"
    >
      <!-- <template #search>
        <div>
          <el-input
            v-model="filterText"
            placeholder="请输入名称模糊搜索"
            maxlength="30"
            style="border: 0 none; outline: 0 none; width: 90%"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="onSearch(filterText)"
              >搜索</el-button
            >
          </el-input>
        </div>
      </template> -->
      <template #self-tool-bar>
        <!-- <slot name="tree-self-tool-bar"></slot> -->
        <div class="custom-tool-bar">
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
      </template>
      <template #node-append="{ scope }">
        <el-dropdown
          trigger="click"
          @click.native="(e) => (e.cancelBubble = true)"
          @command="handleCommand($event, scope.data)"
          v-if="showOp"
        >
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="edit">编辑</el-dropdown-item>
            <el-dropdown-item command="delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-tree>
  </div>
</template>

<script>
import BaseTree from "@/components/Tree";
import { fetchRegionAll, fetchRegionList } from "@/api/test";
export default {
  components: {
    BaseTree,
  },
  props: {
    defaultCheckeds: Array,
  },
  data() {
    return {
      config: {
        // remoteFunc: fetchRegionAll,
        remoteFunc: fetchRegionList,
        showCheckedNum: false,
        subNodeNumber: {
          show: false,
          onlySon: false,
        },
        filter: true,
        filterWithChildNodes: false,
        allExpand: true,
        showCheckAll: false,
        sort: true,
        sortKey: "order",
        // ignoreNumKey: "isProject",
        getFullPathName: true,
        remoteParams: {},
        remoteFormat: (data) => {
          return data.data;
        },
        makeTreeFunc: (data) => {
          // 懒加载不用处理树形数据
          if (this.ElTreeAttrs.lazy) return data;
          else {
            // 全部加载数据，处理成树形数据
            let parentNode = [];

            parentNode = data.filter((a) => a.pid === 0);

            parentNode.forEach((node) => {
              this.setChildren(node, data);
            });
            console.log(parentNode);
            return parentNode;
          }
        },
      },
      ElTreeAttrs: {
        props: {
          label: "region_name",
          isLeaf: "isLeaf",
          //   children: "children"
        },
        showCheckbox: false,
        draggable: true,
        // checkStrictly: false,
        allowDrop: (draggingNode, dropNode, type) => {
          if (draggingNode.data.pid === dropNode.data.pid) {
            return type !== "inner";
          } else {
            return false;
          }
        },
        lazy: true,
        // load: (node, resolve) => {
        //   const pid = node.parent ? node.data.id : 0;
        //   return new Promise(() => {
        //     fetchRegionList({ pid }).then((res) => {
        //       this.$refs.regionTree.loading = false;
        //       resolve(res.data);
        //     });
        //   });
        // },
      },
      showOp: true,
      disabled: {
        checkAll: true,
        showCheckedNum: true,

        subNodeNumber: true,
      },
      refresh: false,

      filterText: ""
    };
  },
  watch: {
    defaultCheckeds(val) {
      this.setCheckeds(val);
    },
    "ElTreeAttrs.showCheckbox": {
      handler(val) {
        this.disabled.checkAll = !val;
        this.config.showCheckAll = val;

        this.disabled.showCheckedNum = !val;
        this.config.showCheckedNum = val;
      },
    },
    "ElTreeAttrs.lazy": {
      handler(val) {
        if (val) {
          this.config.subNodeNumber.show = false;
          this.config.subNodeNumber.onlySon = false;
        }
        this.disabled.subNodeNumber = val;

        this.refresh = true;

        this.$nextTick(() => {
          this.config.remoteFunc = val ? fetchRegionList : fetchRegionAll;
          this.refresh = false;
          this.setCheckeds(this.defaultCheckeds);
        });
      },
    },
  },
  methods: {
    // 递归设置子节点数据
    setChildren(parentNode, dataList) {
      parentNode.children = [];
      dataList.forEach((item) => {
        // 如果遍历出来节点的父id === 该节点的id，则这是节点都是该节点的孩子
        if (item.pid === parentNode.id) {
          parentNode.children.push(item);
          this.setChildren(item, dataList);
        }
      });
    },
    handleSelect(data) {
      //if (data && data.length) {
      this.$emit("change", data);
      //}
    },
    handleDrop(draggingNode, dropNode) {
      // 拖动元素父节点
      let parentNode = dropNode.parent;
      // 拖动结束后新的子节点
      const newPosChildren = parentNode.childNodes,
        idList = newPosChildren.map((posChild) => {
          return posChild.data.id;
        });
      console.log(idList);
      // treeSort({ ids: idList }).then(({ code, data }) => {});
    },
    handleAdd() {
      this.$refs.regionTree.addNode({
        id: this.$refs.regionTree.remoteData.length + 1,
        region_name: "新增的节点",
        pid: 0,
        pname: "",
        sort: 1,
      });
    },
    // 编辑和删除
    handleCommand(command, nodeData) {
      if (command === "edit") {
        nodeData.region_name = "修改的节点";
        this.$refs.regionTree.updateNode(nodeData);
      } else if (command === "delete") {
        this.$refs.regionTree.deleteNode(nodeData.id);
      }
    },
    // 设置默认勾选节点
    setCheckeds(data) {
      this.$nextTick(() => {
        this.$refs.regionTree.$refs.tree.setCheckedKeys(
          data.map((item) => item.id),
          true
        );
      });
    },
    onSearch(value) {
      this.$refs.regionTree.search(value)
    }
  },
};
</script>

<style scoped>
.region-tree {
  background: #fff;
  padding: 20px;
  max-width: 500px;
  /* height: 800px; */
  overflow: hidden;
}
.region-tree .tool-bar {
  padding: 5px;
}
.region-tree .tool-bar .el-checkbox {
  margin: 10px;
}
.region-tree .custom-tool-bar {
  width: 100%;
  margin: 10px 20px;
  text-align: right;
}
.region-tree .tree-container {
  height: 600px;
}
</style>
