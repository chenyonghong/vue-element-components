<template>
  <el-dialog
    v-bind="Object.assign({}, defaultAttr, attr)"
    :visible.sync="show"
    v-on="$listeners"
  >
    <template slot="title">
      <slot name="header">
        <span class="el-dialog__title">{{
          attr ? attr.title : "" || defaultAttr.title
        }}</span>
      </slot>
    </template>
    <slot></slot>
    <div
      v-if="showFooter"
      slot="footer"
      class="dialog-footer"
      :align="footer.align ? footer.align : 'right'"
    >
      <slot name="footer">
        <el-button type="info" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </slot>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "VeDialog",
  props: {
    visible: Boolean, // 传入的显示弹框标识
    footer: Object, // 底部配置
    confirmFunc: Function, // 确认函数
    attr: Object,
  },
  data() {
    return {
      show: false,
      defaultAttr: {
        title: "弹窗标题",
        width: "500px",
        closeOnClickModal: false,
      },
    };
  },
  computed: {
    showFooter() {
      return (
        (typeof this.footer === "boolean" && this.footer) ||
        (typeof this.footer === "object" && this.footer.show)
      );
    },
  },
  methods: {
    // 默认确认按钮回调
    confirm() {
      if (this.confirmFunc) {
        if (!this.confirmFunc()) return;
        this.show = false;
      }
      this.$emit("confirm");
    },
    // 取消按钮关闭弹框
    cancel() {
      this.show = false;
    },
  },

  watch: {
    visible(val) {
      this.show = val;
    },
    show(val) {
      this.$emit("update:visible", val);
    },
  },
};
</script>

<style scoped>
.el-dialog >>> .el-dialog__body {
  padding: 20px;
}
</style>
