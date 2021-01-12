<template>
  <div class="table-container">
    <div class="table-wrapper">
      <div class="handle-div">
        <slot name="handler"></slot>
        <el-button
          v-if="tableConf.filterable"
          type="primary"
          @click="filterVisible = true"
        >
          表格列配置
        </el-button>
      </div>
      <el-table
        :id="randomId"
        :ref="randomId"
        v-loading="tableLoading"
        class="table-instance"
        :data="
          !tableConf.pagination || tableConf.paginationMode === 1
            ? tableData
            : tableDataShow
        "
        v-bind="tableConf"
        @selection-change="handleSelectionChange"
        @select="select"
        @select-all="selectAll"
      >
        <template v-for="(item, index) in showColumnsTemp">
          <el-table-column
            v-if="item.component || item.template"
            :key="index"
            v-bind="item"
          >
            <template slot-scope="scope">
              <component
                :is="item.component"
                v-if="item && item.component"
                :scope="scope.row"
                @refresh="makeTable"
              ></component>
              <template-render
                v-else-if="item.template"
                :scope="scope.row"
                :index="scope.$index"
                :html="item.template"
              >
              </template-render>
            </template>
          </el-table-column>
          <el-table-column v-else :key="index" v-bind="item"></el-table-column>
        </template>
        <slot v-if="mode === 2"></slot>
      </el-table>
    </div>
    <div v-if="tableConf.pagination" class="table-pg">
      <el-pagination
        v-if="tableConf.pagination"
        background
        :current-page.sync="curPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        source-name="pagination"
        :total="total"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
    <columns-filter
      v-if="tableConf.filterable"
      :table-name="tableConf.tableName"
      :visible.sync="filterVisible"
      :default-columns="filterColumns"
      @confirm="handleFilterConfirm"
    ></columns-filter>
  </div>
</template>

<script>
import request from "@/utils/request";
import TemplateRender from "./TemplateRender.vue";
import ColumnsFilter from "./TableColunmFilter.vue";
import { cloneDeep } from "./utils";

