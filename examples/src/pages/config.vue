<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Config</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">

            <h1>应用状态配置</h1>

            <p>Config组件用于放置应用级别的属性配置, 存储形式为key-value. 其中value可以是用function返回配置value.</p>

            <p>同时, 合成变量也建议放在config中, 业务通过this.$config.get获取配置.</p>

            <h5>当前用户配置</h5>
            <Row v-for="(value,key) in settingConfig" :key="key">
                <Column col-6><strong>{{key}}:</strong></Column>
                <Column col-6>
                    {{value}}
                </Column>
            </Row>

            <h5>已缓存配置</h5>
            <Row v-for="(value,key) in cachedConfig" :key="key">
                <Column col-6><strong>{{key}}:</strong></Column>
                <Column col-6>
                    {{value}}
                </Column>
            </Row>
        </Content>
    </Page>
</template>
<style scoped lang="less"></style>
<script type="text/javascript">
  export default {
    name: 'ConfigDemo',
    data () {
      return {
        cachedConfig: [],
        settingConfig: []
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {
      this.$platform.ready().then(() => {
        window.setTimeout(() => {
          this.cachedConfig = this.$config.cache()
          this.settingConfig = this.$config.settings()
        }, 100)
      }, () => {})
    },
    activated () {},
    components: {}
  }
</script>
