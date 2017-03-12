<template>
  <article class="ion-app" :class="[modeClass,platformClass,hoverClass,{'disable-scroll':isScrollDisabled}]">
    <!--app-root start-->
    <section class="app-root">
      <slot></slot>
    </section>
    <!--backdrop-->
    <aside id="backdropPortal" overlay-portal></aside>
    <!--modal portal-->
    <aside id="modalPortal" overlay-portal></aside>
    <!--蒙层指示,action-sheet,choose-sheet等 overlay portal-->
    <aside id="overlayPortal" overlay-portal></aside>
    <!--alert portal-->
    <aside id="alertPortal" overlay-portal></aside>
    <!--loading portal-->
    <aside id="loadingPortal" overlay-portal></aside>
    <!--toast portal-->
    <aside id="toastPortal" overlay-portal></aside>
    <!--<div ref="toastPortal" class="toast-portal" [overlay-portal]="10000"></div>-->
    <!--当页面被点击的时候，防止在动画的过程中再次点击页面导致bug的蒙层，全局最高！z-index=99999-->
    <aside class="click-block"
           :class="[{'click-block-enabled':isClickBlockEnabled}]"></aside>
  </article>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import { ClickBlock } from "../../util/click-block"
  import { setElementClass ,nativeTimeout,clearNativeTimeout} from '../../util/dom'


  let _clickBlock = new ClickBlock();

  // click_blcok等待时间
  const CLICK_BLOCK_BUFFER_IN_MILLIS = 64;
  // 时间过后回复可点击状态
  const CLICK_BLOCK_DURATION_IN_MILLIS = 700;
  const ACTIVE_SCROLLING_TIME = 100;

  export default{
    name: 'App',
    data(){
      return {
        isScrollDisabled: false, // 控制页面是否能滚动
        isClickBlockEnabled: false, // 控制是否激活 '冷冻'效果 click-block-enabled

        _disTime: 0, // 禁用计时
        _scrollTime: 0, // 滚动计时

        _scrollDisTime: 0,
      }
    },
    props: {
      /**
       * The mode to apply to this component. Mode can be ios, wp, or md.
       * */
      mode: {
        type: String,
        default: VM.config.get('mode') || 'ios',
      },
    },
    computed: {
      // set the mode class name
      // ios/md/wp
      modeClass () {
        return `${this.mode}`
      },
      platformClass(){
        // wp和md会设置成platform-core？？
        // 后面这两个只在ios下有，不知为啥platform-mobile platform-mobileweb
        return `platform-${this.mode}`
      },
      hoverClass(){
        // touch devices should not use :hover CSS pseudo
        // enable :hover CSS when the "hoverCSS" setting is not false
        let _isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
        return _isMobile ? 'disable-hover' : 'enable-hover'
      }
    },
    methods: {

      /**
       * 设置document.title的值
       * @param {string} val  Value to set the document title to.
       */
      setTitle(val){
        // TODO: 设置document.title的值
        // if (val !== this._title) {
        //   this._title = val;
        //   this._titleSrv.setTitle(val);
        // }
      },

      /**
       * @private
       *  @param {string} className
       *  @param {boolean} isAdd
       */
      setElementClass(className, isAdd) {
        setElementClass(this.$el, className, isAdd);
      },

      /**
       * 设置当前页面是否能点击滑动
       * 一般适用在像ActionSheet/Alert/Modal等弹出会出现transition动画
       * 当transition动画进行中，页面是锁定的不能点击，因此使用该函数设定此状态
       * @param {boolean} isEnabled `true` for enabled, `false` for disabled
       * @param {number} duration isEnabled=false的过期时间 当 `isEnabled` 设置为`false`,
       * 则duration之后，`isEnabled`将自动设为`true`
       * */
      setEnabled (isEnabled, duration = CLICK_BLOCK_DURATION_IN_MILLIS) {
        this._disTime = (isEnabled ? 0 : Date.now() + duration);
        if (isEnabled) {
          // disable the click block if it's enabled, or the duration is tiny
          _clickBlock.activate(false, CLICK_BLOCK_BUFFER_IN_MILLIS);
        } else {
          // show the click block for duration + some number
          _clickBlock.activate(true, duration + CLICK_BLOCK_BUFFER_IN_MILLIS);
        }
      },

      /**
       * @private
       * Boolean if the app is actively enabled or not.
       * @return {boolean}
       */
      isEnabled() {
        const disTime = this._disTime;
        if (disTime === 0) {
          return true;
        }
        return (disTime < Date.now());
      },

      /**
       * 是否点击滚动
       * 这个需要自己设置时间解锁
       * @param {Boolean} isScrollDisabled - 是否禁止滚动点击 true:禁止滚动/false:可以滚动
       * @param {number} duration
       * */
      setDisableScroll (isScrollDisabled, duration = 0) {
        this.isScrollDisabled = isScrollDisabled;
        if (duration > 0 && isScrollDisabled) {
          clearNativeTimeout(this._scrollDisTime);
          this._scrollDisTime = nativeTimeout(() => {
            this.isScrollDisabled = false;
          }, duration)
        }
      },

      /**
       * 设置当前App级别是否在滚动, 例如: 这个函数由scroll-view的实例调用, 反应当前的conent
       * 正在滚动... 滚动的有效时间为ACTIVE_SCROLLING_TIME, 超时后将判断为不再滚动, 由
       * isScrolling进行判断
       * @private
       */
      setScrolling() {
        this._scrollTime = Date.now() + ACTIVE_SCROLLING_TIME;
      },

      /**
       * 判断现在app是否在scroll状态, scroll状态可能是任意一个页面的状态,
       * 这个isScroll作为全局的scroll判断
       * @return {boolean} returns true or false
       */
      isScrolling() {
        const scrollTime = this._scrollTime;
        if (scrollTime === 0) {
          return false;
        }
        if (scrollTime < Date.now()) {
          this._scrollTime = 0;
          return false;
        }
        return true;
      },

    },
    created(){
      /**
       * $app对外方法
       * */
      Vue.prototype.$app = {};
      Object.assign(Vue.prototype.$app, {
        _this: this,                               // 当前的app实例this
        setElementClass: this.setElementClass,     // 给App设置class
        setTitle: this.setTitle,                   // 设置App的Title(document级别)

        setEnabled: this.setEnabled,               //设置App当前可点击状态
        isEnabled: this.isEnabled,                 // 判断App当前可点击状态

        setDisableScroll: this.setDisableScroll,   // 设置App的禁止滚动(自己定时解锁)
        setScrolling: this.setScrolling,           // 设置App的正在滚动
        isScrolling: this.isScrolling,             // 判断App的是否在滚动
      })
    },
    mounted(){
      this.$eventBus.$emit('app:ready');

      console.assert(!!_clickBlock, '_clickBlock实例不存在, 请检查!');
      this.isClickBlockEnabled = true;
    }
  }
</script>
<style lang="scss">
  @import './app.scss';
  @import './app.ios.scss';
  /*@import './app.md.scss';*/
  /*@import './app.wp.scss';*/
  @import './cordova.scss';
  @import './cordova.ios.scss';
  /*@import './cordova.md.scss';*/
  /*@import './cordova.wp.scss';*/
</style>
