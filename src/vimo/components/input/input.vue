<template>
  <div class="ion-input" :class="[modeClass]" @click="clickToFocus()">

    <input
      :class="[textInputClass]"
      :value="inputValue"
      :type="typeValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :max="max"
      :min="min"
      :step="step"
      ref="input"
      @blur="inputBlurred($event)"
      @focus="inputFocused($event)"
      @input="inputChanged($event)"
      v-if="type!=='textarea'">

    <!--<textarea-->
    <!--:class="[textInputClass]"-->
    <!--:value="inputValue"-->
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
      v-if="clearInput && typeValue!=='textarea' && hasValue()"
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

  import mixin from './mixin'
  export default{
    name: 'Input',
    mixins: [mixin],

  }
</script>
