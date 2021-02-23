import layout from './src/SplitPane';
layout.install = function (Vue) {
    Vue.component(layout.name, layout)
}

export default layout