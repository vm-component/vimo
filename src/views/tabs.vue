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
    <Tabs mode="ios" :isKeepAlive="false" :tabsHighlight="false" tabsLayout="icon-top" tabsPlacement="bottom">
      <Tab to="{name:'tabs.tab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger" tabIcon="person"></Tab>
      <Tab to="{name:'tabs.tab2'}" tabBadge="2"  tabTitle="Cars" tabBadgeStyle="dark" tabIcon="car"></Tab>
      <Tab to="{name:'tabs.tab3'}" tabBadge="7"  tabTitle="Star" tabIcon="star" :enabled="true"></Tab>
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
