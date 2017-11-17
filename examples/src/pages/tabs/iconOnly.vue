<template>
    <Page>
        <Header>
            <Navbar>
                <Title>只有ICON</Title>
            </Navbar>
        </Header>
        <Content>
            <router-view></router-view>
        </Content>
        <Footer>
            <Tabs tabsLayout="title-hide">
                <Tab :to="{name:'iconOnly.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger"
                     tabIcon="person"></Tab>
                <Tab :to="{name:'iconOnly.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="dark"
                     tabIcon="car"></Tab>
                <Tab :to="{name:'iconOnly.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star"
                     :enabled="true"></Tab>
            </Tabs>
        </Footer>
    </Page>
</template>
<style scoped lang="less"></style>
<script type="text/javascript">
  export default{
    name: 'name'
  }
</script>
