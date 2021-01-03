<!--
 * @Descripttion: $1
 * @Author: WingHong
 * @version: 1.0.0
 * @Date: 2020-09-28 14:52:12
 * @LastEditors: WingHong
 * @LastEditTime: 2020-12-08 14:56:48
-->

<template>
    <el-form v-bind="formOptions" :model="formModel" class="base-form">
        <template v-for="(item, index) in fieldList">
            <slot :name="'prefix-' + item.key"></slot>
            <el-col
                :key="index"
                v-bind="Object.assign({}, fieldDefaultLayout, item.layout)"
            >
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
                            <span v-if="item.requiredStar" class="rap-star">
                                *
                            </span>
                            {{ item.label }}
                        </slot>
                    </span>

                    <template v-if="item.slot">
                        <slot :name="item.key" :scope="formModel" />
                    </template>

                    <template v-else>
                        <!-- 文本输入框 -->
                        <el-input
                            v-if="
                                ['input', 'textarea', 'password'].indexOf(
                                    item.type
                                ) !== -1
                            "
                            v-model="formModel[item.key]"
                            v-bind="item.tagAttr"
                            clearable
                            v-on="
                                typeof item.event === 'function'
                                    ? item.event(formModel)
                                    : item.event
                            "
                        />
                        <!-- 计数器 -->
                        <el-input-number
                            v-if="item.type === 'inputNumber'"
                            v-model="formModel[item.key]"
                            v-bind="item.tagAttr"
                            clearable
                            v-on="item.event"
                        />
                        <!-- 选择框 -->
                        <el-select
                            v-if="item.type === 'select'"
                            v-model="formModel[item.key]"
                            v-bind="item.tagAttr"
                            clearable
                            style="width: 100%"
                            v-on="item.event"
                            @focus="$emit(`on_${item.key}_focus`, $event)"
                        >
                            <el-option
                                v-for="(optionItem,
                                optionIndex) in fieldOptions[item.optionKey]"
                                :key="optionIndex"
                                :label="
                                    optionItem[
                                        item.props && item.props.label
                                            ? item.props.label
                                            : 'label'
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
                        <!-- 选择框 -->
                        <el-select-tree
                            v-if="item.type === 'selectTree'"
                            v-model="formModel[item.key]"
                            :data="fieldOptions[item.optionKey]"
                            v-bind="item.tagAttr"
                            clearable
                            style="width: 100%"
                            v-on="item.event"
                        />
                        <!-- 日期选择框 -->
                        <el-date-picker
                            v-if="item.type === 'date'"
                            v-model="formModel[item.key]"
                            :type="item.dateType"
                            v-bind="item.tagAttr"
                            clearable
                            style="width: 100%"
                            v-on="item.event"
                        />
                        <!-- 信息展示框 -->
                        <el-tag
                            v-if="item.type === 'tag'"
                            v-bind="item.tagAttr"
                        >
                            {{ data[item.key] }}
                        </el-tag>
                    </template>
                </el-form-item>
            </el-col>
            <br v-if="item.br" :key="'br' + index" style="clear: both" />
        </template>

        <div style="clear: both" v-if="formOptions.footerWrap"></div>
        <div v-if="formOptions.footer" class="form-footer">
            <el-button
                v-if="formOptions.footer.confirm"
                type="primary"
                @click="handleSubmit"
            >
                确定
            </el-button>
            <el-button
                v-if="formOptions.footer.search"
                type="primary"
                @click="handleSubmit"
            >
                查询
            </el-button>
            <el-button
                v-if="formOptions.footer.cancel"
                type="default"
                @click="handleCancel"
            >
                取消
            </el-button>
            <el-button
                v-if="formOptions.footer.reset"
                type="default"
                @click="handleReset"
            >
                重置
            </el-button>
        </div>
        <slot v-else name="buttons"></slot>
    </el-form>
</template>

<script>
export default {
    name: "BaseForm",
    props: {
        formOptions: {
            type: Object,
            default: {
                ref: "ref",
                labelWidth: "100px",
                footerWrap: true
            }
        },
        formModel: Object, // 表单model
        fieldList: Array, // 表单项数据列表
        fieldOptions: Object,
        // 表单项默认统一自适应布局
        fieldDefaultLayout: {
            type: Object,
            default: () => {
                return {
                    xs: 12,
                    md: 10,
                    lg: 6,
                    xl: 6
                };
            }
        }
    },
    data() {
        return {
            inited: false, // 是否已经初始化完成
            initModel: {} // 是否已经初始化完成
        };
    },
    methods: {
        handleSubmit() {
            const submit = () => {
                this.$emit("submit", this.formModel);
            };
            if (this.formOptions.rules) {
                this.$refs[this.formOptions.ref].validate(isValid => {
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
            this.$emit("update:formModel", { ...this.initModel });
        }
    },

    /**
     * @descripttion: 监听prop里面的model已完成表单model的初始化
     * @param {type}
     * @return {type} void
     */
    watch: {
        formModel: {
            handler(newVal) {
                if (!this.inited) {
                    this.initModel = { ...newVal };
                    this.inited = true;
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>

<style lang="scss" scoped>
.base-form {
    .rap-star {
        color: #ff4949;
        margin-right: 4px;
    }
    ::v-dee .el-form-item__label {
        color: #333333;
    }
    .form-footer {
        text-align: center;
    }
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        .el-col {
            min-height: 63.95px;
        }
        .form-footer {
            margin-bottom: 20px;
        }
        ::v-deep .form-footer {
            margin-bottom: 20px;
        }
    }
}
</style>
