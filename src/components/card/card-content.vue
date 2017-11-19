<template>
    <div class="ion-card-content" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Card/card-content
   * @description
   *
   * ## 卡片组件 / CardContent组件
   **/
  import ThemeMixins from '../../themes/theme.mixins'

  export default {
    name: 'vm-card-content',
    mixins: [ThemeMixins]
  }
</script>
