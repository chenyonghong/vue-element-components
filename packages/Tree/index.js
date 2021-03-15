import tree from './src';
tree.install = function (Vue, options) {
    tree.configure =  options[tree.name];
    Vue.component(tree.name, tree)
}

export default tree