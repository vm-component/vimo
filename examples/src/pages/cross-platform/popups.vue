<template>
    <Page>
        <Header>
            <Navbar ref="navbar">
                <Title>弹窗组件</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h4>弹窗组件</h4>
            <section>
                <!--提示框 Alert-->
                <strong>提示框 Alert</strong>
                <Button block @click="openAlert()">Alert</Button>
                <strong>结果</strong>
                <p class="result">{{alertResult}}</p>
            </section>
            <section>
                <!--确认框 Confirm-->
                <strong>确认框 Confirm</strong>
                <Button block @click="openConfirm">Confirm</Button>
                <strong>结果</strong>
                <p class="result">{{confirmResult}}</p>
            </section>
            <section>
                <!--输入框 Prompt-->
                <strong>输入框 Prompt</strong>
                <Button block @click="openPrompt">Prompt</Button>
                <strong>结果</strong>
                <p class="result">{{promptResult}}</p>
            </section>
            <section>
                <!--震动 Vibrate-->
                <strong>震动 Vibrate(Android Only)</strong>
                <Button block @click="vibrate">Vibrate</Button>
                <strong>结果</strong>
                <p class="result">{{vibrateResult}}</p>
            </section>
            <section>
                <!--等待 Loading-->
                <strong>等待 Loading</strong>
                <Button block @click="openLoading">Loading</Button>
                <strong>结果</strong>
                <p class="result">{{loadingResult}}</p>
            </section>
            <section>
                <!--弱提示 Toast-->
                <strong>弱提示 Toast</strong>
                <Button block @click="openToast">Toast</Button>
                <strong>结果</strong>
                <p class="result">{{toastResult}}</p>
            </section>
            <section>
                <!--选择器 ActionSheet-->
                <strong>选择器 ActionSheet</strong>
                <Button block @click="openActionSheet">ActionSheet</Button>
                <strong>结果</strong>
                <p class="result">{{actionsheetResult}}</p>
            </section>
        </Content>
    </Page>
</template>
<style scoped lang="less">
    .result {
        border: 1px dashed #333;
        min-height: 20px;
        border-radius: 3px;
        overflow-y: scroll;
        white-space: pre-line;
        margin: 0 0 20px;
    }

</style>
<script type="text/javascript">
  export default {
    name: 'Popups',
    data () {
      return {
        // result
        alertResult: '',
        confirmResult: '',
        promptResult: '',
        vibrateResult: '',
        loadingResult: '',
        toastResult: '',
        actionsheetResult: '',

        test: ''
      }
    },
    props: {},
    watch: {},
    computed: {
      titleComponent () {
        return this.$refs.title
      },
      navbarComponent () {
        return this.$refs.navbar
      }
    },
    methods: {
      /**
       * 弹窗组件
       * */
      openAlert () {
        const _this = this
        this.$alert.present({
          title: '温馨提示',
          message: '您的快递到了！',
          buttons: [
            {
              text: '确定',
              handler: () => {
                _this.alertResult = '系好了 clicked'
              }
            }
          ]
        })
      },
      openConfirm () {
        const _this = this
        this.$alert.present({
          title: '温馨提示',
          message: '您是否想查询快递单号：\n1234567890',
          buttons: [
            {
              text: '暂不需要',
              role: 'cancel',
              handler: () => {
                _this.confirmResult = '暂不需要 click'
              }
            },
            {
              text: '马上查询',
              handler: () => {
                _this.confirmResult = '马上查询 click'
              }
            }
          ]
        })
      },
      openPrompt () {
        const _this = this
        this.$alert.present({
          title: '登录iTunes Store',
          message: '请输入您Apple ID"apple@icloud.com"的密码',
          enableBackdropDismiss: true,
          inputs: [
            {
              type: 'password',
              name: 'password',
              placeholder: '密码',
              value: ''
            }
          ],
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                _this.promptResult = '取消 clicked'
              }
            },
            {
              text: '确定',
              handler: (value) => {
                _this.promptResult = `${JSON.stringify(value)}`
              }
            }
          ]
        }).then(() => {
          console.log('Input present!')
        })
      },
      vibrate () {
        const _this = this
        window.dd && window.dd.device.notification.vibrate({
          duration: 300,
          onSuccess (data) {
            _this.vibrateResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.vibrateResult = `onFail: ${JSON.stringify(error)}`
          }
        })
      },
      openLoading () {
        this.$loading.present({
          content: '正在加载'
        }).then(() => {
          this.loadingResult = `Loading打开成功, 3000ms后关闭`
        })
        window.setTimeout(() => {
          this.$loading.dismiss('loading.dismiss').then(() => {
            this.loadingResult = `Loading关闭成功`
          })
        }, 3000)
      },
      openToast () {
        const _this = this
        _this.toastResult = 'Toast 开启, 3000ms后关闭'
        this.$toast({
          type: 'success',
          message: '支付成功',
          duration: 3000,
          onDismiss () {
            _this.toastResult = 'Toast 关闭'
          }
        })
      },
      openActionSheet () {
        const _this = this
        this.$actionSheet.present({
          title: '请选择操作',
          buttons: [
            {
              text: '警告',
              role: 'destructive',
              handler: () => {
                _this.actionsheetResult = '警告 clicked'
              }
            },
            {
              text: '翻转',
              handler: () => {
                _this.actionsheetResult = '翻转 clicked'
              }
            },
            {
              text: '增加',
              handler: () => {
                _this.actionsheetResult = '增加 clicked'
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                _this.actionsheetResult = '取消 clicked'
              }
            }
          ]
        }).then(function () {
          _this.actionsheetResult = 'ActionSheet 开启 clicked'
        })
      }
    }
  }
</script>
