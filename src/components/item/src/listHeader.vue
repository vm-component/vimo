<script type="text/ecmascript-6">
  import ItemMixin from './itemMixin.vue';
  export default{
    mixins: [ItemMixin],
    name: 'ion-list-header',
    data(){
      return {
        itemTypeName: 'list-header',
      }
    },
    props: {},
    watch: {},
    computed: {
      // 颜色
      colorClass: function () {
        return !!this.color ? (`list-header-${this.mode}-${this.color}`) : ''
      },
      listHeaderClass: function () {
        return `ion-list-header ${this.itemTypeName} ${this.itemTypeName}-${this.mode}`
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
