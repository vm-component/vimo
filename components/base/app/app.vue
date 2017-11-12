<template>
    <article class="ion-app" :version="version"
             :class="[modeClass,platformClass,hoverClass,{'disable-scroll':isScrollDisabled}]">
        <!--app-root start-->
        <section class="app-root">
            <slot></slot>
        </section>
        <!--modal portal-->
        <aside id="modalPortal"></aside>
        <!--蒙层指示,action-sheet,choose-sheet,picker等 sheetPortal-->
        <aside id="sheetPortal"></aside>
        <!--alert portal-->
        <aside id="alertPortal"></aside>
        <!--loading portal-->
        <aside id="loadingPortal"></aside>
        <!--toast portal-->
        <aside id="toastPortal"></aside>
        <!--当页面被点击的时候，防止在动画的过程中再次点击页面导致bug的蒙层，全局最高！z-index=99999-->
        <aside class="click-block"
               :class="[{'click-block-enabled':isClickBlockEnabled}]"></aside>
        <slot name="outer"></slot>
    </article>
</template>
<style lang="less">
    @import "./app.less";
</style>
<script type="text/javascript">
  /**
   * @component Base/App
   * @description
   *
   *  ## 基础组件 / App组件
   *
   * App组件是Vimo框架的根组件,用于管理及控制整个页面的状态.
   * 控制App行为的方法已挂载到`vue.prototype.$app`上, 所以在页面中直接像这样使用, 例如:
   *
   * ```
   * this.$app.setTitle('Hello World'); // 设置title
   * this.$app.isScrolling; // 获取可滚动状态
   * this.$app.isEnabled; // 获取可点击状态
   * ```
   *
   * 此外, 弹出层挂载点也在此组件中列举, 可以用id搜索到这些挂载点:
   *
   * - modalPortal
   * - sheetPortal
   * - alertPortal
   * - loadingPortal
   * - toastPortal
   *
   * ### 何为基础组件
   *
   * 因为业务的复杂多样, 如果组件全部加载, 会造成初始化的下载包过大, 所以基础组件(SPA应用框架组件)在安装Vimo的时候就全局安装, 不需要在业务中再次安装. 除此之外的组件则要按需引入.
   *
   * 布局组件就是基础组件, 比如: **App/Nav/Navbar/Page/Header/Footer/Content**, 一共7个. 这些组件不是业务组件, 组件由vimo初始化安装完毕. 此外, 如果不使用布局组件也没关系. 通过布局组件提供的方法就能知道它的作用了.
   *
   * - App: 根组件, 用于设置页面点击/滚动状态/设置文档title/设置根位置的样式
   * - Nav: 导航组件, 用于设置页面切换属性: 转场动画/转场是否显示Indicator/和Menus配合
   * - Page: 页面容器, 因为Vue要求业务template必须要使用一个根元素包裹, 故Page就是这个作用. 此外, 通过页面切换定义z-index层级.
   * - Header: 顾名思义, 页面的头部, 这部分不会页面滚动, 内部可安插Toolbar/Navbar等组件
   * - Footer: 使用方法和Header一致
   * - Content: 页面展示部分的容器, 可以使滚动内容, 也可以是固定内容, 详情参考组件介绍
   * - Nabvar: 该组件也在基础组件中, Navbar存在的意义是定义内容Title组件, 用于更新文档的Title. 页面切换在左侧显示后退按钮, 也可定义多个按钮. 使用方法和 Toolbar 一致.
   *
   * ### 可用状态(参考示例)
   *
   * - isScrolling  获取当前可滚动状态
   * - isEnabled    获取可点击状态
   *
   * ### 可在全局使用的公共样式
   *
   * -Text Alignment
   *    - [text-left]          - 文本左对齐
   *    - [text-center]        - 文本居中
   *    - [text-right]         - 文本右对齐
   *    - [text-justify]       - 文本右对齐
   *    - [text-nowrap]        - 文本不换行
   *
   *
   * -Text Transformation
   *    - [text-uppercase]     - 文本大写
   *    - [text-lowercase]     - 文本小写
   *    - [text-capitalize]    - 文本首字母大写
   *
   * -Normal
   *    - [padding]         - 结构增加padding, 默认16px
   *    - [no-padding]      - 结构去除padding
   *    - [hidden]          - display:none
   *    - .hidden           - display:none
   *
   * @props {String} [mode='ios'] - 模式, 用于在根处定义app的平台及样式
   *
   *
   * @slot 空               默认插入到正常页面中
   * @slot [outer]         插入到最外部， 用于定义在所有页面和弹出层之上的结构组件，比如：landscape-prompt组件
   *
   * @demo #/app
   * */

  import ClickBlock from './click-block'
  import { setElementClass, isString, isPresent } from '../../util/util'

  const CLICK_BLOCK_BUFFER_IN_MILLIS = 64       // click_blcok等待时间
  const CLICK_BLOCK_DURATION_IN_MILLIS = 700    // 时间过后回复可点击状态
  const clickBlockInstance = new ClickBlock()

  let scrollDisTimer = null                     // 计时器
  export default {
    name: 'App',
    data () {
      return {
        disabledTimeRecord: 0,          // 禁用计时
        scrollTimeRecord: 0,            // 滚动计时
        isScrollDisabled: false,        // 控制页面是否能滚动
        isClickBlockEnabled: false,     // 控制是否激活 '冷冻'效果 click-block-enabled

        isScrolling: false,             // 可滚动状态
        isEnabled: true,                // 可点击状态

        version: isPresent(window.VM) && window.VM.version
      }
    },
    props: {
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      }
    },
    computed: {
      modeClass () {
        return `${this.mode}`
      },
      platformClass () {
        return `platform-${this.mode}`
      },
      hoverClass () {
        let _isMobile = navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
        return _isMobile ? 'disable-hover' : 'enable-hover'
      }
    },
    methods: {
      /**
       * @function setEnabled
       * @description
       * 设置当前页面是否能点击滑动, 一般使用在像ActionSheet/Alert/Modal等弹出会出现transition动画,
       * 当transition动画进行中，页面是锁定的不能点击，因此使用该函数设定App的状态, 保证动画过程中, 用户不会操作页面
       * @param {boolean} isEnabled  - `true` for enabled, `false` for disabled
       * @param {number} duration - isEnabled=false的过期时间 当 `isEnabled` 设置为`false`, 则duration之后，`isEnabled`将自动设为`true`
       *
       * @example
       * this.$app && this.$app.setEnabled(false, 400) -> 400ms内页面不可点击, 400ms过后可正常使用
       * this.$app && this.$app.setEnabled(true) -> 64ms后解除锁定
       * */
      setEnabled (isEnabled, duration = CLICK_BLOCK_DURATION_IN_MILLIS) {
        this.disabledTimeRecord = (isEnabled ? 0 : Date.now() + duration)
        this.isEnabled = isEnabled
        if (isEnabled) {
          // disable the click block if it's enabled, or the duration is tiny
          clickBlockInstance.activate(false, CLICK_BLOCK_BUFFER_IN_MILLIS).then(() => {
            this.isEnabled = true
          })
        } else {
          // show the click block for duration + some number
          clickBlockInstance.activate(true, duration + CLICK_BLOCK_BUFFER_IN_MILLIS).then(() => {
            this.isEnabled = true
          })
        }
      },

      /**
       * @function setDisableScroll
       * @description
       * 是否点击滚动, 这个需要自己设置时间解锁
       * @param {Boolean} isScrollDisabled - 是否禁止滚动点击 true:禁止滚动/false:可以滚动
       * @param {number} duration - 时间过后则自动解锁
       * @example
       * this.$app && this.$app.setDisableScroll(true, 400) -> 400ms内页面不可滚动, 400ms过后可正常使用
       * this.$app && this.$app.setDisableScroll(false) ->立即解除锁定
       * */
      setDisableScroll (isScrollDisabled, duration = 0) {
        if (duration > 0 && isScrollDisabled) {
          this.isScrollDisabled = isScrollDisabled
          window.clearTimeout(scrollDisTimer)
          scrollDisTimer = window.setTimeout(() => {
            this.isScrollDisabled = false
          }, duration)
        }
      },

      /**
       * @function setClass
       * @description
       * 设置根组件的class样式, 比如全局颜色替换或者结构变更
       * @param {string} className - 样式名称
       * @param {boolean} [isAdd=false] - 是否添加
       */
      setClass (className, isAdd = false) {
        if (className) {
          setElementClass(this.$el, className, isAdd)
        }
      },

      /**
       * @function setDocTitle
       * @param {String|Object}  _title - 设置标题
       * @param {String}  _title.title - 标题
       * @description
       * 设置document.title的值, 如果传入的是string, 则为title的字符串, 如果是对象, 则title字段为标题名称
       * */
      setDocTitle (_title) {
        if (isString(_title)) {
          _title = {title: _title}
        }
        // BugFixed: 如果组件不是通过异步加载, 则他的执行顺序会很靠前, 此时平台的方法并未初始化完毕. 因此异步定时后在执行
        window.setTimeout(() => {
          let isHandled = !!this.$platform && !!this.$platform.setNavbarTitle && this.$platform.setNavbarTitle(_title)
          if (!isHandled) {
            document.title = _title.title || ''
          }
        }, 16 * 5)
      }
    },
    created () {
      console.assert(this.$platform, `The Component of <App> need 'platform' instance`)
      console.assert(this.$config, `The Component of <App> need 'config' instance`)

      /**
       * $app对外方法
       * */
      let proto = Reflect.getPrototypeOf(Reflect.getPrototypeOf(this))
      proto.$app = this

      const _this = this
      this.$eventBus.$on('onScrollStart', () => {
        _this.isScrolling = true
      })
      this.$eventBus.$on('onScroll', () => {
        _this.isScrolling = true
      })
      this.$eventBus.$on('onScrollEnd', () => {
        _this.isScrolling = false
      })

      // 设置当前可点击
      this.isClickBlockEnabled = true
    },
    mounted () {
      if (window.VM) {
        window.VM.$app = this
        // 用于判断组件是否在VM的组件树中
        window.VM.$root = this.$root
      }
    }
  }
</script>
