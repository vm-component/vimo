<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Title</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>简述</h5>
            <p>这是一个仿照淘宝注册的一个验证组件, 向右滑动到底部意味着用户确认协议可以继续向下进行.</p>
            <h5>示例</h5>
            <SlideBox>Content</SlideBox>
            <p>继续操作即视为同意 <a href="#">淘宝服务协议</a>, <a href="#">法律声明及隐私权政策</a>和 <a href="#">支付宝协议</a>, 系统将同步为您创建支付宝账户</p>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  import { SlideBox } from 'vimo/components/slide-box'
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
    components: {SlideBox},
    destroyed () {}
  }
</script>
