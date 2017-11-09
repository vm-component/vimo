<template>
    <div class="ion-badge" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "badge";
    @import "badge.ios";
    @import "badge.md";
</style>
<script type="text/javascript">
  /**
   * @component Badge
   * @description
   *
   * ## 其他 / Badge徽章组件
   *
   * 徽章组件, 可在Item中组合使用.
   *
   * @props {String} [color] - 颜色
   * @props {String} [mode='ios'] - 模式
   *
   * @slot 空 - 默认嵌入全部
   *
   * @demo #/badge
   *
   * @usage
   * <vm-badge :color="danger">99</vm-badge>
   **/
  import ThemeMixins from '../../themes/theme.mixins'
  export default {
    name: 'vm-badge',
    mixins: [ThemeMixins]
  }
</script>
