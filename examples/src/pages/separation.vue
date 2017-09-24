<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Separation</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h1>Separation组件</h1>
            <p>该组件用于分割内容区块, 或者尾部提示等位置使用.</p>
            <p><strong>例如:</strong></p>
            <Separation>
                <Icon name="logo-chrome" small></Icon>
                <span>I Love Chrome</span>
            </Separation>
            <Separation>
                <Icon name="logo-javascript" small></Icon>
                <span>Hello JS</span>
            </Separation>
            <Separation>
                <Icon name="heart" color="danger" small></Icon>
                <span>猜你喜欢</span>
            </Separation>
            <Separation>
                <Icon name="flame" color="danger" small></Icon>
                <span> 热门推荐</span>
            </Separation>
            <Separation>
                <Icon name="text" small></Icon>
                <span>亲, 看完了</span>
            </Separation>
            <Separation>分享</Separation>
        </Content>
    </Page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default{
    name: 'name',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    destroyed () {}
  }
</script>
