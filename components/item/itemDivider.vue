<script type="text/javascript">
  /**
   * @component Item/ItemDivider
   * @description
   *
   * ## 列表组件 / ItemDivider分割
   *
   * */
  import ItemMixin from './itemMixin.vue'
  export default{
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
      listHeaderClass () {
        return `ion-${this.itemTypeName} ${this.itemTypeName} ${this.itemTypeName}-${this.mode}`
      }
    }
  }
</script>
