<template>
    <div class="alert" :class="[modeClass,cssClass,{'alert-top':isAlertTop}]">
        <Backdrop @click.native="bdClick()" :enableBackdropDismiss="enableBackdropDismiss"
                  :isActive="isActive"></Backdrop>
        <transition name="alert"
                    v-on:before-enter="_beforeEnter"
                    v-on:after-enter="_afterEnter"
                    v-on:before-leave="_beforeLeave"
                    v-on:after-leave="_afterLeave">
            <div class="alert-wrapper" v-show="isActive">
                <div class="alert-head">
                    <h2 class="alert-title" v-if="title">{{title}}</h2>
                    <h3 class="alert-sub-title" v-if="subTitle">{{subTitle}}</h3>
                </div>
                <div class="alert-message" v-html="message"></div>
                <div v-if="!!inputs && inputs.length>0">
                    <div v-if="inputType==='radio'" class="alert-radio-group" role="radiogroup">
                        <Button role="alert-radio-button" v-for="(i,index) in inputsForDispaly" @click="rbClick(i)"
                                :key="index"
                                :aria-checked="i.checked" :disabled="i.disabled" :id="i.id"
                                class="alert-tappable alert-radio">
                            <div class="alert-radio-icon">
                                <div class="alert-radio-inner"></div>
                            </div>
                            <div class="alert-radio-label">
                                <span>{{i.label}}</span>
                            </div>
                        </Button>
                    </div>

                    <div class="alert-checkbox-group" v-if="inputType==='checkbox'">
                        <Button :id="i.id" role="alert-checkbox-button" :aria-checked="i.checked"
                                v-for="(i,index) in inputsForDispaly" @click="cbClick(i)" :key="index"
                                :checked="i.checked" :disabled="i.disabled" class="alert-tappable alert-checkbox">
                            <div class="alert-checkbox-icon">
                                <div class="alert-checkbox-inner"></div>
                            </div>
                            <div class="alert-checkbox-label">
                                <span>{{i.label}}</span>
                            </div>
                        </Button>
                    </div>

                    <div v-if="inputType!='radio' && inputType!='checkbox'" class="alert-input-group">
                        <div v-for="i in inputsForDispaly" class="alert-input-wrapper">
                            <!-- v-model="i.value"-->
                            <input :id="i.id" :value="i.value" :placeholder="i.placeholder" :type="i.type"
                                   class="alert-input">
                        </div>
                    </div>

                </div>
                <div class="alert-button-group" :class="{'alert-button-group-vertical':buttonsForDisplay.length>2}">
                    <Button role="alert-button" v-for="(b,index) in buttonsForDisplay" :key="index" @click="btnClick(b)"
                            :class="[b.cssClass]">
                        <span>{{b.text}}</span>
                    </Button>
                </div>
            </div>
        </transition>
    </div>

</template>
<style lang="scss">
    @import './alert.scss';
    @import './alert.ios.scss';
    @import './alert.md.scss';

    // transitioName = 'alert'
    .alert-enter-active, .alert-leave-active {
        transform: scale(1);
        opacity: 1;
    }

    .alert-enter {
        transform: scale(1.1);
        opacity: 0;
    }

    .alert-leave-active {
        transform: scale(0.9);
        opacity: 0;
    }

