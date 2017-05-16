<script type="text/javascript">
  import ItemMixin from './itemMixin.vue'
  export default{
    mixins: [ItemMixin],
    name: 'Item',
    data () {
      return {
        itemTypeName: 'item'
      }
    },
    computed: {
      listHeaderClass () {
        return `item-block`
      }
    }
  }
</script>
