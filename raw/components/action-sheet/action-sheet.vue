<template>
    <div class="action-sheet" :class="[modeClass,cssClass]">
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
                            <span>{{title}}</span>
                            <div class="action-sheet-sub-title" v-if="subTitle">{{subTitle}}</div>
                        </div>

                        <div class="action-sheet-buttons">
                            <Button role="action-sheet-button" @click="click(b)" v-for="(b,index) of normalButtons"
                                    :key="index"
                                    :class="[b.cssClass,{'icon-left':b.icon}]">
                                <Icon :name="b.icon" v-if="b.icon" class="action-sheet-icon"></Icon>
                                <span>{{b.text}}</span>
                            </Button>
                        </div>
                    </div>
                    <!--group cancel-->
                    <div class="action-sheet-group" v-if="!!cancelButton">
                        <Button role="action-sheet-button" @click="click(cancelButton)"
                                class="action-sheet-cancel" :class="cancelButton.cssClass">
                            <Icon :name="cancelButton.icon" v-if="cancelButton.icon"
                                  class="action-sheet-icon"></Icon>
                            <span>{{cancelButton.text || 'Cancel'}}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
  /**
   * @module Component/ActionSheet
   * @description
   *
   * ActionSheet是一个从底部弹出的按钮表单，一般都是由很多Button组成。当用户点击确认完毕后关闭.
   *
   * 它显示在应用内容的顶层，必须由用户手动关闭，然后他们才能恢复与应用的互动。
   * 有一些简单的方法可以取消操作表，例如点击背景幕或者点击桌面上的退出键,
   * 也就是说, ActionSheet能监听url的变化做出关闭的动作。
   *
   * 如果选择后需要翻页, 希望能在promise回调中执行, 保证ActionSheet的动画
   *
   * @property {String} [title]                     - ActionSheet的标题
   * @property {string} [subTitle]                  - ActionSheet的副标题
   * @property {string} [cssClass]                  - Additional classes for custom styles, separated by spaces
   * @property {Array} [buttons]                   - button数组，包含全部role
   * @property {Boolean} [enableBackdropDismiss=true]  - 允许点击backdrop关闭actionsheet
   * @property {string} [mode=ios]                     - 样式模式
   *
   * @example
   *
   *
   const _this = this;
   _this.$actionSheet.present({
    title: '请选择操作',
    subTitle: '注意，选择后不能撤销！',
    cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
    enableBackdropDismiss: true,
    buttons: [
      {
        text: '删除',
        role: 'destructive',
        icon: 'trash',
        cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
        handler: () => {
          console.log('Destructive clicked');
        }
      },
      {
        text: '分享',
        icon: 'share',
        handler: () => {
          console.log('Archive1 clicked');
        }
      },
      {
        text: '播放',
        icon: 'play',
        handler: () => {
          console.log('Archive4 clicked');
        }
      },
      {
        text: '取消',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          _this.$actionSheet.dismiss().then(function (data) {
            console.debug('promise的退出方式')
          });
        }
      }
    ]
  })
   *
   */

  /**
   * 使用实例模式的话，props和data无区别。
   * */
  import { registerListener } from '../../util/util'
  import { Backdrop } from '../backdrop'
  import { Button } from '../button'
  import { Icon } from '../icon'
  export default{
    name: 'ActionSheet',
    props: {
      title: [String],
      subTitle: [String],
      cssClass: [String],
      buttons: {
        type: Array,
        default(){return []}
      },
      enableBackdropDismiss: {
        type: Boolean,
        default(){return true}
      },
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode', 'ios') || 'ios' }
      }
    },
    data(){
      return {
        /**
         * @private
         * ActionSheet State
         * */
        isActive: false,  // ActionSheet 开启状态
        enabled: false, // 是否在过渡态的状态判断，如果在动画中则为false

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

        unreg: null,
      }
    },
    computed: {
      // 设置ActionSheet的风格
      modeClass: function () {
        return `action-sheet-${this.mode}`
      },
    },
    methods: {
      /**
       * @private
       * ActionSheet Animate Hooks
       * */
      _beforeEnter () {
        this.enabled = false; // 不允许过渡中途操作
        this.$app && this.$app.setEnabled(false, 400)
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
        this.$app && this.$app.setEnabled(false, 400)
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
       * @private
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
            _this.dismiss()
          }
        }
      },

      /**
       * @private
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
          _this.dismiss();
        }
      },

      /**
       * @function present
       * @description
       * 打开ActionSheet, 默认是自动开启的
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      present () {
        const _this = this;
        _this.isActive = true;

        console.debug('this.buttons present')
        console.debug(this.buttons)

        return new Promise((resolve) => {this.presentCallback = resolve})
      },

      /**
       * @function dismiss
       * @description
       * 关闭ActionSheet
       * @return {Promise} Returns a promise which is resolved when the transition has completed.
       * */
      dismiss () {
        const _this = this;
        if (!_this.enabled) {
          return false
        }
        _this.enabled = false;
        _this.isActive = false; // 动起来
        return new Promise((resolve) => {this.dismissCallback = resolve})
      },
      // /**
      //  * @private
      //  * @function setTitle
      //  * @description
      //  * 设置 Action sheet title
      //  * @param {string} title Action sheet title
      //  */
      // setTitle (title) {
      //   this.title = title;
      // },
      // /**
      //  * @private
      //  * @function setSubTitle
      //  * @description
      //  * 设置 Action sheet subtitle
      //  * @param {string} subTitle Action sheet subtitle
      //  */
      // setSubTitle (subTitle) {
      //   this.subTitle = subTitle;
      // },
      // /**
      //  * @private
      //  * @function addButton
      //  * @description
      //  * 增加button
      //  * @param {object} button Action sheet button
      //  */
      // addButton (button) {
      //   this.buttons.push(button);
      // },
      /**
       * @private
       * */
      dismissOnPageChangeHandler(){
        this.isActive && this.dismiss();
        this.unreg && this.unreg();
      },

      /**
       * @private
       * 初始化buttons
       * */
      init(){
        let arr = this.buttons
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
      }
    },
    created(){
      this.init()
      // mounted before data ready, so no need to judge the `dismissOnPageChange` value
      this.unreg = registerListener(window, 'popstate', this.dismissOnPageChangeHandler, {capture: false});
    },
    components: {
      Backdrop,
      Button,
      Icon,
    }
  }
</script>
<style lang="scss">
    @import './action-sheet.scss';
    @import './action-sheet.ios.scss';
    @import './action-sheet.md.scss';

    // transitioName = 'action-sheet'
    .action-sheet-enter-active, .action-sheet-leave-active {
        transform: translateY(0%);
    }

    .action-sheet-enter, .action-sheet-leave-active {
        transform: translateY(100%);
    }
</style>