export default {
  components: {
    TemplateRender,
    ColumnsFilter,
  },
  props: {
    config: Object,
    requestConf: Object,
    columns: Array,
  },

  data() {
    return {
      // 默认的表格配置项
      defaultConf: {
        tableName: "",
        defaultSort: {},
        stripe: true,
        border: true,
        height: "calc(100% - 82px)",
        maxHeight: 800,
        pagination: true,
        paginationMode: 1,
        done: "",
        firstAutoRequest: false,
        rowKey: "",
        defaultExpandAll: false,
        filterable: false,
      },
      randomId: "",
      // 默认的网络请求参数
      defaultRequestConf: {
        type: "POST",
        url: "",
        data: {},
        config: {
          contentType: 0,
        },
      },
      tableData: [],
      tableDataShow: [], // 本地分页模式下显示的当前页数据
      tableLoading: false,

      total: 0,
      curPage: 1,
      pageSize: 10,

      isFirstLoad: false,
      tempTime: null,
      requestRes: {}, // 远程接口返回的所有数据（不仅限于tableData）

      filterVisible: false,

      showColumnsTemp: [],
    };
  },

  computed: {
    request() {
      return Object.assign({}, this.defaultRequestConf, this.requestConf);
    },

    // 请求接口函数
    requestMethod() {
      if (this.request.func) {
        return this.request.func;
      } else {
        // const this.request = _.assign(
        //         {},
        //         this.defaultRequestConf,
        //         this.requestConf
        //     ),
        const REQUEST = (data) =>
          request({
            url: this.request.url,
            // data: this.request.isPostJson ? JSON.stringify(this.request.data) : this.request.data,
            data,
            method: this.request.type || this.request.method,
            contentType: this.request.config.contentType,
          });
        return REQUEST;
      }
    },
    // 请求接口参数
    requestParams() {
      return this.request.data;
    },
    // 现有的表格配置项
    tableConf() {
      return Object.assign(this.defaultConf, this.config);
    },
    // 当前表格调用形式，1：传递columns属性 2.传递slot
    mode() {
      let mode = 2;
      if (this.columns && this.columns.length > 0) mode = 1;
      return mode;
    },
    // 过滤表格列所需字段
    filterColumns() {
      return this.columns.map(item=> {
        const resultItem = {}, includeKeys = ['alwaysShow', 'label', 'prop', 'hidden', 'type'];
        includeKeys.forEach(key=> {
          if(Object.prototype.hasOwnProperty.call(item, key)) {
            resultItem[key] = item[key];
          }
        })
        return resultItem;
      })
    }
  },

  created() {
    let randomId = parseInt(Math.random() * 1000000 + "");
    this.randomId = "table" + randomId;
  },
  mounted() {
    if (this.tableConf.firstAutoRequest) {
      // if (this.requestConf.url) {
      this.makeTable();
      // }
    }
    if (!this.tableConf.filterable && this.columns && this.columns.length) {
      this.showColumnsTemp = cloneDeep(this.columns);
    }
  },
  methods: {
    handleEmitter(a, b) {
      console.log(a,b);
    },
    // 本地分页
    pageLocal() {
      // 数组切割起始、中止点
      const startPos = (this.curPage - 1) * this.pageSize,
        endPos = this.curPage * this.pageSize;
      this.tableDataShow = this.tableData.slice(startPos, endPos);
    },
    makeTable() {
      this.showLoading();
      this.fetchData();
      this.doLayout();
    },

    fetchData() {
      let params = cloneDeep(this.requestParams);
      // 当启用分页，每次请求携带分页参数
      if (this.tableConf.pagination && this.tableConf.paginationMode === 1) {
        Object.assign(params, {
          pageNumber: this.curPage,
          pageSize: this.pageSize,
        });
      }
      
      this.requestMethod(params)
        .then((res) => {
          this.requestRes = res;
          let responseData = cloneDeep(res);
          
          this.setTableData(responseData);

          this.isFirstLoad = false;
          this.hideLoading();
        })
        .catch(() => {
          this.isFirstLoad = false;
          this.hideLoading();
        });
      // .finally(() => {
      //     this.isFirstLoad = false;
      //     this.hideLoading();
      // });
    },
    // 给tableData赋值
    setTableData(res) {
      if (this.request.formatData && typeof this.request.formatData === 'function') {
        this.tableData = res ? this.request.formatData(res) : [];
      }
      if (this.tableConf.pagination) {
        if (this.request.getTotalNum && typeof this.request.getTotalNum === 'function') {
          this.total = res ? this.request.getTotalNum(res) : 0;
        }
        // 本地分页
        if (this.tableConf.paginationMode === 2) {
          this.pageLocal();
        }
      }

      this.$nextTick(() => {
        if (this.tableConf.done && typeof this.tableConf.done === "function") {
          this.tableConf.done();
        }
      });
    },

    showLoading() {
      this.tableLoading = true;
    },
    hideLoading() {
      this.tableLoading = false;
    },
    // 直接给tableData赋值方法，提供给组件外部调用
    forceSetTableData(arr) {
      this.tableData = arr;
      this.total = arr.length;
    },
    // 选中行触发
    handleSelectionChange(selection) {
      this.$emit("selection-change", selection);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.curPage = 1;
      // this.$emit('size-change', size);
      // 本地分页
      if (this.tableConf.paginationMode === 2) {
        this.pageLocal();
      } else {
        this.makeTable();
      }
    },
    handleCurrentChange() {
      // 本地分页
      if (this.tableConf.paginationMode === 2) {
        this.pageLocal();
      } else {
        this.makeTable();
      }
    },
    select(selection, row) {
      this.$emit("select", selection, row);
    },
    selectAll(selection) {
      this.$emit("select-all", selection);
    },
    getSelection() {
      return this.$refs[this.randomId].selection;
    },
    // 处理有分页的情况下表格的max-height
    handleMaxHeight(height) {
      if (!height) {
        return undefined;
      }
      if (
        this.tableConf.pagination &&
        height &&
        typeof height === "string" &&
        height.indexOf("%") < 0
      ) {
        let tmp = height.replace("px", "");
        return Number(tmp) - 62 + "px";
      } else {
        return height;
      }
    },

    // 暴露给父级组件的根据传入参数自动勾选接口，需要开启selection功能
    setSelectNodes(nodes) {
      this.toggleRowSelection(nodes, true);
    },
    // 暴露给父级组件的根据传入参数自动取消勾选接口，需要开启selection功能
    setSelectNodesCancel(nodes, callback) {
      this.toggleRowSelection(nodes, false, callback);
    },

    // 暴露给父组件的清空用户选中项接口
    setClearSelection() {
      this.$refs[this.randomId].clearSelection();
    },

    // 勾选
    toggleRowSelection(arr, sta, callback) {
      if (arr) {
        let tableRef = this.$refs[this.randomId];
        if (this.tempTime) {
          clearTimeout(this.tempTime);
        }
        if (tableRef.data.length) {
          arr.forEach((row) => {
            tableRef.data.forEach((item) => {
              if (item.id === row.id) {
                tableRef.toggleRowSelection(item, sta);
              }
            });
          });
          if (callback) {
            callback();
          }
        } else {
          this.tempTime = setTimeout(() => {
            this.toggleRowSelection(arr, sta, callback);
          }, 100);
        }
      }
    },
    // 获取res的数据
    getRequestResult() {
      return this.requestRes;
    },
    // 重新布局table
    doLayout() {
      this.$refs[this.randomId].doLayout();
    },

    handleFilterConfirm(data) {
      if (!data || !data.length) return;
      this.showColumnsTemp = [];
      this.$nextTick(() => {
        const showColumns = data.filter((item) => !item.hidden);
        showColumns.forEach(a=> {
          this.columns.forEach(b=> {
            if(a.label === b.label) {
              this.showColumnsTemp.push(b)
            }
          })
        })
      });
    },
  },
  watch: {
    // request改变，触发数据刷新
    requestConf: {
      handler() {
        this.isFirstLoad = true;
        this.curPage = 1;
        this.makeTable();
      },
      deep: true,
    },
    columns: {
      handler(val) {
        if (!this.tableConf.filterable && val && val.length) {
          this.showColumnsTemp = cloneDeep(val);
        }
      },
    },
    "config.maxHeight": {
      handler(val) {
        if (val) {
          this.tableConf.maxHeight = this.handleMaxHeight(val);
        }
      },
      deep: true,
    },
    curPage() {
      if (!this.isFirstLoad) {
        this.handleCurrentChange();
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  height: 100%;
}
.table-container .table-wrapper {
  background: #fff;
  height: calc(100% - 52px);
}
.table-container .table-wrapper .handle-div {
  text-align: right;
  padding: 20px 20px 20px;
}
.table-container
  .table-wrapper
  .table-instance
  >>> .el-table__header-wrapper
  .el-table__header
  thead
  tr
  th {
  background-color: #f5f7fa;
}
.table-container .table-wrapper .table-instance .el-button--mini {
  padding: 6px 8px;
}
.table-container .table-wrapper .table-instance .el-button + .el-button {
  margin-left: 3px;
  margin-top: 3px;
}

.table-container .table-pg {
  padding: 10px 10px 10px 0;
  text-align: right;
  background-color: #fff;
}
</style>
