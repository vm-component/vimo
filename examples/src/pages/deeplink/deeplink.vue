<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Deeplink</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>简介</h5>

            <p>Deeplink用于跳转到原生App的方法, 如果安装了App则启动app并跳转, 如果没安装app则进入下载页面. 我这里只安装了知乎和网易新闻, 没安装Twitter. </p>

            <h5>原理</h5>
            <p>
                目前主流的H5跳转APP(知乎/网易新闻)都是使用的window.location.href进行的. 在IOS中使用Universal Links, 在Android中使用URL Scheme方案. 且Universal Links指向的页面都为下载引导页.</p>
            <p>此外, IOS的跳转很流畅, 但是Android的实现相对不太好. 因为会出现下载链接的提示. 通过设置setTimeout的解决方式不能完全解决问题, 故上面两个平台都未处理. 如果处理的话, 监听页面visibilitychange等事件接触定时器即可. </p>

            <h5>示例</h5>
            <p>知乎: JS判断APP是否安装?</p>
            <Grid no-padding>
                <Row>
                    <Column>
                        <Button small outline @click="viewInZhihuApp">在知乎App中浏览</Button>
                    </Column>
                </Row>
            </Grid>

            <p>网易新闻: 刘强东力挺顺丰：我相信王卫为人，质疑菜鸟违法</p>
            <Grid no-padding>
                <Row>
                    <Column>
                        <Button small outline @click="viewInNetEaseApp">在网易新闻中浏览</Button>
                    </Column>
                </Row>
            </Grid>
        </Content>
    </Page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  import './visibly'
  export default{
    name: 'name',
    data () {
      return {
        timer: null
      }
    },
    methods: {
      viewInZhihuApp () {
        this.toAppOrDownload({
          urlScheme: 'zhihu://questions/34831949?utm_campaign=ge19&utm_content=m_banner',
          universalLinks: 'https://oia.zhihu.com/questions/34831949?utm_campaign=ge19'
        })
      },
      viewInNetEaseApp () {
        this.toAppOrDownload({
          urlScheme: 'newsapp://doc/CLU0M6DS00097U7R?s=sps_ulink&ss=sps_article',
          universalLinks: 'http://m.163.com/newsapp/applinks.html?path=%2Fdoc%2FCLU0M6DS00097U7R&s=sps_ulink&ss=sps_article'
        })
      },

      /**
       * 跳转到app或者下载
       * 尝试进入app, 如果超时(1000)则进入下载引导页, 在下载引导页中操作下载还是在外部浏览器中打开
       * */
      toAppOrDownload (options) {
        if (this.$platform.is('android') || (this.$platform.is('ios') && this.$platform.version().major < 9)) {
          window.location.href = options.urlScheme
          this.timer = window.setTimeout(() => {
            window.location.href = options.universalLinks
          }, 1000)

          // 如果跳转了则清除setTimeout
          window.visibly.onHidden(() => {
            window.clearTimeout(this.timer)
          })
        } else {
          window.location.href = options.universalLinks
        }
      }
    },
    created () {
    },
    mounted () {
    },
    props: {},
    watch: {},
    computed: {},
    activated () {},
    deactivate () {},
    components: {},
    destroyed () {}
  }
</script>
