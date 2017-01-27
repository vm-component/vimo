<!--<template>-->
<!--<div class="ion-item">-->
<!--item-->
<!--</div>-->
<!--</template>-->

<script type="text/ecmascript-6">
  import ItemMixin from './itemMixin.vue';
  export default{
    mixins: [ItemMixin],
    name: 'ion-item',
    data(){
      return {
        itemTypeName: 'item',
      }
    },
    watch: {},
    computed: {
      listHeaderClass: function () {
        return `item-block`
      },
    },
    methods: {},
    created: function () {},
    mounted: function () {
      console.log('item')
      console.log(this)
      console.log(ItemMixin)
    },
    activated: function () {},
    components: {}
  }
</script>
