<template>
    <Page>
        <Header>
            <Navbar>
                <Title>SlideBox</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>简述</h5>
            <p>这是一个仿照淘宝注册的一个验证组件, 向右滑动到底部意味着用户确认协议可以继续向下进行.</p>
            <h5>示例</h5>
            <SlideBox @onSlideEnd="onSlideEndHandler"></SlideBox>
            <p>继续操作即视为同意 <a href="#">淘宝服务协议</a>, <a href="#">法律声明及隐私权政策</a>和 <a href="#">支付宝协议</a>, 系统将同步为您创建支付宝账户</p>

            <h5>其他示例</h5>
            <p>组件一共有以下几种状态, 且状态只能维持其一, 且 <strong>checking/cancelling/completing/failing</strong> 状态的切换由业务控制. </p>
            <ul>
                <li>inactive(初始状态)</li>
                <li>sliding(滑动状态)</li>
                <li>checking(正在验证)</li>
                <li>cancelling(释放状态)</li>
                <li>completing(验证通过状态)</li>
                <li>failing(验证失败状态)</li>
            </ul>

            <p>向右滑动进入验证状态, 1s后重置</p>
            <SlideBox @onSlideEnd="onSlideEndHandler"></SlideBox>

            <p>向右滑动等待1s后验证成功</p>
            <SlideBox @onSlideEnd="onSlideEndHandler1"></SlideBox>

            <p>向右滑动等待1s后验证失败, 之后返回</p>
            <SlideBox @onSlideEnd="onSlideEndHandler2"></SlideBox>
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
    methods: {
      // 向右滑动进入验证状态, 4s后重置
      onSlideEndHandler (ins) {
        ins.checking()
        setTimeout(() => {
          ins.cancel()
        }, 1000)
      },
      // 向右滑动等待1s后验证成功
      onSlideEndHandler1 (ins) {
        ins.checking()
        setTimeout(() => {
          ins.complete()
        }, 1000)
      }, // 向右滑动等待1s后验证失败
      onSlideEndHandler2 (ins) {
        ins.checking()
        setTimeout(() => {
          ins.fail()
          setTimeout(() => {
            ins.cancel()
          }, 1000)
        }, 1000)
      }
    },
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    destroyed () {}
  }
</script>
