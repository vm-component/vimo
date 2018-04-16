<template>
    <footer class="ion-footer" :class="[modeClass,{'hide-bar':isHide}]" :style="style">
        <slot></slot>
    </footer>
</template>
<script type="text/javascript">
  export default {
    name: 'Footer',
    inject: {
      pageComponent: {
        from: 'pageComponent',
        default: null
      }
    },
    provide () {
      let _this = this
      return {
        footerComponent: _this
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
        // -------- public --------
        isHide: false,
        style: {}
      }
    },
    computed: {
      modeClass () {
        return `footer-${this.mode}`
      }
    },
    methods: {
      // -------- public --------
      /**
       * @function hide
       * @description
       * 隐藏Footer
       * */
      hide () {
        this.isHide = true
      },

      /**
       * @function show
       * @description
       * 显示Footer
       * */
      show () {
        this.isHide = false
      },

      /**
       * @function toggle
       * @description
       * Toggle显示Footer
       * */
      toggle () {
        this.isHide = !this.isHide
      },

      /**
       * @function setStyle
       * @param {object} style - 传入的样式对象
       * @see https://cn.vuejs.org/v2/guide/class-and-style.html#对象语法-1
       * @description
       * 设置Footer的样式
       * */
      setStyle (style) {
        this.style = style
      }
    },
    created () {
      if (this.pageComponent) {
        this.pageComponent.footerComponent = this
      }
      this.$root.$emit('footer:created', this)
    },
    mounted () {
      this.$root.$emit('footer:mounted', this)
    }
  }
</script>
