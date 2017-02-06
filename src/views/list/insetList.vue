<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">InsetList</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-list inset>
        <ion-item button v-for="item in list">
          {{item}}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  import mixin from '../../mixins/baseMethodMixin'
  export default{
    mixins: [mixin],
    data(){
      return {
        list: [
          'InsetList 1',
          'InsetList 2',
          'InsetList 3',
          'InsetList 4',
          'InsetList 5',
          'InsetList 6',
          'InsetList 7',
          'InsetList 8',
          'InsetList 9',
          'InsetList 10',
          'InsetList 11',
          'InsetList 12',
          'InsetList 13',
          'InsetList 14',
        ]
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
