<template>
  <article class="ion-content outer-content" :class="[modeClass,{'statusbar-padding':statusbarPadding}]">
    <section ref="fixedContent" class="fixed-content" :style="fixedContentStyle">
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
    <section ref="scrollContent" class="scroll-content" :style="scrollContentStyle">
      <!--<section   ref="scrollContent" class="scroll-content" id="wrapper"  :style="scrollContentStyle">-->
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
  /**
   * @name Content组件
   * @module components/Content
   * @description
   *
   * 页面基础布局分为Header/Content/Footer, 而Content组件则是中间业务内容的位置,
   * Content内容为可滚动内容, 当然, 设置slot=fixed可以固定在页面, 详细请参考下方API.
   * 需要注意的是, 一个页面(Page)中只能有一个Content组件, 切记.
   *
   * 对于内容超出页面高度的情况, 将使用css的特性: "overflow-y:scorll; -webkit-overflow-scrolling: touch;"处理, 如果需要的滚动更为顺畅, 请使用Scroll组件, 它是iScroll的包装.
   *
   * 此外, 设置slot="pullToRefresh"可以引入Refresher组件
   *
   *
   * @param {Boolean=} fullscreen - 是否全屏显示的控制, 如果为true, 则content的上下将延伸到Header和Footer的下面
   * @param {String=} mode - 样式模式
   *
   *
   * */
  import { getStyle, setElementClass } from '../../util/dom'
  import { getNum } from '../../util/util'
  // import iScroll from '../../util/iscroll'
  // import dutil from '../../util/demoUtils'

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
        fixedContentStyle: {}, // 固定内容的位置样式
        scrollContentStyle: {}, // 滑动内容的位置样式
        dimensions: {}, // content内容的尺寸
        isScrolling: false, // 判断是否滚动

        scrollContent: null, // scrollConent的DOM句柄
        fixedContent: null, // fixedContent的DOM句柄
        contentDimensions: null,
        scrollDimensions: null,

        scrollPadding: 0, // scroll-content的paddingBottom，用于键盘的显示
        originalScrollPadding: 0, // 原始的scrollPaddingBottom的值
        isInputting: false, // 正在输入

        // 是否有statusbar的padding, 高度固定为20px
        statusbarPadding: VM.config.getBoolean('statusbarPadding', false),

        // 第一次进入需要判断header和footer的高度,进而调整content组件的尺寸.
        // 但是, 设置了样式后需要在$nextTick中读取content尺寸才是正确的结果
        // (更新了header/footer的样式并不代表实际更新DOM)
        isDomReady: false,

        statusBarHeight: 20,
        headerBarHeight: 0,
        footerBarHeight: 0,
      }
    },
    computed: {
      modeClass(){
        return `content-${this.mode}`
      }
    },
    watch: {
      // 当值改变是，重新设置
      fullscreen () {
        this.computeScrollContentStyle()
      }
    },
    methods: {
      /**
       * 计算scrollContent的样式
       * 因为这部分首一下因素影响：statusbarPadding、fullscreen、Header，Footer
       * */
      computeScrollContentStyle () {
        let _this = this;
        let _styleType;
        let headerBarMinHeight = this.$config.get('toolbarMinHeight', 44);

        // 得到header和footer的高度
        // 一般情况下，ion-conent在ion-page中是唯一的，但是在ion-menu组件中也包含ion-content
        // 所以ion-header和ion-footer的高度应该在父组件的子组件中查找，这样计算高度才有意义
        // 而不是全局
        _this.$parent.$children.forEach((item) => {
          if (!!item.$options._componentTag && item.$options._componentTag.toLowerCase() === 'header') {
            _this.headerBarHeight = getStyle(item.$el, 'height');
            if (_this.headerBarHeight === 'auto') {
              _this.headerBarHeight = headerBarMinHeight
            } else {
              _this.headerBarHeight = getNum(_this.headerBarHeight)
            }
          }
          if (!!item.$options._componentTag && item.$options._componentTag.toLowerCase() === 'footer') {
            _this.footerBarHeight = getStyle(item.$el, 'height');
            if (_this.footerBarHeight === 'auto') {
              _this.footerBarHeight = headerBarMinHeight
            } else {
              _this.footerBarHeight = getNum(_this.footerBarHeight)
            }
          }
        });

        // 获取原始的footer的Height，用于keyboard的复原
        _this.originalScrollPadding = _this.footerBarHeight;
        if (_this.statusbarPadding) {
          // 存在statusBar的情况下，header高20px
          _this.headerBarHeight = _this.headerBarHeight + _this.statusBarHeight;
        } else {
          _this.headerBarHeight = _this.headerBarHeight
        }

        if (_this.fullscreen) {
          _styleType = 'padding';
        } else {
          _styleType = 'margin';
        }

        // empty
        _this.fixedContentStyle = {};
        _this.scrollContentStyle = {};

        if (_this.headerBarHeight > 0) {
          _this.scrollContentStyle[_styleType + 'Top'] = _this.headerBarHeight + 'px';
          _this.fixedContentStyle[_styleType + 'Top'] = _this.headerBarHeight + 'px';
        }
        if (_this.footerBarHeight > 0) {
          _this.scrollContentStyle[_styleType + 'Bottom'] = _this.footerBarHeight + 'px';
          _this.fixedContentStyle[_styleType + 'Bottom'] = _this.footerBarHeight + 'px';
        }

        // DOM更新完毕后获取尺寸,设置isDomReady
        _this.$nextTick(function () {
          _this.contentDimensions = _this.getContentDimensions();
          _this.scrollDimensions = _this.getScrollDimensions();
          _this.isDomReady = true;
        });

      },

      /**
       * 计算content的dimensions，以下都是固有属性，只读！
       * @return {object} contentDimensions -
       * */
      getContentDimensions(){
        const _this = this;
        let _scrollContent = _this.scrollContent;
        if (_this.isDomReady) {
          // dom ready 情况下, 读取DOM尺寸
          // content属性：宽高上下左右，6个，
          _this.contentDimensions = {
            contentTop: _scrollContent.offsetTop,
            contentBottom: _scrollContent.offsetTop + _scrollContent.offsetHeight,
            contentWidth: _scrollContent.offsetWidth,
            contentHeight: _scrollContent.offsetHeight,
            contentLeft: _scrollContent.offsetLeft,
            contentRight: _scrollContent.offsetLeft + _scrollContent.offsetWidth,
          };
        } else {
          // dom not ready 情况下, 根据计算的值手动计算,
          // 因为首次进入Content的尺寸是固定的.
          let _contentHeight = _scrollContent.clientHeight - _this.headerBarHeight - _this.footerBarHeight;
          let _contentTop = _this.headerBarHeight;
          let _contentBottom = _scrollContent.clientHeight - _this.footerBarHeight;
          let _contentWidth = _scrollContent.clientWidth;
          _this.contentDimensions = {
            contentTop: _contentTop,
            contentBottom: _contentBottom,
            contentWidth: _contentWidth,
            contentHeight: _contentHeight,
            contentLeft: _scrollContent.offsetLeft,
            contentRight: _scrollContent.offsetLeft + _scrollContent.offsetWidth,
          };
        }

        return _this.contentDimensions
      },

      // initIscroll(){
      //   console.log(window.VM.IScroll);
      //   let iscroll = iScroll||window.VM.IScroll;
      //   if(this.useIScroll){
      //     require("../../util/iscroll.css");
      //     let attr = {
      //       freeScroll:true,
      //       mouseWheel: true,
      //       click: true,
      //       bounceEasing: 'elastic',
      //       bounceTime: 1200
      //     };
      //     this.scrollX&&(attr.scrollX=this.scrollX);
      //      setElementClass(this.$el.querySelector("#wrapper"),"scroll-content",false);
      //     //var myScroll = new iScroll(this.stemplate, attr,this.$el);
      //     var myScroll = new iscroll(this.stemplate,attr,this.$el);
      //   }
      // },

      /**
       * 计算scroll的dimensions，因为其随着滚动而变化，内容会随滚动更新
       * */
      getScrollDimensions(){
        const _this = this;
        // scrollDimensions在index中定义到全局
        _this.scrollDimensions = {
          scrollTop: _this.scrollContent.scrollTop,
          scrollBottom: _this.scrollContent.scrollTop + _this.scrollContent.scrollHeight,
          scrollWidth: _this.scrollContent.scrollWidth,
          scrollHeight: _this.scrollContent.scrollHeight,
          scrollLeft: _this.scrollContent.scrollLeft,
          scrollRight: _this.scrollContent.scrollLeft + _this.scrollContent.scrollWidth,
        };
        return _this.scrollDimensions
      },

      /**
       * 重新计算scroll的尺寸，当动态添加header/footer或者修改了他的属性
       * Tell the content to recalculate its dimensions.
       * This should be called after dynamically adding headers, footers, or tabs.
       * */
      resize(){
        this.computeScrollContentStyle();
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
        // scroll animation loop w/ easing
        // credit https://gist.github.com/dezinezync/5487119
        const _this = this;
        // scrollContent
        let promise;
        if (done === undefined) {
          // only create a promise if a done callback wasn't provided
          // done can be a null, which avoids any functions
          promise = new Promise(resolve => {
            done = resolve;
          });
        }

        if (!_this.scrollContent) {
          // invalid element
          done();
          return promise;
        }

        x = x || 0;
        y = y || 0;

        const fromY = _this.scrollContent.scrollTop;
        const fromX = _this.scrollContent.scrollLeft;

        const maxAttempts = (duration / 16) + 100;

        let startTime;
        let timeStamp;
        let attempts = 0;

        // start scroll loop
        _this.isScrolling = true;
        startTime = new Date().getTime();
        // chill out for a frame first
        window.requestAnimationFrame(step);

        // scroll loop
        function step () {
          attempts++;

          if (!_this.scrollContent || !_this.isScrolling || attempts > maxAttempts) {
            _this.isScrolling = false;
            // (<any>scrollContent.style)[CSS.transform] = '';
            done();
            return;
          }

          timeStamp = new Date().getTime();

          let time = Math.min(1, ((timeStamp - startTime) / duration));

          // where .5 would be 50% of time on a linear scale easedT gives a
          // fraction based on the easing method
          let easedT = (--time) * time * time + 1;

          if (fromY !== y) {
            _this.scrollContent.scrollTop = (easedT * (y - fromY)) + fromY;
          }

          if (fromX !== x) {
            _this.scrollContent.scrollLeft = Math.floor((easedT * (x - fromX)) + fromX);
          }

          if (easedT < 1) {
            // do not use DomController here
            // must use nativeRaf in order to fire in the next frame
            window.requestAnimationFrame(step);

          } else {
            _this.isScrolling = false;
            // (<any>scrollContent.style)[CSS.transform] = '';
            done();
          }
        }

        return promise;
      },

      /**
       * @param {Number} duration - Duration of the scroll animation in milliseconds.
       * Defaults to 300
       * @return Returns a promise which is resolved when the scroll has completed.
       */
      scrollToTop(duration = 300) {
        this.scrollTo(0, 0, duration);
      },
      /**
       * @param {Number} duration - Duration of the scroll animation in milliseconds.
       * Defaults to 300
       * @return Returns a promise which is resolved when the scroll has completed.
       */
      scrollToBottom(duration = 300) {
        //console.debug('scrollToBottom')
        let y = 0;
        if (this.scrollContent) {
          y = this.scrollContent.scrollHeight - this.scrollContent.clientHeight;
        }
        return this.scrollTo(0, y, duration);
      },

      /**
       * addScrollPadding
       * 当键盘弹起的时候，给scroll-content增加一个padding-bottom，
       * 这样的话，输入内容的input能展示到显示位置
       * DOM WRITE
       * Adds padding to the bottom of the scroll element when the keyboard is open
       * so content below the keyboard can be scrolled into view.
       * @param {number} newPadding
       * */
      addScrollPadding(newPadding){
        const _this = this;
        // //console.debug('addScrollPadding');

        _this.scrollPadding = newPadding;
        if (_this.scrollContent) {
          _this.scrollContent.style.paddingBottom = (newPadding > 0) ? (newPadding + 'px' ) : (_this.originalScrollPadding + 'px');
        }
      },

      /**
       * 当focusOut的时候（键盘收起），恢复paddingBottom
       * */
      clearScrollPaddingFocusOut(){
        const _this = this;
        // //console.debug('clearScrollPaddingFocusOut');
        const SCROLL_TRANSITION_TIME = _this.$config.scrollTransitionTime;
        const KEYBOARD_HEIGHT = _this.$config.keyboardHeight;
        if (!_this.isInputting) {
          _this.isInputting = true;

          // TODO: 这部分为伪代码，标识监听壳子的键盘关闭事件
          // _this.$eventBus.$on('$keyboardClose', function () {
          _this.isInputting = false;
          _this.scrollPadding = _this.originalScrollPadding;

          var y_bottom = this.scrollContent.scrollHeight - this.scrollContent.clientHeight;
          var y_current = _this.scrollContent.scrollTop - KEYBOARD_HEIGHT;
          _this.scrollTo(0, Math.min(y_bottom, y_current), SCROLL_TRANSITION_TIME);
          setTimeout(function () {
            _this.addScrollPadding(0);
          }, SCROLL_TRANSITION_TIME);

        }
      },

      // 键盘相关的
      keyBoardOpen(){
        const _this = this;
        let _padding = _this.$config.keyboardHeight;
        _this.addScrollPadding(_padding);
        // scroll
        _this.scrollTo(0, (_this.scrollContent.scrollTop + _padding));
      },

      keyBoardClose(){
        this.clearScrollPaddingFocusOut();
      },

    },
    created () {},
    mounted() {
      // 将挂载点同步到根this上
      const _this = this;
      // 找到fixedContent/scrollContent的位置
      _this.fixedContent = _this.$el.children[0];
      _this.scrollContent = _this.$el.children[1];

      /**
       * 计算并设置当前Content的位置及尺寸
       * */
      _this.computeScrollContentStyle();

      let _timer;
      // _this.initIscroll();

      // scroll-content的scroll, 滚动时ionScroll事件，另外两个：ionScrollStart/ionScrollEnd
      _this.scrollContent.addEventListener('scroll', function (event) {
        if (!_this.isScrolling) {
          // scroll start
          _this.$emit('ionScrollStart', event);
        }
        window.clearTimeout(_timer);
        _this.isScrolling = true;
        // isScrolling
        _this.$emit('ionScroll', event);

        // 重新计算尺寸，尤其是scroll部分
        _this.getScrollDimensions();

        _timer = setTimeout(function () {
          _this.isScrolling = false;
          // scroll end
          _this.$emit('ionScrollEnd', event);
        }, 400);
      });

      // Page -> Content
      // Content组件必须是在Page组件内部才向页面this注入控制权
      if (!!_this.$parent.$options._componentTag && _this.$parent.$options._componentTag.toLowerCase() === 'page') {
        // 将参数传给调用的页面(注入到业务页面的this中), context为调用的上下文
        _this.$vnode.context.$content = {
          '_href': window.location.href,
          '_this': _this,
          'fixedContent': _this.fixedContent,
          'scrollContent': _this.scrollContent,
          'contentDimensions': _this.contentDimensions,
          'getContentDimensions': _this.getContentDimensions,
          'getScrollDimensions': _this.getScrollDimensions,
          'resize': _this.resize,
          'scrollTo': _this.scrollTo,
          'scrollToTop': _this.scrollToTop,
          'scrollToBottom': _this.scrollToBottom,
          'keyBoardOpen': _this.keyBoardOpen,
          'keyBoardClose': _this.keyBoardClose,
        };
      }

    }
  }
</script>
<style lang="scss">
  @import './content';
  @import './content.ios';
  @import './content.md';
  @import './content.wp';
</style>
