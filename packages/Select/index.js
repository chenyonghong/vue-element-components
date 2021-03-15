import select from './src';
select.install = function (Vue, options) {
    select.configure =  options[select.name];
    Vue.component(select.name, select)
}

export default select