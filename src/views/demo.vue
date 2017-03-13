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
        <input class="inputDemo" placeholder="1234">
      </Toolbar>
    </Footer>

  </Page>
</template>
<style scoped lang="scss">
  .inputDemo {
    font-size: 16px;
    position: relative;
    bottom:0;

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
