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
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="menu-inner" v-if="isOpen">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<style lang="less">
    @import "menus";
    @import "menus.ios.less";
    @import "menus.md.less";

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
<script type="text/javascript">
  import { firstUpperCase } from '../util/util'
  import { recordMenuInstance } from './menus'
  import Backdrop from '../backdrop'

  const NOOP = () => {}

  export default {
    name: 'Menus',
    data () {
      return {
        isOpen: false, // menu-inner 动画控制
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
       * menu打开的类型: overlay/reveal/push
       * */
      type: {
        type: String,
        default () {
          return this.$config && this.$config.get('menuType', 'overlay')
        }
      },
      /**
       * 是否禁用menu
       * */
      enabled: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      // 过渡钩子
      beforeEnter () {
        this.$app && this.$app.setEnabled(false, 300)
      },
      afterEnter () {
        this.presentCallback()
      },
      beforeLeave () {
        this.$app && this.$app.setEnabled(false, 300)
      },
      afterLeave () {
        this.$eventBus && this.$eventBus.$emit('onMenuClosed', this.id)
        this.dismissCallback()
        this.showMenu = false
      },

      /**
       * open
       * @return {Promise}
       * */
      openMenu () {
        if (!this.enabled) {
          this.presentCallback()
        } else {
          this.showMenu = true
          if (this.type === 'overlay') {
            this.showBackdrop = true
            // 确定左右动画
            this.animationName = 'slideIn' + firstUpperCase(this.side)
          }

          if (this.type === 'push') {
            // this.showBackdrop = true;
            // 确定左右动画
            this.animationName = 'slideIn' + firstUpperCase(this.side)
          }

          this.isOpen = true
          this.$eventBus && this.$eventBus.$emit('onMenuOpen', this.id)
        }
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * close
       * @return {Promise}
       * */
      closeMenu () {
        if (!this.enabled) {
          this.dismissCallback()
        } else {
          this.showBackdrop = false
          this.isOpen = false
          this.$eventBus && this.$eventBus.$emit('onMenuClosing', this.id)
        }
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
