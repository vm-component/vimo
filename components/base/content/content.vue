<template>
    <article content class="ion-content">
        <section ref="fixedElement" class="fixed-content" :style="fixedElementStyle">
            <slot name="fixed"></slot>
            <slot name="fixedTop"></slot>
            <slot name="fixedBottom"></slot>
        </section>
        <section ref="scrollElement" class="scroll-content" :style="scrollElementStyle">
            <slot></slot>
        </section>
        <slot name="refresher"></slot>
    </article>
</template>
<style lang="less">
    @import "content.less";
    @import "scroll-content.less";
</style>
<script type="text/javascript">
  /**
   * @typedef {Object} ContentDimension   - Content组件的维度尺寸信息
   * @property {number} contentHeight     - content offsetHeight,           content自身高度
   * @property {number} contentTop        - content offsetTop,               content到窗体顶部的距离
   * @property {number} contentBottom     - content offsetTop+offsetHeight,  content底部到窗体顶部的的距离
   * @property {number} contentWidth      - content offsetWidth
   * @property {number} contentLeft       - content contentLeft
   * @property {number} contentRight      - content offsetLeft + offsetWidth
   * @property {number} scrollHeight      - scroll scrollHeight
   * @property {number} scrollTop         - scroll scrollTop
   * @property {number} scrollBottom      - scroll scrollTop + scrollHeight
   * @property {number} scrollWidth       - scroll scrollWidth
   * @property {number} scrollLeft        - scroll scrollLeft
   * @property {number} scrollRight       - scroll scrollLeft + scrollWidth
   * */

  /**
   * @typedef {Object} ScrollEvent            - 滚动事件返回的滚动对象
   * @property {number} timeStamp             - 滚动事件
   * @property {number} scrollTop             -
   * @property {number} scrollLeft            -
   * @property {number} scrollHeight          -
   * @property {number} scrollWidth           -
   * @property {number} contentHeight         -
   * @property {number} contentWidth          -
   * @property {number} contentTop            -
   * @property {number} contentBottom         -
   * @property {number} startY                -
   * @property {number} startX                -
   * @property {number} deltaY                -
   * @property {number} deltaX                -
   * @property {number} velocityY             -
   * @property {number} velocityX             -
   * @property {number} directionY            -
   * @property {number} directionX            -
   * */

  /**
   * @component Base/Content
   * @description
   *
   * ## 基础组件 / Content组件
   *
   * Vimo框架的页面基础布局分为Header/Content/Footer三个部分, 也就是"上中下三明治"结构布局, Content组件则是中间业务内容的位置.
   *
   * Content组件中书写的代码可以是滚动的内容, 也可以是固定在一面不随滚动的内容, 比如说当页的广告/刷新按钮/歌词等. 这个特性的的开启需要特殊命名slot才能激活.
   *
   * 此外需要注意的是, 一个页面(Page组件)中只能有一个Content组件, 这个是Vimo使用的规则!
   *
   * Content组件中也可以加入下拉刷新和上拉加载的功能, 具体请参考示例.
   *
   * ## 不需要引入
   *
   * 是的, 基础组件是安装vimo后自动全局注册的.
   *
   * @demo #/content
   *
   * @slot 空                slot为空则将内容插入到scroll中
   * @slot [fixed]          默认值, 固定到顶部
   * @slot [fixedTop]       固定到顶部
   * @slot [fixedBottom]    固定到底部
   * @slot [refresher]      refresher组件的位置
   *
   * @fires component:Base/Content#onScrollStart
   * @fires component:Base/Content#onScroll
   * @fires component:Base/Content#onScrollEnd
   *
   *
   * @usage
   * <template>
   *  <Page>
   *    <Header>
   *      <Navbar>
   *        <Title>Demo</Title>
   *      <Navbar>
   *    </Header>
   *    <Content record-position>
   *      <h1>这里是内容</h1>
   *      <p>滚动位置将会被记录</p>
   *    </Content>
   *  </Page>
   * </template>
   *
   * */
  import { transitionEnd, parsePxUnit } from '../../util/util'
  import componentIsMatch from '../../util/componentIsMatch'
  import { updateImgs, sortTopToBottom } from './img-util'
  import cssFormat from '../../util/cssFormat'
  import ScrollView from '../../util/scroll-view'
  import addSlotNameToAttr from '../../util/addSlotNameToAttr.js'

  export default {
    name: 'Content',
    data () {
      return {
        fixedElementStyle: {},  // 固定内容的位置样式
        scrollElementStyle: {}, // 滑动内容的位置样式

        scrollView: new ScrollView(),  // 滚动的实例

        headerBarHeight: 0,
        footerBarHeight: 0,

        imgs: [],      // 子组件Img的实例列表
        imgReqBfr: this.$config && this.$config.getNumber('imgRequestBuffer', 1400),  // 1400
        imgRndBfr: this.$config && this.$config.getNumber('imgRenderBuffer', 600),  // 400
        imgVelMax: this.$config && this.$config.getNumber('imgVelocityMax', 3)
      }
    },
    provide () {
      let _this = this
      return {
        contentComponent: _this
      }
    },
    computed: {
      // fixedElement的DOM句柄
      fixedElement () {
        return this.$refs.fixedElement
      },
      // scrollConent的DOM句柄
      scrollElement () {
        return this.$refs.scrollElement
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
          this.$_recalculateContentDimensions()
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
        // 页面防止点击
        this.$app && this.$app.setDisableScroll(true, duration)
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
        // 页面防止点击
        this.$app && this.$app.setDisableScroll(true, duration)
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
        this.$app && this.$app.setDisableScroll(true, duration)
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
        this.$app && this.$app.setDisableScroll(true, duration)
        return this.scrollView.scrollToElement(el, duration, offsetX, offsetY, done)
      },

      // -------- private --------

      /**
       * 重新计算Content组件的尺寸维度
       * 因为这部分受以下因素影响：Header，Footer
       * @private
       * */
      $_recalculateContentDimensions () {
        // 获取Footer/Header信息
        let children = this.$parent.$children
        children.forEach((child) => {
          let ele = child.$el
          if (componentIsMatch(child, 'header')) {
            this.headerBarHeight = parsePxUnit(window.getComputedStyle(ele).height)
          } else if (componentIsMatch(child, 'footer')) {
            this.footerBarHeight = parsePxUnit(window.getComputedStyle(ele).height)
          }
        })

        this.scrollElementStyle = {
          marginTop: cssFormat(this.headerBarHeight),
          marginBottom: cssFormat(this.footerBarHeight),
          minHeight: cssFormat(window.innerHeight - this.headerBarHeight)
        }

        this.fixedElementStyle = {
          marginTop: cssFormat(this.headerBarHeight),
          marginBottom: cssFormat(this.footerBarHeight)
        }

        // scrollElement 尺寸计算
        this.scrollView.ev.contentHeight = this.scrollElement.clientHeight - this.headerBarHeight - this.footerBarHeight
        this.scrollView.ev.contentTop = this.headerBarHeight
        this.scrollView.ev.contentWidth = this.scrollElement.clientWidth

        // 流式布局, init(获取尺寸的元素, 监听滚动的元素)
        this.scrollView.init()

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
      }
    },
    created () {
      // 置顶
      window.scrollTo(0, 0)

      /**
       * @event component:Base/Content#onScrollStart
       * @description 滚动开始时触发的事件
       * @property {ScrollEvent} ev - 滚动事件对象
       */
      this.scrollView.scrollStart = (ev) => {
        this.$emit('onScrollStart', ev)
        this.$eventBus && this.$eventBus.$emit('onScrollStart', ev)
      }

      /**
       * @event component:Base/Content#onScroll
       * @description 滚动时触发的事件
       * @property {ScrollEvent} ev - 滚动事件对象
       */
      this.scrollView.scroll = (ev) => {
        this.$emit('onScroll', ev)
        this.$eventBus && this.$eventBus.$emit('onScroll', ev)
        this.$_imgUpdate(ev)
      }

      /**
       * @event component:Base/Content#onScrollEnd
       * @description 滚动结束时触发的事件
       * @property {ScrollEvent} ev - 滚动事件对象
       */
      this.scrollView.scrollEnd = (ev) => {
        this.$emit('onScrollEnd', ev)
        this.$eventBus && this.$eventBus.$emit('onScrollEnd', ev)
        this.$_imgUpdate(ev)
      }
    },
    mounted () {
      // fix业务将slot的name贴到attr上, 便于class样式处理
      addSlotNameToAttr(this.$slots)

      // 计算并设置当前Content的位置及尺寸
      this.$_recalculateContentDimensions()
    },
    destroyed () {
      this.scrollView.destroy()
    }
  }
</script>
