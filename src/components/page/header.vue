<template>
    <header class="ion-header" :class="[modeClass, {'hide-bar':isHide}]" :style="style">
        <!--right button placeholder-->
        <div ref="rightButtonPlaceholder" id="rightButtonPlaceholder"></div>
        <slot></slot>
    </header>
</template>
<style lang="scss">
    .ion-header.hide-bar {
        transform: translateY(-100%);
    }

    #rightButtonPlaceholder {
        width: 30px;
        bottom: 0;
        height: 1px;
        position: absolute;
        right: 9px;
    }
</style>
<script type="text/javascript">
  /**
   * @component Header
   * @description
   *
   * ## 基础组件 / Header组件
   *
   * Header和Footer组件结构类似, 都是提供一个包裹容器, 不同的是一个固定在上面, 一个固定在下面.
   *
   * Header组件是Vimo页面的的三个主要构成之一, 主要是为Toolbar/Navbar/自定义结构提供一个容器, 该组件将始终固定在页面顶部, Content组件会根据Header的高度自动设定`margin`值, 或者`padding`值.
   *
   * ### 可用的样式属性
   * - [no-border] - 无边框
   *
   * @see component:Footer
   * @demo #/content
   *
   **/
  import ThemeMixins from '../../themes/theme.mixins'

  export default {
    name: 'vm-header',
    mixins: [ThemeMixins],
    data () {
      return {
        isHide: false,
        style: {}
      }
    },
    methods: {
      /**
       * @function hide
       * @description
       * 隐藏Header
       **/
      hide () {
        this.isHide = true
      },

      /**
       * @function show
       * @description
       * 显示Header
       **/
      show () {
        this.isHide = false
      },

      /**
       * @function toggle
       * @description
       * Toggle显示Header
       **/
      toggle () {
        this.isHide = !this.isHide
      },

      /**
       * @function setStyle
       * @param {object} style - 传入的样式对象
       * @see https://cn.vuejs.org/v2/guide/class-and-style.html#对象语法-1
       * @description
       * 设置Header的样式
       **/
      setStyle (style) {
        this.style = style
      }
    }
  }
</script>
