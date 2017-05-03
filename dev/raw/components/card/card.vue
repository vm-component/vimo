<template>
    <div class="ion-card" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "card.scss";
    @import "card.ios.scss";
    @import "card.md.scss";
</style>
<script>
  /**
   * @component Card
   * @description
   *
   * ## 卡片组件 / Card组件
   *
   *
   * */
  import mixin from './mixin'
  export default{
    name: 'Card',
    data(){
      return {
        componentName: 'card'
      }
    },
    extend: mixin
  }
</script>
