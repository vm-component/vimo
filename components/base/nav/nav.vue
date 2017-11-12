<template>
    <nav class="ion-nav"
         :class="[
           menuContentClass,
           menuContentTypeClass,
           menuContentSideClass,
           {'menu-content-open':isMenuOpen}]">
        <div v-if="isMenuOpen" @click="tapToCloseMenu" class="click-cover"></div>
        <!--animate-->
        <!--<transition :name="pageTransitionName">-->
        <slot></slot>
        <!--</transition>-->
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
   * ### 页面切换是否需要Indicator的问题
   *
   * 添加这个功能是因为在有些使用情况下, 跳转加载大页面时会有很长时间的空白无交互期, 因此加上Indicator给用户提示正在下载将要去的页面的资源, 这个默认不开启.
   *
   * @props {Boolean} [showIndicatorWhenPageChange=false] - 页面切换是否显示Indicator
   *
   * */
  export default {
    name: 'Nav',
    props: {
      // 转场是否开启Indicator
      showIndicatorWhenPageChange: {
        type: Boolean,
        default () { return this.$config && this.$config.getBoolean('showIndicatorWhenPageChange') }
      }
    },
    data () {
      return {
        // ----------- Nav -----------
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
//      this.initNav()
    }
  }
</script>
