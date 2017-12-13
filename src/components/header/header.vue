<template>
    <header class="ion-header" :class="[modeClass,{'hide-bar':isHide}]" :style="style">
        <div ref="rightButtonPlaceholder" id="right-button-placeholder"></div>
        <slot></slot>
    </header>
</template>
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
   * */
  export default {
    name: 'Header',
    inject: {
      pageComponent: {
        from: 'pageComponent',
        default: null
      }
    },
    provide () {
      let _this = this
      return {
        headerComponent: _this
      }
    },
    props: {
      mode: {
        type: String,
        default () {
          return (this.$config && this.$config.get('mode', 'ios')) || 'ios'
        }
      }
    },
    data () {
      return {
        isHide: false,
        style: {}
      }
    },
    computed: {
      modeClass () {
        return `header-${this.mode}`
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
    },
    created () {
      if (this.pageComponent) {
        this.pageComponent.headerComponent = this
      }

      this.$root.$on('onMenuOpen', () => {
        this.hide()
      })
      this.$root.$on('onMenuClosing', () => {
        this.show()
      })
      this.$root.$emit('header:created', this)
    },
    mounted () {
      this.$root.$emit('header:mounted', this)
    }
  }

</script>
