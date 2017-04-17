<template>
    <label class="ion-label label" :class="[modeClass,colorClass]" :form="form">
        <slot></slot>
    </label>
</template>
<style lang="scss">
    @import "./label.scss";
    @import "./label.ios.scss";
    @import "./label.md.scss";
</style>
<script>
  /**
   * @module Component/Label
   * @description
   *
   * Label组件主要是放在Item组件中使用, 用于标记Input组件/Toggle组件/Checkbox组件等From组件
   * @property {String} mode - 模式
   * @property {String} color - 颜色
   * @property {String} fixed - 固定在input旁边
   * @property {String} floating - 浮动在input上面, 点击input时浮动到上面
   * @property {String} stacked - 永远在input的上面
   *
   * */
  import { setElementClass } from '../../util/util'
  import { isTrueProperty } from '../../util/util'
  export default{
    name: 'Label',
    data(){
      return {
        itemComponent: null, // 父元素Item实例
      }
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode', 'ios') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: '',
      },

      /**
       * 规定 label 字段所属的一个或多个表单。
       * */
      form: {
        type: String,
        default: '',
      },
    },
    watch: {},
    computed: {
      // 环境样式
      modeClass () {
        return `label-${this.mode}`
      },
      // 颜色
      colorClass () {
        return !!this.color ? (`label-${this.mode}-${this.color}`) : ''
      }

    },
    methods: {},
    created () {},
    mounted () {
      /**
       * 可以是fixed/floating/stacked，这个和input与label的位置相关
       * fixed: 固定label宽度, 和input并列
       * floating:  当input为空的时候, label盖在input上面; 当input有值, 则浮动到上部
       * stacked: floating的特例, 不管有没有值, 都浮动到上部
       * */
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent;
        setElementClass(this.itemComponent.$el, 'item-label-fixed', isTrueProperty(this.$el.getAttribute('fixed')))
        setElementClass(this.itemComponent.$el, 'item-label-floating', isTrueProperty(this.$el.getAttribute('floating')))
        setElementClass(this.itemComponent.$el, 'item-label-stacked', isTrueProperty(this.$el.getAttribute('stacked')))
        setElementClass(this.itemComponent.$el, 'item-label-inset', isTrueProperty(this.$el.getAttribute('inset')))
        this.itemComponent.labelComponent = this
      }
    }
  }
</script>
