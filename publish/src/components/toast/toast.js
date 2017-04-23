/**
 * @module Component/Toast
 * @description
 *
 * Toast是移动端比较灵活的通知组件, 可以用它来处理反馈信息或者展示系统消息.
 * Toast组件可以出现在内容的上面/下面/中间, 可以定时关闭, 也可以手动点击Toast的关闭按钮, 形式较为灵活.
 *
 * Toast组件本身并不是单例对象, 但是调用指纹都为`this.$toast('Toast Bottom Only String')`, 因此可能会问:
 * 如何程序关闭toast呢? 目前, 关闭Toast只有三个方法,
 *
 * 1. duration 过期时间
 * 2. showCloseButton 关闭按钮
 * 3. 当上面两个都设置了, 则只执行第二个配置
 * 4. `let toast = this.$toast('Toast Bottom Only String')`返回toast实例, 执行`toast.dismiss()`执行关闭
 *
 * 因此使用Toast需要知道这一点.
 *
 * 此外, 在Toast的传入参数中定义`onDismiss`回调函数, 可以在Toast关闭及动画结束后可以进行一些操作.
 * `dismissOnPageChange`表示如果路由切换自动关闭Toast, 这个属性默认值为`false`.
 *
 * ### 实例化Toast的方法
 *
 * #### 1. 只传入Message
 *
 *
 *```
 this.$toast('Bottom was added successfully')
 *```
 *
 * #### 2. 传入Message和Duration
 *
 *```
 this.$toast('Bottom was added successfully',1000)
 *```
 *
 * #### 3. 传入Options对象
 *
 *```
 this.$toast({
    message: 'Bottom was added successfully',
    duration: 3000,
    position: 'bottom',
    dismissOnPageChange: true,
    onDismiss () {
      console.debug('2 onDismiss in promise success!')
    }
 })

 this.$toast({
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
 *
 * #### 4. Options对象
 *
 * @property {string} message - The message for the toast. Long strings will wrap and the toast container will expand.
 * @property {number} [duration=3000] - How many milliseconds to wait before hiding the toast.
 * @property {string} [position="bottom"] - The position of the toast on the screen. Accepted values: "top", "middle", "bottom".
 * @property {string} [cssClass] - Additional classes for custom styles, separated by spaces.
 * @property {boolean} [showCloseButton=false] - Whether or not to show a button to close the toast.
 * @property {string} [closeButtonText='Close'] - Text to display in the close button.
 * @property {boolean} [dismissOnPageChange=false] - Whether to dismiss the toast when navigating to a new page or nav back.
 * @property {string} [mode='ios'] - mode
 * @property {string} [onDismiss=noop] - execute when dismiss animate finished
 */

import Vue from 'vue'
import { isNumber, isString, isObject, isPresent, isFunction } from '../../util/util'
import toastComponent from './toast.vue'
const ToastConstructor = Vue.extend(toastComponent)
const POSITIONS = ['top', 'middle', 'bottom']
const noop = () => {}
const DOM_INSERT_POSITION = 'toastPortal' // 插入的DOM位置
const DOM_INSERT_POSITION_FALLBACK = 'app' // fallback选项

// ---------- functions ----------

class Toast extends ToastConstructor {
  constructor (options) {
    super(options)
    // params
    if (isObject(options)) {
      for (let key in options)  this[key] = options[key]
    }
  }
}

/**
 * @private
 * 创建ToastInstance, 并且根据传参指纹构建对象
 * @param {any} arguments - 传入参数
 * */
function ToastFactory () {
  let _args = Array.from(arguments)
  let el = null
  let _insertPosition = null
  let message = 'This is Message!'
  let duration = 3000
  let position = 'bottom'
  let cssClass = null
  let showCloseButton = false
  let closeButtonText = 'Close'
  let dismissOnPageChange = false
  let onDismiss = noop
  let mode = window.VM && window.VM.config && VM.config.get('mode', 'ios') || 'ios'

  // get el position
  _insertPosition = document.getElementById(DOM_INSERT_POSITION) || document.getElementById(DOM_INSERT_POSITION_FALLBACK) || document.body
  el = _insertPosition.appendChild(document.createElement('div'))

  if (_args.length === 2) {
    // this.$toast.present("String",1000)
    message = isPresent(_args[0]) && _args[0].toString().trim() || message
    duration = isNumber(_args[1]) && parseInt(_args[1]) || duration
  }

  if (_args.length === 1 && isString(_args[0])) {
    // this.$toast.present("String")
    message = isPresent(_args[0]) && _args[0].toString().trim() || message
  }

  if (_args.length === 1 && isObject(_args[0])) {
    // this.$toast.present({...})
    message = isPresent(_args[0].message) && _args[0].message.toString().trim() || message
    duration = isNumber(_args[0].duration) && parseInt(_args[0].duration) || duration
    // position
    position = isPresent(_args[0].position) && POSITIONS.indexOf(_args[0].position) > -1 ? _args[0].position : position

    // cssClass
    cssClass = isPresent(_args[0].cssClass) ? _args[0].cssClass.trim() : cssClass

    // closeButton
    if (!!_args[0].showCloseButton) duration = null
    showCloseButton = !!_args[0].showCloseButton

    closeButtonText = isPresent(_args[0].closeButtonText) ? _args[0].closeButtonText.trim() : closeButtonText

    // dismissOnPageChange
    dismissOnPageChange = !!_args[0].dismissOnPageChange

    // onDismiss
    onDismiss = (isPresent(_args[0].onDismiss) && isFunction(_args[0].onDismiss)) ? _args[0].onDismiss : onDismiss

    // mode
    mode = isPresent(_args[0].mode) ? _args[0].mode.trim() : mode

  }

  return new Toast({
    el,
    message,
    duration,
    position,
    cssClass,
    showCloseButton,
    closeButtonText,
    dismissOnPageChange,
    onDismiss,
    mode
  })
}

/**
 * @private
 * 对外的Toast构建部分
 * @function present
 * @description 打开Toast
 * @param {object} args - 传入参数
 * @param {string} args.message - The message for the toast. Long strings will wrap and the toast container will expand.
 * @param {number} [args.duration=3000] - How many milliseconds to wait before hiding the toast.
 * @param {string} [args.position="bottom"] - The position of the toast on the screen. Accepted values: "top", "middle", "bottom".
 * @param {string} [args.cssClass] - Additional classes for custom styles, separated by spaces.
 * @param {boolean} [args.showCloseButton=false] - Whether or not to show a button to close the toast.
 * @param {string} [args.closeButtonText='Close'] - Text to display in the close button.
 * @param {boolean} [args.dismissOnPageChange=false] - Whether to dismiss the toast when navigating to a new page or nav back.
 * @return {ToastInstance} 返回Toast的实例
 * */

export default function (...args) {
  let _instance = ToastFactory(...args)
  // 自动开启
  _instance.present()
  return _instance
}
