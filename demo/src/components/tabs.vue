<template>
    <Page>
        <Content>
            <router-view/>
        </Content>
        <Footer>
            <Tabs :tabsLayout="tabsLayout" tabsHighlight>
                <Tab :routerType="routerType" :to="{name:'tabs.index'}" :tabBadge="tabBadge1" tabTitle="User" tabBadgeStyle="danger"
                     tabIcon="person"></Tab>
                <Tab :routerType="routerType" :to="{name:'tabs.tab1'}" :tabBadge="tabBadge2" tabTitle="Cars" tabBadgeStyle="dark"
                     tabIcon="car"></Tab>
                <Tab :routerType="routerType" :to="{name:'tabs.tab2'}" :tabBadge="tabBadge3" tabTitle="Star" tabIcon="star"
                     :disabled="false"></Tab>
            </Tabs>
        </Footer>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        timer: null,
        tabsLayout: 'icon-top',
        routerType: 'replace',
        tabBadge1: 1,
        tabBadge2: 2,
        tabBadge3: 3
      }
    }
  }
</script>
