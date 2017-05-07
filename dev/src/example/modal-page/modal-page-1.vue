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
            <h5>Hello, 这里是 Modal Page 1 的页面!</h5>
            <p>传入的数据为: {{modalData}}</p>
            <Button block @click="closeModal">关闭Modal</Button>
            <Button block @click="openOtherModal()">在此基础上在打开modal</Button>
            <Button block @click="scrollToBottom">滚动到底部</Button>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <Button block @click="scrollToTop">滚动到顶部</Button>
        </Content>
        <Footer>
            <Toolbar>
                <Title>Modal Toolbar Footer</Title>
            </Toolbar>
        </Footer>
    </Page>
</template>

<script type="text/javascript">
  import modalPageComponent3 from './modal-page-3.vue'
  export default{
    name: 'model1',
    data () {
      return {
        modalData: null
      }
    },
    computed: {
      content () {
        return this.$refs.content
      }
    },
    methods: {
      closeModal () {
        this.$modal.dismiss({
          result: 'modal 1 dismissed success!'
        })
      },
      openOtherModal () {
        this.$modal.present({
          template: modalPageComponent3,
          modalData: {hello: 'Page3Data'},
          onDismiss (data) {
            console.debug('得到了modal3的关闭信息')
            console.debug(JSON.stringify(data))
          }
        })
      },
      scrollToBottom () {
        this.content.scrollToBottom()
      },
      scrollToTop () {
        this.content.scrollToTop()
      }
    },
    created () {
      console.debug('！！！！modal-page.vue-created！！！！')
    },
    mounted () {
      console.debug('！！！！modal-page.vue-mounted！！！！')
      console.log('modal-page获得的外部数据!!!')
      console.log(this.$options.modalData)
      console.log(JSON.stringify(this.$options.modalData))
      this.modalData = JSON.stringify(this.$options.modalData)
    },
    activated () {
      console.debug('！！！！modal-page.vue-activated！！！！')
    },
    updated () {
      console.debug('！！！！modal-page.vue-updated！！！！')
    },
    components: {}
  }
</script>
<style lang="scss"></style>
