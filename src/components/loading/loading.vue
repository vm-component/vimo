<template>
  <div class="ion-loading" :class="[modeClass,cssClass]">
    <!--<ion-backdrop :isActive="isActive" v-if="showBackdrop" :enableBackdropDismiss="false"></ion-backdrop>-->
    <transition name="loading"
                v-on:before-enter="_beforeEnter"
                v-on:after-enter="_afterEnter"
                v-on:before-leave="_beforeLeave"
                v-on:after-leave="_afterLeave">
      <div class="loading-wrapper" v-show="isActive">
        <div v-if="showSpinner" class="loading-spinner">
          <ion-spinner :name="spinner"></ion-spinner>
        </div>
        <div v-if="content" v-html="content" class="loading-content"></div>
      </div>
    </transition>
  </div>
</template>
<style lang="scss">
  @import './loading';
  @import './loading.ios';
  @import './loading.md';
  @import './loading.wp';

  // transition
  @import "../../transitions/loading";

</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        /**
         * 初始化Instance的数据
         * 因为是实例调用模式，故prop和data在初始化后是同样的数据接口，
         * 故prop就没有存在的价值
         * */
        spinner: this.$config.get('spinner') || 'ios', // String
        content: null, // 可以使html片段
        cssClass: null,
        showBackdrop: false,
        duration: null, // 自动关闭时间
        dismissOnPageChange: false,// 页面切花是否关闭

        /**
         * 组件状态
         * */
        isActive: false, // 开启状态
        enabled: false, // 是否在过渡态的状态判断，如果在动画中则为false
        mode: this.$config.get('mode') || 'ios', // ios?android?window

        // promise
        presentCallback: null,
        dismissCallback: null,

      }
    },
    computed: {
      // 设置ActionSheet的风格
      modeClass () {
        return `loading-${this.mode}`
      },
      showSpinner () {
        return this.spinner !== 'hide'
      },
    },
    methods: {
      /**
       * ActionSheet Animate Hooks
       * */
      _beforeEnter () {
        this.enabled = false; // 不允许过渡中途操作
        this.$setEnabled(false, 200);
      },
      _afterEnter (el) {
        this.enabled = true;
        this.presentCallback(el);
      },
      _beforeLeave () {
        this.enabled = false;
        this.$setEnabled(false, 200);
      },
      _afterLeave (el) {
        this.enabled = true;
        this.dismissCallback(el);
        // 删除DOM
        this.$el.remove()
      },

      /**
       * 这个是内部函数，外部同名方法会处理额外事宜
       * 开启实例
       * @returns {Promise} transitionEnd结束后返回promise
       */
      _present () {
        const _this = this;
        _this.isActive = true;
        return new Promise((resolve)=>{this.presentCallback = resolve})
      },

      /**
       * 关闭实例
       * @returns {Promise} transitionEnd结束后返回promise
       */
      _dismiss () {
        const _this = this;
        if (!_this.enabled) {
          return false
        }
        _this.enabled = false;
        _this.isActive = false; // 动起来
        return new Promise((resolve)=>{this.dismissCallback = resolve})
      },
    }
  }
</script>
