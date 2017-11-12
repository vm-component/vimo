<template>
    <header class="ion-header" :class="[{'hide-bar':isHide}]" :style="style">
        <!--right button placeholder-->
        <div ref="rightButtonPlaceholder" id="rightButtonPlaceholder"></div>
        <slot></slot>
    </header>
</template>
<style lang="less">
    @import "../../themes/index";

    .ion-header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: @z-index-toolbar;
        display: block;
        width: 100%;
        transition: -webkit-transform ease 300ms;
    }

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
   * @component Base/Header
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
   * @see component:Base/Footer
   * @demo #/content
   *
   * */
  export default {
    name: 'Header',
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
