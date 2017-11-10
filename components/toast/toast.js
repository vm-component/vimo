/**
 * @component Toast
 * @description
 *
 * ## 弹出层 / Toast提示组件
 *
 * Toast是移动端比较灵活的通知组件, 可以用它来处理反馈信息或者展示系统消息. Toast组件可以出现在内容的上面/下面/中间, 可以定时关闭, 也可以手动点击Toast的关闭按钮, 形式较为灵活.
 *
 * ### 还有
 *
 * Toast组件本身并不是单例对象, 但是调用指纹都为`Toast('Toast Bottom Only String')`, 因此可能会问:
 * 如何程序关闭toast呢? 目前, 关闭Toast只有三个方法:
 *
 * 1. duration 过期时间
 * 2. showCloseButton 关闭按钮
 * 3. 当上面两个都设置了, 则只执行第二个配置
 * 4. `let toast = Toast('Toast Bottom Only String')`返回toast实例, 执行`toast.dismiss()`执行关闭
 *
 * 因此使用Toast需要知道这一点.
 *
 *
 * ### 此外
 *
 * - 在Toast的传入参数中定义`onDismiss`回调函数, 可以在Toast关闭及动画结束后可以进行一些操作.
 * - `dismissOnPageChange`表示如果路由切换自动关闭Toast, 这个属性默认值为`false`.
 *
 * ### 实例化Toast的方法
 *
 * #### 1. 只传入Message
 *
 *
 *```
 Toast('Bottom was added successfully')
 *```
 *
 * #### 2. 传入Message和Duration
 *
 *```
 Toast('Bottom was added successfully',1000)
 *```
 *
 * #### 3. 传入Options对象
 *
 *```
 Toast({
    message: 'Bottom was added successfully',
    duration: 3000,
    position: 'bottom',
    dismissOnPageChange: true,
    onDismiss () {
      console.debug('2 onDismiss in promise success!')
    }
 })
 Toast({
    message: 'Top with Button was added successfully',
    duration: 3000, // 这个不生效
    position: 'top',
    showCloseButton: true,
    closeButtonText: '好的',
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
 Toast.present('Bottom was added successfully',1000)
 *```
 *
 * @props {string} message - Toast显示的message, 如果文本过程则折行并自动撑开容器
 * @props {number} [duration=3000] - Toast开启时间, 过期后关闭
 * @props {string} [position="bottom"] - Toast开启放置的位置. 可以是: "top", "middle", "bottom".
 * @props {string} [cssClass] - 额外的样式定义, 多个样式使用空格隔开
 * @props {boolean} [showCloseButton=false] - 是否显示关闭按钮
 * @props {string} [closeButtonText='Close'] - 关闭按钮的文字, 这里默认是Close
 * @props {boolean} [dismissOnPageChange=false] - 当导航切换时, 是否自动关闭, 默认不关闭
 * @props {string} [mode='ios'] - 模式
 * @props {string} [onDismiss=noop] - 当关闭动画结束时执行的函数
 * @props {string} [type=''] - (支付宝/DingTalk) toast 类型，展示相应图标，类型可选值： success / fail
 *
 * @demo #/toast
 */

import Vue from 'vue'
import { isObject, isString } from '../util/util'
import ToastComponent from './toast.vue'
import getInsertPosition from '../util/getInsertPosition'

const Toast = Vue.extend(ToastComponent)

/**
 * 创建ToastInstance, 并且根据传参指纹构建对象
 * @param {any} arguments - 传入参数
 * @private
 * */
function ToastFactory () {
  let _args = Array.prototype.slice.call(arguments)
  let propsData = {}

  // get el position
  let el = getInsertPosition('toastPortal').appendChild(document.createElement('div'))

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

  let h5Toast = new Toast({el, propsData: propsData})
  return {
    present () {
      return new Promise(resolve => {
        let isHandled =
          !propsData.isH5 &&
          window.VM &&
          window.VM.platform &&
          window.VM.platform.showToast &&
          window.VM.platform.showToast(propsData)
        if (isHandled) {
          resolve()
        } else {
          console.debug('Toast:present 组件使用H5模式!')
          h5Toast.present().then(() => {
            resolve()
          })
        }
      })
    },
    dismiss () {
      return new Promise(resolve => {
        window.VM &&
        window.VM.platform &&
        window.VM.platform.hideToast &&
        window.VM.platform.hideToast()
        h5Toast.dismiss().then(() => {
          resolve()
        })
      })
    }
  }
}

/**
 * 对外的Toast构建部分
 * @function present
 * @description 打开Toast
 * @param {object} args - 传入参数
 * @param {string} args.message - The message for the toast. Long strings will wrap and the toast container will
 *   expand.
 * @param {number} [args.duration=3000] - How many milliseconds to wait before hiding the toast.
 * @param {string} [args.position="bottom"] - The position of the toast on the screen. Accepted values: "top",
 *   "middle", "bottom".
 * @param {string} [args.cssClass] - Additional classes for custom styles, separated by spaces.
 * @param {boolean} [args.showCloseButton=false] - Whether or not to show a button to close the toast.
 * @param {string} [args.closeButtonText='Close'] - Text to display in the close button.
 * @param {boolean} [args.dismissOnPageChange=false] - Whether to dismiss the toast when navigating to a new page or
 *   nav back.
 * @return {ToastInstance} 返回Toast的实例
 * @private
 * */
function _toast (...args) {
  let _instance = ToastFactory(...args)
  // 自动开启
  _instance.present()
  return _instance
}

_toast.present = _toast
export default _toast
