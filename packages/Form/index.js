import form from './src';
form.install = function (Vue, options) {
    form.configure =  options[form.name];
    Vue.component(form.name, form)
}

export default form