<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title>Modal</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>

      <ion-button type="block" @click="openModal">点击打开Modal</ion-button>

    </ion-content>
  </ion-page>
</template>
<style lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  import modalPageComponent from './modal-page.vue';
  console.log('modalPageComponent');
  console.log(modalPageComponent);


  export default{
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      openModal(){
        let _modal = this.$modal.create(modalPageComponent, {data: '1234'})
        _modal.present();
      }
    },
    created(){},
    mounted(){},
    activated(){},
    components: {}
  }
</script>
