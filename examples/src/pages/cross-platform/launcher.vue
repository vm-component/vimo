<template>
    <Page>
        <Header>
            <Navbar>
                <Title>启动器</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h4>启动器</h4>
            <section>
                <strong>检测应用是否安装</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">应用: </Label>
                    <Input placeholder="多个用空格分割" type="text" v-model="installedApp" clearInput></Input>
                </Item>
                <Button block @click="checkInstalledApps()">CheckInstalledApps</Button>
                <strong>结果</strong>
                <p class="result">{{checkInstalledAppsResult}}</p>
            </section>
            <section>
                <strong>启动第三方应用</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">应用: </Label>
                    <Input placeholder="只能启动一个" type="text" v-model="launchAppName" clearInput></Input>
                </Item>
                <Button block @click="launchApp()">LaunchApp</Button>
                <strong>结果</strong>
                <p class="result">{{launchAppResult}}</p>
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
