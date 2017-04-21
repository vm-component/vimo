<template>
    <header class="ion-header header" :class="[modeClass,{'hide-bar':isHide}]" :style="style">
        <slot></slot>
    </header>
</template>
<style lang="scss">
    @import "../../themes/globals";

    .ion-header {
        position: absolute;
        top: 0;
        left: 0;
        z-index: $z-index-toolbar;
        display: block;
        width: 100%;
        transition: -webkit-transform ease 300ms;
    }

    .ion-header.hide-bar {
        transform: translateY(-100%);
    }

</style>
<script>
  /**
   * @module Base/Header
   * @description
   *
   * Header和Footer组件结构类似, 都是提供一个包裹容器, 不同的是一个固定在上面, 一个固定在下面.
   *
   * Header组件是Vimo页面的的三个主要构成之一, 主要是为Toolbar/Navbar/自定义结构提供一个容器,
   * 该组件将始终固定在页面顶部, Content组件会根据Header的高度自动设定`margin`值, 或者`padding`值.
   *
   * @property {String} [mode='ios'] - 模式
   *
   * */
  export default{
    name: 'Header',
    props: {
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
      },
    },
    computed: {
      modeClass () {
        return `header-${this.mode}`
      },
    },
    data(){
      return {
        // -------- public --------
        isHide: false,
        style: {},

      }
    },
    methods: {
      // -------- public --------
      /**
       * 隐藏header
       * */
      hide(){
        this.isHide = true
      },

      /**
       * 显示header
       * */
      show(){
        this.isHide = false
      },

      toggle(){
        this.isHide = !this.isHide
      },

      /**
       * 设置bar的样式
       * @param {object} style - 样式对象
       * */
      setStyle(style){
        this.style = style
      },

    }
  }
</script>
