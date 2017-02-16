<template>
  <div class="ion-loading" :class="[modeClass,cssClass]">
    <ion-backdrop :isActive="isActive" v-if="showBackdrop" :enableBackdropDismiss="false"></ion-backdrop>
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
<style scoped lang="scss">
  @import './loading';
  @import './loading.ios';
  /*@import './loading.md';*/
  /*@import './loading.wp';*/

  .loading-enter-active, .loading-leave-active {
    transform: scale(1);
    opacity: 1;
  }

  .loading-enter {
    transform: scale(1.1);
    opacity: 0;
  }

  .loading-leave-active {
    transform: scale(0.9);
    opacity: 0;
  }

</style>
<script type="text/ecmascript-6">

  import {transitionEndPromise} from '../../util/dom'

  export default{
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
        // TODO:这部分没做。
        dismissOnPageChange: false,// 页面切花是否关闭

        /**
         * 组件状态
         * */
        isActive: false, // 开启状态
        enabled: false, // 是否在过渡态的状态判断，如果在动画中则为false
        mode: this.$config.get('mode') ||'ios', // ios?android?window
      }
    },
    watch: {},
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
      },
      _afterEnter () {
        this.enabled = true;
      },
      _beforeLeave () {
        this.enabled = false;
      },
      _afterLeave () {
        this.enabled = true;
        // 删除DOM
        this.$el.remove()
      },

      /**
       * Present the action sheet instance.
       * 这个是内部函数，外部同名方法会处理额外事宜
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      _present () {
        const _this = this;
        _this.isActive = true;

        return transitionEndPromise(_this.$el.querySelectorAll('.loading-wrapper')[0]);

        // return new Promise(function (resolve) {
        //   let _presentHandler = function () {
        //     _this.$el.removeEventListener('transitionend', _presentHandler);
        //     resolve('Present Success!');
        //   };
        //   _this.$el.addEventListener('transitionend', _presentHandler);
        // });
      },

      /**
       * Dismiss the instance.
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      _dismiss () {
        const _this = this;
        if (!_this.enabled) {
          return false
        }
        _this.enabled = false;
        _this.isActive = false; // 动起来
        return new Promise(function (resolve) {
          let _dismissHandler = function () {
            _this.$el.removeEventListener('transitionend', _dismissHandler);
            _this.enabled = true;
            resolve('Dismiss Success!');
          };
          _this.$el.addEventListener('transitionend', _dismissHandler);
        });
      },
    },
    created () {
    },
    mounted () {
    },
  }
</script>
