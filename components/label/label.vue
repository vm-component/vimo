<template>
    <label class="ion-label label" :class="[modeClass,colorClass]"
           :fixed="fixed"
           :floating="floating"
           :stacked="stacked">
        <slot></slot>
    </label>
</template>
<style lang="less">
    @import "label";
    @import "label.ios.less";
    @import "label.md.less";
</style>
<script type="text/javascript">
  /**
   * @component Label
   * @description
   *
   * ## 表单组件 / Label组件
   *
   * ### 说明
   *
   * Label组件主要是放在Item组件中使用, 用于标记Input组件/Toggle组件/Checkbox组件等From组件. Label的四种类型可展示不同的Label样式: inline(默认)/fixed/floating/stacked.
   *
   * ### 使用场景
   *
   * input组件/Item包裹content部分等.
   *
   * @props {String} mode - 模式
   * @props {String} color - 颜色
   * @props {String} fixed - 固定在input旁边
   * @props {String} floating - 浮动在input上面, 点击input时浮动到上面
   * @props {String} stacked - 永远在input的上面
   *
   * @slot 空 - 可以嵌入任何结构
   * @see component:Item
   * @see component:Input
   * @demo #/input-normal
   * */
  import { setElementClass } from '../util/util'

  export default {
    name: 'Label',
    data () {
      return {
        itemComponent: null // 父元素Item实例
      }
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: String,

      // label格式
      fixed: Boolean,
      floating: Boolean,
      stacked: Boolean
    },
    computed: {
      // 环境样式
      modeClass () {
        return `label-${this.mode}`
      },
      // 颜色
      colorClass () {
        return this.color ? (`label-${this.mode}-${this.color}`) : ''
      }
    },
    mounted () {
      /**
       * 可以是fixed/floating/stacked，这个和input与label的位置相关
       * fixed: 固定label宽度, 和input并列
       * floating:  当input为空的时候, label盖在input上面; 当input有值, 则浮动到上部
       * stacked: floating的特例, 不管有没有值, 都浮动到上部
       * */
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent
        setElementClass(this.itemComponent.$el, 'item-label-fixed', this.fixed)
        setElementClass(this.itemComponent.$el, 'item-label-floating', this.floating)
        setElementClass(this.itemComponent.$el, 'item-label-stacked', this.stacked)
      }
    }
  }
</script>
