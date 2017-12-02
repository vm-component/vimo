<template>
    <Page>
        <Header>
            <Navbar>
                <Title>只有文字的Tab</Title>
            </Navbar>
        </Header>
        <Content>
            <router-view></router-view>
        </Content>
        <Footer>
            <Tabs tabsLayout="icon-hide">
                <Tab :to="{name:'titleOnly.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger"
                     tabIcon="person"></Tab>
                <Tab :to="{name:'titleOnly.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="dark"
                     tabIcon="car"></Tab>
                <Tab :to="{name:'titleOnly.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star"
                     :enabled="true"></Tab>
            </Tabs>
        </Footer>

    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/javascript">
  export default {}
</script>
