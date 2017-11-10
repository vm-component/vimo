<template>
    <nav class="ion-nav"
         :class="[
           menuContentClass,
           menuContentTypeClass,
           menuContentSideClass,
           {'menu-content-open':isMenuOpen}]">
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
   * ### 转场动画
   *
   * 动画是在Nav组件设置的, 其中, IOS默认使用```fade-right-transition```动画, 安卓默认使用```zoom-transition```.
   *
   * ### 页面切换是否需要Indicator的问题
   *
   * 添加这个功能是因为在有些使用情况下, 跳转加载大页面时会有很长时间的空白无交互期, 因此加上Indicator给用户提示正在下载将要去的页面的资源, 这个默认不开启.
   *
   * @props {String} [pageTransition] - 转场动画的名称, 可以是这里的一种: ios-transition / zoom-transition / fade-bottom-transition / fade-right-transition / fade-transition
   * @props {Boolean} [showIndicatorWhenPageChange=false] - 页面切换是否显示Indicator
   *
   * */
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
        IndicatorComponent: null,

        // ----------- Menu -----------
        isMenuOpen: false, // ion-menu开启
        menuId: null, // menuId
        menuType: '', // overlay/reveal/push  这里只处理 reveal/push
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
          import('../../indicator').then((component) => {
            this.IndicatorComponent = component.default
            this.$router.beforeEach((to, from, next) => {
              if (vm.$history.getDirection() === 'forward') {
                this.IndicatorComponent.present()
              }
              next()
            })
            this.$router.afterEach(() => {
              if (vm.$history.getDirection() === 'forward') {
                this.IndicatorComponent.dismiss()
              }
            })
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
          this.menuContentSideClass = `menu-content-${this.menuSide}`
        }
      },

      /**
       * 初始化menu组件对应的监听处理
       * @private
       * */
      initMenu () {
        // 监听menu的组件事件
        this.$eventBus.$on('onMenuOpen', (menuId) => {
          this.setMenuInfo(menuId)
          this.isMenuOpen = true
        })
        this.$eventBus.$on('onMenuClosing', () => {
          this.isMenuOpen = false
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
    }
  }
</script>
