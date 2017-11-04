<template>
    <div class="ion-card-header" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Card/CardHeader
   * @description
   *
   * ## 卡片组件 / CardHeader组件
   **/
  import mixin from './mixin'
  export default{
    name: 'CardHeader',
    data () {
      return {
        componentName: 'card-header'
      }
    },
    extends: mixin
  }
</script>
