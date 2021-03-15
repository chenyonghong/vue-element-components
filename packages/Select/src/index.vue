<template>
  <!-- <el-select
    v-bind="element.attrs"
    @change="handleSelect"
    @visible-change="handleVisibleChange"
  > -->
  <el-select v-bind="element.attrs" v-on="element.events">
    <slot :scope="dataList">
      <el-option
        v-for="(item, index) in dataList"
        :key="index"
        :label="item[veConf.optionAttrs.label]"
        :value="element.attrs.valueKey ? item : item[veConf.optionAttrs.value]"
      >
      </el-option>
    </slot>
  </el-select>
</template>
<script>
import { defaultEl, defaultConfig } from "./defaultSettings";
import { assignDeep, cloneDeep } from "@/utils/utils";
export default {
  name: "VeSelect",
  props: {
    el: Object, // el-select 参数
    config: Object, // 自定义VeSelect扩展参数
    remoteFunc: Function, // 远程接口函数
    remoteParams: [Object, Number], // 远程接口参数
    remoteFormat: Function, // 远程数据格式化函数
  },
  computed: {
    element() {
      const userDefault = this.$options.configure ? this.$options.configure.el || {} : {};
      const ele = assignDeep({}, defaultEl, userDefault, this.el);
      if (!ele.events) ele.events = {};
      // 如有自定义change事件，先执行handleSelect方法再执行自定义事件
      const customEventChange = cloneDeep(ele.events.change),
        eventChange = (value) => {
          this.handleSelect(value);
          customEventChange && customEventChange(value);
        };
      ele.events.change = eventChange;
      // 如有自定义visible-change事件，先执行handleSelect方法再执行自定义事件
      const customEventVisibleChange = cloneDeep(ele.events.visibleChange),
        eventVisibleChange = (value) => {
          this.handleVisibleChange(value);
          customEventVisibleChange || customEventVisibleChange(value);
        };
      ele.events.visibleChange = eventVisibleChange;
    //   console.log(ele)
      return ele;
    },
    veConf() {
      const userDefault = this.$options.configure ? this.$options.configure.config || {} : {};
      return assignDeep({}, defaultConfig, userDefault, this.config);
    },
  },
  data() {
    return {
      dataList: [],
    };
  },

  mounted() {
    if (this.veConf.autoRequest) {
      this.fetchData();
    }
  },
  methods: {
    // 请求接口数据
    fetchData() {
      if (this.remoteFunc && typeof this.remoteFunc === "function") {
        this.dataList = [];
        this.remoteFunc(this.remoteParams)
          .then((data) => {
            // 是否需要格式化数据
            if (this.remoteFormat && typeof this.remoteFormat === "function") {
              this.dataList = this.remoteFormat(data);
            } else {
              this.dataList = data;
            }
            // 处理默认选中时，触发select change将整个选中项对象返回
            if (
              this.veConf.updateDefaultValue &&
              this.element.attrs.valueKey &&
              this.element.attrs.value
            ) {
              const matchArr = this.dataList.filter(
                (item) =>
                  item[this.element.attrs.valueKey] ===
                  this.element.attrs.value[this.element.attrs.valueKey]
              );
              if (matchArr.length === 1) {
                this.handleSelect(matchArr[0]);
              }
            }
            // 添加默认首项
            if (this.veConf.firstItem) {
              this.dataList.unshift(this.veConf.firstItem);
            }
          })
          .catch(() => {
            if (this.veConf.firstItem) {
              this.dataList.unshift(this.veConf.firstItem);
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
        if (!this.veConf.remoteParamsNullable && !this.remoteParams) {
          return;
        }
        this.fetchData();
      }
    },
  },
  watch: {
    // 参数改变时重新请求数据
    remoteParams: {
      deep: true,
      handler(value) {
        if (!this.veConf.remoteParamsNullable && !value) {
          return;
        }
        this.fetchData();
      },
    },
  },
};
</script>
