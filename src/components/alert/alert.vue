<template>
  <div class="ion-alert" :class="[modeClass,cssClass,{'alert-top':isAlertTop}]">
    <ion-backdrop @click.native="bdClick()" :enableBackdropDismiss="enableBackdropDismiss"
                  :isActive="isActive"></ion-backdrop>
    <transition name="alert"
                v-on:before-enter="_beforeEnter"
                v-on:after-enter="_afterEnter"
                v-on:before-leave="_beforeLeave"
                v-on:after-leave="_afterLeave">>
      <div class="alert-wrapper" v-show="isActive">
        <div class="alert-head">
          <h2 class="alert-title" v-if="title">{{title}}</h2>
          <h3 class="alert-sub-title" v-if="subTitle">{{subTitle}}</h3>
        </div>
        <div class="alert-message">{{message}}</div>
        <div v-if="!!inputs && inputs.length>0">

          <div v-if="inputType==='radio'" class="alert-radio-group" role="radiogroup" :aria-labelledby="hdrId"
               :aria-activedescendant="activeId">
            <ion-button role="alert-radio-button" v-for="i in inputsForDispaly" @click="rbClick(i)"
                        :aria-checked="i.checked" :disabled="i.disabled" :id="i.id"
                        class="alert-tappable alert-radio">
              <div class="alert-radio-icon">
                <div class="alert-radio-inner"></div>
              </div>
              <div class="alert-radio-label">
                {{i.label}}
              </div>
            </ion-button>
          </div>

          <div class="alert-checkbox-group" v-if="inputType==='checkbox'">
            <ion-button :id="i.id" role="alert-checkbox-button" :aria-checked="i.checked"
                        v-for="(i,index) in inputsForDispaly" @click="cbClick(i)"
                        :checked="i.checked" :disabled="i.disabled" class="alert-tappable alert-checkbox">
              <div class="alert-checkbox-icon">
                <div class="alert-checkbox-inner"></div>
              </div>
              <div class="alert-checkbox-label">
                {{i.label}}
              </div>
            </ion-button>
          </div>

          <div v-if="inputType!='radio' && inputType!='checkbox'" class="alert-input-group">
            <div v-for="i of inputsForDispaly" class="alert-input-wrapper">
              <!-- v-model="i.value"-->
              <input :id="i.id" :value="i.value" :placeholder="i.placeholder" :type="i.type" class="alert-input">
            </div>
          </div>

        </div>
        <div class="alert-button-group" :class="{'alert-button-group-vertical':buttonsForDisplay.length>2}">
          <ion-button role="alert-button" v-for="b in buttonsForDisplay" @click="btnClick(b)" :class="[b.cssClass]">
            {{b.text}}
          </ion-button>
        </div>
      </div>
    </transition>
  </div>

</template>
<style scoped lang="scss">
  @import './alert.scss';
  @import './alert.ios.scss';
  @import './alert.wp.scss';
  @import './alert.md.scss';

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
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        /**
         * 初始化Alert Instance的数据
         * 因为是实例调用模式，故prop和data在初始化后是同样的数据接口，
         * 故prop就没有存在的价值
         * */
        title: '', // String
        subTitle: '', // String
        message: '', // String
        cssClass: '', // String Additional classes for custom styles, separated by spaces.
        buttons: [], // Array button数组，包含全部role
        inputs: [], // 如果alert中有input等form
        enableBackdropDismiss: true, // Boolean 允许点击backdrop关闭actionsheet
        inputsForDispaly: [], // inputs数据再加工

        /**
         * Alert State
         * */
        isActive: false,
        enabled: false, // 是否在过渡态的状态判断，如果在动画中则为false
        // TODO: mode需要从配置中取,最好和scss同步
        mode: 'ios', // ios?android?windown?we?alipay
        inputType: null,// Alert中含有的input类型，radio、checkbox
        activeId: null,
        isAlertTop: false, // 是否将alert放到顶部，用于input输入时显示虚拟键盘
        // lastClick: null,

      }
    },
    watch: {
      /**
       * 这部分不能放到computed中，
       * 因为computed只能计算一次，
       * 但是input的内容小修改后更新DOM。
       * 实例化创建后，部分组件功能会失效，比如created等。
       * */
      inputs () {
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

        if (checkedInput) {
          // radio标签当前选中的元素
          _this.activeId = checkedInput.id;
        }

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
      /**
       * ActionSheet Animate Hooks
       * */
      _beforeEnter () {
        this.enabled = false; // 不允许过渡中途操作
      },
      _afterEnter () {
        this.enabled = true;
        this._focusOutActiveElement();
        let focusableEle = document.querySelector('input');
        if (focusableEle) {
          focusableEle.focus();
        }
      },
      _beforeLeave () {
        this.enabled = false;
      },
      _afterLeave () {
        this.enabled = true;
        // 移除DOM
        this.$el.remove();
      },

      /**
       * 点击backdrop
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
       * 点击下方的按钮
       * @param {object} button
       * */
      btnClick (button) {
        if (!this.enabled) {
          return;
        }

        let shouldDismiss = true;

        if (button.handler) {
          // a handler has been provided, execute it
          // pass the handler the values from the inputs
          if (button.handler(this._getValues()) === false) {
            // if the return value of the handler is false then do not dismiss
            shouldDismiss = false;
          }
        }

        if (shouldDismiss) {
          this.dismiss();
        }
      },

      /**
       * Radio Button Click
       * @param {object} checkedInput
       * */
      rbClick (checkedInput) {
        const _this = this;
        if (_this.enabled) {
          _this.inputsForDispaly.forEach(input => {
            input.checked = (checkedInput === input);
          });
          _this.activeId = checkedInput.id;
          if (checkedInput.handler) {
            checkedInput.handler(checkedInput);
          }
        }
      },

      /**
       * CheckBox Button Click
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
       * 获取inputs中的信息
       * */
      _getValues () {
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
       * Present the instance.
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      present () {
        const _this = this;
        _this.isActive = true;
        return new Promise(function (resolve) {
          let _presentHandler = function () {
            _this.$el.removeEventListener('transitionend', _presentHandler);
            resolve('Alert Present Success!');
          };
          _this.$el.addEventListener('transitionend', _presentHandler);
        });
      },

      /**
       * Dismiss the instance.
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      dismiss () {
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
      },

      /**
       * ActionSheet启动之前去除focus效果，因为存在键盘
       * */
      _focusOutActiveElement () {
        // only button？
        const activeElement = document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
      },
    }
  }
</script>