</style>
<script>
  /**
   * @module Component/Alert
   * @description
   *
   * 提醒是向用户提供选择特定操作或操作列表的一种很好的方法。他们还可以向用户提供重要信息，或要求他们做出决定（或多个决定）。
   *
   * 提醒还可以包括几个不同的输入，其数据可以传递回应用程序。输入可以用作提示用户提供信息的简单方法。Radios、checkboxes 和 text inputs都可以接受，但不能混用。
   *
   * 例如，提醒可以具有所有单选按钮输入或所有复选框输入，但是相同的警报不能混合 Radios 和 checkboxes。
   * 然而，待办事项，不同类型的“文本”，“输入可以混合使用，例如url，email，text等，
   * 如果您需要的不符合提醒的话，我们建议构建一个模式内的形式指引的范围内复杂的表单UI代替。
   *
   *
   *
   *
   * @property {String} title                    - 初始化Alert Instance的数据
   * @property {string} [subTitle]                  - 初始化Alert Instance的数据
   * @property {string} [message]                   - 初始化Alert Instance的数据
   * @property {string} [cssClass]                  - Additional classes for custom styles, separated by spaces
   * @property {Array} [buttons]                   - button数组，包含全部role
   * @property {Array} [inputs]                    - 如果alert中有input等form
   * @property {Boolean} [enableBackdropDismiss=true]  - 允许点击backdrop关闭actionsheet
   * @property {String} [mode=ios]                     - 样式模式
   *
   *
   *
   * @example
   *
   * 1. 简单的alert
   *
   _this.$alert.present({
    title: 'Alert',
    // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
    message: '收到这个通知的人希望你今天能搞定这个alert组件',
    cssClass: 'alertCssOuterMain  ',
    enableBackdropDismiss: true,
    //buttons:['1','2','3']
    buttons: [
      {
        text: '确定',
        role: '',
        handler: (value) => {
          _this.$alert.dismiss().then(function (data) {
            console.debug('button3 click dismiss ')
            console.debug(data)
          });
        }
      }
    ]
  });
   *
   *
   *
   */
  import { Backdrop } from '../backdrop'
  import { Button } from '../button'

  export default{
    name: 'Alert',
    props: {
      title: [String],
      subTitle: [String],
      cssClass: [String],
      message: [String],
      // Array button数组，包含全部role
      buttons: {
        type: Array,
        default(){return []}
      },
      // 如果alert中有input等form
      inputs: {
        type: Array,
        default(){return []}
      },
      // Boolean 允许点击backdrop关闭actionsheet
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
         * Alert State
         * */
        inputsForDispaly: [], // inputs数据再加工
        isActive: false,  // 是否活动状态
        enabled: false, // 是否在过渡态的状态判断，如果在动画中则为false

        inputType: null,// Alert中含有的input类型，radio、checkbox
        isAlertTop: false, // 是否将alert放到顶部，用于input输入时显示虚拟键盘

        dismissCallback: null,
        presentCallback: null,
      }
    },
    computed: {
      // 设置Alert的风格
      modeClass () {
        return `alert-${this.mode}`
      },
      hdrId () {
        return 'alert-hdr'
      },
      buttonsForDisplay () {
        // 如果是string则转化为对象
        return this.buttons.map(button => {
          if (typeof button === 'string') {
            return {text: button};
          }
          return button;
        });
      },
    },
    methods: {
      // -------- private --------

      /**
       * @private
       * ActionSheet Animate Hooks
       * */
      _beforeEnter () {
        this.enabled = false; // 不允许过渡中途操作
        this.$app && this.$app.setEnabled(false, 200);
      },
      _afterEnter (el) {
        this.enabled = true;

        // 执行开启的promise
        this.presentCallback(el);

        this.focusOutActiveElement();
        let focusableEle = this.$el.querySelector('input');
        if (focusableEle) {
          focusableEle.focus();
        }
      },
      _beforeLeave () {
        this.enabled = false;
        this.$app && this.$app.setEnabled(false, 200);
      },
      _afterLeave (el) {
        this.enabled = true;
        // 执行关闭的promise
        this.dismissCallback(el);
        // 移除DOM
        this.$el.remove();
      },

      /**
       * @private
       * @function bdClick
       * @description
       * 点击backdrop,关闭actionsheet，
       * 如存在cancel按钮，点击按钮关闭actionsheet
       * */
      bdClick () {
        if (this.enabled && this.enableBackdropDismiss) {
          let cancelBtn = this.buttonsForDisplay.find(b => b.role === 'cancel');
          if (cancelBtn) {
            this.btnClick(cancelBtn);
          } else {
            this.dismiss();
          }
        }
      },

      /**
       * @private
       * @function btnClick
       * @description
       * 点击下方的按钮
       * @param {object} button  - button数组，包含全部role
       * */
      btnClick (button) {
        if (!this.enabled) {
          return;
        }

        let shouldDismiss = true;

        if (button.handler) {
          // a handler has been provided, execute it
          // pass the handler the values from the inputs
          if (button.handler(this.getValues()) === false) {
            // if the return value of the handler is false then do not dismiss
            shouldDismiss = false;
          }
        }

        if (shouldDismiss) {
          this.dismiss();
        }
      },

      /**
       * @private
       * @function rbClick
       * @description
       * Radio Button Click
       * @param {object} checkedInput  - Radio 选中项
       * */
      rbClick (checkedInput) {
        const _this = this;
        if (_this.enabled) {
          _this.inputsForDispaly.forEach(input => {
            input.checked = (checkedInput === input);
          });
          if (checkedInput.handler) {
            checkedInput.handler(checkedInput);
          }
        }
      },

      /**
       * @private
       * @function cbClick
       * @description
       * CheckBox Button Click
       * @param {object} checkedInput  - CheckBox 选中项
       * */
      cbClick (checkedInput) {
        const _this = this;
        if (_this.enabled) {
          checkedInput.checked = !checkedInput.checked;
          if (checkedInput.handler) {
            // 简单的对象拷贝
            checkedInput.handler(JSON.parse(JSON.stringify(checkedInput)));
          }
        }
      },

      /**
       * @private
       * @private
       * 获取inputs中的信息
       * */
      getValues () {
        if (this.inputType === 'radio') {
          // this is an alert with radio buttons (single value select)
          // return the one value which is checked, otherwise undefined
          const checkedInput = this.inputsForDispaly.find(i => i.checked);
          return checkedInput ? checkedInput.value : undefined;
        }

        if (this.inputType === 'checkbox') {
          // this is an alert with checkboxes (multiple value select)
          // return an array of all the checked values
          return this.inputsForDispaly.filter(i => i.checked).map(i => i.value.trim());
        }

        // this is an alert with text inputs
        // return an object of all the values with the input name as the key
        // input因为不能使用v-model，故通过id获取里面的信息
        const values = {};
        this.inputsForDispaly.forEach(i => {
          let _$id = document.getElementById(i.id);
          if (!!_$id && !!_$id.value) {
            values[i.name] = _$id.value.trim();
          } else {
            values[i.name] = null;
          }
        });
        return values;
      },

      /**
       * @private
       * ActionSheet启动之前去除focus效果，因为存在键盘
       * */
      focusOutActiveElement () {
        // only button？
        const activeElement = document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
      },

      // -------- public --------

      /**
       * @function present
       * @description
       * 打开, 默认是自动开启的
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      present () {
        const _this = this;
        _this.isActive = true;
        return new Promise((resolve) => {this.presentCallback = resolve})
      },

      /**
       * @function dismiss
       * @description
       * 关闭
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      dismiss () {
        const _this = this;
        if (!_this.enabled) {
          return false
        }
        _this.enabled = false;
        _this.isActive = false; // 动起来
        return new Promise((resolve) => {this.dismissCallback = resolve})
      },

      /**
       * inputs数组初始化组件
       * */
      init(){
        const _this = this;
        if (!_this.inputs || _this.inputs.length === 0) {
          return []
        }
        // 传入数据处理
        let _inputs = [];
        _inputs = _this.inputs.map((input, index) => {
          return {
            type: input.type || 'text',
            name: !!(input.name) ? input.name : index,
            placeholder: !!(input.placeholder) ? input.placeholder : '',
            value: !!(input.value) ? input.value : '',
            label: input.label,
            checked: !!input.checked,
            disabled: !!input.disabled,
            id: `alert-input-${index}`, // used for input -> text/tel/number/password
            handler: !!(input.handler) ? input.handler : null,
          };
        });

        let inputTypes = [];
        _inputs.forEach(input => {
          if (inputTypes.indexOf(input.type) < 0) {
            inputTypes.push(input.type);
          }
        });
        if (inputTypes.length > 1 && (inputTypes.indexOf('checkbox') > -1 || inputTypes.indexOf('radio') > -1)) {
          console.warn(`Alert cannot mix input types: ${(inputTypes.join('/'))}. Please see alert docs for more info.`);
          console.warn(`Alert 组件不能包含复合的input类型: ${(inputTypes.join('/'))}. 请再次阅读说明文档.`);
        }

        _this.inputType = inputTypes.length ? inputTypes[0] : null;

        const checkedInput = _inputs.find(input => input.checked);

        const NON_TEXT_INPUT_REGEX = /^(radio|checkbox|range|file|submit|reset|color|image|button)$/i;

        const hasTextInput = (_inputs.length && _inputs.some(i => !(NON_TEXT_INPUT_REGEX.test(i.type))));
        // if (hasTextInput && this._platform.is('mobile')) {
        if (hasTextInput) {
          // this alert has a text input and it's on a mobile device so we should align
          // the alert up high because we need to leave space for the virtual keboard
          // this also helps prevent the layout getting all messed up from
          // the browser trying to scroll the input into a safe area
          _this.isAlertTop = true;
        }

        _this.inputsForDispaly = _inputs;
      },
    },
    created(){
      this.init()
    },
    components: {
      'Backdrop': Backdrop,
      'Button': Button
    }
  }
</script>
