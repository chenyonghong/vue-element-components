//utils/index.js
// 是否手机号隐藏显示
export const handleTelReg = (tel: string, ishow: boolean) => {
    let reg = /(\d{3})\d{4}(\d{4})/;
    if (ishow) {
        return tel
    } else {
        return tel.replace(reg, '$1****$2');
    }
}

// 数字千位显示123456=》123,456
export const formatNumber = (value: string) => {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';

    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }

    if (num) {
        result = num + result;
    }

    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

// 杨辉三角
export const YangHuiSanJiao = (value: number) => {
    if(value < 1) return [];
    let ret = new Array();
    ret.push([1]);
    let i = 1;
    while(i < value) {
        const prev: number[] = ret[i-1];
        let current: number[] = [];
        let last: number = prev.reduce((p: number,c: number)=> {
            current.push(p+c);
            return c;
        }, 0)
        current.push(last);
        ret.push(current);
        i++;
    }
    return ret;
}
