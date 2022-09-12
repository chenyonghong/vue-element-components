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
