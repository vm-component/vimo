<template>
    <Page>
        <Header>
            <Navbar>
                <Title>ToastState</Title>
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
            <h5>Loading Dismiss</h5>
            <Button block @click="loadingCancel('dots')">loadingCancel(dots)</Button>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoToastState',
    i18n: {
      messages: {
        'zh-CN': {
          title: '通知(状态)',
          cardsBasic: '基础使用',
          cardsList: 'Card与List组合',
          cardsAdvanced: '更丰富的Card'
        },
        'en-US': {
          title: 'ToastState',
          cardsBasic: 'Basic Usage',
          cardsList: 'Card With List',
          cardsAdvanced: 'Advanced Card'
        }
      }
    },
    methods: {
      text () {
        this.$toastState.present('Text only')
      },
      success () {
        this.$toastState.present({
          message: 'Request Success',
          type: 'success',
          duration: 1000,
          onDismiss () {
            console.log('onDismiss: 请求成功')
          }
        })
      },
      fail () {
        this.$toastState.present({
          message: 'Request Fail',
          type: 'fail',
          duration: 1000
        })
      },
      offline () {
        this.$toastState.present({
          message: 'Offline',
          type: 'offline',
          duration: 1000
        })
      },
      loading (type) {
        this.$toastState.present({
          message: 'Loading',
          type: 'loading',
          spinner: {
            name: type || 'ios'
          },
          duration: 1000
        })
      },
      loadingCancel (type) {
        var toast = this.$toastState.present({
          message: 'Waiting',
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
    }
  }
</script>
