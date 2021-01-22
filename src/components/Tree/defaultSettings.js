const defaultEl = {
    nodeKey: "id",
    parentKey: "pid",
    showCheckbox: true, // 是否显示复选框
    checkOnClickNode: true, // 是否在点击节点时选中该节点（多选模式）
    checkStrictly: true, // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
    expandOnClickNode: false, // 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
    draggable: false,
    defaultCheckedKeys: [],
    defaultExpandedKeys: [], // 默认展开的节点的 key 的数组
    props: {
        children: "children",
        label: "label",
        isLeaf: "isLeaf",
        disabled: "disabled",
    },
}
const defaultConfig = {
    filter: true, // 是否显示搜索框
    allExpand: true, // 是否显示“全部展开/收起”
    showCheckAll: false, // 是否显示全选按钮（多选模式生效）
    showCheckedNum: true, // 是否显示选择数量（多选模式生效）
    subNodeNumber: {
        show: false,
        onlySon: false,
    }, // 子节点数量显示及关联
    filterWithChildNodes: true, // 搜索过滤节点时，是否显示匹配节点的子节点
    remoteFunc: null, // 数据接口函数
    remoteFormat: null, // 接口数据格式化函数
    remoteParams: {}, // 数据接口参数
    makeTreeFunc: null, // 树形数据格式化函数
    sort: '', // 自定义排序,默认空字符不排序，'asc'升序 'desc'降序
    sortKey: '', // 排序字段
    renderBefore: null, // 渲染前自定义函数
    renderAfter: null, // 渲染完成后函数
}

export { defaultEl, defaultConfig }