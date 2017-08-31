<template>
    <Page>
        <Header>
            <Navbar>
                <Title>容器</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h4>容器</h4>
            <section>
                <strong>设置顶部进度条颜色(?)</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">颜色: </Label>
                    <Input placeholder="最多支持4个颜色, 多个颜色用空格分割" type="text" v-model="progressBarColors"
                           clearInput></Input>
                </Item>
                <Button block @click="setProgressBarColors()">SetProgressBarColors</Button>
                <strong>结果</strong>
                <p class="result">{{setProgressBarColorsResult}}</p>
            </section>
            <section>
                <strong>启用下拉刷新</strong>
                <Button block @click="pullToRefreshEnable()">PullToRefreshEnable</Button>
                <Button block @click="pullToRefreshStop()">PullToRefreshStop</Button>
                <Button block @click="pullToRefreshDisable()">PullToRefreshDisable</Button>
                <strong>结果</strong>
                <p class="result">{{pullToRefreshEnableResult}}</p>
            </section>
            <section>
                <strong>Bounce</strong>
                <div>
                    <small>Disable状态无法使用下拉刷新</small>
                </div>
                <Button block @click="webViewBounceEnable()">webViewBounceEnable</Button>
                <Button block @click="webViewBounceDisable()">webViewBounceDisable</Button>
            </section>

            <section>
                <strong>获取容器版本号</strong>
                <Button block @click="getVersion()">Version</Button>
                <strong>结果</strong>
                <p class="result">{{versionResult}}</p>
            </section>
            <section>
                <strong>获取微应用免登授权码</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">企业ID: </Label>
                    <Input placeholder="企业ID" type="text" v-model="runtimeCorpid" clearInput></Input>
                </Item>
                <Button block @click="requestRuntimeAuthCode()">RequestRuntimeAuthCode</Button>
                <strong>结果</strong>
                <p class="result">{{requestRuntimeAuthCodeResult}}</p>
            </section>
            <section>
                <strong>获取服务窗免登授权码</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">企业ID: </Label>
                    <Input placeholder="企业ID" type="text" v-model="channelCorpid" clearInput></Input>
                </Item>
                <Button block @click="requestChannelAuthCode()">RequestChannelAuthCode</Button>
                <strong>结果</strong>
                <p class="result">{{requestChannelAuthCodeResult}}</p>
            </section>
            <section>
                <strong>获取微应用反馈式操作的临时授权码</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">企业ID: </Label>
                    <Input placeholder="企业ID" type="text" v-model="operateCorpid" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">微应用ID: </Label>
                    <Input placeholder="必须与dd.config的一致" type="text" v-model="operateAgentId" clearInput></Input>
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
        setProgressBarColorsResult: '',
        progressBarColors: '',

        pullToRefreshEnableResult: '',

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
      setProgressBarColors () {
        const _this = this
        window.dd && window.dd.ui.progressBar.setColors({
          colors: _this.progressBarColors.split(' '), //array[number] 进度条变化颜色，最多支持4个颜色
          onSuccess (result) {
            /* true:成功  false:失败 */
            _this.setProgressBarColorsResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.setProgressBarColorsResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      pullToRefreshEnable () {
        const _this = this
        window.dd && window.dd.ui.pullToRefresh.enable({
          onSuccess (result) {
            _this.pullToRefreshEnableResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.pullToRefreshEnableResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      pullToRefreshStop () {
        window.dd && window.dd.ui.pullToRefresh.stop()
      },
      pullToRefreshDisable () {
        window.dd && window.dd.ui.pullToRefresh.disable()
      },
      webViewBounceEnable () {
        window.dd && window.dd.ui.webViewBounce.enable()
      },
      webViewBounceDisable () {
        window.dd && window.dd.ui.webViewBounce.disable()
      },


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

    .item {
        margin: 5px 0;
    }
</style>