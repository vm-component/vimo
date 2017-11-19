<template>
    <div class="ion-card-title" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Card/card-title
   * @description
   *
   * ## 卡片组件 / CardTitle组件
   **/
  import ThemeMixins from '../../themes/theme.mixins'
  export default{
    name: 'vm-card-title',
    mixins: [ThemeMixins]
  }
</script>
