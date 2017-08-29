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
                <p>测试不包括: 钉盘操作</p>
            </article>
            <List>
                <!--header-->
                <ListHeader>
                    <span>Contents</span>
                </ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item detail-push to="crossPlatform.container">容器</Item>
                    <Item detail-push to="crossPlatform.equipment">设备</Item>
                    <Item detail-push to="crossPlatform.store">存储</Item>
                    <Item detail-push to="crossPlatform.launcher">启动器</Item>
                    <Item detail-push to="crossPlatform.popups">弹窗</Item>
                    <Item detail-push to="crossPlatform.location">位置组件</Item>
                    <Item detail-push to="crossPlatform.tel">电话</Item>
                    <Item detail-push to="crossPlatform.ui">UI 控件</Item>
                    <Item detail-push to="crossPlatform.event">事件</Item>
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
  export default{
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
