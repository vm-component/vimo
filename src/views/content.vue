<template>
  <Page>
    <Header>
      <Navbar>
        <Title slot="content" title="Content"></Title>
      </Navbar>
    </Header>

    <Content :fullscreen="fullscreenVal" padding>
      <h3 slot="fixed">normal组件：</h3>
      <h3 slot="fixedTop">fixTop组件：</h3>
      <h3 slot="fixedBottom">fixBottom组件：</h3>

      <p>
        业务部分的页面内容就是在此完成的，除去Header部分到最下面都欧式content的内容
      </p>

      <p>
        包括固定部分(fixedContent)和可滚动部分(scrollContent)，scrollContent为默认的内容放置区域，fixedContent需要使用slot命名插槽：fixed
      </p>


      <Button type="block" @click="setTitle('Hello Vue')">点击设置Title='Hello Vue'</Button>

      <Button type="block" @click="scrollToBottom()">滚动到底部</Button>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <Button @click="$keyBoardOpen()" type="">打开键盘的Padding</Button>
      <Button @click="$keyBoardClose()" type="">关闭键盘的Padding</Button>

      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>

      <Button type="block" @click="scrollToTop()">返回顶部</Button>

s
    </Content>

    <Footer>
      <Toolbar>
        <!--<Title slot="content" title="ion-app test"></Title>-->
      </Toolbar>
    </Footer>


  </Page>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        fullscreenVal: false
      }
    },
    watch: {},
    computed: {},
    methods: {
      setTitle(val){
        this.$content.setTitle(val)
      },
      scrollToTop: function () {
        this.$content.scrollToTop();
      },
      scrollToBottom: function () {
        this.$content.scrollToBottom();
      }
    },
    created: function () {

    },
    mounted: function () {
    },
    activated: function () {
    },
    components: {}
  }
</script>
