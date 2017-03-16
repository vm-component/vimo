<template>
  <Page>
    <Header>
      <Toolbar>
        <Title>Tabs Bottom</Title>
      </Toolbar>
    </Header>
    <Tabs tabsLayout="icon-top" tabsPlacement="top">
      <router-view></router-view>
      <Tab slot="tab" :to="{name:'tabsTop.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger"
           tabIcon="person"></Tab>
      <Tab slot="tab" :to="{name:'tabsTop.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="dark" tabIcon="car"></Tab>
      <Tab slot="tab" :to="{name:'tabsTop.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star" :enabled="true"></Tab>
    </Tabs>
  </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/ecmascript-6">
  export default{
    name: 'name',
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>
