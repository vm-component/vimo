<script type="text/ecmascript-6">
  import ItemMixin from './itemMixin.vue';
  export default{
    mixins: [ItemMixin],
    name: 'ion-item-divider',
    data(){
      return {
        itemTypeName: 'item-divider',
      }
    },
    props: {},
    watch: {},
    computed: {
      // 颜色
      colorClass: function () {
        return !!this.color ? (`item-divider-${this.mode}-${this.color}`) : ''
      },
      listHeaderClass: function () {
        return `ion-item-divider ${this.itemTypeName} ${this.itemTypeName}-${this.mode}`
      },
    },
    methods: {},
    created: function () {
    },
    mounted: function () {
      // console.log('ion-list-header')
      // console.log(this)
    },
    activated: function () {
    },
    components: {}
  }
</script>
