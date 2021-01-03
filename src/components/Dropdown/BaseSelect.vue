<template>
    <el-select
        v-bind="elAttrs"
        @change="handleSelect"
        @visible-change="handleVisibleChange"
    >
        <el-option
            v-for="(item, index) in dataList"
            :key="index"
            :label="item[itemProp.label]"
            :value="elAttrs.valueKey ? item : item[itemProp.value]"
        >
        </el-option>
    </el-select>
</template>
<script>
export default {
    props: {
        ElSelectAttrs: Object, // el-select 参数
        itemProp: {
            type: Object,
            default: () => {
                return {
                    label: "label",
                    value: "id"
                };
            }
        },
        remoteFunc: Function, // 远程接口函数
        remoteParams: [Object, Number], // 远程接口参数
        remoteFormat: Function, // 远程数据格式化函数
        // 初始化自动请求数据
        autoRequest: {
            type: Boolean,
            default: true
        },
        // 必须有参数才调接口请求数据
        remoteParamsNullable: {
            type: Boolean,
            default: true
        },
        // 默认填充的第一项数据
        firstItem: Object,
        // 选中值为对象时，是否自动更新默认值数据
        updateDefaultValue: Boolean
    },
    computed: {
        elAttrs() {
            return Object.assign({}, this.defaultElAttrs, this.ElSelectAttrs)
        }
    },
    data() {
        return {
            // 默认的 el-select 配置
            defaultElAttrs: {
                clearable: true,
                multiple: false,
                collapseTags: true
            },
            dataList: []
        };
    },

    mounted() {
        if (this.autoRequest) {
            this.fetchData();
        }
    },
    methods: {
        // 请求接口数据
        fetchData() {
            if (this.remoteFunc && typeof this.remoteFunc === "function") {
                this.dataList = [];
                this.remoteFunc(this.remoteParams)
                    .then(data => {
                        // 是否需要格式化数据
                        if (
                            this.remoteFormat &&
                            typeof this.remoteFormat === "function"
                        ) {
                            this.dataList = this.remoteFormat(data);
                        } else {
                            this.dataList = data;
                        }
                        // 处理默认选中时，触发select change将整个选中项对象返回
                        if (this.updateDefaultValue && this.elAttrs.valueKey && this.elAttrs.value) {
                            const matchArr = this.dataList.filter(
                                item =>
                                    item[this.elAttrs.valueKey] ===
                                    this.elAttrs.value[this.elAttrs.valueKey]
                            );
                            if (matchArr.length === 1) {
                                this.handleSelect(matchArr[0]);
                            }
                        }
                        // 添加默认首项
                        if (this.firstItem) {
                            this.dataList.unshift(this.firstItem);
                        }
                    })
                    .catch(() => {
                        if (this.firstItem) {
                            this.dataList.unshift(this.firstItem);
                        }
                    });
                // .finally(()=> {
                //     if(this.firstItem) {
                //         this.dataList.unshift(this.firstItem)
                //     }
                // })
            }
        },
        // 处理点击选择事件
        handleSelect(value) {
            this.$emit("change", value);
        },
        // 处理默认请求数据失败时，再次尝试获取数据
        handleVisibleChange(value) {
            if (value && this.dataList.length === 0) {
                if (!this.remoteParamsNullable && !this.remoteParams) {
                    return;
                }
                this.fetchData();
            }
        }
    },
    watch: {
        // 参数改变时重新请求数据
        remoteParams: {
            deep: true,
            handler(value) {
                if (!this.remoteParamsNullable && !value) {
                    return;
                }
                this.fetchData();
            }
        }
    }
};
</script>
<style lang="scss" scoped></style>
