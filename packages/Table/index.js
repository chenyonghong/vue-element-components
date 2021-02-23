import table from './src';
// import Vue from "vue";
// import { Button, Dialog, Table, TableColumn, Pagination, Loading } from "element-ui";
// Vue.use(Button)
// Vue.use(Dialog)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Pagination)
// Vue.use(Loading)
table.install = function (Vue) {
    Vue.component(table.name, table)
}

export default table