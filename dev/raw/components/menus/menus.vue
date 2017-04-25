<template>
    <div class="ion-menu"
         :id="id"
         :type="type"
         :side="side"
         :class="{'show-menu':showMenu}">
        <!--组件自己维护backdrop-->
        <Backdrop
                @click.native="$menus.close()"
                :isActive="showBackdrop"
                :class="{'show-backdrop':showBackdrop}"></Backdrop>
        <transition
                :name="animationName"
                v-on:before-enter="_beforeEnter"
                v-on:after-enter="_afterEnter"
                v-on:before-leave="_beforeLeave"
                v-on:after-leave="_afterLeave">
            <div class="menu-inner" v-if="isOpen">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<style lang="scss">
    @import 'menus';
    @import 'menus.ios';
    @import 'menus.md';

    /*slideInLeft*/
    /*animate class*/
    .slideInLeft-enter-active,
    .slideInLeft-leave-active {
        transform: translateX(0);
    }

    .slideInLeft-enter,
    .slideInLeft-leave-active {
        transform: translateX(-100%);
        transition: all cubic-bezier(0.2, 0, 1, 1) 280ms;
    }

    /*slideInRight*/
    /*animate class*/
    .slideInRight-enter-active,
    .slideInRight-leave-active {
        transform: translateX(0);
    }

    .slideInRight-enter,
    .slideInRight-leave-active {
        transform: translateX(100%);
        transition: all cubic-bezier(0, 0, 1, 1) 280ms;
    }

</style>
<script>
  /**
   *
   * @component Menu
   * @description
   *
   * 注意：menu是全局的组件，应该在App.vue中定义，而不是在业务文件中。menu组件和nav组件应该是平级，放在最外层。
   *
   * 该组件用于在Vue.prototype.$menu上共享方法，可以用this.$menu来访问menu组件
   * @example
   * var vm = new Vue();
   * vm.$menus.menuIns: 当前缓存的menu实例对象
   * vm.$menus.currentMenuId: 当前开启的menuId
   * vm.$menus.open('menuId'): 打开id为menuId1的menu
   * vm.$menus.close(): 关闭打开的menu
   * vm.$menus.toggle('menuId'): 如果开启则关闭, 如果没开启的则打开id为menuId1的menu
   *
   * @property  {string}  id               - 要打开menu的id，与open方法中的id对用应
   * @property  {String}  [side=left]      - 从哪个方向打开  可选 left/right
   * @property  {String}  [type=overlay]   - 用什么方式打开  可选 overlay/reveal/push
   * @property  {boolean} [enabled=true]   - 是否精致禁止使用menu
   * @example
   *  <Menu id="menu" side="left" type="push" :enabled="false"></Menu>
   *
   */

  /**
   * @event onMenuOpen
   *  @description
   *     menu开启事件, 传递menuId,可通过$eventBus.#on()去监听。
   *
   * @example
   *
   * new Vue({
   *    methods: {
   *     open: function () {
   *       this.$menu.open('aaa');
   *       this.$$eventBus.#on("onMenuOpen", function(){
   *         //...
   *       })
   *     }
   *   }
   * })
   *
   */

  /**
   * @event onMenuClosing
   *  @description
   *     menu触发关闭事件,正在关闭...,可通过$eventBus.#on()去监听。
   *
   *
   */

  /**
   * @event onMenuClosed
   *  @description
   *     menu关闭动画完毕,可通过$eventBus.#on()去监听。
   *
   *
   */


  /**
   * @property
   * @private
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
   *
   * */
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
   * @function taggle
   * @param {String} menuId   - 打开menu的id
   * @example
   *  下面只对id为aaa的menu有效果
   *
   * html:
   *   <Menu id="aa"></Menu>
   *   <Menu id="bb"></Menu>
   * js:
   * js:
   * new Vue({
    *    methods: {
    *     open: function () {
    *       this.$menu.taggle('aaa');
    *     }
    *   }
    * })
   */

  import { firstUpperCase } from '../../util/util'
  import { recordMenuInstance } from './menus'
  import { Backdrop } from '../backdrop'
  export default{
    name: 'Menus',
    data(){
      return {
        isOpen: false, // menu-inner 动画控制
        showMenu: false, // 整体menu显示控制
        showBackdrop: false, // 是否显示半灰色蒙层
        animationName: '', // 过度动画名称

        // promise
        presentCallback: null,
        dismissCallback: null,
      }
    },
    props: {
      /**
       * 当前menu的id
       * */
      id: {
        type: String,
      },
      /**
       * menu从哪个位置出来, left/right
       * 默认:"left"
       * */
      side: {
        type: String,
        default: 'left'
      },
      /**
       * menu打开的类型: "overlay", "reveal", "push"
       * */
      type: {
        type: String,
        default () {
          return window.VM && window.VM.config.get('menuType', 'overlay')
        }
      },
      /**
       * 是否禁用menu
       * */
      enabled: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      // 过渡钩子
      _beforeEnter (el) {
        this.$app && this.$app.setEnabled(false, 300);
      },
      _afterEnter (el) {
        this.presentCallback(el);
      },
      _beforeLeave(){
        this.$app && this.$app.setEnabled(false, 300);
      },
      _afterLeave (el) {
        this.$eventBus && this.$eventBus.$emit('onMenuClosed', this.id);
        this.dismissCallback(el);
        this.showMenu = false;
      },

      /**
       * open
       * @return {promise}
       * */
      openMenu(){
        const _this = this;
        if (!_this.enabled) return;

        _this.showMenu = true;
        if (_this.type === 'overlay') {
          _this.showBackdrop = true;
          // 确定左右动画
          _this.animationName = 'slideIn' + firstUpperCase(_this.side);
        }

        if (_this.type === 'push') {
          // _this.showBackdrop = true;
          // 确定左右动画
          _this.animationName = 'slideIn' + firstUpperCase(_this.side);
        }

        _this.isOpen = true;
        this.$eventBus && this.$eventBus.$emit('onMenuOpen', this.id);
        return new Promise((resolve) => {this.presentCallback = resolve});
      },

      /**
       * close
       * @return {promise}
       * */
      closeMenu(){
        const _this = this;
        if (!_this.enabled) return;
        _this.showBackdrop = false;
        _this.isOpen = false;
        _this.$eventBus && _this.$eventBus.$emit('onMenuClosing', _this.id);
        return new Promise((resolve) => {this.dismissCallback = resolve});
      },
    },
    created(){
      // 记录当前实例
      recordMenuInstance(this);
    },
    components: {
      'Backdrop': Backdrop
    }
  }
</script>
