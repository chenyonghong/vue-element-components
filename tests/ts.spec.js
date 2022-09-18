
import { formatNumber, handleTelReg, YangHuiSanJiao } from '/@/utils/test'
import { isNullable, _filterObj } from "/@/utils/index";

// test('格式化数字99999显示为99,999', () => {
//     expect(formatNumber('99999')).toBe('99,999');
// });
// test('手机号隐藏显示为157****2026', () => {
//     expect(handleTelReg('15755592026', false)).toBe('157****2026');
// });

// test('{}是否为空对象', ()=> {
//     expect(isNullable({})).toBe(true)
// })

// test('杨辉三角输出：', ()=> {
//     expect(YangHuiSanJiao(5)).toEqual([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]])
// })

test('过滤对象属性：', () => {
    expect(_filterObj({ a: 1, b: 2, c: 3}, 'exclude', 'a', 'c')).toEqual({b:2})
})
