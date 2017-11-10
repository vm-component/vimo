<template>
    <Page>
        <Header>
            <Toolbar>
                <Title>Modal中跳转</Title>
                <Buttons right slot="buttons">
                    <Button role="bar-button" type="solid" @click="$modal.dismiss()">
                        关闭
                    </Button>
                </Buttons>
            </Toolbar>
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
    computed: {},
    methods: {
      toPage (route) {
        this.$modal.dismiss().then(() => {
          this.parentRouter.push(route)
        })
      }
    },
    created () {},
    activated () {},
    deactivate () {},
    components: {},
    destroyed () {}
  }
</script>
<style scoped lang="less">

</style>
