import actionSheetComponent from './action-sheet.vue'
import GeneratePopUpInstance from '../../util/GeneratePopUpInstance.js'


/**
 * @function present
 * @description
 * 开启ActionSheet组件, 当开启动画过度完毕时触发 `Promise` 的 `resolve` 。
 * @param {object} options - 传入参数
 * @param {String} [options.title]                        - ActionSheet的标题
 * @param {string} [options.subTitle]                     - ActionSheet的副标题
 * @param {string} [options.cssClass]                     - 自定义样式
 * @param {Boolean} [options.enableBackdropDismiss=true]  - 允许点击backdrop关闭actionsheet
 * @param {Boolean} [options.dismissOnPageChange=true]    - 路由切换关闭组件
 * @param {string} [options.mode=ios]                     - 样式模式
 * @param {string} [options.isH5=false]                   - 强制使用H5组件
 * @param {Array} [options.buttons]                       - button数组，包含全部role
 * @param {Array} options.buttons.text                    - button显示文本
 * @param {Array} options.buttons.icon                    - button显示的icon的name, 具体参考Icon组件
 * @param {Array} options.buttons.role                    - 可以是cancel(关闭)/destructive(警告/删除)/null
 * @param {Array} options.buttons.handler                 - 默认是关闭组件
 * @param {Array} options.buttons.cssClass                - 自定义样式
 * @return {Promise}
 * */

/**
 * @function dismiss
 * @description
 * 关闭ActionSheet组件, 当关闭动画过度完毕时触发 `Promise` 的 `resolve` 。
 * @return {Promise}
 * */

class ActionSheetInstance extends GeneratePopUpInstance {
  // isPresentHandled (options) {
  //   return !options.isH5 &&
  //     window.VM &&
  //     window.VM.platform &&
  //     window.VM.platform.actionSheet &&
  //     window.VM.platform.actionSheet(options)
  // }
}

export default new ActionSheetInstance(actionSheetComponent, 'sheetPortal')
