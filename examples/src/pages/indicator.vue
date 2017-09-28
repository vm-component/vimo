<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Indicator</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h1>Indicator组件</h1>
            <p>Loading的简单版, 用于无提示的Loading使用场景, 且开启最多存在10s, 10s后自动关闭.</p>
            <p>如果路由切换则关闭组件</p>
            <Button block @click="openIndicatorInfinity">Open infinity(max 10s)</Button>
            <Button block @click="openIndicator1000">Open 1000ms</Button>
            <Button block @click="openIndicatorReverse1000">Open 1000ms In Reverse Color</Button>
            <Button block @click="openIndicator300">Open 300ms</Button>
            <Button block @click="openIndicator100">Open 100ms</Button>
            <Button block @click="openIndicator20">Open 20ms</Button>
        </Content>
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
    methods: {
      openIndicatorInfinity () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 10000)
      },

      openIndicator1000 () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 1000)
      },

      openIndicatorReverse1000 () {
        this.$indicator.present(true)
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 1000)
      },

      openIndicator300 () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 300)
      },

      openIndicator100 () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 100)
      },
      openIndicator20 () {
        this.$indicator.present()
        setTimeout(() => {
          this.$indicator.dismiss()
        }, 20)
      }
    },
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
