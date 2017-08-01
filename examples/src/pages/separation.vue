<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Title</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
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
<style scoped lang="scss">

</style>
<script type="text/javascript">
  import { Separation } from 'vimo/components/separation'
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
    components: {Separation},
    destroyed () {}
  }
</script>
