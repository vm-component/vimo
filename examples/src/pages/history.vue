<template>
    <Page>
        <Header>
            <Navbar>
                <Title>History</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>简介</h5>

            route: {{$route.params.id}} - {{$route.query.name}}

            <!--<a href="https://www.baidu.com" target="_blank">baidu _blank</a>-->
            <!--<a href="https://www.baidu.com" target="_parent">baidu _parent</a>-->
            <!--<a href="https://www.baidu.com" target="_self">baidu _self</a>-->
            <!--<a href="https://www.baidu.com" target="_top">baidu _top</a>-->


            <!--<Button block @click="pushWindow">pushWindow 淘宝</Button>-->
            <!--<Button block @click="appWindow">appWindow app</Button>-->
            <Button block @click="replace()">$router.replace()</Button>
            <Button block @click="back">使用back()</Button>
            <Button block @click="go(-1)">使用go(-1)</Button>
            <Button block @click="go(-2)">使用go(-2)</Button>
            <Button block @click="toRoot">返回首页</Button>


            <p>该组件维护了一个本地历史记录, 并且根据导航状态判断当前是前进还是后退, 因为App的导航需要和手机浏览器的导航功能效果一致.</p>

            <h5>常用函数</h5>
            <Grid>
                <Row>
                    <Column col-4>getDirection(): </Column>
                    <Column col-8>获取当前页面是前进进入还是后退进入</Column>
                </Row>
                <Row>
                    <Column col-4>canGoBack(): </Column>
                    <Column col-8>是否能后退</Column>
                </Row>
                <Row>
                    <Column col-4>toRoot(): </Column>
                    <Column col-8>返回首页</Column>
                </Row>
            </Grid>


            <h5>当前状态</h5>

            <Grid>
                <Row>
                    <Column col-4>getDirection(): </Column>
                    <Column col-8>{{$history.getDirection()}}</Column>
                </Row>
                <Row>
                    <Column col-4>canGoBack(): </Column>
                    <Column col-8>{{$history.canGoBack()}}</Column>
                </Row>
            </Grid>


            <h5>当前堆栈</h5>

            <Grid>
                <Row>
                    <Column col-2>NO.</Column>
                    <Column col-10>INFO</Column>
                </Row>
                <Row v-for="(item,index) in history" :key="index" justify-content-center align-items-center>
                    <Column col-2>{{index}}</Column>
                    <Column col-10>
                        <div><strong>name: </strong>{{item.name}}</div>
                        <div><strong>fullPath: </strong>{{item.fullPath}}</div>
                    </Column>
                </Row>
            </Grid>


        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  export default {
    name: 'name',
    data () {
      return {
        history: this.$history.getHistory()
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      replace () {
        this.$router.replace({
          name: this.$route.name,
          query: {
            name: Math.floor(Math.random()*10)
          },
          params: {
            id: Math.floor(Math.random()*10)
          }
        })
      },
      back () {
        this.$router.back()
      },
      go (index) {
        this.$router.go(index)
      },
//      pushWindow () {
//        AlipayJSBridge.call('pushWindow', {
//          url: 'https://m.taobao.com/',
//          param: {
//            readTitle: true,
//            showOptionMenu: false
//          }
//        })
//      },
//      appWindow () {
//        AlipayJSBridge.call('pushWindow', {
//          url: '#/app',
//          param: {
//            readTitle: true,
//            showOptionMenu: false
//          }
//        })
//      },
      toRoot () {
        this.$history.toRoot()
      }
    },
    created () {},
    mounted () {
    },
    activated () {},
    components: {}
  }
</script>
