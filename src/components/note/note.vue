<template>
    <div class="ion-note" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Note
   * @description
   *
   * ## 其他 / note组件
   *
   * 文字颜色变暗10%的组件, 除此之外别无其他.
   *
   * @props {String} color - 颜色
   * @props {String} [mode='ios'] - 模式
   *
   * */
  export default{
    name: 'Note',
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: [String],
      /**
       * mode 按钮风格
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return `note note-${this.mode}`
      },
      // 颜色
      colorClass () {
        return this.color ? (`note-${this.mode}-${this.color}`) : ''
      }
    }
  }
</script>
<style lang="less">
    @import "note.ios.less";
    @import "note.md.less";
</style>