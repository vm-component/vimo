<template>
  <Page>
    <Header>
      <Navbar>
        <Title slot="content" title="Content"></Title>
      </Navbar>
    </Header>

    <Content :fullscreen="fullscreenVal" padding>
      <!--<h3 slot="fixedTop" text-center>这里插播一条广告</h3>-->
      <!--<h3 slot="fixedBottom" text-center>可以把我当成歌词</h3>-->

      <p>Vimo的页面结构分为三明治结构的, Content就在中间, 业务部分的页面内容就是在此完成的，除去Header部分到最下面都是content的内容.
      </p>

      <p>
        包括固定部分(fixedContent)和可滚动部分(scrollContent)，scrollContent为默认的内容放置区域，fixedContent需要使用slot命名插槽：fixed
      </p>


      <h4>这个是标题</h4>

      <Button type="block" @click="setTitle('Hello Vue')">点击设置Title='Hello Vue'</Button>

      <Button type="block" @click="scrollToBottom()">滚动到底部</Button>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
        exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
        exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
        exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
        exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
        exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
        exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
        exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
        exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
        exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>

      <Button type="block" @click="scrollToTop()">返回顶部</Button>

      <p>{{contentDimensions}}</p>
      <Button type="block" @click="refreshContentDimensions()">点击更新Content尺寸</Button>

    </Content>

    <!--<Footer>-->
    <!--<Toolbar>-->
    <!--<Title>Footer</Title>-->
    <!--</Toolbar>-->
    <!--</Footer>-->


  </Page>
</template>
<style scoped lang="scss">
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        fullscreenVal: false,

        contentDimensions: null,
        scrollDimensions: null,
      }
    },
    watch: {},
    computed: {},
    methods: {
      setTitle(val){
        this.$nav.setTitle(val)
      },
      scrollToTop () {
        this.$content.scrollToTop();
      },
      scrollToBottom () {
        this.$content.scrollToBottom();
      },
      refreshContentDimensions(){
        return this.contentDimensions = this.$content.getContentDimensions()
      },
    },
    created () {},
    mounted () {
      console.info('content mounted this');
      console.info(this);
      const _this = this;

      _this.refreshContentDimensions();

      // this.$eventBus.$on('onScrollStart', function (ev) {
      //   console.debug('--------------')
      //   console.debug('onScrollStart')
      //   console.log('scrollTop:' + ev.scrollTop)
      //   console.log('directionY:' + ev.directionY)
      // })
      this.$eventBus.$on('onScroll', function (ev) {
        console.debug('--------------')
        console.debug('onScroll')
        console.log('scrollTop:' + ev.scrollTop)
        console.log('directionY:' + ev.directionY)
      })
      // this.$eventBus.$on('onScrollEnd', function (ev) {
      //   console.debug('--------------')
      //   console.debug('onScrollEnd')
      //   console.log('scrollTop:' + ev.scrollTop)
      //   console.log('directionY:' + ev.directionY)
      // })

    },
    activated () {
    },
    components: {}
  }
</script>
