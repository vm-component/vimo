<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button start slot="button" role="bar-button" @click="closeModal">
          Close
        </ion-button>
        <ion-title>Modal Page 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <h3>Hello, 这里是 Modal Page 3 的页面!</h3>
      <p>传入的数据为: {{modalData}}</p>
      <ion-button type="block" @click="closeModal">关闭Modal</ion-button>
    </ion-content>
  </ion-page>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        modalData:null,
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      closeModal(){
        this.$modal.dismiss({
          result:'modal 3 dismissed success!'
        })
      },
    },
    created(){
      console.debug('modal-page.vue-created')
    },
    mounted(){
      console.debug('modal-page.vue-mounted')
      console.log('modal-page获得的外部数据!!!')
      console.log(this.$options.modalData)
      this.modalData = JSON.stringify(this.$options.modalData)
    },
    activated(){
      console.debug('modal-page.vue-activated')
    },
    components: {}
  }
</script>
<style lang="scss"></style>
