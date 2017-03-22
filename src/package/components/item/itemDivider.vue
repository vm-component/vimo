<script type="text/ecmascript-6">
  import ItemMixin from './itemMixin.vue';
  export default{
    mixins: [ItemMixin],
    name: 'ItemDivider',
    data(){
      return {
        itemTypeName: 'item-divider',
      }
    },
    computed: {
      // 颜色
      colorClass () {
        return !!this.color ? (`${this.itemTypeName}-${this.mode}-${this.color}`) : ''
      },
      listHeaderClass () {
        return `ion-${this.itemTypeName} ${this.itemTypeName} ${this.itemTypeName}-${this.mode}`
      },
    }
  }
</script>
