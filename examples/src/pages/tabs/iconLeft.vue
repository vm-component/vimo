<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>ICON在左边</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-tabs tabsLayout="icon-left" tabsPlacement="bottom">
            <router-view></router-view>
            <vm-tab slot="tab" :to="{name:'iconLeft.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger"
                 tabIcon="person"></vm-tab>
            <vm-tab slot="tab" :to="{name:'iconLeft.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="dark"
                 tabIcon="car"></vm-tab>
            <vm-tab slot="tab" :to="{name:'iconLeft.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star"
                 :enabled="true"></vm-tab>
        </vm-tabs>
    </vm-page>
</template>
<style scoped lang="less"></style>
<script type="text/javascript">
  export default {
    data () {
      return {}
    }
  }
</script>
