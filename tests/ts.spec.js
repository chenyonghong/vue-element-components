
import { formatNumber, handleTelReg } from '/@/utils/test'
import { isNullable } from "/@/utils/index";

test('格式化数字99999显示为99,999', () => {
    expect(formatNumber('99999')).toBe('99,999');
});
test('手机号隐藏显示为157****2026', () => {
    expect(handleTelReg('15755592026', false)).toBe('157****2026');
});

test('{}是否为空对象', ()=> {
    expect(isNullable({})).toBe(true)
})

