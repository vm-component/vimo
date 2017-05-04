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
let navState = 0 // 0:非激活状态, 1:手动激活状态
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
 * @param {VueComponent} options.template - modal页面
 * @param {object} [options.modalData] - 传给modal的数据
 * @param {function} [options.onDismiss] - 关闭model执行的操作, data是关闭时传入的参数
 * @param {string} [options.mode='ios'] - 模式
 * @param {string} [options.name] - 名称(未启用)
 * @param {string} [options.position] - 位置(未启用)
 * @example
 * 传入参数示例:
 * {
 *  template:require('*.vue'),  // modal页面
 *  modalData:{...},            // 传给modal的数据
 *  onDismiss(data){....},      // 关闭model执行的操作, data是关闭时传入的参数
 * }
 * */
function present (options = {}) {
  navState = 1

  let template = options.template
  let modalData = options.modalData
  let onDismiss = options.onDismiss

  let modalOptions = {}
  if (options.name) {
    modalOptions['name'] = options.name
  }
  if (options.position) {
    modalOptions['position'] = options.position
  }
  if (options.mode) {
    modalOptions['mode'] = options.mode
  }

  let modalInstance = ModalFactory(modalOptions)
  // 启动modal，启动需要比页面启动早，否则content组件无法初始化！！
  let presentPromise = modalInstance._present()

  // 执行内嵌页面的初始化
  let Template = Vue.extend(template)
  let templateInstance
  let el = modalInstance.$el.querySelectorAll('.modalPageLoadPort')[0].appendChild(document.createElement('div'))

  // 用户传入数据
  // 初始化用户自定义弹层的页面
  // 需要异步执行，便于Content组件完成初始化
  window.setTimeout(function () {
    templateInstance = new Template({el, modalData})
    // 增加浏览器历史记录
    window.history.pushState({
      id: templateInstance._uid
    }, '', '')
  }, 0)

  // record
  modalArr.push({
    modalInstance: modalInstance,
    template: options.template,
    templateInstance: templateInstance,
    modalData: modalData,
    onDismiss: onDismiss
  })

  // 如果是第一次进入则监听url变化
  if (unRegisterUrlChange.length === 0) {
    registerListener(window, 'popstate', function () {
      if (navState === 0) {
        // 总是关闭最后一次创建的modal
        let _lastModal = modalArr.pop()
        _lastModal && _lastModal.modalInstance._dismiss()
        // 如果是最后一个则解绑urlChange
        if (modalArr.length === 0) {
          unregisterAllListener()
        }
      }
    }, {}, unRegisterUrlChange)
  }

  window.setTimeout(() => { navState = 0 }, 400)
  return presentPromise
}

/**
 * 全局注册dismiss方法
 * dismiss关闭最后一次打开的Modal, 并执行onDismiss函数, 就酱, 因为, modal是覆盖式的显示在页面上, 即使给定关闭的modal名字, 也无使用意义.
 * `dataBack`数据将由外部`onDismiss`接收
 * @param {any} dataBack -  modal调用dismiss传递向外的数据
 * */
function dismiss (dataBack) {
  return new Promise((resolve) => {
    navState = 1

    // 总是关闭最后一次创建的modal
    let _lastModal = modalArr.pop()
    let lastModalInstance = _lastModal.modalInstance

    // 如果是最后一个则解绑urlChange
    if (modalArr.length === 0) {
      unregisterAllListener()
    }

    window.history.back(-1)
    // window.setTimeout(() => {navState = 0}, 400)
    lastModalInstance._dismiss().then(() => {
      navState = 0

      // 执行注册的onDismiss回调
      _lastModal.onDismiss && _lastModal.onDismiss(dataBack)

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
