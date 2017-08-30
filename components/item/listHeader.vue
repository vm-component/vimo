<script type="text/javascript">
  /**
   * @component Item/ListHeader
   * @description
   *
   * ## 列表组件 / ListHeader
   *
   * */
  import ItemMixin from './itemMixin.vue'
  export default{
    mixins: [ItemMixin],
    name: 'ListHeader',
    data () {
      return {
        itemTypeName: 'list-header'
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
