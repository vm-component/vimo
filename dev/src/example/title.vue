<template>
    <Page>
        <Header>
            <Navbar ref="navbar">
                <Title ref="title" @onTitleClick="onTitleClickHandler">TitleTitleTitleTitleTitleTitleTitle</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" padding>
            <h5>简介</h5>

            <Button block @click="onlyChangeTheTitle">只改变当前Title</Button>
            <Button block @click="changeTitleForBoth">同时改变DocumentTitle</Button>

            <p>也可以将文字的title改成图片，用于伪造搜索、Logo、活动图片等场景</p>
            <Button block @click="setTitleWithSearchImg">改成搜索</Button>
            <Button block @click="setTitleWithLogoImg">改成Vue Logo</Button>

            <p>设置Navbar</p>
            <Button block @click="setBackgroundColor">改变背景颜色</Button>
            <Button block @click="setBorderBottomColor">改变底边框颜色</Button>
            <Button block @click="reset">重置</Button>


        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .main {

    }
</style>
<script type="text/javascript">
  export default{
    data () {
      return {}
    },
    watch: {},
    computed: {
      titleComponent () {
        return this.$refs.title
      },
      navbarComponent () {
        return this.$refs.navbar
      }
    },
    methods: {
      onlyChangeTheTitle () {
        this.titleComponent.setTitle('只改变组件', false)
      },
      changeTitleForBoth () {
        this.titleComponent.setTitle('同时改变')
      },
      setTitleWithSearchImg () {
        this.titleComponent.setTitle({
          image: 'https://zos.alipayobjects.com/rmsportal/jFCQxeOXeKTQUfhrQFOo.png'
        })
      },
      setTitleWithLogoImg () {
        this.titleComponent.setTitle({
          image: 'http://cn.vuejs.org/images/logo.png'
        })
      },
      reset () {
        this.titleComponent.reset()
        this.navbarComponent.reset()
      },
      onTitleClickHandler () {
        alert('点击了标题，如果是图片则会有跳转的需求')
      },
      setBackgroundColor () {
        this.navbarComponent.setBackgroundColor('#000')
      },
      setBorderBottomColor () {
        this.navbarComponent.setBorderBottomColor('#000')
      }
    },
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
