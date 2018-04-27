export { default } from './slide-verification.vue'
/**
 * @component SlideBox
 * @description
 *
 * ## 滑动验证组件 / SlideVerification
 *
 * ### 介绍
 *
 * 这是一个仿照淘宝注册的一个验证组件, 向右滑动到底部意味着用户确认协议可以继续向下进行. 组件一共有以下几种状态, 且状态只能维持其一, 且一下状态的切换由业务自己控制:
 *
 *  - checking
 *  - cancelling
 *  - completing
 *  - failing
 *
 *
 * 下面是组件的全部状态, 同一时间只能保持一个
 *
 * - inactive     // 初始状态
 * - sliding      // 滑动状态
 * - checking     // 正在验证
 * - cancelling   // 释放状态
 * - completing   // 验证通过状态
 * - failing      // 验证失败状态
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { SlideBox } from 'vimo'
 * // 安装
 * Vue.component(SlideBox.name, SlideBox)
 * // 或者
 * export default{
   *   components: {
   *     SlideBox
   *  }
   * }
 * ```
 *
 * ### 如果获取组件实例
 *
 * - 通过ref标记获取
 * - 监听组件的`onSlideEnd`事件, 事件传递组件实例
 *
 *
 * @demo #/slide-box
 * @fires component:SlideBox#onSlideEnd
 * @usage
 *
 * <p>向右滑动进入验证状态, 1s后重置</p>
 * <SlideBox @onSlideEnd="onSlideEndHandler"></SlideBox>
 *
 * methods: {
   *    // 向右滑动进入验证状态, 4s后重置
   *    onSlideEndHandler (ins) {
   *      ins.checking()
   *      setTimeout(() => {
   *        ins.cancel()
   *      }, 1000)
   *    },
   *  }
 *
 * */
