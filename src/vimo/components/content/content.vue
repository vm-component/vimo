<template>
  <article class="ion-content outer-content" :class="[modeClass,{'statusbar-padding':statusbarPadding}]">
    <section ref="fixedElement" class="fixed-content" :style="fixedElementStyle">
      <!--Fixed Top-->
      <div fixed top>
        <slot name="fixed"></slot>
        <slot name="fixedTop"></slot>
      </div>
      <!--Fixed Bottom-->
      <div fixed bottom>
        <slot name="fixedBottom"></slot>
      </div>
    </section>
    <section ref="scrollElement" class="scroll-content" :style="scrollElementStyle">
      <!--<section   ref="scrollElement" class="scroll-content" id="wrapper"  :style="scrollElementStyle">-->
      <!--默认是能滚动的内容   -->
      <!--<div id="scroller">-->
      <!--<slot></slot>-->
      <!--</div>-->
      <slot></slot>
    </section>
    <slot name="refresher"></slot>
  </article>
</template>

<script type="text/ecmascript-6">
  // /**
  //  * @name Content组件
  //  * @module components/Content
  //  * @description
  //  *
  //  * 页面基础布局分为Header/Content/Footer, 而Content组件则是中间业务内容的位置,
  //  * Content内容为可滚动内容, 当然, 设置slot=fixed可以固定在页面, 详细请参考下方API.
  //  * 需要注意的是, 一个页面(Page)中只能有一个Content组件, 切记.
  //  *
  //  * 对于内容超出页面高度的情况, 将使用css的特性: "overflow-y:scorll; -webkit-overflow-scrolling: touch;"处理, 如果需要的滚动更为顺畅, 请使用Scroll组件, 它是iScroll的包装.
  //  *
  //  * 此外, 设置slot="pullToRefresh"可以引入Refresher组件
  //  *
  //  *
  //  * @param {Boolean=} fullscreen - 是否全屏显示的控制, 如果为true, 则content的上下将延伸到Header和Footer的下面
  //  * @param {String=} mode - 样式模式
  //  *
  //  *
  //  * */


  /**
   * @name Content组件
   * @module Components/Content
   * @description
   *
   * 页面基础布局分为Header/Content/Footer, 而Content组件则是中间业务内容的位置,
   * Content内容为可滚动内容, 当然, 设置slot=fixed可以固定在页面, 详细请参考下方API.
   * 需要注意的是, 一个页面(Page)中只能有一个Content组件, 切记.
   *
   * 对于内容超出页面高度的情况, 将使用css的特性: "overflow-y:scorll; -webkit-overflow-scrolling: touch;"处理, 如果需要的滚动更为顺畅, 请使用Scroll组件, 它是iScroll的包装.
   *
   * ## 二级标题
   * ## 二级标题
   * 此外, 设置slot="pullToRefresh"可以引入Refresher组件.
   * 此外, 设置slot="pullToRefresh"可以引入Refresher组件.
   * 此外, 设置slot="pullToRefresh"可以引入Refresher组件.
   *
   *
   *
   *
   *
   * @property {Boolean=} fullscreen - 是否全屏显示的控制, 如果为true, 则content的上下将延伸到Header和Footer的下面
   * @property {String=} mode - 样式模式
   *
   * @example
   * // returns 2
   * globalNS.method1(5, 10);
   * @example
   * // returns 3
   * globalNS.method(5, 15);
   * @example

   * // returns 3
   * globalNS.method(5, 15);

   * @returns {Number} Returns the value of x for the equation.
   *
   * @listens onChange - 监听onChange事件, 事件有$eventBus传递, 参数为:
   *
   *
   *
   * @see {@link foo} for further information.
   * @see {@link http://github.com|GitHub}
   *
   *
   * */


  import { getStyle, setElementClass, transitionEnd } from '../../util/dom'
  import { getNum, removeArrayItem } from '../../util/util'
  // import iScroll from '../../util/iscroll'
  // import dutil from '../../util/demoUtils'

  import { ScrollView } from '../../util/scroll-view'

  export default{
    name: 'Content',
    props: {
      fullscreen: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: VM.config.get('mode', 'ios')
      }
      // useIScroll:{
      //   type:Boolean,
      //   default:false
      // },
      // scrollX:{
      //   type:Boolean,
      //   default:false
      // },
      // snap:{
      //   type:Boolean,
      //   default:true
      // },
      // snapSpeed:{
      //   type:Boolean,
      //   default:true
      // },
      // keyBindings:{
      //   type:Boolean,
      //   default:true
      // },
      // indicatorsEl:{
      //   type:String,
      //   default:"indicator"
      // },
      // indicatorResize:{
      //   type:Boolean,
      //   default:true
      // },
      // stemplate:{
      //   type:String,
      //   default:"#wrapper"
      // }
    },
    data(){
      return {
        fixedElementStyle: {}, // 固定内容的位置样式
        scrollElementStyle: {}, // 滑动内容的位置样式

        scrollElement: null, // scrollConent的DOM句柄
        fixedElement: null, // fixedElement的DOM句柄

        headerElement: null, //Header组件的DOM句柄
        footerElement: null, //footer组件的DOM句柄
        tabsElement: null, //tabs组件的DOM句柄

        // 第一次进入需要判断header和footer的高度,进而调整content组件的尺寸.
        // 但是, 设置了样式后需要在$nextTick中读取content尺寸才是正确的结果
        // (更新了header/footer的样式并不代表实际更新DOM)
        isDomReady: false,

        statusBarHeight: 20,
        headerBarHeight: 0,
        footerBarHeight: 0,

        // 是否有statusbar的padding, 高度固定为20px
        statusbarPadding: VM.config.getBoolean('statusbarPadding', false),

        _scroll: null, // 滚动的实例
        _cTop: 0,     // content top
        _cBottom: 0,  // content bottom
        _fTop: 0,     // fixex top
        _fBottom: 0,  // fixex bottom
        _pTop: 0,     // padding top
        _pBottom: 0,  // padding bottom

        _imgs: [], // 子组件Img的实例列表
        _imgReqBfr: 0, // 1400
        _imgRndBfr: 0, // 400
        _imgVelMax: 0,
      }
    },
    computed: {
      modeClass(){
        return `content-${this.mode}`
      },
    },
    watch: {
      // 当值改变是，重新设置
      fullscreen () {
        this.recalculateContentDimensions()
      }
    },
    methods: {

      /**
       * DOM完毕后进行初始化
       * */
      init(){

        if (this.scrollElement) return;

        const scroll = this._scroll; // 滚动的实例
        const _this = this;

        /**
         * 找到fixedElement/scrollElement的位置
         * */
        scroll.ev.fixedElement = this.fixedElement = this.$refs.fixedElement;
        scroll.ev.scrollElement = this.scrollElement = this.$refs.scrollElement;

        /**
         * 注册滚动事件
         * */
        // 改写 滚动开始 的回调
        scroll.scrollStart = (ev) => {
          this.$eventBus.$emit('onScrollStart', ev);
        };

        // 改写 滚动中 的回调
        scroll.scroll = (ev) => {
          // remind the app that it's currently scrolling
          this.$app.setScrolling();
          this.$eventBus.$emit('onScroll', ev);

          // img更新
          this.imgsUpdate();
        };

        // 改写 滚动结束 的回调
        scroll.scrollEnd = (ev) => {
          this.$eventBus.$emit('onScrollEnd', ev);

          // img更新
          this.imgsUpdate();
        };

        /**
         * 计算并设置当前Content的位置及尺寸
         * */
        this.recalculateContentDimensions()

        /**
         * Page -> Content
         * Content组件必须是在Page组件内部才向页面this注入控制权
         * */
        if (!!_this.$parent.$options._componentTag && _this.$parent.$options._componentTag.toLowerCase() === 'page') {
          // 将参数传给调用的页面(注入到业务页面的this中), context为调用的上下文
          this.$vnode.context.$content = {
            '_href': window.location.href,
            'contentElement': this,
            'fixedElement': this.fixedElement,
            'scrollElement': this.scrollElement,
            'headerElement': this.headerElement,
            'footerElement': this.footerElement,

            'getContentDimensions': this.getContentDimensions,
            'resize': this.resize,

            'scrollTo': this.scrollTo,
            'scrollToTop': this.scrollToTop,
            'scrollToBottom': this.scrollToBottom,

            'scrollTop': this.scrollElement.scrollTop
          }
        }

      },

      /**
       * 重新计算Content组件的尺寸维度
       * 因为这部分受以下因素影响：statusbarPadding、fullscreen、Header，Footer
       * */
      recalculateContentDimensions(){

        const scrollEle = this.scrollElement;
        if (!scrollEle) {
          console.assert(false, 'this.scrollElement should be valid');
          return;
        }

        const fixedEle = this.fixedElement;
        if (!fixedEle) {
          console.assert(false, 'this.fixedElement should be valid');
          return;
        }

        // 如果滚动实例_scroll不存在
        // 则直接返回
        if (!this._scroll) return;
        let scrollEvent = this._scroll.ev;

        let ele = this.$el; // HTMLElement

        // 获取Footer/Header信息
        let computedStyle;
        let tagName;
        let children = this.$parent.$children;
        children.forEach((child) => {
          ele = child.$el;
          tagName = child.$options._componentTag.toLowerCase();
          if (tagName === 'header') {
            this.headerElement = scrollEvent.headerElement = ele;
            computedStyle = getComputedStyle(this.headerElement);
            this.headerBarHeight = parsePxUnit(computedStyle.height);
          } else if (tagName === 'footer') {
            this.footerElement = scrollEvent.footerElement = ele;
            computedStyle = getComputedStyle(this.footerElement);
            this.footerBarHeight = parsePxUnit(computedStyle.height);
          }
        });

        // 获取Content信息
        scrollEvent.contentElement = this.$el;
        if (this.fullscreen) {
          computedStyle = getComputedStyle(this.$el);
          this._pTop = parsePxUnit(computedStyle.paddingTop);
          this._pBottom = parsePxUnit(computedStyle.paddingBottom);
        }

        // Content的位置值
        this._cTop = this.headerBarHeight; // contentTop
        this._cBottom = this.footerBarHeight;

        // Fixed的位置值和Content相等, 但是属性可能不一样
        this._fTop = this._cTop;
        this._fBottom = this._cBottom;

        // 如果是fullscreen的话,padding还需要计算之前的值, 一般为16px
        if (this.fullscreen) {
          this._cTop += this._pTop;
          this._cBottom += this._pBottom;
        }

        // 默认为fullscreen未开启状态, 使用margin属性
        let topProperty = 'marginTop';
        let bottomProperty = 'marginBottom';
        let fixedTop = this._fTop;
        let fixedBottom = this._fBottom;

        // 如果fullscreen开启, 使用padding属性
        if (this.fullscreen) {
          console.assert(this._pTop >= 0, '_paddingTop has to be positive');
          console.assert(this._pBottom >= 0, '_paddingBottom has to be positive');

          // 调整Content组件的padding属性, 使得content中的内容在Header和Footer下方滚动,
          topProperty = 'paddingTop';
          bottomProperty = 'paddingBottom';
        }

        // update top margin if value changed
        console.assert(this._cTop >= 0, 'contentTop has to be positive');
        console.assert(fixedTop >= 0, 'fixedTop has to be positive');

        (scrollEle.style)[topProperty] = cssFormat(this._cTop);
        fixedEle.style.marginTop = cssFormat(fixedTop);

        // update bottom margin if value changed
        console.assert(this._cBottom >= 0, 'contentBottom has to be positive');
        console.assert(fixedBottom >= 0, 'fixedBottom has to be positive');

        (scrollEle.style)[bottomProperty] = cssFormat(this._cBottom);
        fixedEle.style.marginBottom = cssFormat(fixedBottom);

        // 计算Content组件的维度信息, 写入scrollEvent中
        const contentDimensions = this.getContentDimensions();
        scrollEvent.scrollHeight = contentDimensions.scrollHeight;
        scrollEvent.scrollWidth = contentDimensions.scrollWidth;
        scrollEvent.contentHeight = contentDimensions.contentHeight;
        scrollEvent.contentWidth = contentDimensions.contentWidth;
        scrollEvent.contentTop = contentDimensions.contentTop;
        scrollEvent.contentBottom = contentDimensions.contentBottom;

        // 初始化_scroll滚动对象
        // this._scroll.init(this.scrollElement, this._cTop, this._cBottom);
        this._scroll.init(this.scrollElement, scrollEvent.contentTop, scrollEvent.contentBottom);

        // initial imgs refresh
        this.imgsUpdate();
      },

      /**
       * 计算content的dimensions，以下都是固有属性，只读！
       * @return {object} contentDimensions纬度尺寸
       * Returns the content and scroll elements' dimensions.
       * @returns {object} dimensions       content and scroll elements' dimensions
       * {number} dimensions.contentHeight  content offsetHeight            content自身高度
       * {number} dimensions.contentTop     content offsetTop               content到窗体顶部的距离
       * {number} dimensions.contentBottom  content offsetTop+offsetHeight  content底部到窗体顶部的的距离
       * {number} dimensions.contentWidth   content offsetWidth
       * {number} dimensions.contentLeft    content offsetLeft
       * {number} dimensions.contentRight   content offsetLeft + offsetWidth
       * {number} dimensions.scrollHeight   scroll scrollHeight
       * {number} dimensions.scrollTop      scroll scrollTop
       * {number} dimensions.scrollBottom   scroll scrollTop + scrollHeight
       * {number} dimensions.scrollWidth    scroll scrollWidth
       * {number} dimensions.scrollLeft     scroll scrollLeft
       * {number} dimensions.scrollRight    scroll scrollLeft + scrollWidth
       * */
      getContentDimensions(){
        const scrollEle = this.scrollElement;
        const parentElement = scrollEle.parentElement;

        return {
          contentHeight: parentElement.offsetHeight - this._cTop - this._cBottom,
          contentHeight2: scrollEle.offsetHeight,
          contentTop: this._cTop,
          contentBottom: parentElement.offsetHeight - this._cBottom,

          contentWidth: parentElement.offsetWidth,
          contentLeft: parentElement.offsetLeft,

          scrollHeight: scrollEle.scrollHeight,
          scrollTop: scrollEle.scrollTop,

          scrollWidth: scrollEle.scrollWidth,
          scrollLeft: scrollEle.scrollLeft,
        };

      },

      /**
       * 重新计算scroll的尺寸，当动态添加header/footer/tabs或者修改了他的属性
       * */
      resize(){
        this.recalculateContentDimensions();
      },

      /**
       * 滚动到一个位置
       * @param {Number} x - The x-value to scroll to.
       * @param {Number} y - The y-value to scroll to.
       * @param {Number} duration - Duration of the scroll animation in milliseconds.
       * @param {Function=} done - 当滚动结束时触发的回调
       * @return {Promise} 当回调done未定义的时候, 才返回Promise, 如果定义则返回undefined
       * */
      scrollTo (x, y, duration = 300, done) {
        console.debug(`content, scrollTo started, y: ${y}, duration: ${duration}`);
        return this._scroll.scrollTo(x, y, duration, done);
      },

      /**
       * 滚动到顶部
       * @param {Number} duration - 滚动动画的时间, 默认是300ms
       * @return {promise} 当滚动动画完毕后返回promise
       */
      scrollToTop(duration = 300) {
        console.debug(`content, scrollToTop, duration: ${duration}`);
        // 页面防止点击
        this.$app.setDisableScroll(true, 320);
        return this._scroll.scrollToTop(duration);
      },
      /**
       * 滚动到底部
       * @param {Number} duration - 滚动动画的时间, 默认是300ms
       * @return {promise} 当滚动动画完毕后返回promise
       */
      scrollToBottom(duration = 300) {
        console.debug(`content, scrollToBottom, duration: ${duration}`);
        // 页面防止点击
        this.$app.setDisableScroll(true, 320);
        return this._scroll.scrollToBottom(duration);
      },

      // -------- For Refresher Component --------
      /**
       * 获取滚动元素
       * */
      getScrollElement(){
        return this.scrollElement
      },

      /**
       * @private
       * @callback callback
       * @param {TransitionEvent} ev
       * @return {void}
       */
      onScrollElementTransitionEnd(callback) {
        transitionEnd(this.scrollElement, callback);
      },

      /**
       * 在scrollElement上设置属性
       * @private
       * @param {string} prop
       * @param {any} val
       */
      setScrollElementStyle(prop, val) {
        if (this.scrollElement) {
          this.$nextTick(() => {
            if (this.scrollElement) {
              (this.scrollElement.style)[prop] = val;
            }
          })
        }
      },

      // -------- For VirtualScroll Component --------
      /**
       * @private
       */
      enableJsScroll() {
        this._scroll.enableJsScroll(this._cTop, this._cBottom);
      },

      // -------- For Img Component --------
      /**
       * @private
       * @param {object} img - Img组件的实例
       */
      addImg(img){
        this._imgs.push(img);
      },
      /**
       * @private
       *  @param {object} img - Img组件的实例
       */
      removeImg(img) {
        removeArrayItem(this._imgs, img);
      },

      /**
       * Img组件更新
       * @private
       */
      imgsUpdate(){
        if (this._scroll.initialized && this._imgs.length && this.isImgsUpdatable()) {
          let contentDimensions = this.getContentDimensions();
          this.$nextTick(() => {
            updateImgs(this._imgs, contentDimensions.scrollTop, contentDimensions.contentHeight, contentDimensions.directionY, this._imgReqBfr, this._imgRndBfr);
          })
        }
      },

      /**
       * @private
       */
      isImgsUpdatable() {
        // 当滚动不是太快的时候, Img组件更新才被允许, 这个速度由this.imgVelMax控制
        return Math.abs(this._scroll.ev.velocityY) < this._imgVelMax;
      }

    },
    created () {
      // 页面进入前完成非DOM操作部分
      this.statusbarPadding = this.$config.getBoolean('statusbarPadding', false);
      this._imgReqBfr = this.$config.getNumber('imgRequestBuffer', 1400);
      this._imgRndBfr = this.$config.getNumber('imgRenderBuffer', 600);
      this._imgVelMax = this.$config.getNumber('imgVelocityMax', 3);
      this._scroll = new ScrollView();
      this._imgs = [];
    },
    mounted() {
      // 初始化
      this.init();
    }
  }

  /**
   * @param {string} val
   * @return {number}
   * */
  function parsePxUnit (val) {
    return (!!val && val.indexOf('px') > 0) ? parseInt(val, 10) : 0;
  }

  /**
   * @param {string} val
   * @return {string}
   * */
  function cssFormat (val) {
    return (val > 0 ? val + 'px' : '');
  }

  /**
   * 对两个img组件根据top排序
   * @param {object} a - Img组件实例
   * @param {object} b - Img组件实例
   * @return {number}
   * */
  function sortTopToBottom (a, b) {
    if (a.top < b.top) {
      return -1;
    }
    if (a.top > b.top) {
      return 1;
    }
    return 0;
  }

  /**
   * @param {Img[]} imgs
   * @param {number} viewableTop
   * @param {number} contentHeight
   * @param {string} scrollDirectionY
   * @param {number} requestableBuffer
   * @param {number} renderableBuffer
   * */
  function updateImgs (imgs, viewableTop, contentHeight, scrollDirectionY, requestableBuffer, renderableBuffer) {
    // ok, so it's time to see which images, if any, should be requested and rendered
    // ultimately, if we're scrolling fast then don't bother requesting or rendering
    // when scrolling is done, then it needs to do a check to see which images are
    // important to request and render, and which image requests should be aborted.
    // Additionally, images which are not near the viewable area should not be
    // rendered at all in order to save browser resources.
    const viewableBottom = (viewableTop + contentHeight);
    const priority1 = []; //: Img[]
    const priority2 = []; //: Img[]
    let img; // 每个Img的实例;

    // all images should be paused
    for (var i = 0, ilen = imgs.length; i < ilen; i++) {
      img = imgs[i];

      if (scrollDirectionY === 'up') {
        // scrolling up
        if (img.getTop() < viewableBottom && img.getBottom() > viewableTop - renderableBuffer) {
          // 可视区向上移动, 图片在可是区域或者在可视区域的上面一点, 按照滚动方向即将要看到图片
          img.canRequest = img.canRender = true;
          priority1.push(img);
          continue;
        }

        if (img.getBottom() <= viewableTop && img.getBottom() > viewableTop - requestableBuffer) {
          // 可视区向上移动, 图片在可视区的上面, 还未进入, 但是需要提前发出图片请求
          img.canRequest = true;
          img.canRender = false;
          priority2.push(img);
          continue;
        }

        if (img.getTop() >= viewableBottom && img.getTop() < viewableBottom + renderableBuffer) {
          // 可视区向上移动, 图片在可视区的下面, 所以按照这个方向移动, 是不会再看到图片,
          // 但是图片还是可能在renderable area, 故不需要reset
          img.canRequest = img.canRender = false;
          continue;
        }

      } else {
        // scrolling down
        if (img.getBottom() > viewableTop && img.getTop() < viewableBottom + renderableBuffer) {
          // 可视区向下移动,  图片在可是区域或者在可视区域的下面一点, 按照滚动方向即将要看到图片
          img.canRequest = img.canRender = true;
          priority1.push(img);
          continue;
        }

        if (img.getTop() >= viewableBottom && img.getTop() < viewableBottom + requestableBuffer) {
          // 可视区向下移动, 图片在可视区的下面, 还未进入, 但是需要提前发出图片请求
          img.canRequest = true;
          img.canRender = false;
          priority2.push(img);
          continue;
        }

        if (img.getBottom() <= viewableTop && img.getBottom() > viewableTop - renderableBuffer) {
          // 可视区向下移动, 图片在可视区的上面, 所以按照这个方向移动, 是不会再看到图片,
          // 但是图片还是可能在renderable area, 故不需要reset
          img.canRequest = img.canRender = false;
          continue;
        }
      }

      img.canRequest = img.canRender = false;
      img.reset();
    }

    // update all imgs which are viewable
    priority1.sort(sortTopToBottom).forEach(i => i.update());

    if (scrollDirectionY === 'up') {
      // scrolling up
      priority2.sort(sortTopToBottom).reverse().forEach(i => i.update());

    } else {
      // scrolling down
      priority2.sort(sortTopToBottom).forEach(i => i.update());
    }
  }


</script>
<style lang="scss">
  @import './content';
  @import './content.ios';
  @import './content.md';
  @import './content.wp';
</style>
