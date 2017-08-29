<template>
    <Page>
        <Header>
            <Navbar>
                <Title>容器</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <NoticeBar slot="fixedTop">请在钉钉APP环境内使用此页面测试接口</NoticeBar>
            <h4>容器</h4>
            <section>
                <strong>获取容器版本号</strong>
                <Button block @click="getVersion()">Version</Button>
                <strong>结果</strong>
                <p class="result">{{versionResult}}</p>
            </section>
            <section>
                <strong>获取微应用免登授权码</strong>
                <Item no-lines>
                    <Input placeholder="企业ID" type="text" v-model="runtimeCorpid" clearInput></Input>
                </Item>
                <Button block @click="requestRuntimeAuthCode()">RequestRuntimeAuthCode</Button>
                <strong>结果</strong>
                <p class="result">{{requestRuntimeAuthCodeResult}}</p>
            </section>
            <section>
                <strong>获取服务窗免登授权码</strong>
                <Item no-lines>
                    <Input placeholder="企业ID" type="text" v-model="channelCorpid" clearInput></Input>
                </Item>
                <Button block @click="requestChannelAuthCode()">RequestChannelAuthCode</Button>
                <strong>结果</strong>
                <p class="result">{{requestChannelAuthCodeResult}}</p>
            </section>
            <section>
                <strong>获取微应用反馈式操作的临时授权码</strong>
                <Item no-lines>
                    <Input placeholder="企业ID" type="text" v-model="operateCorpid" clearInput></Input>
                </Item>
                <Item no-lines>
                    <Input placeholder="微应用ID，必须与dd.config的一致" type="text" v-model="operateAgentId" clearInput></Input>
                </Item>
                <Button block @click="requestOperateAuthCode()">RequestOperateAuthCode</Button>
                <strong>结果</strong>
                <p class="result">{{requestOperateAuthCodeResult}}</p>
            </section>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'Container',
    data () {
      return {
        versionResult: '',
        requestRuntimeAuthCodeResult: '',
        runtimeCorpid: '',
        requestChannelAuthCodeResult: '',
        channelCorpid: '',

        requestOperateAuthCodeResult: '',
        operateCorpid: '',
        operateAgentId: '',

        last: ''
      }
    },
    methods: {
      getVersion () {
        this.versionResult = window.dd && window.dd.version
      },
      requestRuntimeAuthCode () {
        const _this = this
        window.dd && window.dd.runtime.permission.requestAuthCode({
          corpId: _this.runtimeCorpid,
          onSuccess (result) {
            _this.requestAuthCodeResult = `onSuccess: ${JSON.stringify(result)}`
            /*{code: 'hYLK98jkf0m' //string authCode}*/
          },
          onFail (err) {
            _this.requestAuthCodeResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      requestChannelAuthCode () {
        const _this = this
        window.dd && window.dd.channel.permission.requestAuthCode({
          corpId: _this.channelCorpid,
          onSuccess (result) {
            _this.requestAuthCodeResult = `onSuccess: ${JSON.stringify(result)}`
            /*{code: 'hYLK98jkf0m' //string authCode}*/
          },
          onFail (err) {
            _this.requestAuthCodeResult = `onFail: ${JSON.stringify(err)}`
          }

        })
      },
      requestOperateAuthCode () {
        const _this = this
        window.dd && window.dd.runtime.permission.requestOperateAuthCode({
          corpId: _this.operateCorpid,
          agentId: _this.operateAgentId,
          onSuccess (result) {
            _this.requestAuthCodeResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.requestAuthCodeResult = `onFail: ${JSON.stringify(err)}`
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
</style>
