<template>
    <Page>
        <Header>
            <Navbar>
                <Title>电话</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <NoticeBar v-if="!$platform.is('dingtalk')" slot="fixedTop">请在钉钉APP环境内使用此页面测试接口</NoticeBar>
            <h4>电话</h4>
            <section>
                <strong>获取容器版本号</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">用户列表: </Label>
                    <Input placeholder="用户列表, 多个用空格分割" type="text" v-model="users" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">企业ID: </Label>
                    <Input placeholder="企业ID" type="text" v-model="corpId" clearInput></Input>
                </Item>
                <Button block @click="call()">Call</Button>
                <strong>结果</strong>
                <p class="result">{{callResult}}</p>
            </section>
            <section>
                <strong>通用电话拨打接口</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">电话: </Label>
                    <Input placeholder="电话号码" type="tel" v-model="phoneNumber" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">国家代号: </Label>
                    <Input placeholder="中国是+86" type="text" v-model="code" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">是否显示钉钉电话</Label>
                    <Toggle slot="item-right" v-model="showDingCall"></Toggle>
                </Item>
                <Button block @click="showCallMenu()">ShowCallMenu</Button>
                <strong>结果</strong>
                <p class="result">{{showCallMenuResult}}</p>
            </section>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'Container',
    data () {
      return {
        callResult: '',
        users: '',
        corpId: '',

        phoneNumber: '',
        code: '',
        showDingCall: false,
        showCallMenuResult: '',

        last: ''
      }
    },
    methods: {
      call () {
        const _this = this
        window.dd && window.dd.biz.telephone.call({
          users: _this.users.split(' '), //用户列表，工号
          corpId: _this.corpId, //企业id
          onSuccess (result) {
            _this.callResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.callResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      showCallMenu () {
        const _this = this
        window.dd && window.biz.telephone.showCallMenu({
          phoneNumber: _this.phoneNumber, // 期望拨打的电话号码
          code: _this.code, // 国家代号，中国是+86
          showDingCall: _this.showDingCall, // 是否显示钉钉电话
          onSuccess (result) {
            _this.showCallMenuResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.showCallMenuResult = `onFail: ${JSON.stringify(err)}`
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
