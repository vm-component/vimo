/**
 * @component Modal
 * @description
 *
 * ## 弹出层 / Modal弹出页组件
 *
 * ## 补充
 *
 * Model组件用于当前页面的补充, 相当于在当前页面上再来弹一个页面, 这里并不改变路由, 但是会改变H5 history的popstate, 每打开一个Modal则新增一个历史记录, 可以通过后退关闭最后一次打开的modal.
 *
 * ## 注意点
 *
 * - 在modal中如果跳转到另一页之前希望能先关闭当前modal再操作
 * - modal不会再url中留下记录
 * - modal只是装菜的盘子, 盘子中的菜通过`template`传入, 数据通过`modalData`传入,
 * - `onDismiss`会在modal关闭后触发.
 * - 开启的页面就是完整的Page页面, 别无其他
 *
 * @usage
 * // 开启
 * openModal () {
 *        this.$modal.present({
 *          template: modalPageComponent_1,
 *          modalData: {hello: 'Page1Data'},
 *          onDismiss (data) {
 *            console.debug('得到了modal1的关闭信息')
 *            console.debug(JSON.stringify(data))
 *          }
 *    })
 * },
 *
 * // 关闭
 * closeModal () {
 *        this.$modal.dismiss({
 *          result: 'modal 1 dismissed success!'
 *        })
 * }
 * @demo http://xiangsongtao.com/vimo/#/modal
 * */

import Vue from 'vue'
import { getInsertPosition } from '../../util/getInsertPosition'
import { registerListener } from '../../util/util'
import modalComponent from './modal.vue'
let modalArr = []
let unRegisterUrlChange = []
const Modal = Vue.extend(modalComponent)
let isModalEnable = true // 当modal处于打开过程和关闭过程中时为false, 其余状态为true
// ---------- functions ----------

/**
 * 获取实例
 * @private
 */
function ModalFactory (options) {
  return new Modal({
    el: getInsertPosition('modalPortal').appendChild(document.createElement('div')),
    propsData: options
  })
}

/**
 * 开启Modal方法
 * 如果不懂想下: 桌子(页面)/菜盘(modal)/菜(template)的关系, 开启后获取Modal实例, 并将template初始化后挂在到Modal上, 然后注册urlChange事件. 在之后记录开启的Modal信息,
 * 然后执行modal实例的_present开启.
 *
 * @param {object} options
 * @param {VueComponent} options.component - modal页面
 * @param {object} [options.data] - 传给modal的数据
 * @param {function} [options.onDismiss] - 关闭model执行的操作, data是关闭时传入的参数
 * @param {Boolean} [showBackdrop=true] - 显示backdrop
 * @param {Boolean} [enableBackdropDismiss=true] - 点击backdrop是否关闭
 *
 *
 * @param {string} [options.mode='ios'] - 模式
 * @example
 * 传入参数示例:
 * {
 *  component:require('*.vue'),  // modal页面
 *  data:{...},            // 传给modal的数据
 *  onDismiss(data){....},      // 关闭model执行的操作, data是关闭时传入的参数
 * }
 * */
function present (options = {}) {
  isModalEnable = false

  let modalInstance = ModalFactory(options)
  let presentPromise = modalInstance.present()

  // 增加浏览器历史记录
  window.history.pushState({
    id: new Date().getTime()
  }, '', '')

  // record
  modalArr.push(modalInstance)

  // 如果是第一次进入则监听url变化
  if (unRegisterUrlChange.length === 0) {
    registerListener(window, 'popstate', function () {
      if (isModalEnable) {
        // 总是关闭最后一次创建的modal
        let _lastModal = modalArr.pop()
        _lastModal && _lastModal.dismiss()
        // 如果是最后一个则解绑urlChange
        if (modalArr.length === 0) {
          unregisterAllListener()
        }
      }
    }, {}, unRegisterUrlChange)
  }

  // window.setTimeout(() => { isModalEnable = 0 }, 400)
  presentPromise.then(() => {
    isModalEnable = true
  })

  return presentPromise
}

/**
 * 全局注册dismiss方法
 * dismiss关闭最后一次打开的Modal, 并执行onDismiss函数, 就酱, 因为, modal是覆盖式的显示在页面上, 即使给定关闭的modal名字, 也无使用意义.
 * `dataBack`数据将由外部`onDismiss`接收
 * @param {any} dataBack -  modal调用dismiss传递向外的数据
 * */
function dismiss (dataBack) {
  isModalEnable = false

  return new Promise((resolve) => {

    // 总是关闭最后一次创建的modal
    let lastModalInstance = modalArr.pop()

    // 如果是最后一个则解绑urlChange
    if (modalArr.length === 0) {
      unregisterAllListener()
    }

    window.history.back()
    lastModalInstance.dismiss(dataBack).then(() => {
      isModalEnable = true
      // // 执行注册的onDismiss回调
      resolve()
    })
  })
}

// 基础全部监听
function unregisterAllListener () {
  unRegisterUrlChange.forEach((item) => item && item())
  unRegisterUrlChange = []
}

export default {
  present,
  dismiss
}
