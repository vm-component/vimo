<template>
    <div class="ion-card-content" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Card/CardContent
   * @description
   *
   * ## 卡片组件 / CardContent组件
   **/
  import mixin from './mixin'

  export default {
    name: 'CardContent',
    data () {
      return {
        componentName: 'card-content'
      }
    },
    extends: mixin
  }
</script>
