<template>
    <Page>
        <Header>
            <Navbar color="primary">
                <Title ref="title">Content</Title>

                <!--start-->
                <Buttons start slot="button">
                    <Button icon-only role="bar-button">
                        <Icon class="icon" name="contact"></Icon>
                    </Button>
                </Buttons>
                <Buttons start slot="button">
                    <Button icon-only role="bar-button">
                        <Icon class="icon" name="search"></Icon>
                    </Button>
                </Buttons>
                <!--start-->
                <Buttons end slot="button">
                    <Button icon-only role="bar-button">
                        <Icon class="icon" name="more"></Icon>
                    </Button>
                </Buttons>
            </Navbar>
            <Toolbar color="primary">
                <!--content-->
                <Segment v-model="relationship9" slot="content"  color="light">
                    <SegmentButton value="friend1"> friend1</SegmentButton>
                    <SegmentButton value="friend2"> friend2</SegmentButton>
                    <SegmentButton value="friend3">friend3</SegmentButton>
                </Segment>
            </Toolbar>
        </Header>

        <Content :fullscreen="fullscreenVal" padding ref="content">
            <h1>这个是 h1 标签</h1>
            <h2>这个是 h2 标签</h2>
            <h3>这个是 h3 标签</h3>
            <h4>这个是 h4 标签</h4>
            <h5>这个是 h5 标签</h5>
            <p>这个是 p 标签</p>
            <span>这个是 span 标签</span>
            <a href="http://xiangsongtao.com" target="_blank">跳转到我的首页</a>

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

        <Footer>
            <Toolbar>
                <Title>Footer</Title>
            </Toolbar>
        </Footer>

    </Page>
</template>
<style scoped lang="scss">
</style>
<script type="text/ecmascript-6">
  import { Segment, SegmentButton } from 'vimo/components/segment'
  export default{
    data(){
      return {
        fullscreenVal: false,
        contentDimensions: null,
        scrollDimensions: null,
        relationship9: 'friend1'
      }
    },
    watch: {},
    computed: {
      content(){
        return this.$refs.content
      },
      title(){
        return this.$refs.title
      },
    },
    methods: {
      setTitle(val){
        this.title.setTitle(val)
      },
      scrollToTop () {
        this.content.scrollToTop();
      },
      scrollToBottom () {
        this.content.scrollToBottom();
      },
      refreshContentDimensions(){
        return this.contentDimensions = this.content.getContentDimensions()
      }
    },
    created () {

    },
    mounted () {
      this.refreshContentDimensions();
      this.content.$on('onScroll', (ev) => {
        console.debug('--------------')
        console.debug('onScroll')
        console.log('scrollTop:' + ev.scrollTop)
        console.log('directionY:' + ev.directionY)
      })
    },
    activated () {
    },
    components: {Segment, SegmentButton}
  }
</script>
