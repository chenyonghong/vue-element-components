<template>
  <div v-loading="loading" class="tree-container">
    <slot name="search">
      <el-input
        v-if="baseConf.filter"
        v-model="filterText"
        placeholder="请输入名称模糊搜索"
        maxlength="30"
        @input="
          (value) => {
            this.treeProp.lazy ? null : this.$refs.tree.filter(value);
          }
        "
        style="border: 0 none; outline: 0 none; width: 90%"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          v-if="treeProp.lazy"
          @click="onSearch(filterText)"
        ></el-button>
      </el-input>
    </slot>

    <slot name="self-tool-bar"></slot>
    <div class="tree-tool-bar">
      <el-link
        :icon="isExpand ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
        class="icon-expand"
        type="primary"
        :underline="false"
        @click="toggleExpand"
        v-if="baseConf.allExpand"
      >
        {{ isExpand ? "全部收起" : "全部展开" }}
      </el-link>
      <el-checkbox
        class="check-all"
        v-model="checkAll"
        v-if="treeProp.showCheckbox && baseConf.showCheckAll"
        >全选</el-checkbox
      >
      <span v-if="baseConf.showCheckedNum && treeProp.showCheckbox">
        已选择<span style="color: red"> {{ checkedNum }} </span>个
      </span>
    </div>

    <div class="tree-content" v-if="!refresh">
      <el-tree
        ref="tree"
        class="filter-tree"
        :data="treeData"
        v-bind="treeProp"
        @node-click="handleNodeClick"
        @check-change="checkChange"
        v-on="$listeners"
      >
        <span slot-scope="{ node, data }" class="span-ellipsis">
          <span :title="node.label" class="tree-item-name">
            {{ showLabel(node) }}
          </span>
          <slot name="node-append" :scope="{ node, data }"></slot>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
