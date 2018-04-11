/**
 * 开启
 * @desc
 * 如果上一个实例是开启状态, 则自动关闭后开启新的
 * @param {object} options - 传入参数
 * @return {Promise} - 开启动画结束的promise
 * @private
 * */
/**
 * 关闭
 * @return {Promise} - 关闭动画结束的promise
 * @private
 * */
import PopoverComponent from './popover.vue'
import GeneratePopUpInstance from '../../util/GeneratePopUpInstance.js'

class PopoverInstance extends GeneratePopUpInstance {
  normalizeOptions (options) {
    options.recordInHistory = false
    return options
  }
}

export default new PopoverInstance(PopoverComponent, 'modalPortal')
/**
 * @component Popover
 * @description
 *
 * ## 弹出层组件 / Popover提示框组件
 *
 * ### 简介
 *
 * 这个组件适用于对组件中某部分进行弹出提示, 比如:
 *
 * - 单词点击弹出翻译
 * - 点击按钮弹出可选择的操作(和Fab有点类似, 但是Popover可自定义程度高, 但是显示内容建议小于Modal组件)
 *
 * ### 传入模板的弹出层组件
 *
 * Popover的实现和Modal组件相似, 都需要传入`*.vue`模板文件, 具体事例参考usage
 *
 *
 * ### 子组件如何获取数据
 *
 * 在组件中使用: `this.$options.$data` 获取传入data. 例如Usage中的示例, 子组件获取data中的contentEle数据这样操作:
 *
 * ```
 * this.contentEle = this.$options.$data.contentEle
 * ```
 *
 *
 * @usage
 * import { Popover, List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo'
 * import TextTool from './textTool.vue'
 * export default{
   *  methods: {
   *    openSetting ($event) {
   *      Popover.present({
   *        ev: $event,                           // 事件
   *        component: TextTool,                  // 传入组件
   *        data: {
   *          contentEle: this.$refs.content.$el  // 传入数据, 内部通过`this.$options.$data`获取这个data
   *        }
   *      })
   *    },
   *    specialText ($event, text) {
   *      Popover.present({
   *        ev: $event,
   *        component: `<p style="padding:0 14px;" text-center>You choose the word of <strong>${text}</strong>.</p>`
   *      })
   *    }
   *  },
   *  components: {Popover, List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider}
   * }
 *
 * @props {String} cssClass - 额外的样式
 * @props {mode} [mode='ios'] - 模式
 * @props {Boolean} [showBackdrop=true] - 是否显示backdrop
 * @props {Boolean} [enableBackdropDismiss=true] - 点击backdrop是否能关闭组件
 * @props {Boolean} [dismissOnPageChange=true] - 页面切换是否关闭组件, 默认关闭
 * @props {Function} [onDismiss] - 完全关闭时的回调
 *
 * @props {Object|String|Function|Promise} component - popover内部显示的vue组件, 是一个*.vue文件; 如果是String的话则为html字符串; 支持异步
 * @props {Object} data - 传给popover内部显示的vue组件的数据, 内部组件通过`this.$options.$data`获取
 * @props {Object|MouseEvent} ev - 点击元素的事件, $event, 这个值的传入可以计算popover放置的位置
 *
 * @demo #/popover
 * */
