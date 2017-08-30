<template>
    <Page>
        <Header>
            <Navbar>
                <Title>启动器</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h4>启动器</h4>
            <section v-if="$platform.is('dingtalk') || $platform.is('dtdream')">
                <strong>检测应用是否安装</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">应用: </Label>
                    <Input placeholder="多个用空格分割" type="text" v-model="installedApp" clearInput></Input>
                </Item>
                <Button block @click="checkInstalledApps()">CheckInstalledApps</Button>
                <strong>结果</strong>
                <p class="result">{{checkInstalledAppsResult}}</p>
            </section>
            <section v-if="$platform.is('dingtalk') || $platform.is('dtdream')">
                <strong>启动第三方应用</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">应用: </Label>
                    <Input placeholder="只能启动一个" type="text" v-model="launchAppName" clearInput></Input>
                </Item>
                <Button block @click="launchApp()">LaunchApp</Button>
                <strong>结果</strong>
                <p class="result">{{launchAppResult}}</p>
            </section>

            <section v-if="$platform.is('dingtalk')">
                <strong>打开应用内页面</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">页面名称: </Label>
                    <Input placeholder="页面名称" type="text" v-model="openInnerAppName" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">传参: </Label>
                    <Input placeholder="传参" type="text" v-model="openInnerAppParams" clearInput></Input>
                </Item>
                <Button block @click="openInnerApp">OpenInnerApp</Button>
                <strong>结果</strong>
                <p class="result">{{openInnerAppResult}}</p>
            </section>

            <section>
                <strong>在新窗口上打开链接</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">链接: </Label>
                    <Input placeholder="..." type="text" v-model="openLinkUrl" clearInput></Input>
                </Item>
                <Button block @click="openLink()">OpenLink</Button>
                <strong>结果</strong>
                <p class="result">{{openLinkResult}}</p>
            </section>

            <section>
                <strong>关闭当前窗口</strong>
                <Button block @click="closeLink()">CloseLink</Button>
            </section>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'Launcher',
    data () {
      return {
        // result
        installedApp: 'taobao tmall',
        checkInstalledAppsResult: '',
        launchAppName: 'weixin://',
        launchAppResult: '',

        openInnerAppResult: '',
        openInnerAppName: '',
        openInnerAppParams: '',

        openLinkUrl: 'http://www.dingtalk.com',
        openLinkResult: '',

        closeLinkResult: '',
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
      checkInstalledApps () {
        const _this = this
        let apps = _this.installedApp.split(' ')
        window.dd && window.dd.device.launcher.checkInstalledApps({
          apps: apps,
          onSuccess (data) {
            _this.checkInstalledAppsResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.checkInstalledAppsResult = `onFail: ${JSON.stringify(error)}`
          }
        })
      },
      launchApp () {
        const _this = this
        window.dd && window.dd.device.launcher.launchApp({
          app: this.launchApp,
          activity: 'DetailActivity',
          onSuccess (data) {
            // data =>{ result: true }
            _this.launchAppResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.launchAppResult = `onFail: ${JSON.stringify(error)}`
          }
        })
      },
      openInnerApp () {
        const _this = this
        window.dd && window.dd.biz.util.open({
          name: _this.openInnerAppName, // 页面名称
          params: _this.openInnerAppParams, // 传参
          onSuccess (data) {
            _this.openInnerAppResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.openInnerAppResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      openLink () {
        const _this = this
        window.dd && window.dd.biz.util.openLink({
          url: _this.openLinkUrl,//要打开链接的地址
          onSuccess (result) {
            _this.openLinkResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.openLinkResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      closeLink () {
        window.dd && window.dd.biz.navigation.close()
      }
    },
    mounted () {
      let platforms = this.$platform.platforms()
      if (platforms.length === 3) {
        this.platformName = platforms[2].toUpperCase()
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
