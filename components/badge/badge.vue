<template>
    <div class="ion-badge" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<style lang="less">
    @import "./badge.less";
    @import "./badge.ios.less";
    @import "./badge.md.less";
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
   * */
  export default {
    name: 'Badge',
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: String,
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return `badge badge-${this.mode}`
      },
      // 颜色
      colorClass () {
        return this.color ? (`badge-${this.mode}-${this.color}`) : ''
      }
    }
  }
</script>
