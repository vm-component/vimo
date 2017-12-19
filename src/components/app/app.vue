<template>
    <article class="ion-app" :version="version" :id="mode"
             :style="styleObj"
             :class="[mode,modeClass,platformClass,{'disable-hover':disableHover},{'disable-scroll':disableScroll}]">
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
<style lang="scss" src="./style.scss"></style>
<script type="text/javascript">
  import { setElementClass } from '../../util/util'
  import { isPresent, isString } from '../../util/type'
  import disableHover from '../../util/disable-hover'
  import modeMixins from '../../util/mode-mixins.js'

  const CLICK_BLOCK_BUFFER_IN_MILLIS = 64       // 等待业务完毕的额外时间
  const CLICK_BLOCK_DURATION_IN_MILLIS = 700    // 时间过后回复可点击状态

  export default {
    name: 'App',
    mixins: [modeMixins],
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
        disableScroll: false,

        isClickBlockEnabled: false,     // 控制是否能点击 click-block-enabled
        isClickBlockActive: false,      // 控制是否激活 '冷冻'效果 click-block-active
        clickBlockTimer: null,
        disableScrollTimer: null,

        isScrolling: false,             // 可滚动状态
        isEnabled: true,                // 可点击状态
        scrollTop: 0,                   // 记录scrollTop, 用于disable scroll
        styleObj: {},

        version: isPresent(window.VM) && window.VM.version
      }
    },
    computed: {
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
            this.disableScrollTimer && window.clearTimeout(this.disableScrollTimer)
            this.disableScrollTimer = window.setTimeout(() => {
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
          this.$root.$emit('app:disableScroll')
          this.scrollTop = 0
          this.styleObj = {}
          this.isScrollDisabled = true

          // 如果页面高度小于窗口高度, 则不进行限制(限制没意义)
          let windowHeight = window.innerHeight
          let docHeight = window.document.documentElement.offsetHeight
          if (windowHeight >= docHeight) {
            this.disableScroll = false
            // `窗口高度:${windowHeight}, 页面高度: ${docHeight}, 当前情况setDisableScroll不生效.`
          } else {
            this.disableScroll = true
            this.scrollTop = window.scrollY
            this.styleObj = {
              top: -this.scrollTop + 'px'
            }
          }
        }
      },

      /**
       * @private
       * */
      $_enableScroll () {
        if (this.isScrollDisabled) {
          this.$root.$emit('app:enableScroll')
          this.isScrollDisabled = false
          this.disableScroll = false
          this.$nextTick(() => {
            // scrollTop lost after set position:fixed, restore it back.
            let windowHeight = window.innerHeight
            let docHeight = window.document.documentElement.offsetHeight
            if (windowHeight < docHeight && this.scrollTop > 0) {
              window.scrollTo(0, this.scrollTop)
            }
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
      let proto = this.__proto__.__proto__
      proto.$app = this
      proto.$root = this.$root
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
