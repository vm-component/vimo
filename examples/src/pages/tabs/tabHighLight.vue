<template>
    <Page>
        <Header>
            <Navbar>
                <Title>下划线</Title>
            </Navbar>
        </Header>
        <Content>
            <router-view></router-view>
        </Content>
        <Footer>
            <Tabs mode="md" tabsHighlight tabsLayout="icon-top">
                <Tab :to="{name:'tabHighLight.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger"
                     tabIcon="person"></Tab>
                <Tab :to="{name:'tabHighLight.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="dark"
                     tabIcon="car"></Tab>
                <Tab :to="{name:'tabHighLight.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star"
                     :enabled="true"></Tab>
            </Tabs>
        </Footer>
    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/javascript">
  export default{
    name: 'name'
  }
</script>
