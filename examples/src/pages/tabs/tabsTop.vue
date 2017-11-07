<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Tabs在顶部</vm-title>
            </vm-navbar>
        </vm-header>
        <Tabs tabsLayout="icon-top" tabsPlacement="top">
            <router-view></router-view>
            <Tab slot="tab" :to="{name:'tabsTop.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger"
                 tabIcon="person"></Tab>
            <Tab slot="tab" :to="{name:'tabsTop.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="dark"
                 tabIcon="car"></Tab>
            <Tab slot="tab" :to="{name:'tabsTop.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star"
                 :enabled="true"></Tab>
        </Tabs>
    </vm-page>
</template>
<style scoped lang="less"></style>
<script type="text/javascript">
  export default{}
</script>
