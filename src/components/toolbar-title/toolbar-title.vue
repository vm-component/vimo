<template>
  <div class="ion-title">
    <div class="toolbar-title" :class="[modeClass]"
         :style="{color:titleColor}"
         @click="titleClick" v-html="titleInner"></div>
  </div>
</template>
<script type="text/javascript">
  import {isPresent} from '../../util/type'

  export default {
    name: 'ToolbarTitle',
    inject: {
      appComponent: {
        from: 'appComponent',
        default: null
      },
      headerComponent: {
        from: 'headerComponent',
        default: null
      },
      navbarComponent: {
        from: 'navbarComponent',
        default: null
      }
    },
    data() {
      return {
        titleColor: null,
        titleInner: this.title
      }
    },
    props: {
      /**
       * mode 按钮风格
       * */
      mode: {
        type: String,
        default() {
          return isPresent(this.$config) && this.$config.get('mode', 'ios') || 'ios'
        }
      },
      /**
       * 设置的title值
       * */
      title: String
    },
    watch: {
      title() {
        this.titleInner = this.getTitle()
        if (this.isTitleInNavbar) {
          this.setTitle(this.titleInner)
        }
      }
    },
    computed: {
      modeClass() {
        return `toolbar-title-${this.mode}`
      },
      // 这个title组件在navbar中
      isTitleInNavbar() {
        return !!this.navbarComponent
      },
      // 包裹当前组件的Header在App组件中
      isHeaderInApp() {
        return !!this.appComponent && !!this.headerComponent && !!this.navbarComponent
      }
    },
    methods: {
      /**
       * @function getTitle
       * @description
       * 获取Title组件中的title, 兼容各种模式
       * @return {String}
       * */
      getTitle() {
        let _title = ''
        /**
         * 组件获取了传入的title值，之后通过全局注册的$setTitle方法
         * 设置document.title（此处做了兼容）
         * */
        if (this.title) {
          // prop传入title值
          // eg: <Title title="Toolbar"></Title>
          _title = this.title.trim()
        } else if (this.$slots.default && this.$slots.default[0] && this.$slots.default[0].text) {
          // 如果是直接写在ion-title中的值
          // eg: <Title>Toolbar</Title>
          _title = this.$slots.default[0].text.trim()
        } else if (this.$slots.default && this.$slots.default[0] && this.$slots.default[0].tag && this.$slots.default[0].children[0].text) {
          // 如果是这届下载ion-title中的值，并且包含一层标签的情况
          // eg: <Title>
          //      <span>Toolbar</span>
          //      <span>-</span>
          //      <span>Test</span>
          //    </Title>
          // -> Toolbar-Test
          this.$slots.default.forEach((item) => {
            if (item.children && item.children.length > 0 && item.children[0] && item.children[0].text) {
              _title += item.children[0].text.trim()
            }
          })
        }
        return _title
      },

      /**
       * @function setTitle
       * @description
       * 修改Header的title, 目前可用平台: H5/Alipay/Dingtalk
       * @param {String|Object} title - title
       * @param {String|Object} title.title - title
       * @param {String|Object} title.image - image
       * @param {boolean} [changeDocTitle=true] - 是否设置doc的title, 默认是同步设置的
       * */
      setTitle(title, changeDocTitle = true) {
        let _title = {}
        if (typeof title === 'string') {
          _title.title = title
          this.titleInner = title
        } else if (typeof title === 'object' && title.image) {
          _title.title = null
          _title.image = title.image
          this.titleInner = `<img src="${title.image}">`
        }
        if (changeDocTitle) {
          // 设置document的title, 这部分由$app处理
          this.$app && this.$app.setDocTitle(_title)
        }
      },

      /**
       * @function setTitleColor
       * @description
       * 设置Title文字的颜色
       * @param {String} color - color, 例如 #ff0000
       * */
      setTitleColor(color) {
        this.titleColor = color
      },

      /**
       * @function reset
       * @description
       * 重置Title文字的颜色, 目前可用平台: Alipay
       * */
      reset() {
        this.titleColor = null
        this.$platform && this.$platform.resetNavbarOptionButton && this.$platform.resetNavbarOptionButton()
      },

      /**
       * 初始化
       * 只在Navbar中的Title才会具有更新Title的特性!
       * 且, 一个Page只能拥有一个Navbar, 当在Navbar中设置Title, 则Title的方法
       * 将赋予页面Page(document.title),
       * @private
       * */
      init() {
        this.titleInner = this.getTitle()
        if (this.isTitleInNavbar) {
          this.setTitle(this.titleInner)
        }
        // if (this.isHeaderInApp) {
        //   window.VM.$title = this
        // }

        this.$root.$on('title:click', () => {
          this.$emit('title:click')
        })
      },

      /**
       * 点击标题时触发事件
       * @private
       * */
      titleClick() {
        if (this.isTitleInNavbar) {
          /**
           * @event component:Title#title:click
           * @description 点击title时触发
           */
          this.$emit('title:click', this)
        }
      }
    },
    mounted() {
      this.init()
    },
    activated() {
      // BugFix: #15, keep-alive模式下不更新title的问题
      if (this.isTitleInNavbar) {
        this.setTitle(this.titleInner)
      }
      // if (this.isHeaderInApp) {
      //   window.VM.$title = this
      // }
    }
  }
</script>
