<template>
  <div id="ion-toast" class="ion-toast" :class="[modeClass,cssClass]">
    <transition :name="positionClass"
                v-on:before-enter="_beforeEnter"
                v-on:after-enter="_afterEnter"
                v-on:before-leave="_beforeLeave"
                v-on:after-leave="_afterLeave">
      <div v-show="isActive" class="toast-wrapper" :class="[positionClass]">
        <div class="toast-container">
          <div class="toast-message" id="toast-hdr" v-if="message">{{message}}</div>
          <ion-button class="toast-button" type="clear" v-if="showCloseButton" @click="cbClick()">
            {{ closeButtonText || '关闭' }}
          </ion-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
  @import "./toast";
  @import "./toast.ios";
  @import "./toast.wp";
  @import "./toast.md";

  /*top*/
  .toast-top-enter-active, .toast-top-leave-active {
    transform: translateY(0);
  }

  .toast-top-enter, .toast-top-leave-active {
    transform: translateY(-130%);
  }

  /*bottom*/
  .toast-bottom-enter-active, .toast-bottom-leave-active {
    transform: translateY(0);
  }

  .toast-bottom-enter, .toast-bottom-leave-active {
    transform: translateY(130%);
  }

  /*middle*/
  .toast-middle-enter-active, .toast-middle-leave-active {
    opacity: 1;
  }

  .toast-middle-enter, .toast-middle-leave-active {
    opacity: 0.01;
  }

</style>

<script type="text/babel">
  export default {
    data() {
      return {
        /**
         * 初始化Instance的数据
         * 因为是实例调用模式，故prop和data在初始化后是同样的数据接口，
         * 故prop就没有存在的价值
         * */
        message: '', // String
        duration: null, // Number
        position: 'bottom',
        cssClass: null,
        showCloseButton: false,
        closeButtonText: '关闭', // 手动关闭按钮的文本
        // TODO:这部分没做。
        dismissOnPageChange: false, // 页面切花是否关闭

        /**
         * 组件状态
         * */
        isActive: false, // 开启状态
        enabled: false, // 是否在过渡态的状态判断，如果在动画中则为false
        // TODO: mode需要从配置中取,最好和scss同步
        mode: 'ios', // ios?android?windown?we?alipay
      }
    },
    watch:{
    },
    computed: {
      // 设置ActionSheet的风格
      modeClass: function () {
        return `toast-${this.mode}`
      },
      // 位置样式
      positionClass: function () {
        return `toast-${this.position}`
      },

    },
    methods: {
      /**
       * ActionSheet Animate Hooks
       * */
      _beforeEnter: function () {
        this.enabled = false; // 不允许过渡中途操作
      },
      _afterEnter: function () {
        this.enabled = true;
      },
      _beforeLeave: function () {
        this.enabled = false;
      },
      _afterLeave: function () {
        this.enabled = true;
        // 删除DOM
        this.$el.remove()
      },

      /**
       * 手动关闭的 close button
       * */
      cbClick() {
        if (this.enabled) {
          // 关闭需要检查onDidDismiss是否注册，故在外部定义此事件处理
          return this.dismiss();
        }else{
          return false
        }
      },

      /**
       * Present the action sheet instance.
       * 这个是内部函数，外部同名方法会处理额外事宜
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      _present: function () {
        const _this = this;
        _this.isActive = true;
        return new Promise(function (resolve) {
          let _presentHandler = function () {
            _this.$el.removeEventListener('transitionend', _presentHandler);
            resolve('Present Success!');
          };
          _this.$el.addEventListener('transitionend', _presentHandler);
        });
      },

      /**
       * Dismiss the instance.
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      _dismiss: function () {
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
  };
</script>
