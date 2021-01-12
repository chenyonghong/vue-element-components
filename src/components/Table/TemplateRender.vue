<script>
import Vue from "vue";
import { cloneDeep } from "./utils";

export default {
  props: {
    html: {
      type: String,
      default: "",
    },
    scope: Object,
    // 表格行 下标
    index: {
      type: Number,
      default: 0,
    },
  },
  render(h) {
    let scope = this.scope,
      index = this.index;
    const com = Vue.extend({
      data() {
        return {
          scope: scope,
        };
      },
      methods: {
        handleClick(keyword) {
          this.Bus.$emit(keyword + "Click", cloneDeep(scope), index);
        },
      },
      template: this.html,
    });
    return h(com, {}, this.html);
  },
};
</script>
