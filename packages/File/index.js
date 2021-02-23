import file from './src/upload';
file.install = function (Vue) {
    Vue.component(file.name, file)
}

export default file