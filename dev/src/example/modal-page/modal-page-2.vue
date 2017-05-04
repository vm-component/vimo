<template>
    <Page>
        <Header>
            <Toolbar>
                <Button start slot="button" role="bar-button" @click="closeModal">
                    Close
                </Button>
                <Title>Modal Page 2</Title>
            </Toolbar>
        </Header>
        <Content padding>
            <h3>Hello, 这里是 Modal Page 2 的页面!</h3>
            <p>传入的数据为: {{modalData}}</p>
            <Button block @click="closeModal">关闭Modal</Button>
        </Content>
    </Page>
</template>

<script type="text/javascript">
  export default{
    data () {
      return {
        modalData: null
      }
    },
    methods: {
      closeModal () {
        this.$modal.dismiss({
          result: 'modal 2 dismissed success!'
        })
      }
    },
    created () {
      console.debug('modal-page.vue-created')
    },
    mounted () {
      console.debug('modal-page.vue-mounted')
      console.log('modal-page获得的外部数据!!!')
      console.log(this.$options.modalData)
      this.modalData = JSON.stringify(this.$options.modalData)
    },
    activated () {
      console.debug('modal-page.vue-activated')
    }
  }
</script>
<style lang="scss"></style>
