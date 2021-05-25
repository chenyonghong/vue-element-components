
// import Settings from "pkgs/defaultSettings";

// 表格拓展默认配置
const defaultConfig = {
    tableName: "",
    pagination: true,
    paginationMode: 1,
    done: "",
    firstAutoRequest: false,
    filterable: false,
}

// 默认的element-table参数
const defaultEl = {
    attrs: {
        stripe: true,
        border: true,
        height: "calc(100% - 82px)",
        maxHeight: 800,
        rowKey: "id",
    },
    events: {
        'selection-change': () => { console.log('abc') },
    }
}
// 默认分页配置
const defaultPagination = {
    'page-sizes': [10, 20, 30, 50],
    'page-size': 10,
    'page-count': 7,
    layout: 'total, sizes, prev, pager, next, jumper',
    background: true
}

export { defaultConfig, defaultEl, defaultPagination }