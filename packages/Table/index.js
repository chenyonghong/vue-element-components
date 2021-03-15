import table from './src';
table.install = function (Vue, options) {
    table.configure =  options[table.name];
    Vue.component(table.name, table)
}

export default table