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
                <strong>检测应用是否安装(多个用空格分割)</strong>
                <div class="inputBox">
                    <Input clearInput type="text" v-model="installedApp"></Input>
                </div>
                <Button block @click="checkInstalledApps()">CheckInstalledApps</Button>
                <strong>结果</strong>
                <p class="result">{{checkInstalledAppsResult}}</p>
            </section>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

    .result {
        border: 1px dashed #333;
        min-height: 20px;
        border-radius: 3px;
        overflow-y: scroll;
        white-space: pre-line;
        margin: 0 0 20px;
    }

    .inputBox {
        background: #fff;
        padding:0 10px;
    }
</style>
<script type="text/javascript">
  export default {
    name: 'Launcher',
    data () {
      return {
        // result
        checkInstalledAppsResult: '',
        installedApp: '',

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
        window.dd && window.dd.device.launcher.checkInstalledApps({
          apps: _this.installedApp.split(' '),
          onSuccess (data) {
            _this.checkInstalledAppsResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.checkInstalledAppsResult = `onFail: ${JSON.stringify(error)}`
          }
        })
      }
    },
    mounted () {
      let platforms = this.$platform.platforms()
      if (platforms.length === 3) {
        this.platformName = platforms[2].toUpperCase()
      }
    },
    activated () {},
    deactivate () {},
    destroyed () {}
  }
</script>
