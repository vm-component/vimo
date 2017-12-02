<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Tabs在顶部</Title>
            </Navbar>
            <Tabs tabsLayout="icon-top">
                <Tab :to="{name:'tabsTop.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger"
                     tabIcon="person"></Tab>
                <Tab :to="{name:'tabsTop.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="dark"
                     tabIcon="car"></Tab>
                <Tab :to="{name:'tabsTop.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star"
                     :enabled="true"></Tab>
            </Tabs>
        </Header>
        <Content>
            <router-view></router-view>
        </Content>
    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/javascript">
  export default{}
</script>
