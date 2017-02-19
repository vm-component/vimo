<script type="text/ecmascript-6">
  import ItemMixin from './itemMixin.vue';
  export default{
    mixins: [ItemMixin],
    name: 'ListHeader',
    data(){
      return {
        itemTypeName: 'list-header',
      }
    },
    props: {},
    watch: {},
    computed: {
      // 颜色
      colorClass () {
        return !!this.color ? (`${this.itemTypeName}-${this.mode}-${this.color}`) : ''
      },
      listHeaderClass () {
        return `ion-${this.itemTypeName} ${this.itemTypeName} ${this.itemTypeName}-${this.mode}`
      },
    },
    methods: {},
    created () {
    },
    mounted () {
      // console.log('ion-list-header')
      // console.log(this)
    },
    activated () {
    },
    components: {}
  }
</script>
