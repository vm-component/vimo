<template>
    <div class="ion-card-header" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Card/cardHeader
   * @description
   *
   * ## 卡片组件 / CardHeader组件
   **/
  import ThemeMixins from '../../themes/theme.mixins'
  export default{
    name: 'vm-card-header',
    mixins: [ThemeMixins]
  }
</script>
