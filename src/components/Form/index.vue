<!--
 * @Descripttion: VeForm
 * @Author: WingHong
 * @version: 1.0.0
 * @Date: 2020-09-28 14:52:12
 * @LastEditors: WingHong
 * @LastEditTime: 2020-12-08 14:56:48
-->
<template>
  <el-form ref="elForm" v-bind="formConfig" :model="model" class="ve-form">
    <template v-for="(item, index) in fields">
      <slot :name="'prefix-' + item.key"></slot>
      <el-col :key="index" v-bind="Object.assign({}, fieldLayout, item.layout)">
        <el-form-item
          :label="item.label"
          :prop="item.key"
          :label-width="item.labelWidth"
          :required="item.slot && item.required"
          :show-message="item.slot && item.showMessage"
          :class="item.class"
        >
          <span v-if="item.label" slot="label">
            <slot :name="'label-' + item.key">
              <span v-if="item.requiredStar" class="rap-star"> * </span>
              {{ item.label }}
            </slot>
          </span>

          <template v-if="item.slot">
            <slot :name="item.key" :formData="model" />
          </template>

          <template v-else>
            <!-- 文本输入框 -->
            <!-- <el-input
              v-if="['input', 'textarea', 'password'].indexOf(item.type) !== -1"
              v-model="model[item.key]"
              v-bind="item.el"
              v-on="
                typeof item.event === 'function'
                  ? item.event(model)
                  : item.event
              "
            />
            <el-input-number
              v-if="item.type === 'inputNumber'"
              v-model="model[item.key]"
              v-bind="item.el"
              v-on="item.event"
            />
            <el-select
              v-if="item.type === 'select'"
              v-model="model[item.key]"
              v-bind="item.el"
              clearable
              style="width: 100%"
              v-on="item.event"
              @focus="$emit(`on_${item.key}_focus`, $event)"
            >
              <el-option
                v-for="(optionItem, optionIndex) in item['fieldOptions']"
                :key="optionIndex"
                :label="
                  optionItem[
                    item.props && item.props.label ? item.props.label : 'label'
                  ]
                "
                :value="
                  item.useFullData
                    ? optionItem
                    : optionItem[
                        item.props && item.props.value
                          ? item.props.value
                          : 'value'
                      ]
                "
                :disabled="optionItem.disabled"
              />
            </el-select>
            <el-date-picker
              v-if="item.type === 'date-picker'"
              v-model="model[item.key]"
              :type="item.dateType"
              v-bind="item.el"
              clearable
              style="width: 100%"
              v-on="item.event"
            /> -->
            <field-render
              :default-value="model[item.key]"
              :params="assignDeep({}, getFieldParams(item))"
              @change="handleValueChange($event, item)"
            >
            </field-render>
            <template>
              <slot :name="item.key + '-suffix'" />
            </template>
          </template>
        </el-form-item>
      </el-col>
      <br v-if="item.br" :key="'br' + index" style="clear: both" />
    </template>

    <div style="clear: both" v-if="formConfig.footerWrap"></div>
    <div v-if="formConfig.footer" class="form-footer">
      <el-button
        v-if="formConfig.footer.confirm"
        type="primary"
        @click="handleSubmit"
      >
        确定
      </el-button>
      <el-button
        v-if="formConfig.footer.search"
        type="primary"
        @click="handleSubmit"
      >
        查询
      </el-button>
      <el-button
        v-if="formConfig.footer.cancel"
        type="default"
        @click="handleCancel"
      >
        取消
      </el-button>
      <el-button
        v-if="formConfig.footer.reset"
        type="default"
        @click="handleReset"
      >
        重置
      </el-button>
    </div>
    <slot v-else name="form-footer"></slot>
  </el-form>
</template>

<script>
import fieldRender from "./components/fieldRender";
import {
  formConfig as defaultFormConf,
  fieldLayout as globalFieldLayout,
  fieldElConfig as globalFieldEl,
} from "./defaultSettings";
import { assignDeep, cloneDeep } from "../utils";

// 需要包裹一层div(或其他标签)的el元素类型
const wrapDivEl = {
  radio: {
    tagName: "div",
  },
  checkbox: {
    tagName: "div",
  },
};
export default {
  name: "VeForm",
  components: {
    fieldRender,
  },
  props: {
    config: Object,
    model: Object, // 表单model
    fields: Array, // 表单项数据列表
  },
  data() {
    return {
      assignDeep,
      inited: false, // 是否已经初始化完成
      initModel: {}, // 初始化表单值
    };
  },
  computed: {
    formConfig() {
      return this.assignDeep({}, defaultFormConf, this.config);
    },
    elForm() {
      return this.$refs.elForm;
    },
    fieldLayout() {
      return Object.assign({}, globalFieldLayout, this.formConfig.fieldLayout);
    },
  },
  /**
   * @descripttion: 监听prop里面的model已完成表单model的初始化
   * @param {type}
   * @return {type} void
   */
  watch: {
    model: {
      handler(newVal) {
        if (!this.inited) {
          this.initModel = { ...newVal };
          this.inited = true;
        }
      },
      deep: true,
      immediate: true,
    },
    // fields: {
    //   deep: true,
    //   immediate: true,
    //   handler() {
    //     console.log("fields change!");
    //   },
    // },
  },
  methods: {
    getFieldParams(params) {
      let p = cloneDeep(params);
      p.el = assignDeep(
        globalFieldEl[p.type],
        wrapDivEl[p.type] || {},
        p.el || {}
      );
      return p;
    },
    handleValueChange(data, fieldItem) {
      console.log("form wrapper value change");
      console.log(data, fieldItem.key, this.model);
      this.model[fieldItem.key] = data;
    },
    handleSubmit() {
      const submit = () => {
        this.$emit("submit", this.model);
      };
      if (this.formConfig.rules) {
        this.$refs.elForm.validate((isValid) => {
          if (isValid) {
            submit();
          }
        });
      } else {
        submit();
      }
    },
    /**
     * @descripttion: 取消按钮点击事件
     * @param {type}
     * @return {type} void
     */
    handleCancel() {
      this.$router.back();
    },
    /**
     * @descripttion: 重置按钮点击事件
     * @param {type}
     * @return {type} void
     */
    handleReset() {
      this.$emit("update:model", { ...this.initModel });
    },
  },
};
</script>

<style scoped>
.ve-form .rap-star {
  color: #ff4949;
  margin-right: 4px;
}
.ve-form >>> .el-form-item__label {
  color: #333333;
}
.ve-form .form-footer {
  text-align: center;
}
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .el-col {
    min-height: 63.95px;
  }
  .form-footer {
    margin-bottom: 20px;
  }
  .ve-form >>> .form-footer {
    margin-bottom: 20px;
  }
}
</style>
