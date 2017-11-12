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
  import ThemeMixins from '../../themes/theme.mixins'

  export default{
    name: 'vm-note',
    mixins: [ThemeMixins]
  }
</script>
<style lang="scss">
    @import "note.ios";
    @import "note.md";
</style>