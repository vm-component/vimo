<template>
  <div class="ion-loading" :class="[modeClass,cssClass]">
    <Backdrop :isActive="isActive && showBackdrop" :enableBackdropDismiss="false"></Backdrop>
    <transition :name="transitionClass"
                v-on:before-enter="_beforeEnter"
                v-on:after-enter="_afterEnter"
                v-on:before-leave="_beforeLeave"
                v-on:after-leave="_afterLeave">
      <div class="loading-wrapper" v-show="isActive">
        <div v-if="showSpinner" class="loading-spinner">
          <Spinner :name="spinner"></Spinner>
        </div>
        <div v-if="content" v-html="content" class="loading-content"></div>
      </div>
    </transition>
  </div>
</template>
<style lang="scss">
  @import './loading.scss';
  @import './loading.ios.scss';
  @import './loading.md.scss';
  @import './loading.wp.scss';
</style>
<script type="text/ecmascript-6">
  /**
   * @module Component/Loading
   * @description
   * Loading组件
   *
   * 通过present开启, 如果没设置duration, 则需要手动dismiss.
   *
   * @property {string} [spinner='ios'] - 菊花样式
   * @property {string} [content] - 内容
   * @property {string} [cssClass] - 自定义样式
   * @property {boolean} [showBackdrop=false] - 是否显示黑色背景
   * @property {number} [duration=0] - loading持续时间, 如果为0则无效
   * @property {boolean} [dismissOnPageChange=false] - 页面切换是否关闭loading
   *
   * @example
   *
   const _this = this;
   _this.$loading.present({
    content: '正在加载, 4000ms后自动关闭...',
    cssClass: 'cssClass',
    dismissOnPageChange: true, // url变化后关闭loading
    showBackdrop: true,
  });
   setTimeout(function () {
    _this.$loading.dismiss().then(function () {
      console.debug('dismiss in promise success!')
    })
  }, 4000);
   *
   * */
  import { registerListener } from '../../util/dom'
  export default{
    name: 'Loading',
    data(){
      return {
        /**
         * 初始化Instance的数据
         * 因为是实例调用模式，故prop和data在初始化后是同样的数据接口，
         * 故prop就没有存在的价值
         * */
        spinner: 'ios', // String
        content: null, // 可以使html片段
        cssClass: null,
        showBackdrop: false,
        duration: null, // 自动关闭时间
        dismissOnPageChange: false,// 页面切花是否关闭

        /**
         * 组件状态
         * */
        isActive: false, // 开启状态
        mode: 'ios',

        // promise
        presentCallback: null,
        dismissCallback: null,

        timer: null,
        unreg: null,
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
      transitionClass(){
        return `loading-${this.mode}`
      }
    },
    methods: {
      // -------- private --------

      /**
       * ActionSheet Animate Hooks
       * */
      _beforeEnter () {
        this.$app.setEnabled(false, 200);
      },
      _afterEnter (el) {
        this.presentCallback(el);
      },
      _beforeLeave () {
        this.$app.setEnabled(false, 200);
      },
      _afterLeave (el) {
        this.dismissCallback(el);
        // 删除DOM
        this.$el.remove()
      },
      /**
       * @private
       * */
      dismissOnPageChangeHandler(){
        this.isActive && this.dismiss();
        this.unreg && this.unreg();
      },

      // -------- public --------
      /**
       * 这个是内部函数，外部同名方法会处理额外事宜
       * 开启实例
       * @returns {Promise} transitionEnd结束后返回promise
       */
      present () {
        const _this = this;
        _this.isActive = true;
        if (parseInt(this.duration) > 0) {
          this.timer && clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.dismiss();
          }, this.duration);
        }
        return new Promise((resolve) => {this.presentCallback = resolve})
      },

      /**
       * 关闭实例
       * @returns {Promise} transitionEnd结束后返回promise
       */
      dismiss () {
        const _this = this;
        _this.isActive = false; // 动起来
        this.timer && clearTimeout(this.timer)
        return new Promise((resolve) => {this.dismissCallback = resolve})
      },
    },
    created(){
      // mounted before data ready, so no need to judge the `dismissOnPageChange` value
      this.unreg = registerListener(window, 'popstate', this.dismissOnPageChangeHandler, {capture: false});
    }
  }
</script>
