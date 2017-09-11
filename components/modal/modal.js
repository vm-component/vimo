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
 * ### 动画
 *
 * mode根据不同的设备启用不同的动画, 但是如果想自定义动画, 可以在mode中传入你自定义的结果. 另外, 默认自带zoom和fade两个动画.
 *
 * @usage
 * // 开启
 * openModal () {
 *        this.$modal.present({
 *          mode: 'zoom',
 *          component: modalPageComponent,
 *          data: {hello: 'Page1Data'},
 *          showBackdrop: true,
 *          enableBackdropDismiss: true,
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
 * @demo #/modal
 * */

import Vue from 'vue'
import { getInsertPosition } from '../util/getInsertPosition'
import { registerListener } from '../util/util'
import modalComponent from './modal.vue'

let modalArr = []
let openIndex = 0
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
 * @param {String} [mode]
 * @param {VueComponent} component - modal页面, 不支持异步
 * @param {object} [data] - 传给modal的数据
 * @param {function} [onDismiss] - 关闭model执行的操作, data是关闭时传入的参数
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
 *
 * 子页面通过 this.$options.$data.username 获取数据
 * */
function present (options = {}) {
  isModalEnable = false

  let modalInstance = ModalFactory(options)
  let presentPromise = modalInstance.present()

  // 增加浏览器历史记录
  window.history.pushState({
    id: new Date().getTime(),
    name: options.name || `Modal-${openIndex++}`
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
          // 通知父页面更新navbar
          window.VM.$navbar.initWhenInWebview()
          window.VM.$title.init()
        } else {
          // 取出倒数第二个modal, 将nav更新为他的nav
          refreshNavbar(modalArr)
        }
      }
    }, {}, unRegisterUrlChange)
  }

  presentPromise.then(() => {
    isModalEnable = true
  })

  return presentPromise
}

/**
 * 全局注册dismiss方法
 * dismiss关闭最后一次打开的Modal, 并执行onDismiss函数, 就酱, 因为, modal是覆盖式的显示在页面上, 即使给定关闭的modal名字, 也无使用意义.
 * `dataBack`数据将由外部`onDismiss`接收
 * @param {*} dataBack -  modal调用dismiss传递向外的数据
 * */
function dismiss (dataBack) {
  isModalEnable = false

  return new Promise((resolve) => {
    // 总是关闭最后一次创建的modal
    let lastModalInstance = modalArr.pop()
    // 如果是最后一个则解绑urlChange
    if (modalArr.length === 0) {
      unregisterAllListener()
      // 通知父页面更新navbar
      window.VM.$navbar.initWhenInWebview()
      window.VM.$title.init()
    } else {
      // 取出倒数第二个modal, 将nav更新为他的nav
      refreshNavbar(modalArr)
    }

    window.history.back()
    lastModalInstance.dismiss(dataBack).then(() => {
      isModalEnable = true
      // // 执行注册的onDismiss回调
      resolve()
    })
  })
}

function componentIsMatch (component, name) {
  return component && component.$options && component.$options._componentTag.toString().toLowerCase() === name
}

function refreshNavbar (modalArr) {
  let penultimateInstance = modalArr[modalArr.length - 1]
  let PageComponent = penultimateInstance.$children[1]
  if (PageComponent.$children && PageComponent.$children[0]) {
    if (componentIsMatch(PageComponent.$children[0], 'page')) {
      PageComponent = PageComponent.$children[0]
      let HeaderComponent = PageComponent.$children[0] // header content footer
      if (componentIsMatch(HeaderComponent, 'header')) {
        let NavbarComponent = HeaderComponent.$children[0]
        if (componentIsMatch(NavbarComponent, 'navbar')) {
          NavbarComponent.initWhenInWebview()
          for (let i = 0, len = NavbarComponent.$children.length; len > i; i++) {
            if (componentIsMatch(NavbarComponent.$children[i], 'title')) {
              let TitleComponent = NavbarComponent.$children[i]
              TitleComponent.init()
              break
            }
          }
        }
      }
    }
  }
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