import Browser from "@/utils/browser";
// import _ from "lodash";
export default {
  props: {
    config: Object, // 传入的基本配置项
    ElTreeAttrs: Object, // 传入的el-tree 配置项
  },
  data() {
    return {
      visible: false,
      // 默认的基本配置项
      defaultConf: {
        filter: true,
        allExpand: true,
        showCheckAll: false,
        showCheckedNum: true,
        subNodeNumber: {
          show: false,
          onlySon: false,
        },
        makeTreeFunc: (data) => {
          const parentNode = data.filter((a) => a.isTop);
          parentNode.forEach((p) => {
            this.setChildren(p, data);
          });
          return parentNode;
        },
        filterWithChildNodes: true, // 搜索过滤节点时，是否显示匹配节点的子节点
      },
      // 默认的el-tree 配置项
      defaultTreeAttrs: {
        nodeKey: "id",
        parentKey: "pid",
        showCheckbox: true, // 是否显示复选框
        checkOnClickNode: true, // 是否在点击节点时选中该节点（多选模式）
        checkStrictly: true, // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
        expandOnClickNode: false, // 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
        draggable: false,
        defaultCheckedKeys: [],
        defaultExpandedKeys: [], // 默认展开的节点的 key 的数组
        props: {
          children: "children",
          label: "label",
          isLeaf: "isLeaf",
          disabled: "disabled",
        },
        filterNodeMethod: this.filterNode,
        load: this.defaultLoadFunc,
      },
      filterText: "", // 搜索框文本
      isExpand: false, // 是否全部展开
      checkedNum: 0, // 选择的节点数量
      remoteData: [], // 远端源数据
      loading: false,
      treeData: [], // 树数据
      checkAll: false,

      refresh: false,
    };
  },

  computed: {
    // 合并后的基础配置项
    baseConf() {
      return Object.assign({}, this.defaultConf, this.config);
    },
    // 合并后的el-tree配置项
    treeProp: {
      get() {
        return Object.assign({}, this.defaultTreeAttrs, this.ElTreeAttrs);
      },
    },
  },
  watch: {
    // filterText(newVal) {
    //   // this.$refs.tree.filter(newVal);
    //   if(!this.treeProp.lazy)
    //     this.onSearch(newVal)
    // },
    checkAll(val) {
      let treeRef = this.$refs.tree;
      const allNodeKeys = [];
      const getKeys = (nodeList) => {
        nodeList.forEach((node) => {
          allNodeKeys.push(node[this.treeProp.nodeKey]);
          if (node.children && node.children.length) {
            getKeys(node.children);
          }
        });
      };

      let checkedKeys = [];
      if (val) {
        getKeys(treeRef.data);
        checkedKeys = allNodeKeys;
      }
      this.$refs.tree.setCheckedKeys(checkedKeys);
    },
  },

  created() {
    this.loading = true;
    if (this.baseConf.showCheckedNum) {
      this.checkedNum = this.treeProp.defaultCheckedKeys.length;
    }
    if (!this.treeProp.lazy) {
      this.getData().then((result) => {
        // 树渲染完成后，执行选中确认方法，将结果返回
        if (result) {
          this.confirm();
        }
      });
    }

    if (Browser.client.isIE) {
      window.onresize = () => {
        this.fuckIE();
      };
    }
  },

  beforeUpdate() {
    if (Browser.client.isIE) {
      this.fuckIE();
    }
  },
  beforeDestroy() {
    if (Browser.client.isIE) {
      window.onresize = null;
    }
  },

  methods: {
    // 解决ie渲染问题
    fuckIE() {
      const treeDom = document.getElementsByClassName("filter-tree")[0];
      treeDom.style.zoom = treeDom.style.zoom == 1 ? 0 : 1;
    },
    // 默认的懒加载方法
    defaultLoadFunc(node, resolve) {
      const pid = node.parent ? node.data[this.treeProp.nodeKey] : 0;
      this.getData({ pid }, resolve);
    },
    // 从远程服务器获取数据
    getData(params = {}, resol) {
      return new Promise((resolve) => {
        // const resolver = this.treeProp.lazy ? resol : resolve;
        // const resolver = resol || resolve;
        if (this.baseConf.remoteFunc) {
          // if (!this.treeProp.lazy) params = this.baseConf.remoteParams;
          Object.assign(params, this.baseConf.remoteParams);
          this.baseConf.remoteFunc(params).then((res) => {
            const result = this.renderTree(res);
            resol && resol(result);
            resolve(result);
          });
        } else {
          resol && resol([]);
        }
      });
    },
    renderTree(remoteData) {
      let treeData = remoteData;
      // 先过滤远端数据
      const formatter = this.baseConf.remoteFormat;
      if (formatter && typeof formatter === "function") {
        treeData = formatter(treeData);
      }
      if (this.treeProp.lazy) {
        this.remoteData = this.remoteData.concat(treeData);
      } else {
        // this.remoteData = _.cloneDeep(treeData);
        this.remoteData = JSON.parse(JSON.stringify(treeData))
      }

      // 然后将数据转为树需要的数据格式
      const makeTreeFunc = this.baseConf.makeTreeFunc;
      if (makeTreeFunc && typeof makeTreeFunc === "function") {
        treeData = makeTreeFunc(treeData);
      }

      // 排序
      //   if (this.baseConf.sort) {
      //     treeData.forEach(p => {
      //       if (p.children && p.children.length) {
      //         p.children = this.sort(p.children);
      //       }
      //     });
      //   }
      if (this.baseConf.sort) {
        treeData = this.sort(treeData);
        // treeData.forEach(p => {
        //   if (p.children && p.children.length) {
        //     p.children = this.sort(p.children);
        //   }
        // });
      }

      this.baseConf.renderBefore && this.baseConf.renderBefore();

      if (!this.treeProp.lazy) {
        this.treeData = treeData;
      }

      this.$nextTick(() => {
        this.baseConf.renderAfter && this.baseConf.renderAfter();
      });

      this.loading = false;
      return treeData;
    },
    // 递归设置子节点数据
    setChildren(parentNode, dataList) {
      parentNode.children = [];
      dataList.forEach((item) => {
        // 如果遍历出来节点的父id === 该节点的id，则这是节点都是该节点的孩子
        if (
          item[this.treeProp.parentKey] === parentNode[this.treeProp.nodeKey]
        ) {
          parentNode.children.push(item);
          this.setChildren(item, dataList);
        } else {
          parentNode.isLeaf = true;
        }
      });
    },
    // 获取节点需要显示的文本内容
    showLabel(node) {
      let label = node.label;
      if (this.baseConf.subNodeNumber.show) {
        let childNum = this.getChildNum(node.data, node.data.children);
        if (childNum > 0) {
          label += `(${childNum})`;
        }
      }
      return label;
    },
    // 递归获取子组织数量
    getChildNum(parentNode, children) {
      if (!children || !children.length) return 0;
      let num = 0;
      if (
        this.baseConf.subNodeNumber.show &&
        this.baseConf.subNodeNumber.onlySon
      ) {
        num = children.length;
      } else {
        children.forEach((c) => {
          // 如果子节点还有子节点，则继续递归，并返回其子节点数量，否则直接+1
          if (c.children && c.children.length) {
            num += this.getChildNum(c, c.children);
            // +1 是为了算上父节点本身
            if (!this.baseConf.ignoreNumKey) {
              num++;
            } else {
              if (!c[this.baseConf.ignoreNumKey]) num++;
            }
            // num += this.getChildNum(c, c.children) + 1;
          } else {
            num++;
          }
        });
      }

      return num;
    },
    // 默认排序函数
    sort(children) {
      children.sort((a, b) => {
        return a[this.baseConf.sortKey] > b[this.baseConf.sortKey]
          ? 1
          : a[this.baseConf.sortKey] == b[this.baseConf.sortKey]
          ? 0
          : -1;
      });
      // children = _.sortBy(children, [this.baseConf.sortKey]);
      children.forEach((c) => {
        if (c.children && c.children.length) {
          c.children = this.sort(c.children);
        }
      });
      return children;
    },

    // 插入一个节点
    addNode(nodeData, parentNode) {
      // 先获取添加的节点的父节点
      if (!parentNode) {
        parentNode = this.$refs.tree.getNode(nodeData[this.treeProp.parentKey]);
      }
      nodeData.label = nodeData[this.treeProp.props.label];
      this.$refs.tree.append(nodeData, parentNode);
      // 插入完成重新排序
      parentNode.data.children = this.sort(parentNode.data.children);
      parentNode.childNodes.sort((a, b) => {
        return a.data[this.baseConf.sortKey] > b.data[this.baseConf.sortKey]
          ? 1
          : a.data[this.baseConf.sortKey] == b.data[this.baseConf.sortKey]
          ? 0
          : -1;
      });
      //   this.$refs.tree.updateKeyChildren(nodeData[this.treeProp.parentKey], parentNode.data.children)
    },

    // 更新节点
    updateNode(node) {
      //   const target = this.$refs.tree.getNode(node[this.treeProp.nodeKey]);
      //   target.data = node;
      //   debugger;
      //   console.log(node);
      this.deleteNode(node[this.treeProp.nodeKey]);
      this.addNode(node);
    },

    // 删除指定节点
    deleteNode(dataId) {
      if (!dataId) return;
      const node = this.$refs.tree.getNode(dataId);
      if (!node) return;
      this.$refs.tree.remove(node);
    },
    // 切换展开、收起
    toggleExpand() {
      this.isExpand = !this.isExpand;
      let tree = this.$refs.tree;
      const setExpand = (nodeList) => {
        if (nodeList && nodeList.length) {
          nodeList.forEach((c) => {
            let node = c;
            if (c.node) {
              node = c.node;
            }
            // c.expanded = this.isExpand;
            // c.node && (c.node.expanded = this.isExpand);
            node.expanded = this.isExpand;
            setExpand(node.childNodes);
          });
        }
      };
      setExpand(tree.$children);

      // for (let i = 0; i < this.remoteData.length; i++) {
      //   // 将没有转换成树的原数据设置key为... 的展开
      //   const node = this.$refs.tree.getNode(
      //     this.remoteData[i][this.treeProp.nodeKey]
      //   );
      //   if (node && node.childNodes.length > 0) {
      //     node.expanded = this.isExpand;
      //   }
      // }
    },
    // 拖放
    // handleDragStart(node, ev) {
    //     console.log("drag start", node);
    // }
    // handleDragEnter(draggingNode, dropNode, ev) {
    //     console.log("tree drag enter: ", dropNode.label);
    // }
    // handleDragLeave(draggingNode, dropNode, ev) {
    //     console.log("tree drag leave: ", dropNode.label);
    // }
    // handleDragOver(draggingNode, dropNode, ev) {
    //     console.log("tree drag over: ", dropNode.label);
    // }
    // handleDragEnd(draggingNode, dropNode, dropType, ev) {
    //     console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    // }
    handleDrop(draggingNode) {
      // 拖动元素父节点
      const parentNode = this.$refs.tree.getNode(draggingNode.data.pid),
        // 拖动结束后新的子节点
        newPosChildren = parentNode.childNodes,
        idList = newPosChildren.map((posChild) => {
          return posChild.data.id;
        });
      this.$emit("treeSort", idList);
    },
    // 更新当前节点下子节点(外部调用)
    updateCurrentChildren(treeData) {
      const currentKey = this.$refs.tree.getCurrentKey();
      // const  currentNode = this.$refs.tree.getNode(currentKey);
      if (currentKey) {
        //const resolve = treeData => {
        this.$refs.tree.updateKeyChildren(currentKey, treeData);
        //};
      }
    },
    // 设置被勾选的节点
    setTreeCheckNode(arr) {
      this.$refs.tree.setCheckedKeys(arr);
    },

    confirm() {
      let checkedNodes = this.$refs.tree.getCheckedNodes();
      // 获取全路径名称
      const joinName = (nodeId) => {
        if (nodeId) {
          let matchNode = this.$refs.tree.getNode(nodeId),
            parentNode = null;
          if (matchNode) {
            parentNode = matchNode.parent;
          }
          if (parentNode) {
            let name = "";
            if (!parentNode.data.cantPick) {
              const parentName = joinName(parentNode.data.id);
              if (parentName) {
                name += parentName + "/" + parentNode.label;
              } else {
                name = parentNode.label;
              }
            }
            return name;
          }
        }
      };
      if (this.baseConf.getFullPathName) {
        checkedNodes.forEach((node) => {
          const parentName = joinName(node.id);
          if (parentName) {
            node.fullPathName =
              parentName + "/" + node[this.treeProp.props.label];
          } else {
            node.fullPathName = node[this.treeProp.props.label];
          }
        });
      }
      if (checkedNodes !== null) {
        this.$emit("select", checkedNodes);
      }
      this.checkedNum = checkedNodes.length;
    },

    // 节点点击事件
    handleNodeClick(item) {
      // return;
      if (!this.treeProp.showCheckbox) {
        this.$refs.tree.setCheckedKeys([item.id]);
        // this.confirm()
      }
    },

    // 选项改变事件
    checkChange(item, isNodeChecked) {
      if (!this.treeProp.showCheckbox) {
        if (isNodeChecked === true) {
          this.$refs.tree.setCheckedKeys([item.id]);
          this.confirm();
        }
      } else {
        this.confirm();
      }
    },

    // 懒加载搜索
    onSearch(keyword) {
      if (!this.treeProp.lazy) this.$refs.tree.filter(keyword);
      else {
        this.refresh = true;

        this.$nextTick(() => {
          this.treeProp.load = (node, resolve) => {
            const pid = node.parent ? node.data[this.treeProp.nodeKey] : 0;
            let params = { pid };
            if (keyword && !pid) {
              params = { [this.ElTreeAttrs.props.label]: keyword };
            }
            this.getData(params, resolve).then(() => {
              console.log(this.treeProp.load);
              // this.$nextTick(() => {
              //   this.treeProp.load = this.defaultLoadFunc;
              //   console.log(this.treeProp.load);
              // });
            });
          };
          this.refresh = false;
        });
      }
    },

    // 过滤节点
    filterNode(value, data, node) {
      if (!value) return true;
      let textName = data[this.treeProp.props.label];
      if (this.baseConf.filterWithChildNodes) {
        const getParentIsMatch = (node) => {
          if (node.parent && node.parent.label) {
            if (node.parent.label.indexOf(value) !== -1) {
              return true;
            } else {
              return getParentIsMatch(node.parent);
            }
          } else {
            return false;
          }
        };
        return textName.indexOf(value) !== -1 || getParentIsMatch(node);
      } else {
        return textName.indexOf(value) !== -1;
      }
      // return (
      //     data[this.treeProp.props.label].indexOf(value) !== -1 ||
      //     (node.parent.label && node.parent.label.indexOf(value) !== -1)
      // );
    },
    // handleEllipseClick(e) {
    //     e.cancelBubble=true;
    // }
  },
};
</script>

