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
        fixedElementStyle: {}, // 固定内容的位置样式
        scrollElementStyle: {}, // 滑动内容的位置样式


        isScrolling: false, // 判断是否滚动

        scrollElement: null, // scrollConent的DOM句柄
        fixedElement: null, // fixedElement的DOM句柄

        headerElement:null, //Header组件的DOM句柄
        footerElement:null, //footer组件的DOM句柄

        contentDimensions: null,
        scrollDimensions: null,

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
       * 计算scrollElement的样式
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
            _this.headerElement = item.$el;
          }
          if (!!item.$options._componentTag && item.$options._componentTag.toLowerCase() === 'footer') {
            _this.footerElement = item.$el;
          }
        });

        if(!!_this.headerElement){
          _this.headerBarHeight = getStyle(_this.headerElement, 'height');
          if (_this.headerBarHeight === 'auto') {
            _this.headerBarHeight = headerBarMinHeight
          } else {
            _this.headerBarHeight = getNum(_this.headerBarHeight)
          }
        }

        if(!!_this.footerElement){
          _this.footerBarHeight = getStyle(_this.footerElement, 'height');
          if (_this.footerBarHeight === 'auto') {
            _this.footerBarHeight = headerBarMinHeight
          } else {
            _this.footerBarHeight = getNum(_this.footerBarHeight)
          }
        }





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
        _this.fixedElementStyle = {};
        _this.scrollElementStyle = {};

        if (_this.headerBarHeight > 0) {
          _this.scrollElementStyle[_styleType + 'Top'] = _this.headerBarHeight + 'px';
          _this.fixedElementStyle[_styleType + 'Top'] = _this.headerBarHeight + 'px';
        }
        if (_this.footerBarHeight > 0) {
          _this.scrollElementStyle[_styleType + 'Bottom'] = _this.footerBarHeight + 'px';
          _this.fixedElementStyle[_styleType + 'Bottom'] = _this.footerBarHeight + 'px';
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
       * @return {object} contentDimensions纬度尺寸
       * */
      getContentDimensions(){
        const _this = this;
        if (_this.isDomReady) {
          // dom ready 情况下, 读取DOM尺寸
          // content属性：宽高上下左右，6个，
          _this.contentDimensions = {
            contentTop: _this.scrollElement.offsetTop,
            contentBottom: _this.scrollElement.offsetTop + _this.scrollElement.offsetHeight,
            contentWidth: _this.scrollElement.offsetWidth,
            contentHeight: _this.scrollElement.offsetHeight,
            contentLeft: _this.scrollElement.offsetLeft,
            contentRight: _this.scrollElement.offsetLeft + _this.scrollElement.offsetWidth,
          };
        } else {
          // dom not ready 情况下, 根据计算的值手动计算,
          // 因为首次进入Content的尺寸是固定的.
          _this.contentDimensions = {
            contentTop: _this.headerBarHeight,
            contentBottom: _this.scrollElement.clientHeight - _this.footerBarHeight,
            contentWidth:  _this.scrollElement.clientWidth,
            contentHeight: _this.scrollElement.clientHeight - _this.headerBarHeight - _this.footerBarHeight,
            contentLeft: _this.scrollElement.offsetLeft,
            contentRight: _this.scrollElement.offsetLeft + _this.scrollElement.offsetWidth,
          };
        }

        return _this.contentDimensions
      },

      /**
       * 计算scroll的dimensions，因为其随着滚动而变化，内容会随滚动更新
       * */
      getScrollDimensions(){
        const _this = this;
        // scrollDimensions在index中定义到全局
        _this.scrollDimensions = {
          scrollTop: _this.scrollElement.scrollTop,
          scrollWidth: _this.scrollElement.scrollWidth,
          scrollHeight: _this.scrollElement.scrollHeight,
          scrollLeft: _this.scrollElement.scrollLeft,
          scrollRight: _this.scrollElement.scrollLeft + _this.scrollElement.scrollWidth,
        };
        return _this.scrollDimensions
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
       * 重新计算scroll的尺寸，当动态添加header/footer/tabs或者修改了他的属性
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
        // scrollElement
        let promise;
        if (done === undefined) {
          // only create a promise if a done callback wasn't provided
          // done can be a null, which avoids any functions
          promise = new Promise(resolve => {
            done = resolve;
          });
        }

        if (!_this.scrollElement) {
          // invalid element
          done();
          return promise;
        }

        x = x || 0;
        y = y || 0;

        const fromY = _this.scrollElement.scrollTop;
        const fromX = _this.scrollElement.scrollLeft;

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

          if (!_this.scrollElement || !_this.isScrolling || attempts > maxAttempts) {
            _this.isScrolling = false;
            // (<any>scrollElement.style)[CSS.transform] = '';
            done();
            return;
          }

          timeStamp = new Date().getTime();

          let time = Math.min(1, ((timeStamp - startTime) / duration));

          // where .5 would be 50% of time on a linear scale easedT gives a
          // fraction based on the easing method
          let easedT = (--time) * time * time + 1;

          if (fromY !== y) {
            _this.scrollElement.scrollTop = (easedT * (y - fromY)) + fromY;
          }

          if (fromX !== x) {
            _this.scrollElement.scrollLeft = Math.floor((easedT * (x - fromX)) + fromX);
          }

          if (easedT < 1) {
            // do not use DomController here
            // must use nativeRaf in order to fire in the next frame
            window.requestAnimationFrame(step);

          } else {
            _this.isScrolling = false;
            // (<any>scrollElement.style)[CSS.transform] = '';
            done();
          }
        }

        return promise;
      },

      /**
       * 滚动到顶部
       * @param {Number} duration - Duration of the scroll animation in milliseconds.
       * Defaults to 300
       * @return Returns a promise which is resolved when the scroll has completed.
       */
      scrollToTop(duration = 300) {
        this.scrollTo(0, 0, duration);
      },
      /**
       * 滚动到底部
       * @param {Number} duration - Duration of the scroll animation in milliseconds.
       * Defaults to 300
       * @return Returns a promise which is resolved when the scroll has completed.
       */
      scrollToBottom(duration = 300) {
        //console.debug('scrollToBottom')
        let y = 0;
        if (this.scrollElement) {
          y = this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
        }
        return this.scrollTo(0, y, duration);
      },

    },
    created () {},
    mounted() {
      // 将挂载点同步到根this上
      const _this = this;
      // 找到fixedElement/scrollElement的位置
      _this.fixedElement = _this.$refs.fixedElement;
      _this.scrollElement = _this.$refs.scrollElement;

      /**
       * 计算并设置当前Content的位置及尺寸
       * */
      _this.computeScrollContentStyle();

      let _timer;
      // _this.initIscroll();

      // scroll-content的scroll, 滚动时ionScroll事件，另外两个：ionScrollStart/ionScrollEnd
      _this.scrollElement.addEventListener('scroll', function (event) {
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
          'fixedElement': _this.fixedElement,
          'scrollElement': _this.scrollElement,
          'headerElement': _this.headerElement,
          'footerElement': _this.footerElement,

          'contentDimensions': _this.contentDimensions,
          'getContentDimensions': _this.getContentDimensions,
          'getScrollDimensions': _this.getScrollDimensions,
          'resize': _this.resize,
          'scrollTo': _this.scrollTo,
          'scrollToTop': _this.scrollToTop,
          'scrollToBottom': _this.scrollToBottom,
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
