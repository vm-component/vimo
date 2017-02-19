<template>
    <ion-page>
      <ion-header>
        <ion-navbar>
          <ion-title>这个是打开的Modal</ion-title>
        </ion-navbar>
      </ion-header>
      <ion-content padding>
        <h3>Hello, 这里是Modal页面!</h3>
        <ion-button type="block" @click="$modal.dismiss('modalPage1')">关闭Modal</ion-button>
      </ion-content>
    </ion-page>
</template>

<script type="text/ecmascript-6">
    export default{
        name:'modalPage1',
        data(){
            return{}
        },
        props:{},
        watch:{},
        computed:{},
        methods:{
          closeModal(ins){
            console.log('关闭点击的ins')
            console.log(ins);
          }
        },
        created(){
          console.debug('modal-page.vue-created')
        },
        mounted(){
          console.debug('modal-page.vue-mounted')
          console.log(this)
          console.log('modal-page获得的外部数据!!!')
          console.log(this.$options.modalData)
        },
        activated(){
          console.debug('modal-page.vue-activated')
        },
        components:{
        }
    }
</script>
<style lang="scss"></style>