<style scoped>
.tree-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.tree-container .tree-tool-bar {
  margin-top: 10px;
  margin-bottom: 5px;
  line-height: 40px;
  padding-left: 5px;

  width: 100%;
  box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.3);
}
.tree-container .tree-tool-bar .icon-expand {
  justify-content: start;
}
.tree-container .tree-tool-bar > a {
  text-align: left;
  margin-right: 20px;
}
.tree-container .tree-tool-bar > span {
  float: right;
  font-size: 13px;
}
.tree-container .tree-tool-bar .check-all {
  margin-left: 2px;
}

.tree-container .tree-content {
  display: flex;
  width: 100%;
  background-color: #fff;
  height: 100%;
  overflow-y: auto;
}
.tree-container .tree-content .el-tree {
  width: 100%;
}
.tree-container .tree-content .el-tree .span-ellipsis {
  display: flex;
  width: calc(100% - 24px);
}
.tree-container .tree-content .el-tree .span-ellipsis .tree-item-name {
  flex: 1;
  overflow: hidden;
}
.tree-container .tree-content .el-tree .span-ellipsis >>> .el-dropdown {
  margin: 0 10px;
  width: 15px;
}
.tree-container .tree-content >>> .el-tree-node__content {
  height: 30px;
  color: #333333;
}
</style>
