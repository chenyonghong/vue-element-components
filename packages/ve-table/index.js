import VeTable from "./src/index.vue";
VeTable.install = function (Vue) {
  Vue.component(VeTable.name, VeTable);
};

export default VeTable;
