<template>
    <Page>
        <Header>
            <Navbar>
                <Title>支付</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h4>支付</h4>
            <section>
                <strong>支付接口</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">订单信息: </Label>
                    <Input placeholder="...." type="text" v-model="info" clearInput></Input>
                </Item>
                <Button block @click="pay()">Pay</Button>
                <strong>结果</strong>
                <p class="result">{{payResult}}</p>
            </section>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'Pay',
    data () {
      return {
        info: 'xxx',
        payResult: ''
      }
    },
    methods: {
      pay () {
        const _this = this
        if (_this.$platform.is('dingtalk')) {
          window.dd && window.dd.biz.alipay.pay({
            info: _this.info, // 订单信息，
            onSuccess (result) {
              _this.payResult = `onSuccess: ${JSON.stringify(result)}`
            },
            onFail (err) {
              _this.payResult = `onFail: ${JSON.stringify(err)}`
            }
          })
        } else if (_this.$platform.is('dtdream')) {
          window.dd && window.dd.biz.util.pay({
            platform: '1', // 支付平台，“1”为支付宝，“2”为微信支付（暂不支持）
            arg: {
              'credential': _this.info
            },
            onSuccess (result) {
              _this.payResult = `onSuccess: ${JSON.stringify(result)}`
            },
            onFail (err) {
              _this.payResult = `onFail: ${JSON.stringify(err)}`
            }
          })
        } else {
          _this.payResult = '未找到对应执行方法'
        }
      }
    }
  }
</script>
<style scoped lang="less">
    .result {
        border: 1px dashed #333;
        min-height: 20px;
        border-radius: 3px;
        overflow-y: scroll;
        white-space: pre-line;
        margin: 0 0 20px;
    }

    .item {
        margin: 5px 0;
    }
</style>
