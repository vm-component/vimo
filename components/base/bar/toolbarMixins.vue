<script type="text/javascript">
  export default {
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: String
    },
    computed: {
      colorClass () {
        return this.color ? (`toolbar-${this.color}`) : ''
      }
    }
  }
</script>
