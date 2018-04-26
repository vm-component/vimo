<template>
    <Page>
        <Header ref="header">
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content fullscreen padding class="outer-content" ref="content" @onScroll="onScrollHandler">
            <p>
                <strong>ps: {{$t('notice')}}</strong>
            </p>
            <Grid no-padding>
                <Row justify-content-around align-items-center no-padding>
                    <Button outline small @click="hideHeader">{{$t('hideOrShow')}} Header</Button>
                    <Button outline small @click="hideFooter">{{$t('hideOrShow')}} Footer</Button>
                    <Button outline small @click="hideBoth">{{$t('both')}}</Button>
                </Row>
            </Grid>
            <section>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam
                    neque
                    nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>

            </section>
        </Content>
        <Footer ref="footer">
            <Toolbar>
                <Title>Footer</Title>
            </Toolbar>
        </Footer>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  export default {
    name: 'DemoContentHideBars',
    i18n: {
      messages: {
        'zh-CN': {
          title: '隐藏Bars',
          notice: '如果在微信/支付宝/钉钉模式下, 可能看不到Header的效果.',
          hideOrShow: '显/隐',
          both: '同时 显/隐'
        },
        'en-US': {
          title: 'Hide Header/Footer',
          notice: 'If you are in WeChat/Alipay/Stick mode, you may not see the effect of Header.',
          hideOrShow: 'Show/Hide',
          both: 'Both Show/Hide'
        }
      }
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
    }
  }
</script>
