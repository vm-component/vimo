<script type="text/javascript">
  /**
   * @component Item/ListHeader
   * @description
   *
   * ## 列表组件 / ListHeader
   *
   * @props {String} [mode='ios'] - 模式
   * @props {String} [color] - 颜色
   *
   * @demo #/list
   * */
  import ItemMixin from './item-mixin.vue'
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
      itemTypeClass () {
        return `ion-${this.itemTypeName} ${this.itemTypeName} ${this.itemTypeName}-${this.mode}`
      }
    }
  }
</script>
