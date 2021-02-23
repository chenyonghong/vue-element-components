<template>
  <el-dialog
    title="列表配置"
    :visible.sync="dialogVisible"
    class="table-header-filter-dialog"
    width="500px"
    append-to-body
    @open="open"
    @close="resetDialogTable"
  >
    <el-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      style="margin-left: 14px"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <el-table
      ref="headerFilterTable"
      :data="columnsList"
      row-key="label"
      :show-header="false"
      :row-class-name="tableRowClassName"
      @selection-change="handleCheckedCitiesChange"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column property="label" label width="200"></el-table-column>
      <el-table-column property="op" label>
        <template>
          <div style="text-align: right; font-size: 20px">
            <i class="el-icon-rank" style="cursor: pointer"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-link
        type="primary"
        style="margin-right: 20px"
        @click="setDefaultColumns"
      >
        恢复默认设置
      </el-link>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Sortable from "sortablejs";
import { cloneDeep } from "@/utils/utils";

export default {
  props: {
    visible: Boolean,
    defaultColumns: Array,
    tableName: String,
  },
  data() {
    return {
      dialogVisible: false,
      checkAll: false,
      isIndeterminate: true,
      columnsList: [],
      sortable: false,
    };
  },
  computed: {
    // 表名唯一标识
    pageType() {
      return this.tableName ? this.tableName : this.$route.path;
    },
  },
  created() {
    // 创建完成即开始请求数据，因为表格父组件需要使用服务器配置数据
    this.init();
  },
  methods: {
    init() {
      this.setColumns();
    },
    async setColumns() {
      // 从服务器/本地缓存读取 cloumns信息
      let columnsList = await this.getData();
      if (columnsList) {
        this.columnsList = columnsList;
        this.$emit("confirm", cloneDeep(columnsList));
      } else {
        this.setDefaultColumnsCore();
      }
    },
    // 弹框打开时再去勾选默认数据
    open() {
      this.checkDefault();
    },
    // 数据加载完成后勾选回显
    checkDefault() {
      const selection = this.columnsList.filter((item) => !item.hidden);

      this.$nextTick(() => {
        // 选中缓存已勾选项
        let headerTableRef = this.$refs.headerFilterTable;
        selection.forEach((row) => {
          headerTableRef.toggleRowSelection(row, true);
        });
        this.rowDrop();
      });
    },
    // 获取初始数据
    getData() {
      return new Promise((resolve) => {
        // 读取远程服务器数据
        // let params = {
        //     pageType: this.pageType,
        //     userId: this.user.userId
        // };
        // tableHeaderQuery(params)
        //     .then(data => {
        //         if (data && data.headers) {
        //             resolve(JSON.parse(data.headers));
        //         } else {
        //             resolve(false);
        //         }
        //     })
        //     .catch(e => {
        //         resolve(false);
        //     });

        // 读取本地数据
        let columnsCopy = this.defaultColumns;
        const localSto = localStorage.getItem(this.pageType);
        if(localSto) columnsCopy = JSON.parse(localSto);
        // columnsCopy[2].hidden = true;
        resolve(columnsCopy);
      });
    },
    tableRowClassName(data) {
      if (data.row.alwaysShow) {
        return "hidden-row";
      }
      return "";
    },
    // 全选
    handleCheckAllChange(val) {
      this.columnsList.forEach((tableDataRow) => {
        this.$refs.headerFilterTable.toggleRowSelection(tableDataRow, val);
      });
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.columnsList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.columnsList.length;
    },
    // 恢复默认设置
    setDefaultColumns() {
      const flag = this.setDefaultColumnsCore();
      if (flag) {
        this.$emit("confirm", cloneDeep(this.columnsList));
        this.dialogVisible = false;
        this.$message.success("恢复成功！");
      }
    },
    async setDefaultColumnsCore() {
      // this.columnsList = _.cloneDeep(this.defaultColumns).filter((item: ITableColumn) => !item.alwaysShow);
      this.columnsList = cloneDeep(this.defaultColumns);
      const result = await this.saveColumnsConf(this.defaultColumns);
      return result;
    },
    // 确认保存
    async confirm() {
      let tableRef = this.$refs.headerFilterTable,
        tableData = tableRef.tableData,
        selection = tableRef.selection,
        result = tableData
          .map((item1) => {
            if (!item1.alwaysShow) {
              item1.hidden = true;
            }
            return item1;
          })
          .map((item1) => {
            if (!item1.alwaysShow) {
              selection.forEach((item2) => {
                if (!item2.alwaysShow && item2.label === item1.label) {
                  item1.hidden = false;
                }
              });
            }
            return item1;
          });
      // 保存
      const flag = await this.saveColumnsConf(result);
      if (flag) {
        this.$emit("confirm", result);
        this.dialogVisible = false;
      }
    },
    // 保存列表配置信息到远程或本地
    saveColumnsConf(value) {
      console.log(value);
      return new Promise((resolve) => {
        // 保存远程服务器
        // let params = {
        //     pageType: this.pageType,
        //     userId: this.user.userId,
        //     headers: value
        // };
        // tableHeaderSave(params).then(data => {
        //     resolve(true);
        // });

        // 保存在浏览器缓存
        localStorage.setItem(this.pageType, this.stringify(value));
        resolve(true);
      });
    },
    // 将函数也格式化成字符串
    stringify(dataJSON) {
      // return JSON.stringify(dataJSON,function(key, val) {
      //   return (typeof val === 'function') ? '' + val : val;
      // });
      return JSON.stringify(dataJSON);
    },
    resetDialogTable() {
      this.isIndeterminate = true;
    },
    rowDrop() {
      const tbody = document.querySelector(
          ".el-dialog__body .el-table__body-wrapper tbody"
        ),
        _this = this;
      if (tbody === null) return;
      this.sortable = new Sortable(tbody, {
        onUpdate: function(e) {
          let arr = _this.columnsList;
          arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]); // 数据处理
        },
        animation: 150,
      });
    },
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("update:visible", val);
    },
  },
};
</script>

<style scoped>
.table-header-filter-dialog >>> .el-dialog__body .el-table .hidden-row {
  display: none;
}
</style>
