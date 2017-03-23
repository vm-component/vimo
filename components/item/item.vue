<script type="text/ecmascript-6">
  import ItemMixin from './itemMixin.vue';
  export default{
    mixins: [ItemMixin],
    name: 'Item',
    data(){
      return {
        itemTypeName: 'item',
      }
    },
    computed: {
      listHeaderClass () {
        return `item-block`
      },
    }
  }
</script>
