import select from './src';
select.install = function (Vue) {
    Vue.component(select.name, select)
}

export default select