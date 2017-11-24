<script type="text/javascript">
  export default {
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: String
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
        return this.color ? (`toolbar-${this.color}`) : ''
      }
    }
  }
</script>
<style lang="less">
    @import "toolbar-base.less";
    @import "toolbar.less";
    @import "toolbar-button.less";
</style>
