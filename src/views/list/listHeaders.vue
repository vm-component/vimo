<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">ListHeaders</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          Action-1
        </ion-list-header>
        <ion-item>Terminator II</ion-item>
        <ion-item>The Empire Strikes Back</ion-item>
        <ion-item>Blade Runner</ion-item>

        <ion-list-header>
          Action-2
        </ion-list-header>
        <ion-item>Terminator II</ion-item>
        <ion-item>The Empire Strikes Back</ion-item>
        <ion-item>Blade Runner</ion-item>

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
