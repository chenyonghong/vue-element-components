import form from './src';
form.install = function (Vue) {
    Vue.component(form.name, form)
}

export default form