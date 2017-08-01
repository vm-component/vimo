<template>
    <Page>
        <Header>
            <Navbar>
                <Title>History</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>简介</h5>

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
                    <Column col-2 >{{index}}</Column>
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
  export default{
    name: 'name',
    data () {
      return {
        history: this.$history._h
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {
    },
    activated () {},
    components: {}
  }
</script>
