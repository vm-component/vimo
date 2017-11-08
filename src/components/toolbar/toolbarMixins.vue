<script type="text/javascript">
  export default {
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: String,
      mode: 'ios',
    },
    computed: {
      colorClass () {
        return this.color ? (`toolbar-${this.color}`) : ''
      }
    }
  }
</script>
<style lang="scss">
    @import "toolbar";
    @import "toolbar.button";
    @import "toolbar.ios";
    @import "toolbar.md";
</style>
