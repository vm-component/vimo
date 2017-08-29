<template>
    <nav class="ion-nav"
         :class="[menuContentClass,menuContentTypeClass,{'menu-content-open':isMenuOpen}]"
         :style="menuStyleObj">
        <div nav-viewport></div>
        <div v-if="isMenuOpen" @click="tapToCloseMenu" class="click-cover"></div>
        <!--animate-->
        <transition :name="pageTransitionName">
            <slot></slot>
        </transition>
        <div class="nav-decor"></div>
    </nav>
</template>
<style lang="less">
    .ion-nav {
        .click-cover {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
        }
    }
</style>
<script type="text/javascript">
  /**
   * @component Base/Nav
   * @description
   *
   * ## 基础组件 / Nav组件
   *
   * 这里是Page组件的父容器, 而且转场动画也是在这里执行.
   *
   * 转场动画是使用css3的特性完成的, 也就是说Vimo不提供手势转场动画. 按照在props中的说明, 可提供这几类已写好的专场动画, 如果项目需要定制, 则特换自定义的动画即可, 动画定义在App组件的文件夹中.
   *
   * @props {String} [pageTransition] - 转场动画的名称, 可以是这里的一种: ios-transition/zoom-transition/fade-bottom-transition/fade-right-transition/fade-transition
   * @props {Boolean} [showIndicatorWhenPageChange=false] - 页面切换是否显示Indicator
   *
   * */
  import { Indicator } from '../indicator'

  export default {
    name: 'Nav',
    props: {
      // 转场动画名称
      // ios-transition/fade-bottom-transition/zoom-transition/fade-right-transition/fade-transition
      pageTransition: {
        type: String,
        default () { return this.$config && this.$config.get('pageTransition') }
      },
      // 转场是否开启Indicator
      showIndicatorWhenPageChange: {
        type: Boolean,
        default () { return this.$config && this.$config.getBoolean('showIndicatorWhenPageChange') }
      }
    },
    data () {
      return {
        // ----------- Nav -----------
        pageTransitionName: null,

        // ----------- Menu -----------
        menuStyleObj: {
          transform: ''
        },

        isMenuOpen: false, // ion-menu开启
        menuId: null, // menuId
        menuType: '', // overlay/reveal/push  这里只处理 reveal/push
        menuSide: 'left', // 方向
        menuContentClass: null,
        menuContentTypeClass: null,
        transform: this.$platform.css ? this.$platform.css.transform : 'webkitTransform'
      }
    },
    methods: {
      // -------- Nav --------
      /**
       * 初始化导航
       * @private
       * */
      initNav () {
        if (!this.$router) return
        // nav 动画切换部分
        const vm = this
        this.$router.beforeEach((to, from, next) => {
          vm.pageTransitionName = `${vm.pageTransition}-${vm.$history.getDirection()}`
          vm.$app && vm.$app.setEnabled(false, 500)
          next()
        })

        // 页面切换显示Indicator
        if (this.showIndicatorWhenPageChange) {
          this.$router.beforeEach((to, from, next) => {
            Indicator.present()
            next()
          })
          this.$router.afterEach(() => {
            Indicator.dismiss()
          })
        }
      },

      // ----------- Menu -----------
      /**
       * 点击nav关闭Menu
       * @private
       * */
      tapToCloseMenu () {
        this.$nextTick(() => {
          this.isMenuOpen && this.$menus.close()
        })
      },

      /**
       * 设置Menu的信息
       * @private
       * */
      setMenuInfo (menuId) {
        if (menuId) {
          this.menuId = menuId
          this.menuSide = this.$menus.menuIns[menuId].side
          this.menuType = this.$menus.menuIns[menuId].type
          this.menuContentClass = `menu-content`
          this.menuContentTypeClass = `menu-content-${this.menuType}`
        }
      },

      /**
       * 初始化menu组件对应的监听处理
       * @private
       * */
      initMenu () {
        let _translateX
        // 监听menu的组件事件
        this.$eventBus.$on('onMenuOpen', (menuId) => {
          this.setMenuInfo(menuId)
          this.isMenuOpen = true

          // 获取开口读, 宽度小于340px的的屏幕开口度为264px
          // 大于340px的屏幕开口度为304px
          if (this.$platform.width() > 340) {
            _translateX = 304
          } else {
            _translateX = 264
          }

          if (this.menuType === 'reveal' || this.menuType === 'push') {
            if (this.menuSide === 'left') {
              this.menuStyleObj[this.transform] = `translateX(${_translateX}px)`
            } else {
              this.menuStyleObj[this.transform] = `translateX(-${_translateX}px)`
            }
          }
        })
        this.$eventBus.$on('onMenuClosing', (menuId) => {
          this.isMenuOpen = false
          if (this.menuType === 'reveal' || this.menuType === 'push') {
            this.menuStyleObj[this.transform] = 'translateX(0)'
          }
        })
        this.$eventBus.$on('onMenuClosed', () => {
          this.menuContentTypeClass = null
        })
      }
    },
    created () {
      // 初始化menu组件对应的监听处理
      this.initMenu()

      //  初始化导航
      this.initNav()
    },
    mounted () {}
  }
</script>
