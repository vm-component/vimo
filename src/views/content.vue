<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">Content</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>


      <h1>content</h1>
    </ion-content>
  </ion-page>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  import mixin from '../mixins/baseMethodMixin'

  export default{
    mixins: [mixin],
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {
      console.log('content this');
      console.log(this)
    },
    activated () {},
    components: {}
  }
</script>
