<script type="text/javascript">
  import ItemMixin from '../../mixins/item-mixin/index'

  export default {
    mixins: [ItemMixin],
    name: 'ItemDivider',
    data () {
      return {
        itemTypeName: 'item-divider'
      }
    },
    computed: {
      // 颜色
      colorClass () {
        return this.color ? (`${this.itemTypeName}-${this.mode}-${this.color}`) : ''
      },
      itemTypeClass () {
        return `ion-${this.itemTypeName} ${this.itemTypeName} ${this.itemTypeName}-${this.mode}`
      }
    }
  }
</script>
