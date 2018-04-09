<script type="text/javascript">
  export default {
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: String,
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      }
    },
    inject: {
      appComponent: {
        from: 'appComponent',
        default: null
      },
      headerComponent: {
        from: 'headerComponent',
        default: null
      },
      footerComponent: {
        from: 'footerComponent',
        default: null
      }
    },
    computed: {
      colorClass () {
        return this.color ? (`toolbar-${this.mode}-${this.color}`) : ''
      },
      modeClass () {
        return `toolbar-${this.mode}`
      },
      backgroundClass () {
        return `toolbar-background-${this.mode}`
      },
      contentClass () {
        return `toolbar-content-${this.mode}`
      }
    }
  }
</script>

