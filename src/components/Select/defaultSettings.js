const defaultEl = {
    attrs: {
        clearable: true,
        multiple: false,
        collapseTags: true,
    },
    // events: {
    //     change: (value)=> {
    //         console.log('122', value)
    //     }
    // }
}

const defaultConfig = {
    // 初始化自动请求数据
    autoRequest: true,
    // 必须有参数才调接口请求数据
    remoteParamsNullable: true,
    // 默认填充的第一项数据
    firstItem: null,
    // 选中值为对象时，是否自动更新默认值数据
    updateDefaultValue: true,
    // 选项参数
    optionAttrs: {
        label: "label",
        value: "id",
        disabled: false
    }
}

export { defaultEl, defaultConfig }