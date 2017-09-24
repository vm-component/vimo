<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Notice Bar</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <h4>简介</h4>
                <p>这是一个通知条. 如果长度超过容器的宽度时, 则会自动滚动. 此时设置的speed和delay将会在这个情况生效. 其中speed属性的单位是px/s</p>
            </div>
            <div padding>
                <h5>所有传参效果</h5>
            </div>
            <NoticeBar class="noticeBar">国庆节期间余额宝收益和转出到账时间调整到节后, 给您带来不便, 敬请谅解! </NoticeBar>
            <NoticeBar class="noticeBar" type="warn">
                国庆节期间余额宝收益和转出到账时间调整到节后, 给您带来不便, 敬请谅解! 
            </NoticeBar>
            <NoticeBar class="noticeBar" type="hide">
                国庆节期间余额宝收益和转出到账时间调整到节后, 给您带来不便, 敬请谅解! 
            </NoticeBar>
            <NoticeBar class="noticeBar" action="right">
                国庆节期间余额宝收益和转出到账时间调整到节后, 给您带来不便, 敬请谅解! 
            </NoticeBar>
            <NoticeBar class="noticeBar" action="hide">
                国庆节期间余额宝收益和转出到账时间调整到节后, 给您带来不便, 敬请谅解! 
            </NoticeBar>
            <NoticeBar class="noticeBar" type="hide" action="hide">
                国庆节期间余额宝收益和转出到账时间调整到节后, 给您带来不便, 敬请谅解!  
            </NoticeBar>
            <div padding>
                <h5>关闭回调</h5>
            </div>
            <NoticeBar :onDismiss="onDismissHandler">这是一个很简短的通知, 不会滚动</NoticeBar>
        </Content>
    </Page>
</template>
<style scoped lang="less">
    .noticeBar {
        margin-bottom: 10px;
    }
</style>
<script type="text/javascript">
  export default{
    name: 'notice-bar',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      onDismissHandler () {
        window.alert('这个NoticeBar关闭了')
      }
    },
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    destroyed () {}
  }
</script>
