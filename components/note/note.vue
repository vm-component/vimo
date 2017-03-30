<template>
    <div class="ion-note" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import 'note.ios.scss';
    @import 'note.md.scss';
</style>
<script>
  export default{
    name: 'Note',
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: '',
      },
      /**
       * mode 按钮风格
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode', 'ios') || 'ios' }
      },
    },
    computed: {
      // 环境样式
      modeClass () {
        return `note note-${this.mode}`
      },
      // 颜色
      colorClass () {
        return !!this.color ? (`note-${this.mode}-${this.color}`) : ''
      },
    }
  }
</script>
