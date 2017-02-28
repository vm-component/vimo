<template>
  <article class="ion-content content-ios outer-content" :class="{'statusbar-padding':statusbarPadding}">
    <section ref="fixedContent" class="fixed-content" :style="fixedContentStyle">
      <!--固定在页面中的内容-->
      <!--固定到顶部-->
      <div ion-fixed top>
        <slot name="fixed"></slot>
        <slot name="fixedTop"></slot>
      </div>
      <!--固定到底部-->
      <div ion-fixed bottom>
        <slot name="fixedBottom"></slot>
      </div>
    </section>
    <section ref="scrollContent" class="scroll-content" :style="scrollContentStyle">
      <!--默认是能滚动的内容-->
      <slot></slot>
    </section>
    <slot name="Refresher"></slot>
  </article>
</template>

<script type="text/ecmascript-6">
  import { getStyle, getNum } from '../../util/util'

  export default{
    name: 'Content',
    props: {
      fullscreen: {
        type: Boolean,
        default: false
      }
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

        statusbarPadding: VM.config.getBoolean('statusbarPadding', false), // 是否有statusbar的padding
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
        let _valHeader, _styleType;
        let headerBarHeight = 0;
        let footerBarHeight = 0;

        // 得到header和footer的高度
        // 一般情况下，ion-conent在ion-page中是唯一的，但是在ion-menu组件中也包含ion-content
        // 所以ion-header和ion-footer的高度应该在父组件的子组件中查找，这样计算高度才有意义
        // 而不是全局
        _this.$parent.$children.forEach((item) => {
          if (!!item.$options._componentTag && item.$options._componentTag.toLowerCase() === 'header') {
            headerBarHeight = getStyle(item.$el, 'height');
            headerBarHeight === 'auto' ? (headerBarHeight = '44') : (headerBarHeight = getNum(headerBarHeight));
          }
          if (!!item.$options._componentTag && item.$options._componentTag.toLowerCase() === 'footer') {
            footerBarHeight = getStyle(item.$el, 'height');
            footerBarHeight === 'auto' ? (footerBarHeight = '44') : (footerBarHeight = getNum(footerBarHeight));
          }
        });

        // 获取原始的footer的Height，用于keyboard的复原
        _this.originalScrollPadding = footerBarHeight;

        if (_this.statusbarPadding) {
          // 存在statusBar的情况下，header高20px
          // _valHeader = headerBarHeight + _this.$config.statusBarHeight;
          // TODO: statusBarHeight
          _valHeader = headerBarHeight + 20;
        } else {
          _valHeader = headerBarHeight
        }

        if (_this.fullscreen) {
          _styleType = 'padding';
        } else {
          _styleType = 'margin';
        }

        // empty
        _this.fixedContentStyle = {};
        _this.scrollContentStyle = {};

        if (_valHeader > 0) {
          _this.scrollContentStyle[_styleType + 'Top'] = _valHeader + 'px';
          _this.fixedContentStyle[_styleType + 'Top'] = _valHeader + 'px';
        }
        if (footerBarHeight > 0) {
          _this.scrollContentStyle[_styleType + 'Bottom'] = footerBarHeight + 'px';
        }

        // 计算尺寸
        _this.$nextTick(function () {
          _this.getContentDimensions();
          _this.getScrollDimensions();
        });

      },

      /**
       * 计算content的dimensions，以下都是固有属性，只读！
       * */
      getContentDimensions(){
        const _this = this;
        let _scrollContent = _this.scrollContent;
        // content属性：宽高上下左右，6个，
        _this.contentDimensions = {
          contentTop: _scrollContent.offsetTop,
          contentBottom: _scrollContent.offsetTop + _scrollContent.offsetHeight,
          contentWidth: _scrollContent.offsetWidth,
          contentHeight: _scrollContent.offsetHeight,
          contentLeft: _scrollContent.offsetLeft,
          contentRight: _scrollContent.offsetLeft + _scrollContent.offsetWidth,
        };

        return _this.contentDimensions
      },

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
       * @param {Number} x - The x-value to scroll to.
       * @param {Number} y - The y-value to scroll to.
       * @param {Number} duration - Duration of the scroll animation in milliseconds.
       * @param {Function} done - 当滚动结束时触发
       * @return Returns a promise which is resolved when the scroll has completed.
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

        // return promise;
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
    created () {

    },
    mounted() {
      // 将挂载点同步到根this上
      const _this = this;


      //console.debug('content this')
      //console.debug(this)


      // const _this = this;
      let _timer;

      // 找到fixedContent/scrollContent的位置
      _this.fixedContent = _this.$el.children[0];
      _this.scrollContent = _this.$el.children[1];

      _this.scrollDimensions = _this.getScrollDimensions();
      _this.contentDimensions = _this.getContentDimensions();

      /**
       * 计算属性
       * 放在这里是因为此时并不知道footer子组件有没有，因此在mounted中等待
       * */
      _this.computeScrollContentStyle();

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
      if (_this.$parent.$options._componentTag === 'Page') {
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
