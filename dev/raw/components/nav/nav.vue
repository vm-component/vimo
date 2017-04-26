<template>
    <nav class="ion-nav"
         :class="[menuContentClass,menuContentTypeClass,{'menu-content-open':isMenuOpen}]"
         :style="menuStyleObj">
        <div nav-viewport></div>
        <div v-if="isMenuOpen" @click="tapToCloseMenu" class="click-cover"></div>
        <!--animate-->
        <transition :name="pageTransition">
            <slot></slot>
        </transition>
        <div class="nav-decor"></div>
    </nav>
</template>
<script>

  /**
   * @component base/nav
   * @description
   *
   * asdf
   * */
  export default{
    name: 'Nav',
    props: {
      animate: [String]
    },
    data(){
      return {
        // -------- Nav --------
        // ios-transition/fade-bottom-transition/zoom-transition/fade-right-transition
        pageTransitionName: this.$config.get('pageTransition', 'ios-transition'),
        pageTransitionDirection: '',

        // ----------- Menu -----------
        menuStyleObj: {
          transform: '',
        },

        isMenuOpen: false, // ion-menu开启
        menuId: null, // menuId
        menuType: '', // "overlay", "reveal", "push"  这里只处理 reveal/push
        menuSide: 'left', // 方向
        menuContentClass: null,
        menuContentTypeClass: null,
        transform: !!VM && !!VM.platform && !!VM.platform.css ? VM.platform.css.transform : 'webkitTransform',
      }
    },
    computed: {
      pageTransition(){
        if (!!this.animate) {
          return `${this.animate}-${this.pageTransitionDirection}`
        } else {
          return `${this.pageTransitionName}-${this.pageTransitionDirection}`
        }
      }
    },
    methods: {
      // -------- Nav --------
      initNav(){

        // pageTransitionName 传值问题
        let _pageTransitionName = this.$config.get('pageTransition')
        if (!_pageTransitionName) {
          if (this.$config.get('mode') === 'ios') {
            _pageTransitionName = 'ios-transition'
          } else {
            _pageTransitionName = 'zoom-transition'
          }
          this.pageTransitionName = _pageTransitionName
        }

        // nav 动画切换部分
        this.$eventBus.$on('onNavEnter', ({to, from, next}) => {
          this.pageTransitionDirection = 'forward'
          this.$app && this.$app.setEnabled(false, 500)
          next()
        })
        this.$eventBus.$on('onNavLeave', ({to, from, next}) => {
          this.pageTransitionDirection = 'backward'
          this.$app && this.$app.setEnabled(false, 500)
          next()
        })
      },

      // ----------- Menu -----------
      /**
       * 点击nav关闭Menu
       * */
      tapToCloseMenu(){
        const _this = this
        _this.$nextTick(function () {
          _this.isMenuOpen && _this.$menus.close()
        })
      },

      /**
       * 设置Menu的信息
       * */
      setMenuInfo(menuId){
        if (!!menuId) {
          this.menuId = menuId
          this.menuSide = this.$menus.menuIns[menuId].side
          this.menuType = this.$menus.menuIns[menuId].type
          this.menuContentClass = `menu-content`
          this.menuContentTypeClass = `menu-content-${this.menuType}`
        }
      },

      /**
       * 初始化menu组件对应的监听处理
       * */
      initMenu(){
        let _translateX
        const _this = this
        // 监听menu的组件事件
        _this.$eventBus.$on('onMenuOpen', function (menuId) {
          _this.setMenuInfo(menuId)
          _this.isMenuOpen = true

          // 获取开口读, 宽度小于340px的的屏幕开口度为264px
          // 大于340px的屏幕开口度为304px
          if (this.$platform.width() > 340) {
            _translateX = 304
          } else {
            _translateX = 264
          }

          if (_this.menuType === 'reveal' || _this.menuType === 'push') {
            if (_this.menuSide === 'left') {
              _this.menuStyleObj[_this.transform] = `translateX(${_translateX}px)`
            } else {
              _this.menuStyleObj[_this.transform] = `translateX(-${_translateX}px)`
            }
          }

        })

        _this.$eventBus.$on('onMenuClosing', function (menuId) {
          _this.isMenuOpen = false
          if (_this.menuType === 'reveal' || _this.menuType === 'push') {
            _this.menuStyleObj[_this.transform] = 'translateX(0)'
          }
        })
        _this.$eventBus.$on('onMenuClosed', function () {
          _this.menuContentTypeClass = null
        })
      }
    },
    created(){
      // 初始化menu组件对应的监听处理
      this.initMenu()

      this.initNav()

    }
  }
</script>
<style scoped lang="scss">
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