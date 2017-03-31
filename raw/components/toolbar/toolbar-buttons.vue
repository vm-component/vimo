<template>
    <div class="ion-buttons bar-buttons" :class="[modeClass]">
        <slot></slot>
    </div>
</template>
<style lang="scss"></style>
<script>
  export default{
    name: 'Buttons',
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
      },
    },
    computed: {
      // 环境样式
      modeClass () {
        return `bar-buttons-${this.mode}`
      },
    }
  }
</script>
