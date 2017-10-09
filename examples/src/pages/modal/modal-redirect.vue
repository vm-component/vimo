<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Modal中跳转</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <p>Content</p>

            <Button @click="toPage({name:'alert'})">Go to Alert Page</Button>
            <Button @click="toPage({name:'actionSheet'})">Go to ActionSheet Page</Button>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'ModalRedirect',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {
      $router () {
        return this.$options.$data && this.$options.$data.$router
      }
    },
    methods: {
      toPage (route) {
        this.$modal.dismiss().then(() => {
          this.$router.push(route)
        })
      }
    },
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    components: {},
    destroyed () {}
  }
</script>
<style scoped lang="less">

</style>
