/**
 * @component ToastState
 * @description
 *
 * ## 弹出层 / ToastState状态提示组件
 *
 * 相比于Toast只能传递文本, ToastState顾名思义, 他还能传递Toast状态, 这里支持的状态由四类:
 *
 * - success
 * - fail
 * - offline
 * - loading
 *
 * 其中, success, fail, offline为Icon提示, loading使用的Spinner组件进行提示, 并且可以根据props定义设置Spinner状态.
 *
 *```
 ToastState.present('Bottom was added successfully')
 *```
 *
 * #### 2. 传入Message和Duration
 *
 *```
 ToastState.present('Bottom was added successfully',1000)
 *```
 *
 * #### 3. 传入Options对象
 *
 *```
 ToastState.present({
    message: '只是文本',
    duration: 3000,
    dismissOnPageChange: true,
    onDismiss () {
      console.debug('2 onDismiss in promise success!')
    }
 })
 ToastState.present({
    message: '请稍后',
    duration: 3000,
    type: 'loading',
    spinner: {
      name:'ios'
    },
    cssClass: 'showCloseBtnToastCssClass',
    dismissOnPageChange: true,
    onDismiss () {
      console.debug('5 onDismiss in promise success!')
    }
 })
 ToastState.present({
    message: '请求成功',
    duration: 3000,
    type: 'success',
    cssClass: 'showCloseBtnToastCssClass',
    dismissOnPageChange: true,
    onDismiss () {
      console.debug('5 onDismiss in promise success!')
    }
 })
 *```
 *
 * #### 4. present方法
 *
 *```
 ToastState.present('Bottom was added successfully',1000)
 *```
 *
 * @props {String} message - Toast显示的message, 如果文本过程则折行并自动撑开容器
 * @props {Number} [duration=3000] - Toast开启时间, 过期后关闭
 * @props {String} [cssClass] - 额外的样式定义, 多个样式使用空格隔开
 * @props {Boolean} [dismissOnPageChange=false] - 当导航切换时, 是否自动关闭, 默认不关闭
 * @props {String} [onDismiss=noop] - 当关闭动画结束时执行的函数
 * @props {Object} [spinner] - Spinner组件的props对象
 * @props {String} [type=''] - toast 类型，展示相应图标，类型可选值： success, fail, offline, loading
 *
 * @demo #/toast-state
 */
import ToastComponent from './toast-state.vue'
import GeneratePopUpInstance from '../../util/GeneratePopUpInstance.js'
import { isObject, isString } from '../../util/type'

class ToastInstance extends GeneratePopUpInstance {
  normalizeOptions () {
    let _args = Array.prototype.slice.call(arguments)
    let propsData = {}

    // get el position
    if (_args.length === 2) {
      propsData = {
        message: _args[0],
        duration: _args[1]
      }
    }

    if (_args.length === 1 && isString(_args[0])) {
      propsData = {
        message: _args[0]
      }
    }

    if (_args.length === 1 && isObject(_args[0])) {
      propsData = _args[0]
    }

    // toast显示不影响scroll滚动
    propsData.scrollControl = false
    return propsData
  }

  isPresentHandled (options) {
    return !options.isH5 &&
      window.VM &&
      window.VM.platform &&
      window.VM.platform.showToast &&
      window.VM.platform.showToast(options)
  }

  isDismissHandled () {
    return window.VM &&
      window.VM.platform &&
      window.VM.platform.hideToast &&
      window.VM.platform.hideToast()
  }
}

function _toast () {
  let _instance = new ToastInstance(ToastComponent, 'toastPortal')
  // 自动开启
  let _args = Array.prototype.slice.call(arguments)
  _instance.present(..._args)
  return _instance
}

_toast.present = _toast

export default _toast
