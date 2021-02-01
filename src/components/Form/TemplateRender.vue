<script>
// import Vue from "vue";
// import { cloneDeep } from "./utils";
// import BusFactory from "./eventBus";
import { Fragment } from "vue-fragment";

export default {
  props: {
    html: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const com = {
      components: { Fragment },
      template: this.html,
    };
    console.log("context: ", context);
    return h(com);
  },
};
</script>
