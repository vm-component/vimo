<template>
    <Page>
        <Header>
            <Toolbar>
                <Button right slot="button" role="bar-button" @click="closeModal">
                    Close

                </Button>
                <Title>Modal Page 1</Title>
            </Toolbar>
        </Header>
        <Content padding ref="content">
            <h3>Hello, 这里是 Modal Page 1 的页面!</h3>
            <p>传入的数据为: {{modalData}}</p>
            <Button type="block" @click="closeModal">关闭Modal</Button>
            <Button type="block" @click="openOtherModal()">在此基础上在打开modal</Button>
            <Button type="block" @click="scrollToBottom">滚动到底部</Button>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <p>这个是数据</p>
            <Button type="block" @click="scrollToTop">滚动到顶部</Button>
        </Content>
        <Footer>
            <Toolbar>
                <Title>Modal Toolbar Footer</Title>
            </Toolbar>
        </Footer>
    </Page>
</template>

<script type="text/ecmascript-6">
  import modalPageComponent_3 from './modal-page-3.vue';

  export default{
    name: 'model1',
    data(){
      return {
        modalData: null,
      }
    },
    props: {},
    watch: {},
    computed: {
      content(){
        return this.$refs.content
      }
    },
    methods: {
      closeModal(){
        this.$modal.dismiss({
          result: 'modal 1 dismissed success!'
        })
      },
      openOtherModal(){
        this.$modal.present({
          template: modalPageComponent_3,
          modalData: {hello: 'Page3Data'},
          onDismiss (data) {
            console.debug('得到了modal3的关闭信息')
            console.debug(JSON.stringify(data))
          }
        })
      },
      scrollToBottom(){
        this.content.scrollToBottom();
      },
      scrollToTop(){
        this.content.scrollToTop();
      }
    },
    created(){
      console.debug('！！！！modal-page.vue-created！！！！')
    },
    mounted(){
      console.debug('！！！！modal-page.vue-mounted！！！！')
      console.log('modal-page获得的外部数据!!!')
      console.log(this.$options.modalData)
      console.log(JSON.stringify(this.$options.modalData))
      this.modalData = JSON.stringify(this.$options.modalData)
    },
    activated(){
      console.debug('！！！！modal-page.vue-activated！！！！')
    },
    updated(){
      console.debug('！！！！modal-page.vue-updated！！！！')
    },
    components: {}
  }
</script>
<style lang="scss"></style>
