<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Tabs</Title>
      </Navbar>
      <Toolbar>
        <Searchbar></Searchbar>
      </Toolbar>
    </Header>
    <Tabs mode="md" :isKeepAlive="false" color="dark" :tabsHighlight="true" tabsLayout="icon-top" tabsPlacement="bottom">
      <Tab to="{name:'tabs.tab1'}" tabBadge="10" tabTitle="tab1" tabBadgeStyle="danger" tabIcon="fa-user"></Tab>
      <Tab to="{name:'tabs.tab2'}" tabBadge="2"  tabTitle="tab2" tabBadgeStyle="light" tabIcon="fa-car"></Tab>
      <Tab to="{name:'tabs.tab3'}" tabBadge="7"  tabIcon="fa-star" :enabled="true"></Tab>
    </Tabs>
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
    created () {},
    mounted () {
      console.debug('****demo/tabs.vue页面****')
      console.log(this)
      console.log(this.$tabs)
    },
    activated () {},
    components: {}
  }
</script>
