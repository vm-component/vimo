<template>
    <div class="ion-card-title" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Card/CardTitle
   * @description
   *
   * ## 卡片组件 / CardTitle组件
   **/
  import mixin from './mixin'
  export default{
    name: 'CardTitle',
    data () {
      return {
        componentName: 'card-title'
      }
    },
    extends: mixin
  }
</script>
