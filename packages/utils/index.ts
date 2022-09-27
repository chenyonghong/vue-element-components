import { log } from "./message";

// 判断具体类型
function _typeof(content: any): string {
    return Object.prototype.toString.call(content).slice(8, -1).toLowerCase();
}

const isPlainObject = obj => {
    return _typeof(obj) === 'object'
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
/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 * @param {Map} map 用于存储循环引用对象的地址
 */

function deepClone(obj: Record<string, any> = {}, map = new Map()) {
    if (typeof obj !== "object") {
        return obj;
    }
    if (map.get(obj)) {
        return map.get(obj);
    }

    let result: Record<string, any> = {};
    // 初始化返回结果
    if (
        obj instanceof Array ||
        // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
        Object.prototype.toString.call(obj) === "[object Array]"
    ) {
        result = [];
    }
    // 防止循环引用
    map.set(obj, result);
    for (const key in obj) {
        // 保证 key 不是原型属性
        if (obj.hasOwnProperty(key)) {
            // 递归调用
            result[key] = deepClone(obj[key], map);
        }
    }
    // 返回结果
    return result;
}
function assignDeep(target: any, ...extraData: any[]) {
    const args = deepClone(Array.from(extraData));
    if (!args.length) return target;
    let result = target;
    args.forEach(item => {
        if (isPlainObject(item)) {
            if (!isPlainObject(result)) result = {}
            for (let key in item) {
                if (result[key] && (isPlainObject(item[key]) || item[key] instanceof Array)) {
                    result[key] = assignDeep(result[key], item[key])
                } else {
                    result[key] = item[key]
                }
            }
        }
        else if (item instanceof Array) {
            if (!(result instanceof Array)) result = []
            item.forEach((arrItem, arrIndex) => {
                if (isPlainObject(arrItem)) {
                    result[arrIndex] = assignDeep(result[arrIndex])
                } else {
                    result[arrIndex] = arrItem
                }
            })
        }
    })
    return result;
}

export {
    isArray,
    isNullableArray,
    isNullable,
    _capitalize,
    _filterObj,
    deepClone,
    assignDeep
}