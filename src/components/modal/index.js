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
 * - modal只是装菜的盘子, 盘子中的菜通过`component`传入, 数据通过`data`传入,
 *    - this.$options.$data.username 获取数据
 *    - this.username 也能获取到数据, 注意别冲突
 * - `onDismiss`会在modal关闭后触发.
 * - 开启的页面就是完整的Page页面, 别无其他
 *
 * ### 动画
 *
 * mode有自己的默认动画, 但是如果想自定义动画, 可以在mode中传入你自定义的动画名称. 另外, 默认自带的动画```animateName```有:
 *
 * - 空: 下部向上渐变
 * - zoom: 缩放
 * - fade: 渐变
 * - fade-right: 右侧向左渐变
 *
 * @usage
 * // 开启
 * openModal () {
 *        this.$modal.present({
 *          animateName: 'zoom',
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
 *
 * */

import Vue from 'vue'
import registerListener from '../../util/register-listener'
import modalComponent from './modal.vue'
import getInsertPosition from '../../util/get-insert-position'

let modalArr = []       // modal实例的堆栈
let unRegisterUrlChange = []
let isModalEnable = true // 当modal处于打开过程和关闭过程中时为false, 其余状态为true
let scrollTop = 0

/**
 * 获取实例
 * @private
 */
function ModalFactory (options) {
  const Modal = Vue.extend(modalComponent)
  options.dismissOnPageChange = false
  options.recordInHistory = false
  options.scrollControl = false
  return new Modal({
    el: getInsertPosition('modalPortal').appendChild(
      document.createElement('div')
    ),
    propsData: options
  })
}

/**
 * 开启Modal方法
 * 如果不懂想下: 桌子(页面)/菜盘(modal)/菜(template)的关系, 开启后获取Modal实例, 并将template初始化后挂在到Modal上, 然后注册urlChange事件. 在之后记录开启的Modal信息,
 * 然后执行modal实例的_present开启.
 *
 * @param {Object} options
 * @param {String} [options.animateName] - modal开闭动画, 可以是: 空/zoom/fade/fade-enter
 * @param {object} options.component - modal页面, 不支持异步
 * @param {object} [options.data] - 传给modal的数据, 数据会写到component的data属性中, 当然, 这个是响应式的.
 * @param {function} [options.onDismiss] - 关闭model执行的操作, data是关闭时传入的参数
 * @param {Boolean} [options.showBackdrop=true] - 显示backdrop
 * @param {Boolean} [options.enableBackdropDismiss=true] - 点击backdrop是否关闭
 * @example
 * 传入参数示例:
 * {
 *  component:require('*.vue'),  // modal页面
 *  data:{...},            // 传给modal的数据
 *  onDismiss(data){....},      // 关闭model执行的操作, data是关闭时传入的参数
 * }
 *
 * 子页面通过
 * - this.$options.$data.username 获取数据
 * - this.username 也能获取到数据, 注意别冲突
 *
 * */
function present (options = {}) {
  isModalEnable = false
  return new Promise((resolve) => {
    let modalInstance = ModalFactory(options)
    let presentPromise = modalInstance.present()
    // 增加浏览器历史记录
    window.history.pushState(
      {
        id: new Date().getTime(),
        name: `Modal-${modalInstance._uid}`
      },
      '',
      ''
    )

    // record
    modalArr.push(modalInstance)

    // 如果是第一次进入
    if (unRegisterUrlChange.length === 0) {
      // 则监听url变化
      registerListener(
        window,
        'popstate',
        function () {
          // 避免  window.history.back() 的影响
          isModalEnable && dismiss(null, false)
        },
        {},
        unRegisterUrlChange
      )
      // 锁定 Doc 滚动
      _disableScroll()
    }

    presentPromise.then(() => {
      isModalEnable = true
      resolve()
    })
  })
}

/**
 * 全局注册dismiss方法
 * dismiss关闭最后一次打开的Modal, 并执行onDismiss函数, 就酱, 因为, modal是覆盖式的显示在页面上, 即使给定关闭的modal名字, 也无使用意义.
 * `dataBack`数据将由外部`onDismiss`接收
 * @param {*} [dataBack] -  modal调用dismiss传递向外的数据
 * @param {Boolean} [changeLocalHistory=true] -  是否改变本地历史记录, 默认为true
 * */
function dismiss (dataBack, changeLocalHistory = true) {
  isModalEnable = false

  if (changeLocalHistory) {
    window.history.back()
  }

  return new Promise(resolve => {
    // 总是关闭最后一次创建的modal
    let lastModalInstance = modalArr.pop()
    // 如果是最后一个
    if (modalArr.length === 0) {
      // 则解绑urlChange
      unRegisterAllListener()
      // 滚动还原
      _enableScroll()
    }

    lastModalInstance.dismiss(dataBack).then(() => {
      isModalEnable = true
      // 执行注册的onDismiss回调
      resolve()
    })
  })
}

// 基础全部监听
function unRegisterAllListener () {
  unRegisterUrlChange.forEach(item => item && item())
  unRegisterUrlChange = []
}

function _disableScroll () {
  let scrollHeight = window.document.documentElement.scrollHeight
  let clientHeight = window.document.documentElement.clientHeight
  if (scrollHeight > clientHeight) {
    scrollTop = window.scrollY
    window.document.body.style.position = 'fixed'
    window.document.body.style.top = -scrollTop + 'px'
  }
}

function _enableScroll () {
  scrollTop = window.scrollY
  window.document.body.style.position = ''
  window.document.body.style.top = ''
  window.scrollTo(0, scrollTop)
  scrollTop = 0
}

export default {
  present,
  dismiss
}
