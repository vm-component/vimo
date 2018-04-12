export { default } from './img.vue'
/**
 * @component Img
 * @description
 *
 * ## 其他 / Img图片加载组件
 *
 * ### 介绍
 *
 * Img组件, 用于实现Img按需加载的功能. 当滚动到将要显示的位置的时候再加载图片
 *
 * ### 注意
 *
 * - Img组件**只能在Content组件**中使用!
 * - 当滚动到确定位置后, img未下载完但又滚动到别处, 这样的请求也会被中断
 * - 当图片加载完毕, 滚动超过阈值则隐藏不显示, 这样做是为了降低内存使用
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Img } from 'vimo'
 * // 安装
 * Vue.component(Img.name, Img)
 * // 或者
 * export default{
   *   components: {
   *    Img
   *  }
   * }
 * ```
 *
 * @props {String} [alt='image']         - 图片的alt属性
 * @props {(Number|String)} [height=0]   - 图片的高度
 * @props {String} src                   - 图片的src地址
 * @props {(Number|String)} [width=0]    - 图片的宽度
 *
 * @demo #/img
 * @usage
 * <Img width="100%" height="200" src="static/1.jpg">
 *
 * */
