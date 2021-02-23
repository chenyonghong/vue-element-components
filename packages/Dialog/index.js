import dialog from './src';
// import Vue from "vue";
// import { Button, Dialog } from "element-ui";
// Vue.use(Button)
// Vue.use(Dialog)
dialog.install = function (Vue) {
    Vue.component(dialog.name, dialog)
}

export default dialog