const formConfig = {
    el: {

    },
    labelWidth: "100px",
    footerWrap: true,
}
// 全局表单项默认统一自适应布局
const fieldLayout = {
    xs: 12,
    md: 10,
    lg: 6,
    xl: 6,
}
const fieldElConfig = {
    input: {
        clearable: true,
    },
    inputNumber: {
        clearable: true,
        tagName: 'el-input-number'
    },
    select: {
        clearable: true,
        style: {
            width: "100%"
        },
    },
    cascader: {
        clearable: true,
        style: {
            width: '100%'
        }
    },
}
export { formConfig, fieldLayout, fieldElConfig }