<template>
    <Page>
        <Header>
            <Navbar>
                <Title>下划线</Title>
            </Navbar>
        </Header>
        <Tabs mode="md" :tabsHighlight="true" tabsLayout="icon-top" tabsPlacement="bottom">
            <router-view></router-view>
            <Tab slot="tab" :to="{name:'tabHighLight.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger"
                 tabIcon="person"></Tab>
            <Tab slot="tab" :to="{name:'tabHighLight.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="dark"
                 tabIcon="car"></Tab>
            <Tab slot="tab" :to="{name:'tabHighLight.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star"
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
