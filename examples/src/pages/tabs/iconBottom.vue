<template>
    <Page>
        <Header>
            <Navbar>
                <Title>ICON在底部</Title>
            </Navbar>
        </Header>
        <Content>
            <router-view></router-view>
        </Content>
        <Footer>
            <Tabs tabsLayout="icon-bottom" color="dark">
                <Tab :to="{name:'iconBottom.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger"
                     tabIcon="person"></Tab>
                <Tab :to="{name:'iconBottom.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="light"
                     tabIcon="car"></Tab>
                <Tab :to="{name:'iconBottom.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star"
                     :enabled="true"></Tab>
            </Tabs>
        </Footer>
    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/javascript">
  export default {
    name: 'name'
  }
</script>
