<template>
    <div class="ion-menu"
         :id="id"
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
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="menu-inner" v-show="isActive">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<style lang="less">
    @import "./menu.less";
    @import "./menu.ios.less";
    @import "./menu.md.less";
</style>
<script type="text/javascript">
  import { recordMenuInstance } from './menu'
  import Backdrop from '../backdrop'
  import focusOutActiveElement from '../util/focus-out-active-element'

  const NOOP = () => {}

  export default {
    name: 'Menu',
    data () {
      return {
        isActive: false, // menu-inner 动画控制
        showMenu: false, // 整体menu显示控制
        showBackdrop: false, // 是否显示半灰色蒙层
        animationName: '', // 过度动画名称

        // promise
        presentCallback: NOOP,
        dismissCallback: NOOP
      }
    },
    props: {
      /**
       * 当前menu的id
       * */
      id: String,
      /**
       * menu从哪个位置出来, left/right
       * 默认:"left"
       * */
      side: {
        type: String,
        default: 'left'
      },
      /**
       * menu打开的类型: overlay/reveal
       * */
      type: {
        type: String,
        default () {
          return this.$config && this.$config.get('menuType', 'overlay')
        },
        validator (val) {
          return ['overlay', 'reveal'].indexOf(val) > -1
        }
      }
    },
    watch: {
      type () {},
      side () {}
    },
    methods: {
      // 过渡钩子
      beforeEnter () {
        this.$root && this.$root.$emit('onMenuOpen', this.id)
        this.showMenu = true
        this.$app && this.$app.setEnabled(false, 300)
        focusOutActiveElement()
      },
      afterEnter () {
        this.presentCallback()
      },
      beforeLeave () {
        this.$root && this.$root.$emit('onMenuClosing', this.id)
        this.$app && this.$app.setEnabled(false, 300)
        focusOutActiveElement()
      },
      afterLeave () {
        this.$root && this.$root.$emit('onMenuClosed', this.id)
        this.dismissCallback()
        this.showMenu = false
      },

      /**
       * open
       * @return {Promise}
       * */
      openMenu () {
        if (this.type === 'overlay') {
          this.showBackdrop = true
          this.animationName = `slide-in-${this.side}`
        } else {
          this.showBackdrop = false
          this.animationName = ''
        }

        this.isActive = true
        this.$app && this.$app.$_disableScroll()
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * close
       * @return {Promise}
       * */
      closeMenu () {
        this.showBackdrop = false
        this.isActive = false
        this.$app && this.$app.$_enableScroll()
        return new Promise((resolve) => { this.dismissCallback = resolve })
      }
    },
    created () {
      // 记录当前实例
      recordMenuInstance(this)
    },
    components: {
      Backdrop
    }
  }
</script>
