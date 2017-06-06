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
<script type="text/javascript">
  /**
   * @component Base/Header
   * @description
   *
   * ## 基础组件 / Footer组件
   *
   * Header和Footer组件结构类似, 都是提供一个包裹容器, 不同的是一个固定在上面, 一个固定在下面.
   *
   * Header组件是Vimo页面的的三个主要构成之一, 主要是为Toolbar/Navbar/自定义结构提供一个容器,
   * 该组件将始终固定在页面顶部, Content组件会根据Header的高度自动设定`margin`值, 或者`padding`值.
   *
   * ### 可用的样式属性
   * - [no-border] - 无边框
   *
   * @props {String} [mode='ios'] - 模式
   *
   * @see component:Base/Footer
   *
   * */
  export default{
    name: 'Header',
    props: {
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      }
    },
    computed: {
      modeClass () {
        return `header-${this.mode}`
      }
    },
    data () {
      return {
        // -------- public --------
        isHide: false,
        style: {}
      }
    },
    methods: {
      // -------- public --------
      /**
       * @function hide
       * @description
       * 隐藏Header
       * */
      hide () {
        this.isHide = true
      },

      /**
       * @function show
       * @description
       * 显示Header
       * */
      show () {
        this.isHide = false
      },

      /**
       * @function toggle
       * @description
       * Toggle显示Header
       * */
      toggle () {
        this.isHide = !this.isHide
      },

      /**
       * @function setStyle
       * @param {object} style - 传入的样式对象
       * @see https://cn.vuejs.org/v2/guide/class-and-style.html#对象语法-1
       * @description
       * 设置Header的样式
       * */
      setStyle (style) {
        this.style = style
      }
    }
  }
</script>
