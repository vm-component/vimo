<template>
  <Page>
    <!--<Header>-->
      <!--<Navbar>-->
        <!--<Title>Tabs</Title>-->
      <!--</Navbar>-->
      <!--<Toolbar>-->
        <!--<Searchbar></Searchbar>-->
      <!--</Toolbar>-->
    <!--</Header>-->
    <Tabs :tabsHighlight="true" tabsLayout="icon-top" tabsPlacement="bottom">
      <router-view></router-view>
      <Tab slot="tab" :to="{name:'tabs.tab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger" tabIcon="person"></Tab>
      <Tab slot="tab" :to="{name:'tabs.tab2'}" tabBadge="2"  tabTitle="Cars" tabBadgeStyle="dark" tabIcon="car"></Tab>
      <Tab slot="tab" :to="{name:'tabs.tab3'}" tabBadge="7"  tabTitle="Star" tabIcon="star" :enabled="true"></Tab>
    </Tabs>
  </Page>
</template>
<style scoped lang="scss">

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
    mounted () {},
    activated () {},
    components: {}
  }
</script>
