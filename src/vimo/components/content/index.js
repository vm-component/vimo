/**
 * @name Content组件
 * @module Components/Content
 * @description
 *
 * 页面基础布局分为Header/Content/Footer, 而Content组件则是中间业务内容的位置,
 * Content内容为可滚动内容, 当然, 设置slot=fixed可以固定在页面, 详细请参考下方API.
 * 需要注意的是, 一个页面(Page)中只能有一个Content组件, 切记.
 *
 * 对于内容超出页面高度的情况, 将使用css的特性: "overflow-y:scorll; -webkit-overflow-scrolling: touch;"处理, 如果需要的滚动更为顺畅, 请使用Scroll组件, 它是iScroll的包装.
 *
 * 此外, 设置slot="pullToRefresh"可以引入Refresher组件.
 *
 *
 *
 *
 *
 * @property {Boolean=} fullscreen - 是否全屏显示的控制, 如果为true, 则content的上下将延伸到Header和Footer的下面
 * @property {String=} mode - 样式模式
 *
 * @example
 * // returns 2
 * globalNS.method1(5, 10);
 * @example
 * // returns 3
 * globalNS.method(5, 15);
 * @example

 * // returns 3
 * globalNS.method(5, 15);

 * @returns {Number} Returns the value of x for the equation.
 *
 * @listens onChange - 监听onChange事件, 事件有$eventBus传递, 参数为:
 *
 *
 *
 * @see {@link foo} for further information.
 * @see {@link http://github.com|GitHub}
 *
 *
 * */
import Content from './content.vue';
module.exports = Content;
