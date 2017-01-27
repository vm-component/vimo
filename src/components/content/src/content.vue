<template>
  <div class="outer-content ion-content content-ios" :class="{'statusbar-padding':$hasStatusBar}">
    <div ref="fixedContent" class="fixed-content" :style="fixedContentStyle">
      <!--固定在页面中的内容-->
      <slot name="fixed"></slot>
    </div>
    <div ref="scrollContent" class="scroll-content" :style="scrollContentStyle">
      <!--默认是能滚动的内容-->
      <slot></slot>
    </div>
    <slot name="ion-refresher"></slot>
  </div>
</template>
<style lang="scss">
  @import './content';
  @import './content.ios';

</style>
<script type="text/ecmascript-6">
  import { getStyle } from '../../../utils/assist'
  export default{
    name: 'ion-content',
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
        // $scrollContent: null, // scrollConent的DOM句柄，此变量在全局声明
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
       * 因为这部分首一下因素影响：$hasStatusBar、fullscreen、$hasHeaderBar，$hasFooterBar
       * */
      computeScrollContentStyle () {
        let _this = this;
        let _valHeader, _styleType;

        // 得到header和footer的高度
        const HEADER_BAR = parseInt(getStyle(document.querySelectorAll('.header')[0], 'height'));
        const FOOTER_BAR = parseInt(getStyle(document.querySelectorAll('.footer')[0], 'height'));

        if (_this.$hasStatusBar) {
          _valHeader = HEADER_BAR + 20; // 存在statusBar的情况下，header高20px
        } else {
          _valHeader = HEADER_BAR
        }

        if (_this.fullscreen) {
          _styleType = 'padding';
        } else {
          _styleType = 'margin';
        }

        // empty
        _this.fixedContentStyle = {};
        _this.scrollContentStyle = {};

        if (_this.$hasHeaderBar) {
          _this.scrollContentStyle[_styleType + 'Top'] = _valHeader + 'px';
          _this.fixedContentStyle[_styleType + 'Top'] = _valHeader + 'px';
        }
        if (_this.$hasFooterBar) {
          _this.scrollContentStyle[_styleType + 'Bottom'] = FOOTER_BAR + 'px';
        }

        // 计算尺寸
        _this.$nextTick(function () {
          _this.getContentDimensions();
          _this.getScrollDimensions();
        });

      },

      /**
       * 计算content的dimensions，一下都是固有属性，只读！
       * */
      getContentDimensions(){
        const _this = this;
        let _scrollContent = _this.$scrollContent;
        // content属性：宽高上下左右，6个，$contentDimensions在index中定义到全局
        _this.$contentDimensions = {
          contentTop: _scrollContent.offsetTop,
          contentBottom: _scrollContent.offsetTop + _scrollContent.offsetHeight,
          contentWidth: _scrollContent.offsetWidth,
          contentHeight: _scrollContent.offsetHeight,
          contentLeft: _scrollContent.offsetLeft,
          contentRight: _scrollContent.offsetLeft + _scrollContent.offsetWidth,
        }
        return _this.$contentDimensions
      },

      /**
       * 计算scroll的dimensions，因为其随着滚动而变化，内容会随滚动更新
       * */
      getScrollDimensions(){
        const _this = this;
        // $scrollDimensions在index中定义到全局
        _this.$scrollDimensions = {
          scrollTop: _this.$scrollContent.scrollTop,
          scrollBottom: _this.$scrollContent.scrollTop + _this.$scrollContent.scrollHeight,
          scrollWidth: _this.$scrollContent.scrollWidth,
          scrollHeight: _this.$scrollContent.scrollHeight,
          scrollLeft: _this.$scrollContent.scrollLeft,
          scrollRight: _this.$scrollContent.scrollLeft + _this.$scrollContent.scrollWidth,
        };
        return _this.$scrollDimensions
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

        if (!_this.$scrollContent) {
          // invalid element
          done();
          return promise;
        }

        x = x || 0;
        y = y || 0;

        const fromY = _this.$scrollContent.scrollTop;
        const fromX = _this.$scrollContent.scrollLeft;

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

          if (!_this.$scrollContent || !_this.isScrolling || attempts > maxAttempts) {
            _this.isScrolling = false;
            // (<any>$scrollContent.style)[CSS.transform] = '';
            done();
            return;
          }

          timeStamp = new Date().getTime();

          let time = Math.min(1, ((timeStamp - startTime) / duration));

          // where .5 would be 50% of time on a linear scale easedT gives a
          // fraction based on the easing method
          let easedT = (--time) * time * time + 1;

          if (fromY !== y) {
            _this.$scrollContent.scrollTop = (easedT * (y - fromY)) + fromY;
          }

          if (fromX !== x) {
            this.$scrollContent.scrollLeft = Math.floor((easedT * (x - fromX)) + fromX);
          }

          if (easedT < 1) {
            // do not use DomController here
            // must use nativeRaf in order to fire in the next frame
            window.requestAnimationFrame(step);

          } else {
            _this.isScrolling = false;
            // (<any>$scrollContent.style)[CSS.transform] = '';
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
        let y = 0;
        if (this.$scrollContent) {
          y = this.$scrollContent.scrollHeight - this.$scrollContent.clientHeight;
        }
        return this.scrollTo(0, y, duration);
      },


    },
    created () {
      // 将挂载点同步到根this上
      const _this = this;
      _this.$eventBus.$emit('$contentReady', _this);
    },
    mounted() {
      const _this = this;
      let _timer;

      // 找到scrollContent的位置
      _this.$scrollContent = _this.$el.children[1];

      _this.$scrollDimensions = _this.getScrollDimensions();
      _this.$contentDimensions = _this.getContentDimensions();

      /**
       * 计算属性
       * 放在这里是因为此时并不知道footer子组件有没有，因此在mounted中等待
       * */
      _this.computeScrollContentStyle();

      // scroll-content的scroll, 滚动时ionScroll事件，另外两个：ionScrollStart/ionScrollEnd
      _this.$scrollContent.addEventListener('scroll', function (event) {
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
    }
  }
</script>
