<template>
    <Page>
        <Header>
            <Navbar>
                <Title>跨平台测试</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <article padding>
                <div>
                    <strong>说明:</strong>
                </div>
                <p>测试不包括: 钉盘操作/图片上传/音频/</p>
            </article>
            <List>
                <!--header-->
                <ListHeader>
                    <span>Contents</span>
                </ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item detail-push to="crossPlatform.ui">UI 控件</Item>
                    <Item detail-push to="crossPlatform.location">位置</Item>
                    <Item detail-push to="crossPlatform.launcher">启动器</Item>
                    <Item detail-push to="crossPlatform.equipment">设备</Item>
                    <Item detail-push to="crossPlatform.container">容器</Item>
                    <Item detail-push to="crossPlatform.store">存储</Item>
                    <Item detail-push to="crossPlatform.event">事件</Item>
                    <Item detail-push to="crossPlatform.pay">支付</Item>
                    <Item v-if="$platform.is('dtdream')"
                          detail-push to="crossPlatform.request">请求代理
                    </Item>

                    <Item detail-push to="crossPlatform.navigation">导航栏</Item>
                </ItemGroup>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .main {

    }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        toggleValue: true,
        silencePhone: 'always'
      }
    },
    watch: {
      toggleValue () {
        console.debug('outer toggleValue change:' + this.toggleValue)
      }
    },
    methods: {
      toggleChange (val) {
        console.debug('Outer Toggle Change Value - airPlane:' + val)
      }
    }
  }
</script>
