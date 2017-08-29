<template>
    <Page>
        <Header>
            <Navbar>
                <Title>事件</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <NoticeBar v-if="!$platform.is('dingtalk')" slot="fixedTop">请在钉钉APP环境内使用此页面测试接口</NoticeBar>
            <h4>
                <span>事件回调</span>
                <small>(页面退出自动解绑)</small>
            </h4>

            <section>
                <strong>页面返回事件的回调监听</strong>
                <div>
                    <small>iOS不支持这个事件，iOS的返回事件请使用setLeft JsApi</small>
                </div>
                <Button block @click="addBackButtonEvent()">AddBackButtonEvent</Button>
                <strong>结果</strong>
                <p class="result">{{backButtonEventResult}}</p>
            </section>

            <section>
                <strong>页面resume事件的回调监听</strong>
                <Button block @click="addResumeEvent()">addResumeEvent</Button>
                <strong>结果</strong>
                <p class="result">{{resumeEventResult}}</p>
            </section>

            <section>
                <strong>页面pause事件的回调监听</strong>
                <Button block @click="addPauseEvent()">addPauseEvent</Button>
                <strong>结果</strong>
                <p class="result">{{pauseEventResult}}</p>
            </section>

            <section>
                <Button color="danger" block @click="openLink()">开启新页面</Button>
                <br>
            </section>

            <section>
                <strong>页面标题双击事件的回调监听</strong>
                <Button block @click="addNavTitleEvent()">addNavTitleEvent</Button>
                <strong>结果</strong>
                <p class="result">{{navTitleEventResult}}</p>
            </section>

        </Content>
    </Page>
</template>
<script type="text/javascript">
  import { registerListener } from '../../../../components/util/util'

  export default {
    name: 'UiWidget',
    data () {
      return {
        unRegBackButton: null,
        backButtonEventResult: '',

        unRegResume: null,
        resumeEventResult: '',

        unRegPause: null,
        pauseEventResult: '',

        unRegNavTitle: null,
        navTitleEventResult: '',

        last: ''
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      addBackButtonEvent () {
        const _this = this
        _this.unRegBackButton && _this.unRegBackButton()
        _this.unRegBackButton = registerListener(window.document, 'backbutton', (e) => {
          // 在这里处理你的业务逻辑
          e.preventDefault()
          alert('backbutton 事件已触发')
          _this.backButtonEventResult = 'backbutton 事件已触发'
          //backbutton事件的默认行为是回退历史记录，如果你想阻止默认的回退行为，那么可以通过preventDefault()实现
        })
        _this.backButtonEventResult = 'backbutton 事件已设置'
      },
      addResumeEvent () {
        const _this = this
        _this.unRegResume && _this.unRegResume()
        _this.unRegResume = registerListener(window.document, 'resume', (e) => {
          // 在这里处理你的业务逻辑
          e.preventDefault()
          alert('resume 事件已触发')
          _this.resumeEventResult = 'resume 事件已触发'
        })
        _this.resumeEventResult = 'resume 事件已设置'
      },
      addPauseEvent () {
        const _this = this
        _this.unRegPause && _this.unRegPause()
        _this.unRegPause = registerListener(window.document, 'pause', (e) => {
          // 在这里处理你的业务逻辑
          e.preventDefault()
          alert('pause 事件已触发')
          _this.pauseEventResult = 'pause 事件已触发'
        })
        _this.pauseEventResult = 'pause 事件已设置'
      },
      addNavTitleEvent () {
        const _this = this
        _this.unRegNavTitle && _this.unRegNavTitle()
        _this.unRegNavTitle = registerListener(window.document, 'navTitle', (e) => {
          // 在这里处理你的业务逻辑
          e.preventDefault()
          alert('navTitle 事件已触发')
          _this.navTitleEventResult = 'navTitle 事件已触发'
        })
        _this.navTitleEventResult = 'navTitle 事件已设置'
      },
      openLink () {
        window.dd.biz.util.openLink({
          url: 'http://www.baidu.com' // 要打开链接的地址
        })
      }
    },
    deactivate () {
      this.unRegBackButton && this.unRegBackButton()
      this.unRegResume && this.unRegResume()
      this.unRegPause && this.unRegPause()
      this.unRegNavTitle && this.unRegNavTitle()
    },
    destroyed () {
      this.unRegBackButton && this.unRegBackButton()
      this.unRegResume && this.unRegResume()
      this.unRegPause && this.unRegPause()
      this.unRegNavTitle && this.unRegNavTitle()
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
