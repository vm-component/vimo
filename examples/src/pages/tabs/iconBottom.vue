<template>
    <Page>
        <Header>
            <Navbar>
                <Title>ICON在底部</Title>
            </Navbar>
        </Header>
        <Tabs tabsLayout="icon-bottom" tabsPlacement="bottom" color="dark">
            <router-view></router-view>
            <Tab slot="tab" :to="{name:'iconBottom.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger"
                 tabIcon="person"></Tab>
            <Tab slot="tab" :to="{name:'iconBottom.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="light"
                 tabIcon="car"></Tab>
            <Tab slot="tab" :to="{name:'iconBottom.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star"
                 :enabled="true"></Tab>
        </Tabs>
    </Page>
</template>
<style scoped lang="less"></style>
<script type="text/javascript">
  export default{
    name: 'name'
  }
</script>
