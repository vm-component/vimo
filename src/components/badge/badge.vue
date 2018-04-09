<template>
    <div class="ion-badge" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
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
