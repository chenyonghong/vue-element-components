import dialog from './Dialog'
import table from './Table'
// import file from './File'
import form from './Form'
// import layout from './Layout'
import select from './Select'
import tree from './Tree'
import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);

const components = [
    dialog,
    table,
    // file,
    form,
    // layout,
    select,
    tree
]

const install = function (Vue, options) {
    components.forEach(component => {
        component.configure =  options[component.name];
        Vue.component(component.name, component);
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    install,
    dialog,
    table,
    // file,
    form,
    // layout,
    select,
    tree
}