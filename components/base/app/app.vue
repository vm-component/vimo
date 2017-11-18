<template>
    <article class="ion-app" :version="version"
             :style="styleObj"
             :class="[modeClass,platformClass,{'disable-hover':disableHover},{'disable-scroll':isScrollDisabled}]">
        <section class="app-root">
            <slot></slot>
        </section>
        <aside id="modalPortal"></aside>
        <aside id="sheetPortal"></aside>
        <aside id="alertPortal"></aside>
        <aside id="loadingPortal"></aside>
        <aside id="toastPortal"></aside>
        <aside class="click-block"
               :class="[{'click-block-enabled':isClickBlockEnabled,'click-block-active':isClickBlockActive}]"></aside>
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

  import { setElementClass } from '../../util/util'
  import { isString, isPresent } from '../../util/type'
  import disableHover from '../../util/disable-hover'

  const CLICK_BLOCK_BUFFER_IN_MILLIS = 64       // 等待业务完毕的额外时间
  const CLICK_BLOCK_DURATION_IN_MILLIS = 700    // 时间过后回复可点击状态

  let scrollDisTimer = null                     // 计时器
  export default {
    name: 'App',
    provide () {
      let _this = this
      return {
        appComponent: _this
      }
    },
    data () {
      return {
        disableHover: disableHover,     // 禁用计时
        isScrollDisabled: false,        // 控制页面是否能滚动

        isClickBlockEnabled: false,     // 控制是否能点击 click-block-enabled
        isClickBlockActive: false,      // 控制是否激活 '冷冻'效果 click-block-active
        timer: null,

        isScrolling: false,             // 可滚动状态
        isEnabled: true,                // 可点击状态
        scrollTop: 0,                   // 记录scrollTop, 用于disable scroll
        styleObj: {},

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
        if (isEnabled) {
          // 解锁
          if (this.isClickBlockActive) {
            this.timer && window.clearTimeout(this.timer)
            this.timer = window.setTimeout(() => {
              this.isClickBlockActive = false
              this.isEnabled = true
            }, CLICK_BLOCK_BUFFER_IN_MILLIS)
          } else {
            this.isEnabled = true
          }
        } else {
          // 枷锁
          this.isEnabled = false
          this.isClickBlockActive = true
          this.timer && window.clearTimeout(this.timer)
          this.timer = window.setTimeout(() => {
            this.isClickBlockActive = false
            this.isEnabled = true
          }, duration + CLICK_BLOCK_BUFFER_IN_MILLIS)
        }
      },

      /**
       * @function setDisableScroll
       * @description
       * 是否点击滚动, 这个需要自己设置时间解锁
       * @param {Boolean} isScrollDisabled - 是否禁止滚动点击 true:禁止滚动/false:可以滚动
       * @param {number} duration - 时间过后则自动解锁
       * @example
       * this.$app && this.$app.setDisableScroll(true) -> 页面不可滚动
       * this.$app && this.$app.setDisableScroll(true, 400) -> 400ms内页面不可滚动, 400ms过后可正常使用
       * this.$app && this.$app.setDisableScroll(false) ->立即解除锁定
       * */
      setDisableScroll (isScrollDisabled, duration = 0) {
        if (isScrollDisabled) {
          // duration ms内页面不可滚动, duration ms过后可正常使用
          this.$_disableScroll()
          if (duration > 0) {
            window.clearTimeout(scrollDisTimer)
            scrollDisTimer = window.setTimeout(() => {
              this.$_enableScroll()
            }, duration)
          }
        } else {
          // 立即解除锁定
          this.$_enableScroll()
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
      },

      /**
       * @param {Boolean} shouldShow
       * @param {Number} [expire=100]
       * @return {Promise}
       * @private
       * */
      $_activate (shouldShow, expire = 100) {
        return new Promise((resolve) => {
          if (this.isEnabled !== shouldShow) {
            this.isEnabled = shouldShow

            window.setTimeout(() => {
              this.isEnabled = false
            }, expire)
          } else {
            resolve()
          }
        })
      },

      /**
       * @private
       * */
      $_disableScroll () {
        if (!this.isScrollDisabled) {
          this.isScrollDisabled = true
          this.scrollTop = window.scrollY
          this.styleObj = {
            top: -this.scrollTop + 'px'
          }
        }
      },

      /**
       * @private
       * */
      $_enableScroll () {
        if (this.isScrollDisabled) {
          this.isScrollDisabled = false
          // scrollTop lost after set position:fixed, restore it back.
          this.$nextTick(() => {
            window.scrollTo(0, this.scrollTop)
          })
        }
      },

      /**
       * @private
       * */
      $_addChild (vm) {
        this.$children.push(vm)
      },

      /**
       * @private
       * */
      $_removeChild (vm) {
        let uid = vm._uid
        let index = this.$children.map((item) => item._uid).indexOf(uid)
        this.$children.splice(index, 1)
      }
    },
    created () {
      let proto = Reflect.getPrototypeOf(Reflect.getPrototypeOf(this))
      proto.$app = this

      this.$root.$on('onScrollStart', () => {
        this.isScrolling = true
      })
      this.$root.$on('onScroll', () => {
        this.isScrolling = true
      })
      this.$root.$on('onScrollEnd', () => {
        this.isScrolling = false
      })

      this.$root.$emit('app:created', this)
    },
    mounted () {
      // 设置当前可点击
      this.isClickBlockEnabled = true

      // for debug
      if (window.VM) {
        window.VM.$app = this
        window.VM.$root = this.$root
      }
      this.$root.$emit('app:mounted', this)
    }
  }
</script>