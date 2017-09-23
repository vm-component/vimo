/**
 * @component Menus
 * @description
 *
 * ## 菜单组件 / Menus组件
 *
 * ### 说明
 *
 * 注意：menu是全局的组件，应该在App.vue中定义，而不是在业务文件中。menu组件和nav组件应该是平级，放在最外层。 该组件用于在Vue.prototype.$menu上共享方法，可以用this.$menu来访问menu组件
 *
 * ### 关于事件
 *
 * Menus组件的事件是在$$eventBus中传播的, 切记
 *
 * ### 如何引入
 * ```
 * // 引入
 * import Menus from 'vimo/lib/menus'
 * // 安装
 * Vue.component(Menus.name, Menus)
 * // 或者
 * export default{
   *   components: {
   *    Menus
   *  }
   * }
 * ```
 *
 * @props  {string}  id               - 要打开menu的id，与open方法中的id对用应
 * @props  {String}  [side=left]      - 从哪个方向打开  可选 left/right
 * @props  {String}  [type=overlay]   - 用什么方式打开  可选 overlay/reveal/push
 * @props  {boolean} [enabled=true]   - 是否精致禁止使用menu
 *
 * @fires component:Menus#onMenuOpen
 * @fires component:Menus#onMenuClosing
 * @fires component:Menus#onMenuClosed
 *
 * @demo #/
 *
 * @usage
 *
 * <Menu id="menu" side="left" type="push" :enabled="false"></Menu>
 *
 * var vm = new Vue();
 * vm.$menus.menuIns: 当前缓存的menu实例对象
 * vm.$menus.currentMenuId: 当前开启的menuId
 * vm.$menus.open('menuId'): 打开id为menuId1的menu
 * vm.$menus.close(): 关闭打开的menu
 * vm.$menus.toggle('menuId'): 如果开启则关闭, 如果没开启的则打开id为menuId1的menu
 *
 *
 *
 *
 */

// 事件

/**
 * @event component:Menus#onMenuOpen
 * @description menu开启事件, 传递menuId,可通过$eventBus.$on()去监听。
 * @example
 * new Vue({
   *    methods: {
   *     open: function () {
   *       this.$menu.open('aaa');
   *       this.$$eventBus.$on("onMenuOpen", function () {
   *         //...
   *       })
   *     }
   *   }
   * })
 *
 */

/**
 * @event component:Menus#onMenuClosing
 * @description menu触发关闭事件,正在关闭...,可通过$eventBus.$on()去监听。
 */

/**
 * @event component:Menus#onMenuClosed
 * @description menu关闭动画完毕,可通过$eventBus.#on()去监听。
 */

/**
 * menu.vue: Menu组件的模板文件, 方法只用于维护自身状态
 * menu.js:  组件全局安装及实例注册, 用于在Vue.prototype.$menu上共享方法
 *
 *
 * 页面文件这样使用:
 * this.$menu.menuIns: 当前缓存的menu实例对象
 * this.$menu.currentMenuId: 当前开启的menuId
 * this.$menu.open('menuId1'): 打开id为menuId1的menu
 * this.$menu.close(): 关闭打开的menu
 * this.$menu.toggle('menuId1'): 如果开启则关闭, 如果没开启的则打开 menuId1
 *
 * 对于menu模板的传参, 参考props
 *
 * 对外事件:
 * onMenuOpen: menu开启事件, 传递menuId
 * onMenuClosing: menu触发关闭事件,正在关闭...
 * onMenuClosed: menu关闭动画完毕
 *
 * */

// function
/**
 * @function open
 * @description
 * 如果在menu开启另一个menu, 则等到第一个的关闭promise之后再开启
 * @param {String} menuId   - 打开menu的id，与上面属性中的id对应
 * @return {Promise}
 * @example
 * 下面只弹出id为aaa的menu
 *
 *
 * html:
 *   <Menu id="aa"></Menu>
 *   <Menu id="bb"></Menu>
 * js:
 * new Vue({
    *    methods: {
    *     open: function () {
    *       this.$menu.open('aaa');
    *     }
    *   }
    * })
 */
/**
 * @function close
 * @return {Promise}
 * @example
 *
 * new Vue({
    *    methods: {
    *     open: function () {
    *       this.$menu.close();
    *     }
    *   }
    * })
 */
/**
 * @function toggle
 * @param {String} menuId   - 打开menu的id
 * @example
 *  下面只对id为aaa的menu有效果
 *
 * html:
 *   <Menu id="aa"></Menu>
 *   <Menu id="bb"></Menu>
 * js:
 * new Vue({
    *    methods: {
    *     open: function () {
    *       this.$menu.toggle('aaa');
    *     }
    *   }
    * })
 */

import { urlChange } from '../util/util'
export function recordMenuInstance (instance) {
  // 如果没安装
  let proto = Reflect.getPrototypeOf(Reflect.getPrototypeOf(instance))
  if (!proto.$menus) {
    proto.$menus = new Menus()
  }
  proto.$menus.record(instance)
}

class Menus {
  constructor () {
    this.currentMenuId = null
    this.menuIns = {}
    this._unReg = null // for url change
  }

  /**
   * record
   * @param {object} instance
   * */
  record (instance) {
    this.menuIns[instance.id] = instance
  }

  /**
   * 开启
   * 如果在menu开启另一个menu, 则等到第一个的关闭promise之后再开启
   *
   * @param {string} menuId - 开启menu的id
   * @return {promise}
   *
   * */
  open (id) {
    let _successCb
    let _errorCb
    if (this.currentMenuId) {
      this.close().then(() => {
        // debug: 如果不加nextTick, 部分手机连续动画会出错
        window.setTimeout(() => {
          _openMenu(this, id)
        }, 16 * 10)
      })
    } else {
      _openMenu(this, id)
    }

    function _openMenu (_this, id) {
      if (_this.menuIns[id]) {
        _this.currentMenuId = id
        _this.menuIns[id].openMenu()
        _successCb && _successCb()
      } else {
        _errorCb && _errorCb()
      }

      // for url change
      // url变化关闭menu组件
      _this._unReg && _this._unReg()
      _this._unReg = urlChange(() => {
        _this.close()
      })
    }

    return new Promise((resolve, reject) => {
      _successCb = resolve
      _errorCb = reject
    })
  }

  /**
   * 关闭当前开启的, 如果没有则不处理
   * @return {promise}
   * */
  close () {
    let currentMenuId = this.currentMenuId
    let _successCb
    let _errorCb

    if (!currentMenuId) {
      _errorCb && _errorCb()
    } else {
      this.currentMenuId = null
      if (this.menuIns[currentMenuId]) {
        this.menuIns[currentMenuId].closeMenu().then(() => {
          _successCb && _successCb()
        })
      } else {
        _errorCb && _errorCb()
      }
    }

    return new Promise((resolve, reject) => {
      // for url change
      this._unReg && this._unReg()
      _successCb = resolve
      _errorCb = reject
    })
  }

  /**
   * toggle指定的id
   * @param {string} menuId - 开启menu的id
   * */
  toggle (id) {
    if (this.currentMenuId) {
      // open
      return this.close()
    } else {
      // close
      return this.open(id)
    }
  }
}
