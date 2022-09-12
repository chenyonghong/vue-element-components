// 判断具体类型
function _typeof(content: any): string {
    return Object.prototype.toString.call(content).slice(8, -1).toLowerCase();
}

// 判断是否是数组
function isArray(ret: any): boolean {
    return Array.isArray(ret);
}

// 判断是否空数组
function isNullableArray(ret: any): boolean {
    return isArray(ret) && ret.length > 0;
}

// 判断是否空对象
function isNullable(content: any): boolean {
    let ret: boolean = false;
    const type = _typeof(content);
    switch (type) {
        case 'string':
            ret = content === ''
            break;
        case 'undefined':
            ret = true;
            break;
        case 'object':
            ret = Object.keys(content).length === 0;
            break;
        case 'array':
            ret = content.length === 0;
            break;
        case 'boolean':
            ret = !content;
            break;
        case 'null':
            ret = true;
            break;
        default:
            break;
    }
    return ret;
}

export {
    isArray,
    isNullableArray,
    isNullable
}