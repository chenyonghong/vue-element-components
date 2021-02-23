/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 *        佛曰:
 *                写字楼里写字间，写字间里程序员；
 *                程序人员写程序，又拿程序换酒钱。
 *                酒醒只在网上坐，酒醉还来网下眠；
 *                酒醉酒醒日复日，网上网下年复年。
 *                但愿老死电脑间，不愿鞠躬老板前；
 *                奔驰宝马贵者趣，公交自行程序员。
 *                别人笑我忒疯癫，我笑自己命太贱；
 *                不见满街漂亮妹，哪个归得程序员？
 */
/*
 * @version: v 1.0.0
 * @Github: https://github.com/GitHubGanKai
 * @Author: GitHubGanKai
 * @Date: 2020-04-03 16:45:31
 * @LastEditors: gankai
 * @LastEditTime: 2020-04-03 18:43:34
 * @FilePath: /utils/VueEventEmitter.js
 */
import Vue$ from 'vue'
let Vue = Vue$
if (typeof window !== 'undefined' && window.Vue) {
  Vue = window.Vue
}

// 记录所有的事件类型与事件函数
const EventStore = {}
const Bus = new Vue()

// 移除所有事件的方法
const destroyHandler = function() {
  // this 为调用此方法的vue组件
  const currentEventObj = EventStore[this._uid]
  if (typeof currentEventObj === 'undefined') {
    return
  }
  for (const type in currentEventObj) {
    const key = Array.isArray(type) ? type.join(',') : type
    // Bus 解绑事件
    Bus.$off(type, currentEventObj[key])
  }
  // 删除记录的事件集合
  delete EventStore[this._uid]
}

const BusFactory = vm => {
  // 当前调用组件的 destroyed 钩子
  const destroyed = vm.$options.destroyed
  // 当前组件的唯一标示(vue生成的自增ID)
  const uid = vm._uid
  // 初始化当前组件的事件集合对象
  EventStore[uid] = {}
  // 为当前组件挂载destroyed钩子
  !destroyed.includes(destroyHandler) && destroyed.push(destroyHandler)

  return {
    $on: (type, handler) => {
      const key = Array.isArray(type) ? type.join(',') : type
      EventStore[uid][key] = handler
      Bus.$on(type, handler)
    },
    $off: (type, handler) => {
      // $off() 时 type 为空，移除所有事件
      if (!type) {
        // 删除该uid下事件集合
        delete EventStore[uid]
        Bus.$off()
        return
      }
      const key = Array.isArray(type) ? type.join(',') : type
      // 删除对应的事件
      delete EventStore[uid][key]
      Bus.$off(type, handler)
    },
    $once: (...params) => Bus.$once(...params),
    $emit: (...params) => Bus.$emit(...params)
  }
}

BusFactory.$emit = (...params) => Bus.$emit(...params)
BusFactory.$once = (...params) => Bus.$once(...params)

// Vue.mixin({
//   data(){
//     return {
//       Bus: BusFactory(this)
//     }
//   }
// })
export default BusFactory
