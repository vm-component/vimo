<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Demo</Title>
      </Navbar>
      <Searchbar :animated="true"
                 :debounce="1000"
                 mode="ios"
                 color="danger"
                 :showCancelButton="true"
                 cancelButtonText="取消"></Searchbar>
    </Header>
    <Content padding>
      <Button type="block">Button</Button>
    </Content>
    <Footer>
      <Toolbar>
        <Title>Footer</Title>
      </Toolbar>
    </Footer>

  </Page>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
