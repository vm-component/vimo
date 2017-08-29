<template>
    <Page>
        <Header>
            <Navbar>
                <Title>UI 控件</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <NoticeBar v-if="!$platform.is('dingtalk')" slot="fixedTop">请在钉钉APP环境内使用此页面测试接口</NoticeBar>
            <h4>UI控件</h4>
            <section>
                <strong>输入框</strong>
                <Item no-lines class="item">
                    <Input placeholder="Placeholder 占位符" type="text" v-model="openInputPlainPlaceholder"
                           clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Input placeholder="默认填充文本" type="text" v-model="openInputPlainText" clearInput></Input>
                </Item>
                <Button block @click="openInputPlain()">OpenInputPlain</Button>
                <strong>结果</strong>
                <p class="result">{{openInputPlainResult}}</p>
            </section>

            <section>
                <strong>设置顶部进度条颜色(?)</strong>
                <Item no-lines class="item">
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
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'UiWidget',
    data () {
      return {
        openInputPlainResult: '',
        openInputPlainPlaceholder: '说点什么吧',
        openInputPlainText: '',

        setProgressBarColorsResult: '',
        progressBarColors: '',

        pullToRefreshEnableResult: '',

        last: ''
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      openInputPlain () {
        const _this = this
        window.dd && window.dd.ui.input.plain({
          placeholder: _this.openInputPlainPlaceholder, //占位符
          text: _this.openInputPlainText, //默认填充文本
          onSuccess (result) {
            //onSuccess将在点击发送之后调用
            /*{ text: String }*/
            _this.openInputPlainResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.openInputPlainResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
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
