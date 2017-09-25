<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Spinner</Title>
            </Navbar>
        </Header>
        <Content padding>
            <h1>Spinner组件</h1>
            <p>嗯, 菊花图...</p>

            <h4>默认</h4>
            <Spinner></Spinner>
            <Spinner name="ios"></Spinner>
            <Spinner name="ios-small"></Spinner>
            <Spinner name="bubbles"></Spinner>
            <Spinner name="circles"></Spinner>
            <Spinner name="crescent"></Spinner>
            <Spinner name="dots"></Spinner>

            <h4>Mode</h4>
            <span>未指定</span>
            <Spinner></Spinner>
            <span>ios</span>
            <Spinner mode="ios"></Spinner>
            <span>md</span>
            <Spinner mode="md"></Spinner>
            <span>wp</span>
            <Spinner mode="wp"></Spinner>

            <h4>Color</h4>
            <Spinner></Spinner>
            <Spinner color="primary" name="ios"></Spinner>
            <Spinner color="secondary" name="ios-small"></Spinner>
            <Spinner color="light" name="bubbles"></Spinner>
            <Spinner color="dark" name="circles"></Spinner>
            <Spinner color="primary" name="crescent"></Spinner>
            <Spinner color="secondary" name="dots"></Spinner>

            <!--duration-->
            <h4>Duration 3000ms</h4>
            <Spinner duration="3000"></Spinner>
            <Spinner duration="3000" name="ios"></Spinner>
            <Spinner duration="3000" name="ios-small"></Spinner>
            <Spinner duration="3000" name="bubbles"></Spinner>
            <Spinner duration="3000" name="circles"></Spinner>
            <Spinner duration="3000" name="crescent"></Spinner>
            <Spinner duration="3000" name="dots"></Spinner>

            <!--paused-->
            <h4>Paused</h4>
            <Spinner :paused="true"></Spinner>
            <Spinner :paused="true" name="ios"></Spinner>
            <Spinner :paused="true" name="ios-small"></Spinner>
            <Spinner :paused="true" name="bubbles"></Spinner>
            <Spinner :paused="true" name="circles"></Spinner>
            <Spinner :paused="true" name="crescent"></Spinner>
            <Spinner :paused="true" name="dots"></Spinner>
        </Content>
    </Page>
</template>
<style lang="less">
</style>
<script type="text/javascript">
  export default{
    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {}
  }
</script>
