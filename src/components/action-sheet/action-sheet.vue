<template>
  <div class="ion-action-sheet"
       :class="[modeClass,cssClass]">
    <!--backdrop-->
    <ion-backdrop @click.native="bdClick()" :enableBackdropDismiss="enableBackdropDismiss"
                  :isActive="isActive"></ion-backdrop>
    <!--actionsheet wrap-->
    <transition
      name="action-sheet-fadeIn"
      v-on:before-enter="_beforeEnter"
      v-on:after-enter="_afterEnter"
      v-on:before-leave="_beforeLeave"
      v-on:after-leave="_afterLeave">
      <div class="action-sheet-wrapper" v-show="isActive">
        <div class="action-sheet-container">
          <!--group normal-->
          <div class="action-sheet-group">
            <div class="action-sheet-title" v-if="title">
              {{title}}
              <div class="action-sheet-sub-title" v-if="subTitle">{{subTitle}}</div>
            </div>
            <ion-button role="action-sheet-button" @click="click(b)" v-for="b of normalButtons"
                        class=""
                        :class="[b.cssClass,{'icon-left':b.icon}]">
              <ion-icon :name="b.icon" v-if="b.icon" class="action-sheet-icon"></ion-icon>
              {{b.text}}
            </ion-button>
          </div>
          <!--group cancel-->
          <div class="action-sheet-group" v-if="!!cancelButton">
            <ion-button role="action-sheet-button" @click="click(cancelButton)"
                        class="action-sheet-cancel" :class="cancelButton.cssClass">
              <ion-icon :name="cancelButton.icon" v-if="cancelButton.icon"
                        class="action-sheet-icon"></ion-icon>
              {{cancelButton.text || 'cancel没有值'}}
            </ion-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  // import BackDrop from '../../backdrop';
  // import Button from '../../button'

  // TODO: 全局的esc事件监听未做，监听触发dbClick()
  /**
   * 使用实例模式的话，props和data无区别。
   * */
  export default{
    data(){
      return {
        /**
         * 初始化ActionSheet Instance的数据
         * 因为是实例调用模式，故prop和data在初始化后是同样的数据接口，
         * 故prop就没有存在的价值
         * */
        title: '', // String
        subTitle: '', // String
        cssClass: '', // String Additional classes for custom styles, separated by spaces.
        buttons: [], // Array button数组，包含全部role
        enableBackdropDismiss: true, // Boolean 允许点击backdrop关闭actionsheet

        /**
         * ActionSheet State
         * */
        isActive: false,  // ActionSheet 开启状态
        enabled: false, // 是否在过渡态的状态判断，如果在动画中则为false
        // TODO: mode需要从配置中取,最好和scss同步
        mode: 'ios', // ios?android?windown?we?alipay

        /**
         * ActionSheet 计算属性
         * 因为实例化后computed也就无效了，
         * 故这部分在watch处理
         * */
        normalButtons: [], // 普通按钮组
        cancelButton: null, // 取消按钮(组)，一般放在下面
      }
    },
    computed: {
      // 设置ActionSheet的风格
      modeClass: function () {
        return `action-sheet-${this.mode}`
      },
    },
    watch: {
      buttons: function (arr) {
        let _this = this;
        let _buttons = [];
        if (!Array.isArray(arr)) {
          return
        }
        arr.forEach(function (button) {
          if (typeof button === 'string') {
            button = {text: button};
          }

          if (!button.cssClass) {
            button.cssClass = '';
          } else {
            // 去除收尾空格
            button.cssClass = button.cssClass.trim();
          }

          if (button.role === 'cancel') {
            _this.cancelButton = button;
          } else {
            if (button.role === 'destructive') {
              button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-destructive';
            } else if (button.role === 'selected') {
              button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-selected';
            }
            _buttons.push(button);
          }
        });
        _this.normalButtons = _buttons;
      },
    },
    methods: {
      /**
       * ActionSheet Animate Hooks
       * */
      _beforeEnter () {
        this.enabled = false; // 不允许过渡中途操作
        this.$setEnabled(false, 400)
      },
      _afterEnter () {
        this.enabled = true;
        this._focusOutActiveElement();
        let focusableEle = document.querySelector('button');
        if (focusableEle) {
          focusableEle.focus();
        }
      },
      _beforeLeave () {
        this.enabled = false;
        this.$setEnabled(false, 400)
      },
      _afterLeave () {
        this.enabled = true;
        // 删除DOM
        this.$el.remove()
      },

      /**
       * ActionSheet启动之前去除focus效果，因为存在键盘
       * */
      _focusOutActiveElement () {
        // only button？
        const activeElement = document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
      },

      /**
       * Backdrop Click Handler, If cancelButton defined, then action cancelButton handler.
       */
      bdClick () {
        let _this = this;
        if (_this.enabled && _this.enableBackdropDismiss) {
          if (_this.cancelButton) {
            _this.click(this.cancelButton);
          } else {
            _this.dismiss()
          }
        }
      },

      /**
       * @param {object} button Button Click Handler
       */
      click (button) {
        const _this = this;
        if (!_this.enabled) {
          return;
        }
        let shouldDismiss = true;
        if (button.handler) {
          // a handler has been provided, execute it
          if (button.handler() === false) {
            // if the return value of the handler is false then do not dismiss
            shouldDismiss = false;
          }
        }

        // 当前不是在过渡动画中(dismissing中)，
        // 如果是在dismissing中，则意味着正在关闭，
        // 这里不必进行
        if (_this.enabled && shouldDismiss) {
          _this.dismiss();
        }
      },

      /**
       * Present the action sheet instance.
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      present () {
        const _this = this;
        _this.isActive = true;

        // 组件通知
        !!Vue.prototype.$ActionSheet && (Vue.prototype.$ActionSheet.isOpen = true);

        return new Promise(function (resolve) {
          let _presentHandler = function () {
            _this.$el.removeEventListener('transitionend', _presentHandler);
            resolve('ActionSheet Present Success!');
          };
          _this.$el.addEventListener('transitionend', _presentHandler);
        });
      },

      /**
       * Dismiss the action sheet instance.
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      dismiss () {
        const _this = this;
        console.log('dismiss?');
        if (!_this.enabled) {
          console.log('dismiss is going');
          return false
        }
        console.log('dismissing');
        _this.enabled = false;
        _this.isActive = false; // 动起来

        return new Promise(function (resolve) {
          let _dismissHandler = function () {
            _this.$el.removeEventListener('transitionend', _dismissHandler);
            _this.enabled = true;
            // 组件通知
            !!Vue.prototype.$ActionSheet && (Vue.prototype.$ActionSheet.isOpen = false);
            resolve('ActionSheet Dismiss Success!');
          };
          _this.$el.addEventListener('transitionend', _dismissHandler);
        });
      },

      /**
       * @param {string} title Action sheet title
       */
      setTitle (title) {
        this.title = title;
      },

      /**
       * @param {string} subTitle Action sheet subtitle
       */
      setSubTitle (subTitle) {
        this.subTitle = subTitle;
      },

      /**
       * @param {object} button Action sheet button
       */
      addButton (button) {
        this.buttons.push(button);
      }
    },
    components: {
      // 'ion-backdrop': BackDrop,
      // 'ion-button': Button,
    },
  }
</script>
<style lang="scss">

  @import './action-sheet.scss';
  @import './action-sheet.ios.scss';
  /*@import './action-sheet.wp.scss';*/
  /*@import './action-sheet.md.scss';*/

  .action-sheet-fadeIn-enter-active, .action-sheet-fadeIn-leave-active {
    transform: translateY(0%);
  }

  .action-sheet-fadeIn-enter, .action-sheet-fadeIn-leave-active {
    transform: translateY(100%);
  }


</style>
