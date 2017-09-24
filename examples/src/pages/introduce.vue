<template>
    <Page>
        <Header>
            <Navbar>
                <Title>介绍</Title>
            </Navbar>
        </Header>
        <Content padding>

            <h5>很高兴你能找到这</h5>
            <p>Vimo框架用于在Hybrid平台中开发各类H5微应用，开发框架是为了更好的解决 <strong>组件、业务、平台</strong> 三者的关系. </p>

            <h5>组件</h5>
            <p>
                一般在开发微应用时，都会去网上找相应的组件库或者UI库进行修改开发，但是就目前来说组件质量良莠不齐，有些组件虽然有大厂在站台，但是细读代码会发现实现丑陋。假如Vue就是一把手枪，有些人选择用它砸人，我选择扣动扳机。组件在实现上参考了IONIC和Mint两个库，并且在重复阅读源码的基础上进行组件开发，目前常用的组件已开发完毕，且已在业务中实践。</p>

            <h5>业务</h5>
            <p>
                因为H5微应用的页面结构特殊，且功能简单，因此使用Vue的组件化可以规范页面书写。Vimo的页面类似于三明治结构，Header用于放置在顶部呈现的内容；Content组件用于主内容的呈现，可以是滚动内容也可以是固定内容；Footer组件和Header组件类似，用于放置底部不随滚动的内容。除了特殊排版的内容，其余都可通过组件组合的形式开发，节省开发时间。</p>

            <h5>平台</h5>
            <p>
                由于H5的移植特性，只要App中嵌入了浏览器组件就能打开H5应用，因此制作的H5应用可在微信、支付宝、钉钉、自制WebView、各类公共平台等各类浏览器中运行，也可以根据平台展现不同的UI。也正因为如此，需要规范各个平台的原生化组件的调用，否则我们的业务中就要充斥各类平台判断的if-else代码，增加后期维护、构建大型应用的难度。</p>

            <h5>最后</h5>
            <p>目前Vimo还在开发，debug和优化也在持续进行，如果有好的建议或者期望在业务中使用，希望能联系我。</p>
        </Content>
    </Page>
</template>
<style scoped lang="less">
    .main {

    }
</style>
<script type="text/javascript">
  export default{
    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
