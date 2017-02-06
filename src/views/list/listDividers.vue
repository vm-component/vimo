<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">ListDividers</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-item-group>
        <ion-item-divider color="light">A</ion-item-divider>
        <ion-item>Angola</ion-item>
        <ion-item>Angular</ion-item>
        <ion-item>America</ion-item>
        <ion-item>Arg</ion-item>
      </ion-item-group>
      <ion-item-group>
        <ion-item-divider color="light">B</ion-item-divider>
        <ion-item>Bee</ion-item>
        <ion-item>Book</ion-item>
        <ion-item>Back</ion-item>
        <ion-item>Bear</ion-item>
      </ion-item-group>



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
          'ListDividers 1',
          'NoLine 2',
          'NoLine 3',
          'NoLine 4',
          'NoLine 5',
          'NoLine 6',
          'NoLine 7',
          'NoLine 8',
          'NoLine 9',
          'NoLine 10',
          'NoLine 11',
          'NoLine 12',
          'NoLine 13',
          'NoLine 14',
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
