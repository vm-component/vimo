<template>
    <Page>
        <Header>
            <Navbar>
                <Title>文本</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">

            <h1>这个是h1标签</h1>
            <h2>这个是h2标签</h2>
            <h3>这个是h3标签</h3>
            <h4>这个是h4标签</h4>
            <h5>这个是h5标签</h5>
            <h6>这个是h6标签</h6>
            <p>这个是p标签</p>
            <a href="http://xiangsongtao.com" target="_blank">跳转到我的首页</a>

            <Button block @click="$history.toRoot()">返回首页</Button>
            <hr>
            <!--<strong>strong</strong>-->
            <!--<i>i</i>-->
            <!--<b>b</b>-->

            <p>Vimo支持使用rem布局, 当然, 在写业务代码的时候使用px就好, 剩下是使用插件完成吧! </p>

            <strong>步骤:</strong>
            <ul>
                <li>在index.html文件中加上js脚本, 给html标签附上基础fontSize.</li>
                <li>在build/vue-loader.conf.js文件中将注释解开: postcss: [require('postcss-px2rem')({remUnit: 50})]</li>
            </ul>

        </Content>
        <Footer>
            <Toolbar>
                <Segment value="1">
                    <SegmentButton value="1">第一章</SegmentButton>
                    <SegmentButton value="2">第二章</SegmentButton>
                    <SegmentButton value="3">第三章</SegmentButton>
                </Segment>
            </Toolbar>
        </Footer>
    </Page>
</template>
<style scoped lang="less">
    .main {

    }
</style>
<script type="text/javascript">
  export default {
    name: 'context'
  }
</script>
