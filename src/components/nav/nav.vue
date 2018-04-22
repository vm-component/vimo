<template>
    <nav class="ion-nav"
         :class="[
           menuContentClass,
           menuContentTypeClass,
           menuContentSideClass,
           {'menu-content-open':isMenuOpen}]">
        <div v-if="isMenuOpen" @click="tapToCloseMenu" @touchmove="stopActive($event)" class="click-cover"></div>
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
  export default {
    name: 'Nav',
    provide () {
      const _this = this
      return {
        navComponent: _this
      }
    },
    props: {
      /**
       * 转场动画名称
       * - ios-transition
       * - fade-bottom-transition
       * - zoom-transition
       * - fade-right-transition
       * - fade-transition
       * */
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
        menuContentSideClass: null,

        historyList: [],
        direction: 'forward'
      }
    },
    methods: {
      // -------- Nav --------
      /**
       * 初始化导航
       * @private
       * */
      initNav () {
        // 创建时的第一个路由
        if (!this.$router) return

        this.historyList.push(this.$route.name)
        // 注册钩子, 主要为按成路由方向的判断
        this.$router.beforeHooks.push((to, from, next) => {
          let index = this.historyList.indexOf(to.name)
          if (index === -1) {
            this.direction = `forward`
            this.pageTransitionName = `${this.pageTransition}-forward`
            this.historyList.push(to.name)
            this.$root.$emit('nav:forward')

          } else {
            this.direction = `backward`
            this.pageTransitionName = `${this.pageTransition}-backward`
            this.historyList = this.historyList.slice(0, index + 1)
            this.$root.$emit('nav:backward')

            // remove scroll position
            window.sessionStorage.removeItem(from.path)
          }
          next()
        })
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
      this.$root.$emit('nav:created', this)
    },
    mounted () {
      this.$root.$emit('nav:mounted', this)
    }
  }
</script>
