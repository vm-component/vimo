<template>
    <Page>
        <Header>
            <Toolbar>
                <Button start slot="button" role="bar-button" @click="closeModal">
                    Close
                </Button>
                <Title>Modal Page 3</Title>
            </Toolbar>
        </Header>
        <Content padding>
            <h5>Hello, 这里是 Modal Page 3 的页面!</h5>
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
          result: 'modal 3 dismissed success!'
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
