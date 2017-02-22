<template>
  <div class="ion-input" :class="[modeClass]">

    <input
      :class="[textInputClass]"
      :value="valueInner"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      ref="input"
      @blur="inputBlurred($event)"
      @focus="inputFocused($event)"
      @input="inputChanged($event)"
      v-if="type!=='textarea'">

    <!--<textarea-->
      <!--:class="[textInputClass]"-->
      <!--:value="valueInner"-->
      <!--:placeholder="placeholder"-->
      <!--:disabled="disabled"-->
      <!--:readonly="readonly"-->
      <!--ref="textarea"-->
      <!--@blur="inputBlurred($event)"-->
      <!--@focus="inputFocused($event)"-->
      <!--@input="inputChanged($event)"-->
      <!--v-if="type==='textarea'"></textarea>-->


    <!--<input [type]="type" aria-hidden="true" next-input *ngIf="_useAssist">-->

    <Button
      v-if="clearInput"
      type="clear"
      class="text-input-clear-icon"
      @click="clearTextInput()"
      @mousedown="clearTextInput()"></Button>


    <!--<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)"-->
    <!--(mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>-->

  </div>
</template>
<style lang="scss">
  @import "./input.scss";
  @import "./input.ios.scss";

</style>
<script type="text/ecmascript-6">

  /**
   * @name Input/Textarea
   * @description
   *
   * Input组件只能对以下类型的type作出相应 : `text`,`password`, `email`, `number`, `search`, `tel`, and `url`.
   * 但是不适用一下类型: `checkbox`, `radio`, `toggle`, `range`, `select`, etc.
   * 当然, input直接使用也没问题
   *
   * 此外, Textarea组件和Input组件公用此文件
   *
   * */

  export default{
    name: 'Input',
    data(){
      return {

        valueInner: '', // 内部value值

        itemInstance: null, // 外部item组件实例 -> 修改class
        pageInstance: null, // 外部page组件实例 -> 调取scroll特性

        debounce:0, // 缓冲
      }
    },
    props: {
      /**
       * 如果为true, 当输入值的时候一个清除按钮最在input左右边出现, 点击按钮则清除输入
       * */
      clearInput: {
        type: Boolean,
        default: false,
      },

      /**
       * 如果为true, 当再次输入的时候会清空上次的输入, 如果type为password时默认为true, 其余情况默认为false
       * 默认值的变更, 需要js控制
       * */
      clearOnEdit: {
        type: Boolean,
        default: false,
      },

      /**
       * 如果为true, 用户无法输入
       * */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * 设置最大值, 只对type=number有效
       * */
      max: {
        type: Number,
      },

      /**
       * 设置最小值, 只对type=number有效
       * */
      min: {
        type: Number
      },

      /**
       * 设置数字变化的阶梯值, 只对type=number有效
       * */
      step: {
        type: Number,
        default: 1,
      },

      /**
       * 当前平台
       * */
      mode: {
        type: String,
        default: VM.config.get('mode') || 'ios',
      },

      /**
       * 当前平台
       * */
      placeholder: {
        type: String,
        default: '',
      },

      /**
       * 只读模式, 不能修改
       * */
      readonly: {
        type: Boolean,
        default: false,
      },

      /**
       * 输入的类型: "text", "password", "email", "number", "search", "tel", or "url"
       * */
      type: {
        type: String,
        default: 'text',
      },

      /**
       * 内容输入值
       * */
      value: {
        type: String,
        default: '',
      }

    },
    watch: {},
    computed: {

      modeClass () {
        return `input input-${this.mode}`
      },
      textInputClass(){
        return `text-input text-input-${this.mode}`
      },

    },
    methods: {

      /**
       * @private
       * 监听blur事件
       */
      inputBlurred($event){

      },

      /**
       * @private
       * 监听focus事件
       */
      inputFocused($event){

      },

      /**
       * @private
       * 监听input事件, 更新input的value(valueInner)
       */
      inputChanged($event){
        const _this = this;
        // console.info('inner-inputChanged');
        let _valueInner = !!$event.target ? $event.target.value : '';
        if (!!_valueInner && _valueInner != undefined) {
          _this.valueInner = _valueInner;
        } else {
          _this.valueInner = null;
        }

        // TODO: setTimeout->debounce
        clearTimeout(_this.clearTimeout);
        _this.clearTimeout = setTimeout(function () {
          // this.onChange(this.valueInner);
          _this.$emit('ionInput', $event);

          // 通知父组件的v-model
          _this.$emit('input', _this.valueInner);
        }, _this.debounce);
      }
    },
    created () {},
    mounted () {
      console.debug('this')
      console.debug()
      if(this.$options._componentTag.toLowerCase() === 'textarea'){
        this.typeInner = 'textarea'
      }


    },
    activated () {},
    components: {}
  }
</script>
