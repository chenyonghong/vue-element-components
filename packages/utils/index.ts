import { log } from "./message";

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
// 字符串首字母大写
function _capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// 根据键名重新构造对象
function _filterObj(obj: Record<string | number, unknown>, mode: 'include'|'exclude' = 'include', ...props: string[]) {
    let ret: Record<string | number, unknown> = {};
    let keys: string[] = [];
    let primitiveKeys: string[] = Reflect.ownKeys(obj) as string[];

    if(mode==='exclude') {
        keys = primitiveKeys;
    }
    for(let key of props) {
        if (!primitiveKeys.includes(key)) {
            log(`${key}不存在对象${obj.toString()}中`)
            continue
        }
        if(mode==='include') {
            keys.push(key)
        } else if(mode === 'exclude') {
            keys = keys.filter(pKey => pKey !== key)
        }
    }
    keys.forEach(key => {
        ret[key as string] = obj[key as string]
    })
    return ret
}

export {
    isArray,
    isNullableArray,
    isNullable,
    _capitalize,
    _filterObj
}