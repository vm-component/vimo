<template>
    <Page>
        <Header>
            <Navbar>
                <Title ref="title">{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" ref="content" padding
                 @onScrollStart="onScrollStartHandler"
                 @onScrollEnd="onScrollEndtHandler"
                 @onScroll="onScrollHandler">

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aut dignissimos, eum impedit maxime natus necessitatibus quas qui quidem
                repellendus sapiente tempore. Aspernatur excepturi harum laborum quasi? Ab eius, excepturi?</p>
            <Button block @click="scrollToBottom()">{{$t('scrollToBottom')}}</Button>
            <Button block @click="scrollBottomBy400()">{{$t('scrollTo400')}}</Button>
            <Button block @click="scrollToElement">{{$t('scrollToEle')}}</Button>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
                exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
                exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
                exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
                exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
                exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
                exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
                exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
                exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda deserunt dicta dolorem dolorum ea est
                exercitationem, fugit hic ipsa maiores minus molestias non quaerat quas ratione ut vel velit!</p>
            <p>
                <strong id="scrollToHere" style="color:red;">{{$t('thisEl')}}</strong>
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus eligendi eos harum in incidunt natus optio quos, ratione. Aperiam aut autem
                commodi dolores error fugiat ipsa officia rem similique tempore.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus eligendi eos harum in incidunt natus optio quos, ratione. Aperiam aut autem
                commodi dolores error fugiat ipsa officia rem similique tempore.</p>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus eligendi eos harum in incidunt natus optio quos, ratione. Aperiam aut autem
                commodi dolores error fugiat ipsa officia rem similique tempore.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus eligendi eos harum in incidunt natus optio quos, ratione. Aperiam aut autem
                commodi dolores error fugiat ipsa officia rem similique tempore.</p>
            <Button block @click="scrollToTop()">{{$t('scrollToTop')}}</Button>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet consequatur doloribus earum ex exercitationem expedita facere fugit hic, ipsam,
                ipsum labore, magnam nam odio pariatur quod sit ut veniam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet consequatur doloribus earum ex exercitationem expedita facere fugit hic, ipsam,
                ipsum labore, magnam nam odio pariatur quod sit ut veniam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet consequatur doloribus earum ex exercitationem expedita facere fugit hic, ipsam,
                ipsum labore, magnam nam odio pariatur quod sit ut veniam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet consequatur doloribus earum ex exercitationem expedita facere fugit hic, ipsam,
                ipsum labore, magnam nam odio pariatur quod sit ut veniam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet consequatur doloribus earum ex exercitationem expedita facere fugit hic, ipsam,
                ipsum labore, magnam nam odio pariatur quod sit ut veniam.</p>

            <section slot="fixed-bottom" class="stateBar">
                <Grid no-padding>
                    <Row no-padding v-if="ev">
                        <Column>
                            <strong text-danger>{{$t('scrollState')}}:</strong>
                            <p>ScrollTop: {{ev.scrollTop}}</p>
                            <p>scrollHeight: {{ev.scrollHeight}}</p>
                            <p>scrollWidth: {{ev.scrollWidth}}</p>
                            <p>deltaY: {{ev.deltaY}}</p>
                            <p>velocityY: {{parseInt(ev.velocityY * 1000) / 1000}}</p>
                            <p>directionY: {{ev.directionY}}</p>
                        </Column>
                        <Column>
                            <strong>{{$t('inherentProp')}}:</strong>
                            <p>{{$t('scrollState')}}: <strong>{{scrollState}}</strong></p>
                            <p>contentTop: {{ev.contentTop}}</p>
                            <p>contentHeight: {{ev.contentHeight}}</p>
                            <p>contentBottom: {{ev.contentBottom}}</p>
                        </Column>
                    </Row>
                </Grid>
            </section>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

    .stateBar {
        background: rgba(256, 256, 256, 0.9);
        padding: 10px 20px;
        bottom: 0;
        width: 100%;
        p {
            margin: 5px 0;
        }
    }
</style>
<script type="text/javascript">
  export default {
    name: 'ContentScroll',
    i18n: {
      messages: {
        'zh-CN': {
          title: '滚动内容',
          scrollToBottom: '滚动到底部',
          scrollToTop: '返回顶部',
          scrollTo400: '向下滚动400',
          scrollToEle: '滚动到下面的元素',
          thisEl: '滚动到的就是这个元素',
          scrollState: '滚动状态',
          inherentProp: '固有属性',
          scrollStart: '滚动开始',
          scrolling: '滚动中...',
          scrollEnd: '滚动结束'
        },
        'en-US': {
          title: 'Scroll Content',
          scrollToBottom: 'Scroll To Bottom',
          scrollToTop: 'Scroll To Top',
          scrollTo400: 'Scroll To 400',
          scrollToEle: 'Scroll To The Ele',
          thisEl: 'Scroll to this element',
          scrollState: 'Scroll State',
          inherentProp: 'Inherent property',
          scrollStart: 'Scroll Start',
          scrolling: 'Scrolling...',
          scrollEnd: 'Scroll End'
        }
      }
    },
    data () {
      return {
        scrollState: '',
        // scroll
        ev: {
          scrollTop: 0,
          directionY: 'down'
        }
      }
    },
    watch: {},
    computed: {
      contentComponent () {
        return this.$refs.content
      },
      titleComponent () {
        return this.$refs.title
      }
    },
    methods: {
      setTitle (val) {
        this.titleComponent.setTitle(val)
      },
      scrollToTop () {
        this.contentComponent.scrollToTop()
      },
      scrollToBottom () {
        this.contentComponent.scrollToBottom()
      },

      onScrollStartHandler (ev) {
        this.scrollState = this.$t('scrollStart')
      },
      // 滚动
      onScrollHandler (ev) {
        this.ev = ev
        this.scrollState = this.$t('scrolling')
      },
      onScrollEndtHandler (ev) {
        this.scrollState = this.$t('scrollEnd')
      },

      scrollBottomBy400 () {
        this.contentComponent.scrollBy(0, 400).then(function () {
          console.log('scrollBottomBy400 done')
        })
      },

      scrollToElement () {
        this.contentComponent.scrollToElement(document.getElementById('scrollToHere'), 300, null, true).then(function () {
          console.log('scrollToElement done')
        })
      }
    }
  }
</script>
