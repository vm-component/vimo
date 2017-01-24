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
</style>
<script type="text/ecmascript-6">
  export default{
    name:'ion-app',
    data(){
      return {
        isScrollDisable: false, // 控制页面是否能滚动
        isClickBlockActive: false, // 控制页面是否【能】激活'冷冻'效果 click-block-active
        isClickBlockEnabled:true, // 控制是否激活 '冷冻'效果 click-block-enabled
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
    mounted () {
      // 将挂载点同步到全局this上
      const _this = this;
      /**
       * 获取弹出层的挂载位置，默认挂在到_overlayPortal
       * Modals need their own overlay becuase we don't want an ActionSheet
       * or Alert to trigger lifecycle events inside a modal
       * @param {String} portal -
       * */
      _this.$portal.$modal = _this.$refs.modalPortal
      _this.$portal.$overlay = _this.$refs.overlayPortal
      _this.$portal.$loading = _this.$refs.loadingPortal
      _this.$portal.$toast = _this.$refs.toastPortal

      // 监听isClickBlockActive的改变事件
      _this.$eventBus.$on('$changeClickBlockActiveState', (state)=>{
        _this.isClickBlockActive = state;
      });

      // 监听isScrollDisable的改变事件
      _this.$eventBus.$on('$changeScrollDisableState', (state)=>{
        _this.isScrollDisable = state;
      });
    },
  }
</script>
