<template>
    <Page>
        <Header>
            <Navbar>
                <Title>请求代理</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h4>请求代理</h4>
            <section>
                <strong>请求代理</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">请求地址: </Label>
                    <Input placeholder="...." type="text" v-model="requestUrl" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">方法: </Label>
                    <Input placeholder="...." type="text" v-model="requestMethod" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">参数: </Label>
                    <Input placeholder="...." type="text" v-model="requestData" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">Header: </Label>
                    <Input placeholder="...." type="text" v-model="requestHeader" clearInput></Input>
                </Item>
                <Button block @click="request()">Request</Button>
                <strong>结果</strong>
                <p class="result">{{requestResult}}</p>
            </section>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'Request',
    data () {
      return {
        requestUrl: 'http://www.baidu.com',
        requestMethod: 'GET',
        requestData: '',
        requestHeader: '{"Content-Type":"application/json"}',
        requestResult: '',

        last: ''
      }
    },
    methods: {
      request () {
        const _this = this
        window.dd && window.dd.biz.util.request({
          url: _this.requestUrl,
          method: _this.requestMethod,
          data: _this.requestData,
          header: _this.requestHeader,
          onSuccess (data) {
            _this.requestResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.requestResult = `onFail: ${JSON.stringify(error)}`
          }
        })
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
