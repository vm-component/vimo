<template>
    <nav class="ion-nav"
         :class="[
           menuContentClass,
           menuContentTypeClass,
           menuContentSideClass,
           {'menu-content-open':isMenuOpen}]">
        <div v-if="isMenuOpen" @click="tapToCloseMenu" @touchmove="stopActive($event)" class="click-cover"></div>
        <!--animate-->
        <!--need to distinguish-->
        <template v-if="pageTransition">
            <transition :name="pageTransitionName">
                <slot></slot>
            </transition>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </nav>
</template>
<script type="text/javascript">
  /**
   * @component Nav
   * @description
   *
   * ## 基础组件 / Nav组件
   *
   * 这里是Page组件的父容器, 而且转场动画也是在这里执行.
   *
   * ### 页面切换是否需要Indicator的问题
   *
   * 添加这个功能是因为在有些使用情况下, 跳转加载大页面时会有很长时间的空白无交互期, 因此加上Indicator给用户提示正在下载将要去的页面的资源, 这个默认不开启.
   *
   * @props {Boolean} [showIndicatorWhenPageChange=false] - 页面切换是否显示Indicator
   *
   * */
  export default {
    name: 'Nav',
    provide () {
      const _this = this
      return {
        navComponent: _this
      }
    },
    props: {
      // 转场是否开启Indicator
      showIndicatorWhenPageChange: {
        type: Boolean,
        default () { return this.$config && this.$config.getBoolean('showIndicatorWhenPageChange') }
      },
      // 转场动画名称
      // ios-transition/fade-bottom-transition/zoom-transition/fade-right-transition/fade-transition
      pageTransition: {
        type: String,
        default () { return this.$config && this.$config.get('pageTransition') }
      }
    },
    data () {
      return {
        // ----------- Nav -----------
        pageTransitionName: null,
        IndicatorComponent: null,

        // ----------- Menu -----------
        isMenuOpen: false, // ion-menu开启
        menuId: null, // menuId
        menuType: '', // overlay/reveal  这里只处理 reveal
        menuSide: 'left', // 方向
        menuContentClass: null,
        menuContentTypeClass: null,
        menuContentSideClass: null
      }
    },
    methods: {
      // -------- Nav --------
      /**
       * 初始化导航
       * @private
       * */
      initNav () {
        const vm = this
        if (!this.$router) return
        // pageTransition
        if (this.pageTransition) {
          this.$config.set('box', true)
          if (process.env.NODE_ENV === 'development') {
            console.warn('[Nav] pageTransition特性只能在box模式下使用, 因此这里会自动设置为true.')
          }
          // nav 动画切换部分
          this.$router.beforeEach((to, from, next) => {
            this.pageTransitionName = `${this.pageTransition}-${this.$history.getDirection()}`
            next()
          })
        }
        // 页面切换显示Indicator
        if (this.showIndicatorWhenPageChange) {
          // import('../.backup/indicator').then((component) => {
          //   this.IndicatorComponent = component.default
          //   this.$router.beforeEach((to, from, next) => {
          //     if (vm.$history.getDirection() === 'forward') {
          //       this.IndicatorComponent.present()
          //     }
          //     next()
          //   })
          //   this.$router.afterEach(() => {
          //     if (vm.$history.getDirection() === 'forward') {
          //       this.IndicatorComponent.dismiss()
          //     }
          //   })
          // })
        }
      },

      // ----------- Menu -----------
      /**
       * 点击nav关闭Menu
       * @private
       * */
      tapToCloseMenu () {
        this.isMenuOpen && this.$menu.close()
      },

      stopActive ($event) {
        if (this.isMenuOpen) {
          $event.preventDefault()
          $event.stopPropagation()
        }
      },

      /**
       * 设置Menu的信息
       * @private
       * */
      setMenuInfo (menuId) {
        if (menuId) {
          this.menuId = menuId
          this.menuSide = this.$menu.menuIns[menuId].side
          this.menuType = this.$menu.menuIns[menuId].type
          this.menuContentClass = `menu-content`
          this.menuContentTypeClass = `menu-content-${this.menuType}`
          this.menuContentSideClass = `menu-content-${this.menuSide}`
        }
      },

      clearMenuInfo () {
        this.menuId = null
        this.menuSide = 'left'
        this.menuType = ''
        this.menuContentClass = null
        this.menuContentClass = null
        this.menuContentTypeClass = null
        this.menuContentSideClass = null
      },

      /**
       * 初始化menu组件对应的监听处理
       * @private
       * */
      initMenu () {
        // 监听menu的组件事件
        this.$root.$on('onMenuOpen', (menuId) => {
          this.setMenuInfo(menuId)
          this.isMenuOpen = true
        })
        this.$root.$on('onMenuClosing', () => {
          this.isMenuOpen = false
        })
        this.$root.$on('onMenuClosed', () => {
          this.menuContentTypeClass = null
        })
      }
    },
    created () {
      // 初始化menu组件对应的监听处理
      this.initMenu()

      //  初始化导航
      this.initNav()
    }
  }
</script>
