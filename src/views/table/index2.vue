<template>
  <div style="height: 100%">
    <section class="search-section" style="overflow: auto">
      <el-col :md="5" style="display: flex">
        <label style="min-width: 80px;line-height: 40px">项目编号</label>
        <el-input v-model="searchForm.projectCode"></el-input>
      </el-col>
      <el-col :md="5" :offset="1" style="display: flex">
        <label style="min-width: 80px;line-height: 40px">项目名称</label>
        <el-input v-model="searchForm.projectName"></el-input>
      </el-col>
      <el-col :md="5" :offset="1" style="display: flex">
        <label style="min-width: 80px;line-height: 40px">项目经理</label>
        <el-input v-model="searchForm.projectManager"></el-input>
      </el-col>
      <el-col :md="5" :offset="1" style="display: flex">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button type="default" @click="handleReset">重置</el-button>
      </el-col>
    </section>
    <ve-table
      ref="testTable"
      :config="tableConfig"
      :request-conf="requestConf"
      :columns="tableColumns"
      :el="el"
      style="height: calc(100% - 40px)"
      @selection-change="selectionChange"
    >
      <template #handler>
        <el-button type="primary" @click="handleEdit()">新增</el-button>
      </template>
    </ve-table>
  </div>
</template>

<script>
import VeTable from "@/components/Table/index.vue";
import {
  fetchTableList,
  fetchProjectAdd,
  fetchProjectUpdate,
  fetchProjectDelete,
} from "@/api/test";
import BusFactory from "@/components/Table/eventBus";

export default {
  components: {
    VeTable,
  },
  data() {
    return {
      searchForm: {
        projectCode: "",
        projectName: "",
        projectManager: "",
      },
      tableConfig: {
        tableName: "testTable",
        firstAutoRequest: true,
        filterable: true,
      },
      el: {
        attrs: {
          border: true
        },
        events: {
            'selection-change': this.selectionChange,
            'select-all': this.selectAll
          }
      },
      requestConf: {
        func: fetchTableList,
        data: {},
        formatData: (res) => {
          return res.data.records;
        },
        getTotalNum: (res) => {
          return res.data.pager.total;
        },
      },
      tableColumns: [
        {
            type: "selection",
            alwaysShow: true,
            width: "50",
            selectable: (row) => {
                return row.id !== 1 && row.id !== 2;
            },
            fixed: "left"
        },
        {
          type: "index",
          label: "序号",
          width: "50",
          alwaysShow: true,
        },
        {
          prop: "projectCode",
          label: "项目编号",
          width: "120",
        },
        {
          prop: "projectName",
          label: "项目名称",
          minWidth: "130",
        },
        {
          prop: "projectAddress",
          label: "项目地址",
          width: "200",
          formatter: (a, b, c) => {
            return c ? c.replaceAll(" ", ">") : "";
          },
        },
        {
          prop: "projectManager",
          label: "项目经理",
          width: "100",
        },
        {
          prop: "createTime",
          label: "项目创建时间",
          width: "160",
          formatter: (a, b, c) => {
            return c
              ? c
                  .replace("T", " ")
                  .replace("Z", "")
                  .replace(".000", "")
              : "";
          },
        },
        {
          prop: "endTime",
          label: "项目结束时间",
          width: "160",
          formatter: (a, b, c) => {
            return c
              ? c
                  .replace("T", " ")
                  .replace("Z", "")
                  .replace(".000", "")
              : "";
          },
        },
        {
          prop: "remark",
          minWidth: "200",
          ["show-overflow-tooltip"]: true,
          label: "描述",
        },
        {
          label: "操作",
          width: "160",
          fixed: "right",
          alwaysShow: true,
          renderHeader: this.renderOpHeader,
          template: `<div>
                        <el-button size="mini" type="primary" @click="handleClick('edit')" :disabled="scope.id===1||scope.id===2">修改</el-button>
                        <el-button size="mini" type="danger" @click="handleClick('delete')" :disabled="scope.id===1||scope.id===2">删除</el-button>
                    </div>`,
        },
      ],
    };
  },
  methods: {
    selectAll(data) {
      console.log(data)
    },
    selectionChange(data) {
      console.log(data);
    },
    handleEdit(data) {
      if (data) {
        data.projectName = `修改的项目${parseInt(Math.random() * 10000)}`;
        fetchProjectUpdate(data).then(({ code }) => {
          if (code === 200) this.$refs.testTable.makeTable();
        });
      } else {
        const newProjectData = {
          projectCode: `PM${parseInt(Math.random() * 10000)}`,
          projectName: `新项目${parseInt(Math.random() * 10000)}`,
          projectManager: "陈七",
        };
        fetchProjectAdd(newProjectData).then(({ code }) => {
          if (code === 200) this.$refs.testTable.makeTable();
        });
      }
    },
    handleDelete(id) {
      fetchProjectDelete({ id }).then(({ code }) => {
        if (code === 200) this.$refs.testTable.makeTable();
      });
    },
    handleSearch() {
      this.requestConf.data = { ...this.searchForm };
    },
    handleReset() {
      Object.getOwnPropertyNames(this.searchForm).forEach((key) => {
        this.searchForm[key] = "";
      });
    },
    renderOpHeader(h, { column }) {
      return h("div", [
        h("span", column.label),
        h("i", { class: "el-icon-platform-eleme" }),
      ]);
    },
  },
  created() {
    BusFactory(this).$on("editClick", (data, index) => {
      console.log(data, index);
    });
    BusFactory(this).$on("deleteClick", (data, index) => {
      console.log(data, index);
    });
  },
};
</script>

<style></style>
