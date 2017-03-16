<template>
  <div class="ion-action-sheet" :class="[modeClass,cssClass]">
    <!--backdrop-->
    <Backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss"
                  :isActive="isActive"></Backdrop>
    <!--actionsheet wrap-->
    <transition
      name="action-sheet"
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
            <Button role="action-sheet-button" @click="click(b)" v-for="b of normalButtons"
                        class=""
                        :class="[b.cssClass,{'icon-left':b.icon}]">
              <Icon :name="b.icon" v-if="b.icon" class="action-sheet-icon"></Icon>
              {{b.text}}
            </Button>
          </div>
          <!--group cancel-->
          <div class="action-sheet-group" v-if="!!cancelButton">
            <Button role="action-sheet-button" @click="click(cancelButton)"
                        class="action-sheet-cancel" :class="cancelButton.cssClass">
              <Icon :name="cancelButton.icon" v-if="cancelButton.icon"
                        class="action-sheet-icon"></Icon>
              {{cancelButton.text || 'cancel没有值'}}
            </Button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * @module Component/ActionSheet
   * @description
   *
   * ActionSheet是一个弹出表单，一般都是由很多Button组成。当用户点击确认完毕后关闭.
   *
   * 它显示在应用内容的顶层，必须由用户手动关闭，然后他们才能恢复与应用的互动。
   * 有一些简单的方法可以取消操作表，例如点击背景幕或者点击桌面上的退出键,
   * 也就是说, ActionSheet能监听url的变化做出关闭的动作。
   *
   * @property {String} [title='']                     - 初始化Alert Instance的数据
   * @property {string} [subTitle='']                  - 初始化Alert Instance的数据
   * @property {string} [message='']                   - 初始化Alert Instance的数据
   * @property {string} [cssClass='']                  - Additional classes for custom styles, separated by spaces
   * @property {Array} [buttons=[ ]]                   - button数组，包含全部role
   * @property {Boolean} [enableBackdropDismiss=true]  - 允许点击backdrop关闭actionsheet
   *
   * @property {Boolean} [isActive=false]                - ActionSheet 开启状态
   * @property {Boolean} [enabled=false]               - 是否在过渡态的状态判断，如果在动画中则为false
   * @property {string} [mode=ios]                     - 样式模式
   * @property {Array} [normalButtons=[ ]]             - 普通按钮组
   * @property {Array} [cancelButton=[ ]]              - 取消按钮(组)，一般放在下面
   */


  /**
   * 使用实例模式的话，props和data无区别。
   * */
  export default{
    name: 'ActionSheet',
    data(){
      return {
        /**
         * @private
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
         * @private
         * ActionSheet State
         * */
        isActive: false,  // ActionSheet 开启状态
        enabled: false, // 是否在过渡态的状态判断，如果在动画中则为false
        mode: VM.config.get('mode') || 'ios', // ios?android?window

        /**
         * @private
         * ActionSheet 计算属性
         * 因为实例化后computed也就无效了，
         * 故这部分在watch处理
         * */
        normalButtons: [], // 普通按钮组
        cancelButton: null, // 取消按钮(组)，一般放在下面

        // promise
        presentCallback: null,
        dismissCallback: null,
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
       * @private
       * ActionSheet Animate Hooks
       * */
      _beforeEnter () {
        this.enabled = false; // 不允许过渡中途操作
        this.$app.setEnabled(false, 400)
      },
      _afterEnter (el) {
        this.enabled = true;
        this.presentCallback(el);
        this._focusOutActiveElement();
        let focusableEle = document.querySelector('button');
        if (focusableEle) {
          focusableEle.focus();
        }
      },
      _beforeLeave () {
        this.enabled = false;
        this.$app.setEnabled(false, 400)
      },
      _afterLeave (el) {
        this.enabled = true;
        this.dismissCallback(el);
        // 删除DOM
        this.$el.remove();
      },

      /**
       * @private
       * ActionSheet启动之前去除focus效果，因为存在键盘
       * */
      _focusOutActiveElement () {
        // only button？
        const activeElement = document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
      },

      /**
       * @function bdClick
       * @description
       * 点击backdrop,关闭actionsheet
       *
       * 如存在cancel按钮，点击按钮关闭actionsheet
       * Backdrop Click Handler, If cancelButton defined, then action cancelButton handler.
       */
      bdClick () {
        let _this = this;
        if (_this.enabled && _this.enableBackdropDismiss) {
          if (_this.cancelButton) {
            _this.click(this.cancelButton);
          } else {
            _this._dismiss()
          }
        }
      },

      /**
       * @function click
       * @description
       * 点击下方按钮
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
          _this._dismiss();
        }
      },

      /**
       * @private
       * Present the action sheet instance.
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      _present (options = {}) {
        const _this = this;
        _this.isActive = true;
        return new Promise((resolve) => {this.presentCallback = resolve})
      },

      /**
       * Dismiss the action sheet instance.
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      _dismiss () {
        const _this = this;
        if (!_this.enabled) {
          return false
        }
        _this.enabled = false;
        _this.isActive = false; // 动起来
        return new Promise((resolve) => {this.dismissCallback = resolve})
      },

      /**
       * @function setTitle
       * @description
       * 设置 Action sheet title
       * @param {string} title Action sheet title
       */
      setTitle (title) {
        this.title = title;
      },

      /**
       *
       * @function setSubTitle
       * @description
       * 设置 Action sheet subtitle
       * @param {string} subTitle Action sheet subtitle
       */
      setSubTitle (subTitle) {
        this.subTitle = subTitle;
      },

      /**
       * @function addButton
       * @description
       * 增加button
       * @param {object} button Action sheet button
       */
      addButton (button) {
        this.buttons.push(button);
      },

    }
  }
</script>
<style lang="scss">
  @import './action-sheet.scss';
  @import './action-sheet.ios.scss';
  @import './action-sheet.wp.scss';
  @import './action-sheet.md.scss';

  // transitioName = 'action-sheet'
  .action-sheet-enter-active, .action-sheet-leave-active {
    transform: translateY(0%);
  }

  .action-sheet-enter, .action-sheet-leave-active {
    transform: translateY(100%);
  }
</style>
