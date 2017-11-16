<template>
    <label class="ion-label label" :class="[modeClass,colorClass]"
           :fixed="fixed"
           :floating="floating"
           :stacked="stacked">
        <slot></slot>
    </label>
</template>
<style lang="scss">
    @import "label";
    @import "label.ios";
    @import "label.md";
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
  import { setElementClass } from '../../util/util'
  import ThemeMixins from '../../themes/theme.mixins'

  export default {
    name: 'vm-label',
    mixins: [ThemeMixins],
    data () {
      return {
        itemComponent: null // 父元素Item实例
      }
    },
    props: {
      // label格式
      fixed: Boolean,
      floating: Boolean,
      stacked: Boolean
    },
    mounted () {
      /**
       * 可以是fixed/floating/stacked，这个和input与label的位置相关
       * fixed: 固定label宽度, 和input并列
       * floating:  当input为空的时候, label盖在input上面; 当input有值, 则浮动到上部
       * stacked: floating的特例, 不管有没有值, 都浮动到上部
       * */
      if (this.$parent.$options.name.toLowerCase() === 'vm-item') {
        this.itemComponent = this.$parent
        setElementClass(this.itemComponent.$el, 'item-label-fixed', this.fixed)
        setElementClass(this.itemComponent.$el, 'item-label-floating', this.floating)
        setElementClass(this.itemComponent.$el, 'item-label-stacked', this.stacked)
      }
    }
  }
</script>
