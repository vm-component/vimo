/**
 * Created by Hsiang on 2017/2/18.
 */
import Vue from 'vue'
import modalComponent from './modal.vue'
import { registerListener } from '../../util/dom'
import { isObject } from '../../util/util'
let _modalArr = []
let _unRegisterUrlChange = []
const ModalConstructor = Vue.extend(modalComponent)
const DOM_INSERT_POSITION = 'modalPortal' // the DOM position of component insert to
const DOM_INSERT_POSITION_FALLBACK = 'app' // fallback position
let navState = 0 // 0:非激活状态, 1:手动激活状态
// ---------- functions ----------

/**
 * 获取实例
 */
class Modal extends ModalConstructor {
  constructor (options) {
    super(options)
    // params
    if (isObject(options)) {
      for (let key in options)  this[key] = options[key]
    }
  }
}
function ModalFactory (options) {
  let _insertPosition = document.getElementById(DOM_INSERT_POSITION) || document.getElementById(DOM_INSERT_POSITION_FALLBACK) || document.body
  return new Modal({
    el: _insertPosition.appendChild(document.createElement('div')),
    name: options.name,
    position: options.position,
  })
}

/**
 * 开启Modal方法
 * 如果不懂想下: 桌子(页面)/菜盘(modal)/菜(template)的关系
 * 开启后获取Modal实例, 并将template初始化后挂在到Modal上, 然后注册urlChange事件
 * 在之后记录开启的Modal信息, 然后执行modal实例的_present开启.
 *
 * @param {object} options
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
  let name = options.name || ''
  let position = options.position || 'bottom'
  let modalInstance = ModalFactory({
    name,
    position,
  })

  let templateConstructor = Vue.extend(template)
  let templateInstance
  let el = modalInstance.$el.querySelectorAll('.modalPageLoadPort')[0].appendChild(document.createElement('div'))

  // 用户传入数据
  // 初始化用户自定义弹层的页面
  class Template extends templateConstructor {
    constructor (options) {
      super(options)
      // params
      if (isObject(options)) {
        for (let key in options)  this[key] = options[key]
      }
    }
  }

  templateInstance = new Template({el, modalData})

  // record
  _modalArr.push({
    modalInstance: modalInstance,
    template: options.template,
    templateInstance: templateInstance,
    modalData: modalData,
    onDismiss: onDismiss,
  })

  // 如果是第一次进入则监听url变化
  if (_unRegisterUrlChange.length == 0) {
    registerListener(window, 'popstate', function () {
      if (navState === 0) {
        // 总是关闭最后一次创建的modal
        let _lastModal = _modalArr.pop()
        _lastModal && _lastModal.modalInstance._dismiss()
        // 如果是最后一个则解绑urlChange
        if (_modalArr.length === 0) {
          unregisterAllListener()
        }
      }
    }, {}, _unRegisterUrlChange)
  }

  // 增加浏览器历史记录
  window.history.pushState({
    id: templateInstance._uid
  }, '', '')

  setTimeout(() => {navState = 0}, 400)
  return modalInstance._present()
}

/**
 * 全局注册dismiss方法
 * dismiss关闭最后一次打开的Modal, 并执行onDismiss函数, 就酱
 * 因为, modal是覆盖式的显示在页面上, 即使给定关闭的modal名字, 也无使用意义.
 *
 * @param {any} dataBack -  modal调用dismiss传递向外的数据
 * */
function dismiss (dataBack) {
  navState = 1

  // 总是关闭最后一次创建的modal
  let _lastModal = _modalArr.pop()
  let lastModalInstance = _lastModal.modalInstance
  // 执行注册的onDismiss回调
  _lastModal.onDismiss && _lastModal.onDismiss(dataBack)

  // 如果是最后一个则解绑urlChange
  if (_modalArr.length === 0) {
    unregisterAllListener()
  }

  window.history.back(-1)
  setTimeout(() => {navState = 0}, 400)
  return lastModalInstance._dismiss()
}

// 基础全部监听
function unregisterAllListener () {
  _unRegisterUrlChange.forEach((item) => item && item())
  _unRegisterUrlChange = []
}

export default {
  present,
  dismiss
}
