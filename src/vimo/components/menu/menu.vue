<template>
  <div class="ion-menu"
       :type="type"
       :side="side"
       :class="{'show-menu':showMenu}">
    <!--组件自己维护backdrop-->
    <Backdrop
      @click.native="$menu.close()"
      :isActive="showBackdrop"
      :class="{'show-backdrop':showBackdrop}"></Backdrop>
    <transition
      :name="animationName"
      v-on:before-enter="_beforeEnter"
      v-on:after-enter="_afterEnter"
      v-on:before-leave="_beforeLeave"
      v-on:after-leave="_afterLeave">
      <div class="menu-inner" v-show="isOpen">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<style lang="scss">
  @import './menu.scss';
  @import './menu.ios.scss';
  @import './menu.md.scss';
  @import './menu.wp.scss';

  /*slideInLeft*/
  /*animate class*/
  .slideInLeft-enter-active,
  .slideInLeft-leave-active {
    transform: translateX(0);
  }

  .slideInLeft-enter,
  .slideInLeft-leave-active {
    transform: translateX(-100%);
    transition: all cubic-bezier(0.4, 0.0, 0.6, 1) 280ms;
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
    transition: all cubic-bezier(0.4, 0.0, 0.6, 1) 280ms;
  }

</style>
<script type="text/ecmascript-6">
  /**
   * 注意：menu是全局的组件，应该在App.vue中定义，而不是在业务文件中
   *
   * @name Menu
   *
   * menu.vue: Menu组件的模板文件, 方法只用于维护自身状态
   * menu.js:  组件全局安装及实例注册, 用于在Vue.prototype.$menu上共享方法
   *
   * 页面文件这样使用:
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
  import { firstUpperCase } from '../../util/util';
  import { recordMenuInstance } from './menu';

  export default{
    name: 'Menu',
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
       * menu打开的类型: "overlay", "reveal"
       * */
      type: {
        type: String,
        default () {
          return VM.config.get('menuType', 'overlay')
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
        this.$setEnabled(false, 300);
      },
      _afterEnter (el) {
        this.presentCallback(el);
      },
      _beforeLeave(){
        this.$setEnabled(false, 300);
      },
      _afterLeave (el) {
        this.$eventBus.$emit('onMenuClosed',this.id);
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
        _this.isOpen = true;
        this.$eventBus.$emit('onMenuOpen', this.id);
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
        _this.$eventBus.$emit('onMenuClosing', _this.id);
        return new Promise((resolve) => {this.dismissCallback = resolve});
      },
    },
    created(){
      // 记录当前实例
      recordMenuInstance(this);
    }
  }
</script>
