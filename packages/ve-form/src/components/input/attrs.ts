export const inputAttrs: Record<string, Record<string, any>> = {
    prop: {
        type: String,
        default: ''
    },
    placeHolder: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    clearable: {
        type: Boolean,
        default: false
    },
    formatter: {
        type: Function,
        default: null
    },
    parse: {
        type: Function,
        default: null
    },
    type: {
        type: String,
        default: ''
    },
    suffixIcon: {
        type: String,
        default: ''
    },
    prefixIcon: {
        type: String,
        default: ''
    },
    rows: {
        type: Number,
        default: 0
    },
    autoSize: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: ''
    },
    maxlength: {
        type: Number,
        default: 0
    },
    showWordLimit: {
        type: Boolean,
        default: false
    },
    showPassword: {
        type: Boolean,
        default: false
    }
}