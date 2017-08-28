<template>
    <Page>
        <Header>
            <Navbar>
                <Title>跨平台测试</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <!--header-->
                <ListHeader>
                    <span>Contents</span>
                </ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item detail-push to="crossPlatform.popups">弹出组件</Item>
                    <Item detail-push to="crossPlatform.location">位置组件</Item>
                    <Item detail-push to="crossPlatform.launcher">启动器</Item>

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
