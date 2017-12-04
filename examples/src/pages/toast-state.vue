<template>
    <Page>
        <Header>
            <Navbar>
                <Title>IconToast</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>Text</h5>
            <Button block @click="text">Text</Button>
            <h5>State</h5>
            <Button block @click="success">Success</Button>
            <Button block @click="fail">Fail</Button>
            <Button block @click="offline">Offline</Button>
            <h5>Loading</h5>
            <Button block @click="loading('ios')">Loading(ios)</Button>
            <Button block @click="loading('ios-small')">Loading(ios-small)</Button>
            <Button block @click="loading('bubbles')">Loading(bubbles)</Button>
            <Button block @click="loading('circles')">Loading(circles)</Button>
            <Button block @click="loading('crescent')">Loading(crescent)</Button>
            <Button block @click="loading('dots')">Loading(dots)</Button>
            <h5>Loading 手动取消</h5>
            <Button block @click="loadingCancel('dots')">loadingCancel(dots)</Button>
        </Content>
    </Page>
</template>
<script type="text/javascript">

  export default {
    name: 'IconToastDemo',
    methods: {
      text () {
        this.$toastState.present('只是文本')
      },
      success () {
        this.$toastState.present({
          message: '请求成功',
          type: 'success',
          duration: 1000,
          onDismiss () {
            console.log('onDismiss: 请求成功')
          }
        })
      },
      fail () {
        this.$toastState.present({
          message: '请求失败',
          type: 'fail',
          duration: 1000
        })
      },
      offline () {
        this.$toastState.present({
          message: '当前暂无网络',
          type: 'offline',
          duration: 1000
        })
      },
      loading (type) {
        this.$toastState.present({
          message: '请稍后',
          type: 'loading',
          spinner: {
            name: type || 'ios'
          },
          duration: 1000
        })
      },
      loadingCancel (type) {
        var toast = this.$toastState.present({
          message: '请稍后',
          type: 'loading',
          spinner: {
            name: type || 'ios'
          },
          duration: 10000
        })

        window.setTimeout(() => {
          toast.dismiss()
        }, 3000)
      }
    },
    beforeUpdate () {},
    updated () {},
    activated () {},
    deactivated () {},
    beforeDestroy () {},
    destroyed () {}
  }
</script>
<style scoped lang="scss">

</style>
