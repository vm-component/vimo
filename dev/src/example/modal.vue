<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Modal</Title>
      </Navbar>
    </Header>
    <Content padding>

      <Button block @click="openModal_1">点击打开Modal_1</Button>
      <Button block @click="openModal_2">点击打开Modal_2</Button>


    </Content>
  </Page>
</template>
<style lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  import modalPageComponent_1 from './modal-page/modal-page-1.vue';
  import modalPageComponent_2 from './modal-page/modal-page-2.vue';

  export default{
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      openModal_1(){
        this.$modal.present({
          name:'modal_1',
          position:'bottom',
          template: modalPageComponent_1,
          modalData: {hello: 'Page1Data'},
          onDismiss (data) {
            console.debug('得到了modal1的关闭信息')
            console.debug(JSON.stringify(data))
          }
        })
      },
      openModal_2(){
        this.$modal.present({
          name:'modal_2',
          position:'right',
          template: modalPageComponent_2,
          modalData: {hello: 'Page2Data'},
          onDismiss (data) {
            console.debug('得到了modal2的关闭信息')
            console.debug(JSON.stringify(data))
          }
        })
      }
    },
    created(){},
    mounted(){},
    activated(){},
    components: {}
  }
</script>
