
<script>
// import Vue from "vue";
// import { fieldElConfig } from "../defaultSettings";
import { isPlainObject, cloneDeep, assignDeep } from "@/utils/utils";

export default {
  name: "fieldRender",
  props: ["params", "defaultValue"],
  data() {
    return {
      value: "",
    };
  },
  watch: {
    defaultValue: {
      deep: true,
      immediate: true,
      handler(val) {
        // console.log(this.params.key, val);
        this.value = val;
      },
    },
  },
  created() {
    this.value = this.defaultValue;
  },
  methods: {
    generateNodes(h) {
      let slots = [],
        config = this.params;
      // 自定义列slot
      if (this.$slots.default) {
        slots = slots.concat(this.$slots.default);
      }

      if (!config.options) {
        if (config.el.innerHTML) {
          slots.push(config.el.innerHTML());
        }
        return slots;
      }
      // 选项slot
      config.options.forEach((option, index) => {
        let { labelKey, valueKey } = { labelKey: "label", valueKey: "value" };
        if (config.props) {
          labelKey = config.props.label;
          valueKey = config.props.value;
        }
        let value = option[valueKey],
          label = option[labelKey];

        let VNode;
        let params = {
            key: config.key + "-" + index,
            el: {
              label: value,
              disabled: option.disabled,
              border: option.border,
            },
          },
          optionValue = "";
        switch (config.type) {
          case "select":
            params.type = "option";
            params.el.label = label;
            optionValue = config.useFullData ? option : value;
            break;
          case "radio":
            params.type = "radio";
            optionValue = this.value;
            if (!config.el.innerHTML) {
              config.el.innerHTML = (data) => data[labelKey];
            }
            break;
          case "radio-group":
            params.type = "radio";
            if (!config.el.innerHTML) {
              config.el.innerHTML = (data) => data[labelKey];
            }
            break;
          case "checkbox":
            params.type = "checkbox";
            optionValue = this.value;
            if (!config.el.innerHTML) {
              config.el.innerHTML = (data) => data[labelKey];
            }
            break;
          case "checkbox-group":
            params.type = "checkbox";
            if (!config.el.innerHTML) {
              config.el.innerHTML = (data) => data[labelKey];
            }
            break;
          // case "upload":
          //   if (!config.el.innerHTML) {
          //     config.el.innerHTML = (data) => data[labelKey];
          //   }
          //   break;
        }
        VNode = h(
          "field-render",
          {
            props: {
              params,
              defaultValue: optionValue,
            },
          },
          config.el.innerHTML ? config.el.innerHTML(option) : []
        );
        slots.push(VNode);
      });
      return slots;
    },
    getTagName(params) {
      return params.el.tagName || `el-${params.type}`;
    },
    getDomConfig(config) {
      if (
        ["radio", "checkbox"].includes(this.params.type) &&
        this.params.el.tagName
      ) {
        const _this = this;
        config = {
          on: {
            // 接收子元素的回调参数
            change(e) {
              _this.$emit("change", e.target._value);
            },
          },
        };
      }

      return config;
    },
  },
  render(h) {
    let params = this.params;
    let slot = this.generateNodes(h);

    // 改写事件，将选中数据值提交给外层表单组件
    if (!params.el.events) params.el.events = {};

    // 如有自定义change事件，先执行
    const customEventChange = cloneDeep(params.el.events.change),
      eventChange = (value) => {
        console.log("change-event", value);
        customEventChange && customEventChange(value);
        this.$emit("change", value);
      };
    params.el.events.change = eventChange;

    // input事件改变值的表单域类型
    const inputType = [
      "radio",
      "radio-group",
      "checkbox",
      "checkbox-group",
      "input",
      "time-picker",
      "date-picker",
    ];
    if (inputType.indexOf(params.type) > -1) {
      // input 事件更新输入框值
      const customEventInput = cloneDeep(params.el.events.input),
        eventInput = (value) => {
          console.log("input-value-change", value);
          customEventInput && customEventInput(value);
          this.$emit("change", value);
        };
      params.el.events.input = eventInput;
    }

    // 设置默认样式
    const defaultStyle = {
      width: "100%",
    };
    let style = {};
    // 将自定义的字符串style转成对象
    if (params.el && isPlainObject(params.el.style)) {
      style = assignDeep(defaultStyle, params.el.style);
    }

    const domProps = cloneDeep(params.el);
    delete domProps.events;
    delete domProps.nativeEvents;
    delete domProps.style;
    delete domProps.slot;
    // console.log(domProps)
    let domConfig = {};
    domConfig = this.getDomConfig({
      // domProps,
      // props: { ...domProps, value: this.value },
      props: { value: this.value },
      attrs: domProps,
      style,
      on: params.el.events,

      // nativeEvents: params.nativeEvents,
      // directives: [{}],
    });
    if (params.type === "cascader") console.log(slot);
    return h(this.getTagName(params), domConfig, slot);
  },
};
</script>
