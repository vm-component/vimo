<template>
  <div class="ion-app"
       :class="[modeClass,platformClass,hoverClass,{'disable-scroll':isScrollDisable}]">
    <!--app-root start-->
    <div id="viewport" ref="viewport" app-viewport></div>
    <div class="app-root">
      <slot></slot>
    </div>
    <!--modal portal-->
    <div id="modalPortal" ref="modalPortal" overlay-portal></div>
    <!--蒙层指示等 overlay portal-->
    <div id="overlayPortal" ref="overlayPortal" overlay-portal></div>
    <!--alert portal-->
    <div id="alertPortal" ref="alertPortal" overlay-portal></div>
    <!--loading portal-->
    <div id="loadingPortal" ref="loadingPortal" class="loading-portal" overlay-portal></div>
    <!--toast portal-->
    <div id="toastPortal" ref="toastPortal" class="toast-portal" overlay-portal></div>
    <!--<div ref="toastPortal" class="toast-portal" [overlay-portal]="10000"></div>-->
    <!--当页面被点击的时候，防止在动画的过程中再次点击页面导致bug的蒙层，全局最高！z-index=99999-->
    <div class="click-block"
         :class="[{'click-block-enabled':isClickBlockEnabled},{'click-block-active':isClickBlockActive}]"></div>
  </div>
</template>
<style lang="scss">
  @import './app';
  @import './app.ios';
  @import './cordova';
  @import './cordova.ios';

</style>
<script type="text/ecmascript-6">

  // 弹出层挂载点
  const AppPortal = {
    DEFAULT: 'DEFAULT',
    MODAL: 'MODAL',
    LOADING: 'LOADING',
    TOAST: 'TOAST'
  };
  // click_blcok等待时间
  const CLICK_BLOCK_BUFFER_IN_MILLIS = 64;
  // 时间过后回复可点击状态
  const CLICK_BLOCK_DURATION_IN_MILLIS = 700;

  export default{
    name: 'ion-app',
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
        default: 'ios',
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
       * 获取App中定义的弹出层挂载点,默认挂在到_overlayPortal
       * Modals need their own overlay becuase we don't want an ActionSheet
       * or Alert to trigger lifecycle events inside a modal
       * @param {String} portal - portal的名字，可以是：'LOADING'，'TOAST'，'MODAL'，空
       * @return {HTML} 挂载点
       * */
      getPortal(portal){
        if (portal === AppPortal.LOADING) {
          return this.$refs.loadingPortal;
        }
        if (portal === AppPortal.TOAST) {
          return this.$refs.toastPortal;
        }
        // Modals need their own overlay becuase we don't want an ActionSheet
        // or Alert to trigger lifecycle events inside a modal
        if (portal === AppPortal.MODAL) {
          return this.$refs.modalPortal;
        }
        return this.$refs.overlayPortal;
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
        if (isEnabled) {
          // disable the click block if it's enabled, or the duration is tiny
          this._clickBlock(false, CLICK_BLOCK_BUFFER_IN_MILLIS);
        } else {
          // show the click block for duration + some number
          this._clickBlock(true, duration + CLICK_BLOCK_BUFFER_IN_MILLIS);
        }
      },

      /**
       * 定义clickBlock处理函数
       * @param {Boolean} shouldShow - 是否显示
       * @param {Number} expire - shouldShow=false设置的过期时间
       * @return {Object} 返回包含activate的对象方法
       * */
      _clickBlock (shouldShow, expire = 100) {
        let _tmr;
        let _showing = false;
        let _this = this;

        // 闭包
        function activate () {
          window.clearTimeout(_tmr);
          if (shouldShow) {
            _activate(true);
          }
          _tmr = setTimeout(_activate.bind(this, false), expire);
        }

        function _activate (shouldShow) {
          if (_showing !== shouldShow) {
            _this.isClickBlockActive = shouldShow;
            _showing = shouldShow;
          }
        }

        return activate()
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
      // 将挂载点同步到根this上
      const _this = this;
      _this.$eventBus.$emit('$appReady', _this);
    },
  }
</script>
