<template>
    <article class="ion-content" :class="[refreshClass,modeClass]">
        <slot name="refresher"></slot>
        <div class="fixed-content fixed-top" :style="{'top':`${headerBarHeight}px`}">
            <slot name="fixed"></slot>
            <slot name="fixed-top"></slot>
        </div>
        <div class="fixed-content fixed-bottom" :style="{'bottom':`${footerBarHeight}px`}">
            <slot name="fixed-bottom"></slot>
        </div>
        <section ref="scrollElement" class="scroll-content" :style="scrollElementStyle"
                 :class="{'disable-scroll':isScrollDisabled}">
            <slot></slot>
        </section>
    </article>
</template>
<script type="text/javascript">
  import { parsePxUnit, transitionEnd } from '../../util/util'
  import cssFormat from '../../util/css-format'
  import ScrollView from '../../util/scroll-view'
  import addSlotNameToAttr from '../../util/add-slot-name-to-attr.js'
  import registerListener from '../../util/register-listener.js'
  import { updateImgs } from './content-util.js'

  export default {
    name: 'Content',
    inject: {
      pageComponent: 'pageComponent'
    },
    provide () {
      let _this = this
      return {
        contentComponent: _this
      }
    },
    props: {
      mode: {
        type: String,
        default () {
          return this.$config && this.$config.get('mode', 'ios') || 'ios'
        }
      },
      fullscreen: Boolean
    },
    data () {
      return {
        refreshClass: {
          'has-refresher': false
        },

        fixedElementStyle: null,  // 固定内容的位置样式
        scrollElementStyle: null, // 滑动内容的位置样式

        scrollView: new ScrollView(),  // 滚动的实例

        headerBarHeight: 0,
        footerBarHeight: 0,
        contentPaddingTop: 0,
        contentPaddingBottom: 0,

        resizeUnReg: null,

        imgs: [],      // 子组件Img的实例列表
        imgReqBfr: this.$config && this.$config.getNumber('imgRequestBuffer', 1400),  // 1400
        imgRndBfr: this.$config && this.$config.getNumber('imgRenderBuffer', 600),  // 400
        imgVelMax: this.$config && this.$config.getNumber('imgVelocityMax', 3)
      }
    },
    computed: {
      scrollElement () {
        return this.$refs.scrollElement
      },
      isBox () {
        return this.pageComponent.isBox
      },
      modeClass () {
        return `content-${this.mode}`
      },
      headerComponent () {
        return this.pageComponent.$_getHeaderComponent()
      },
      footerComponent () {
        return this.pageComponent.$_getFooterComponent()
      },
      isScrollDisabled () {
        return this.$app && this.$app.isScrollDisabled
      }
    },
    methods: {
      /**
       * @function resize
       * @description
       * 当动态添加Header/Footer/Tabs或者修改了他的属性时, 重新计算Content组件的尺寸.
       * */
      resize () {
        // 等待DOM更新完毕
        this.$nextTick(() => {
          this.$_recalculateBarDimensions()
        })
      },
      /**
       * @function scrollTo
       * @description
       * 滚动到指定位置
       * @param {Number} [x=0]            - 滚动到指定位置的x值
       * @param {Number} [y=0]            - 滚动到指定位置的y值
       * @param {Number} [duration=300]   - 滚动动画的时间
       * @param {Function=} done          - 当滚动结束时触发的回调
       * @return {Promise}                - 当回调done未定义的时候, 才返回Promise, 如果定义则返回undefined
       * */
      scrollTo (x, y, duration = 300, done) {
        return this.scrollView.scrollTo(x, y, duration, done)
      },
      /**
       * @function scrollToTop
       * @description
       * 滚动到顶部
       * @param {Number} [duration=300] - 滚动动画的时间, 默认是300ms
       * @return {Promise} 当滚动动画完毕后返回promise
       */
      scrollToTop (duration = 300) {
        return this.scrollView.scrollToTop(duration)
      },
      /**
       *
       * @function scrollToBottom
       * @description
       * 滚动到顶部
       * @param {Number} [duration=300] - 滚动动画的时间, 默认是300ms
       * @return {Promise} 当滚动动画完毕后返回promise
       */
      scrollToBottom (duration = 300) {
        return this.scrollView.scrollToBottom(duration)
      },

      /**
       * @function scrollBy
       * @description
       * 滚动到指定位置, 这个和scrollTo类似, 只不过是相对当前位置的滚动
       *
       * ```
       * 当前位置为scrollTop为`100px`, 执行`myScroll.scrollBy(0, -10)`, 则滚动到`110px`位置
       * ```
       *
       * @param {Number} x                - 滚动到指定位置的x值
       * @param {Number} y                - 滚动到指定位置的y值
       * @param {Number} [duration=300]   - 滚动动画的时间
       * @param {Function=} done          - 当滚动结束时触发的回调
       * @return {Promise}                - 当回调done未定义的时候, 才返回Promise, 如果定义则返回undefined
       * */
      scrollBy (x, y, duration = 300, done) {
        return this.scrollView.scrollBy(x, y, duration, done)
      },

      /**
       * @function scrollToElement
       * @description
       * 滚动到指定元素
       * @param {Element} el
       * @param {Number} [duration=300]   - 滚动动画的时间
       * @param {Number} [offsetX=0]
       * @param {Number} [offsetY=0]
       * @param {Function=} done          - 当滚动结束时触发的回调
       * @return {Promise}                - 当回调done未定义的时候, 才返回Promise, 如果定义则返回undefined
       * */
      scrollToElement (el, duration = 300, offsetX = 0, offsetY = 0, done) {
        return this.scrollView.scrollToElement(el, duration, offsetX, offsetY, done)
      },

      /**
       * 重新获取Footer/Header尺寸
       * @private
       * */
      $_recalculateBarDimensions () {

        // 尺寸信息一般不会再变动
        if (!this.scrollElementStyle || !this.fixedElementStyle) {
          const STYLE_TOP = this.fullscreen ? 'paddingTop' : 'marginTop'
          const STYLE_BOTTOM = this.fullscreen ? 'paddingBottom' : 'marginBottom'

          if (this.headerComponent) {
            let ele = this.headerComponent.$el
            this.headerBarHeight = parsePxUnit(window.getComputedStyle(ele).height)
          }
          if (this.footerComponent) {
            let ele = this.footerComponent.$el
            this.footerBarHeight = parsePxUnit(window.getComputedStyle(ele).height)
          }

          const StyleTop = this.headerBarHeight + (this.fullscreen ? this.contentPaddingTop : 0)
          const StyleBottom = this.footerBarHeight + (this.fullscreen ? this.contentPaddingBottom : 0)

          this.scrollElementStyle = {
            [STYLE_TOP]: cssFormat(StyleTop),
            [STYLE_BOTTOM]: cssFormat(StyleBottom)
          }

          this.fixedElementStyle = {
            [STYLE_TOP]: cssFormat(StyleTop),
            [STYLE_BOTTOM]: cssFormat(StyleBottom)
          }
        }

        // scrollElement 尺寸计算
        if (this.scrollView && this.scrollView.ev) {
          this.scrollView.ev.contentHeight = this.scrollElement.clientHeight - this.headerBarHeight - this.footerBarHeight
          this.scrollView.ev.contentTop = this.headerBarHeight
          this.scrollView.ev.contentWidth = this.scrollElement.clientWidth
        }

        // 盒子布局不需要min-height
        if (!this.isBox && this.scrollElementStyle) {
          this.scrollElementStyle.minHeight = cssFormat(window.innerHeight - this.headerBarHeight - this.footerBarHeight)
        }
      },

      /**
       * 重新计算Content组件的尺寸维度
       * 因为这部分受以下因素影响：Header，Footer
       * @private
       * */
      $_recalculateContentDimensions () {
        // 计算Header/Footer的高度尺寸
        this.$_recalculateBarDimensions()

        // 流式布局, init(获取尺寸的元素, 监听滚动的元素)
        if (this.isBox) {
          this.scrollView.init(this.scrollElement, this.scrollElement)
          // 位置记录

          // this.scrollView.getTop

        } else {
          this.scrollView.init(document.documentElement, window)
        }

        // initial imgs refresh
        this.$_imgUpdate(this.scrollView.ev)
      },

      // -------- For Refresher Component --------
      /**
       * 获取scrollElement元素的Dom
       * @private
       * */
      $_getScrollElement () {
        return this.scrollElement
      },

      /**
       * 滚动结束的事件回调
       * @param {function} callback - 过渡结束的回调, 回调传参TransitionEvent
       * @private
       */
      $_onScrollElementTransitionEnd (callback) {
        transitionEnd(this.scrollElement, callback)
      },

      /**
       * 在scrollElement上设置属性
       * @param {string} prop - 属性名称
       * @param {any} val     - 属性值
       * @private
       */
      $_setScrollElementStyle (prop, val) {
        if (this.scrollElement) {
          this.$nextTick(() => {
            this.scrollElement.style[prop] = val
          })
        }
      },

      // -------- For Img Component --------
      /**
       * @param {object} img - Img组件的实例
       * @private
       */
      $_addImg (img) {
        this.imgs.push(img)
      },

      /**
       * Img组件更新
       * @private
       */
      $_imgUpdate (ev) {
        if (ev && this.scrollView.initialized && this.imgs.length && this.$_isImgUpdatable()) {
          this.$nextTick(() => {
            updateImgs(this.imgs, ev.scrollTop, ev.contentHeight, ev.directionY, this.imgReqBfr, this.imgRndBfr)
          })
        }
      },
      /**
       * @private
       * */
      $_isImgUpdatable () {
        // 当滚动不是太快的时候, Img组件更新才被允许, 这个速度由this.imgVelMax控制
        return Math.abs(this.scrollView.ev.velocityY) < this.imgVelMax
      },
      /**
       * @private
       * */
      $_writePosition () {
        if (this.isBox) {
          requestAnimationFrame(() => {
            let _scrollPosition = window.sessionStorage.getItem(window.location.href)
            _scrollPosition && this.scrollView.scrollTo(0, _scrollPosition, 0)
          })
        }
      },
      /**
       * @private
       * */
      $_recordPosition (scrollTop) {
        if (this.isBox) {
          window.sessionStorage.setItem(window.location.href, scrollTop)
        }
      }
    },
    created () {
      // 置顶
      // window.scrollTo(0, 0)

      // 窗口变化重新计算容器
      this.resizeUnReg = registerListener(window, 'resize', () => {
        requestAnimationFrame(() => {
          // 计算并设置当前Content的位置及尺寸
          this.$root.$emit('window:resize')
          this.$_recalculateBarDimensions()
        })
      })

      /**
       * @event component:Content#onScrollStart
       * @description 滚动开始时触发的事件
       * @property {ScrollEvent} ev - 滚动事件对象
       */
      this.scrollView.scrollStart = (ev) => {
        this.$emit('onScrollStart', ev)
        this.$root && this.$root.$emit('onScrollStart', ev)
      }

      /**
       * @event component:Content#onScroll
       * @description 滚动时触发的事件
       * @property {ScrollEvent} ev - 滚动事件对象
       */
      this.scrollView.scroll = (ev) => {
        this.$emit('onScroll', ev)
        this.$root && this.$root.$emit('onScroll', ev)
        this.$_imgUpdate(ev)

        this.$_recordPosition(ev.scrollTop)
      }

      /**
       * @event component:Content#onScrollEnd
       * @description 滚动结束时触发的事件
       * @property {ScrollEvent} ev - 滚动事件对象
       */
      this.scrollView.scrollEnd = (ev) => {
        this.$emit('onScrollEnd', ev)
        this.$root && this.$root.$emit('onScrollEnd', ev)
        this.$_imgUpdate(ev)
      }

      this.$root.$emit('content:created', this)

      this.$_writePosition()
    },
    mounted () {
      // fix业务将slot的name贴到attr上, 便于class样式处理
      addSlotNameToAttr(this.$slots)

      this.contentPaddingTop = parsePxUnit(window.getComputedStyle(this.scrollElement).paddingTop)
      this.contentPaddingBottom = parsePxUnit(window.getComputedStyle(this.scrollElement).paddingBottom)

      // 计算并设置当前Content的位置及尺寸
      this.$_recalculateContentDimensions()

      this.$root.$emit('content:mounted', this)
    },
    activated () {
      this.$_writePosition()
    },
    destroyed () {
      this.resizeUnReg && this.resizeUnReg()
      this.scrollView.destroy()
    }
  }
</script>
