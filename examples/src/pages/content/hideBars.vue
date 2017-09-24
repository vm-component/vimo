<template>
    <Page>
        <Header ref="header">
            <Navbar>
                <Title>隐藏头尾</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content" :fullscreen="true" ref="content" @onScroll="onScrollHandler">

            <h1>Section</h1>

            <p>这部分建议使用fullscreen模式, 如果不是的话, 上下被占位置的部分是不会去掉的. </p>
            <p>ps: 如果在微信/支付宝/钉钉模式下, 可能看不到Header的效果.</p>

            <Grid no-padding>
                <Row justify-content-around align-items-center no-padding>
                    <Button outline small @click="hideHeader">显/隐 Header</Button>
                    <Button outline small @click="hideFooter">显/隐 Footer</Button>
                    <Button outline small @click="hideBoth">同时 显/隐</Button>
                </Row>
            </Grid>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>

        </Content>
        <Footer ref="footer">
            <Toolbar>
                <Title>Footer</Title>
            </Toolbar>
        </Footer>
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
    computed: {
      headerComponent () {
        return this.$refs.header
      },
      footerComponent () {
        return this.$refs.footer
      },
      contentComponent () {
        return this.$refs.content
      }
    },
    methods: {
      hideHeader () {
        this.headerComponent.toggle()
      },
      hideFooter () {
        this.footerComponent.toggle()
      },
      hideBoth () {
        this.footerComponent.toggle()
        this.headerComponent.toggle()
      },
      onScrollHandler (ev) {
        if (ev.directionY === 'down' && ev.scrollTop > 0) {
          this.footerComponent.hide()
          this.headerComponent.hide()
        } else {
          this.footerComponent.show()
          this.headerComponent.show()
        }
      }
    },
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
