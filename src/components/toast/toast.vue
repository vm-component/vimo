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
            {{ closeButtonText}}
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
  // transition
  @import "../../transitions/toast";
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
        closeButtonText: 'Close', // 手动关闭按钮的文本
        dismissOnPageChange: false, // 页面切花是否关闭
        onDismiss: null, // 当关闭的时候触发

        /**
         * 组件状态
         * */
        isActive: false, // 开启状态
        mode: this.$config.get('mode') || 'ios', // ios?android

        //prmiseCallback
        presentCallback: null,
        dismissCallback: null,

        // timer
        timer: null,
      }
    },
    computed: {
      // 设置ActionSheet的风格
      modeClass () {
        return `toast-${this.mode}`
      },
      // 位置样式
      positionClass () {
        return `toast-${this.position}`
      },
    },
    methods: {
      /**
       *Animate Hooks
       * */
      _beforeEnter () {},
      _afterEnter (el) {
        this.presentCallback(el);
      },
      _beforeLeave () {},
      _afterLeave (el) {
        this.dismissCallback(el);
        // 删除DOM
        this.$el.remove()
      },

      /**
       * 手动关闭的 close button
       * */
      cbClick() {
        const _this = this;
        return _this._dismiss().then(function () {
          !!_this.onDismiss && _this.onDismiss()
        })

      },

      /**
       * 开启当前组件
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      _present () {
        const _this = this;
        _this.isActive = true;

        if (!_this.showCloseButton) {
          _this.timer = setTimeout(function () {
            _this.timer = null;
            _this._dismiss().then(function () {
              !!_this.onDismiss && _this.onDismiss()
            })
          }, _this.duration)
        }

        return new Promise((resolve) => {_this.presentCallback = resolve})
      },

      /**
       * 关闭当前组件
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      _dismiss () {
        const _this = this;
        _this.isActive = false; // 动起来
        return new Promise((resolve) => {_this.dismissCallback = resolve})
      },
    },
  };
</script>
