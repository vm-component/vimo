<template>
  <article class="ion-app" :class="[modeClass,platformClass,hoverClass,{'disable-scroll':isScrollDisable}]">
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
    <!--popover portal-->
    <aside id="popoverPortal" overlay-portal></aside>
    <!--<div ref="toastPortal" class="toast-portal" [overlay-portal]="10000"></div>-->
    <!--当页面被点击的时候，防止在动画的过程中再次点击页面导致bug的蒙层，全局最高！z-index=99999-->
    <aside class="click-block"
         :class="[{'click-block-enabled':isClickBlockEnabled},{'click-block-active':isClickBlockActive}]"></aside>
  </article>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import { ClickBlock } from "../../util/click-block"
  let _clickBlock = new ClickBlock();

  // click_blcok等待时间
  const CLICK_BLOCK_BUFFER_IN_MILLIS = 64;
  // 时间过后回复可点击状态
  const CLICK_BLOCK_DURATION_IN_MILLIS = 700;

  export default{
    name: 'App',
    data(){
      return {
        isScrollDisable: false, // 控制页面是否能滚动
        isClickBlockActive: false, // 控制页面是否【能】激活'冷冻'效果 click-block-active
        isClickBlockEnabled: true, // 控制是否激活 '冷冻'效果 click-block-enabled
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
       * 设置当前页面是否能点击滑动
       * 一般适用在像ActionSheet/Alert/Modal等弹出会出现transition动画
       * 当transition动画进行中，页面是锁定的不能点击，因此使用该函数设定此状态
       * @param {boolean} isEnabled `true` for enabled, `false` for disabled
       * @param {number} duration isEnabled=false的过期时间 当 `isEnabled` 设置为`false`,
       * 则duration之后，`isEnabled`将自动设为`true`
       * */
      setEnabled (isEnabled, duration = CLICK_BLOCK_DURATION_IN_MILLIS) {
        if (isEnabled) {
          // disable the click block if it's enabled, or the duration is tiny
          _clickBlock.activate(false, CLICK_BLOCK_BUFFER_IN_MILLIS);
        } else {
          // show the click block for duration + some number
          _clickBlock.activate(true, duration + CLICK_BLOCK_BUFFER_IN_MILLIS);
        }
      },

      /**
       * 是否点击滚动
       * @param {Boolean} isScrollDisable - 是否禁止滚动点击 true:禁止滚动/false:可以滚动
       * */
      disableScroll (isScrollDisable) {
        this.isScrollDisable = isScrollDisable;
      },
    },
    created(){
      Vue.prototype.$setEnabled = this.setEnabled;
      Vue.prototype.$disableScroll = this.disableScroll;
    },
    mounted(){
      this.$eventBus.$emit('app:ready')
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
