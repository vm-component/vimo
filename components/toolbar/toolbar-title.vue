<template>
    <div class="ion-title title" :class="[titleClass]">
        <div class="toolbar-title"
             :class="[toolbarTitleClass]"
             :style="{color:titleColor}"
             @click="titleClick" v-html="titleInner"></div>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Title
   * @description
   *
   *
   * ## 文档标题 / Title
   *
   * 设置顶部的title及document.title, 请使用ref获取Title组件的setTitle方法, 使用该方法会同步设置document.title(默认)
   *
   * ### 等级
   *
   * 只有在Navbar组件中的Title组件才会自动更新`document.title`的值,
   *
   *
   * ### 如何引入
   *
   * ```
   * // 引入
   * import { Toolbar, Buttons, Title } from 'vimo/components/toolbar'
   * // 安装
   * Vue.component(Toolbar.name, Toolbar)
   * Vue.component(Title.name, Title)
   * Vue.component(Buttons.name, Buttons)
   * ```
   *
   *
   * ### 如果在支付宝中
   * 如果在支付宝中, 则使用支付宝的方式设置title及其壳子的title, 可用方法如下:
   *
   * - setTitle
   * - reset
   *
   * @props {String} [mode=ios] - 模式
   * @props {String} [title] - 标题
   * @fires component:Title#onTitleClick
   * @see component:Toolbar
   * @usage
   * <template>
   *  <Page>
   *    <Header>
   *      <Navbar>
   *        <Title ref="title">Demo</Title>
   *      <Navbar>
   *    </Header>
   *    <Content>
   *      <h1>这里是内容</h1>
   *    </Content>
   *  </Page>
   * </template>
   *
   * ...
   *
   * computed: {
   *   titleComponent () {
   *     return this.$refs.title
   *   }
   * },
   * methods: {
   *   setAllTitle () {
   *      this.titleComponent.setTitle('title')
   * }
   *
   * */
  export default{
    name: 'Title',
    data () {
      return {
        titleColor: null,
        titleInner: this.title,
        isTitleInNavbar: false, // 这个title组件在navbar中
        isHeaderInApp: false // 包裹当前组件的Header在App组件中
      }
    },
    props: {
      /**
       * mode 按钮风格
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      },
      /**
       * 设置的title值
       * */
      title: [String]
    },
    computed: {
      titleClass () {
        return `title-${this.mode}`
      },
      toolbarTitleClass () {
        return `toolbar-title-${this.mode}`
      }
    },
    watch: {
      title () {
        console.log('title change')
        this.init()
      }
    },
    methods: {
      /**
       * @function getTitle
       * @description
       * 获取Title组件中的title, 兼容各种模式
       * @return {String}
       * */
      getTitle () {
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
      setTitle (title, changeDocTitle = true) {
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
          _title.title && this.$app && this.$app.setDocTitle(_title)
        }
      },

      /**
       * @function setTitleColor
       * @description
       * 设置Title文字的颜色
       * @param {String} color - color, 例如 #ff0000
       * */
      setTitleColor (color) {
        this.titleColor = color
      },

      /**
       * @function reset
       * @description
       * 重置Title文字的颜色, 目前可用平台: Alipay
       * */
      reset () {
        this.titleColor = null
        if (this.$platform.is('alipay') && window.AlipayJSBridge) {
          window.ap && window.ap.setNavigationBar({reset: true})
        }
      },

      /**
       * 初始化
       * 只在Navbar中的Title才会具有更新Title的特性!
       * 且, 一个Page只能拥有一个Navbar, 当在Navbar中设置Title, 则Title的方法
       * 将赋予页面Page(docTitle),
       * @private
       * */
      init () {
        this.titleInner = this.getTitle()
        if (this.$parent.$options._componentTag) {
          let navbarComponent = this.$parent
          if (navbarComponent.$options._componentTag.toLowerCase() === 'navbar') {
            if (document.title !== this.titleInner) {
              this.setTitle(this.titleInner)
            }
            this.isTitleInNavbar = true
          }
          if (navbarComponent.$parent.$parent.$options._componentTag.toLowerCase() === 'app') {
            this.isHeaderInApp = true
          }
        }
      },

      /**
       * 点击标题时触发事件
       * @private
       * */
      titleClick () {
        if (this.isTitleInNavbar) {
          /**
           * @event component:Title#onTitleClick
           * @description 点击title时触发
           */
          this.$emit('onTitleClick')
        }
      }
    },
    mounted () {
      this.init()
      let isAlipayReady = this.$platform && this.$platform.is('alipay') && window.AlipayJSBridge
      if (this.isTitleInNavbar && isAlipayReady) {
        /**
         * @event component:Title#onTitleClick
         * @description 点击title时触发, 目前可用平台: H5/Alipay/
         */
        window.document.addEventListener('titleClick', () => {
          this.$emit('onTitleClick')
        }, false)
      }
    }
  }
</script>
