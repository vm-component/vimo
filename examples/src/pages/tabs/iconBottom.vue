<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>ICON在底部</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-tabs tabsLayout="icon-bottom" tabsPlacement="bottom" color="dark">
            <router-view></router-view>
            <vm-tab slot="tab" :to="{name:'iconBottom.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger"
                 tabIcon="person"></vm-tab>
            <vm-tab slot="tab" :to="{name:'iconBottom.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="light"
                 tabIcon="car"></vm-tab>
            <vm-tab slot="tab" :to="{name:'iconBottom.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star"
                 :enabled="true"></vm-tab>
        </vm-tabs>
    </vm-page>
</template>
<script type="text/javascript">
  export default{
    name: 'name'
  }
</script>
