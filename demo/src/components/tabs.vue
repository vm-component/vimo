<template>
    <Page>
        <Content>
            <router-view/>
        </Content>
        <Footer>
            <Tabs :tabsLayout="tabsLayout" tabsHighlight>
                <Tab :routerType="routerType" :to="{name:'tabs.index'}" :tabBadge="tabBadge1" :tabTitle="$t('user')" tabBadgeStyle="danger"
                     tabIcon="person"></Tab>
                <Tab :routerType="routerType" :to="{name:'tabs.tab1'}" :tabBadge="tabBadge2" :tabTitle="$t('cars')" tabBadgeStyle="dark"
                     tabIcon="car"></Tab>
                <Tab :routerType="routerType" :to="{name:'tabs.tab2'}" :tabBadge="tabBadge3" :tabTitle="$t('star')" tabIcon="star"
                     :disabled="false"></Tab>
            </Tabs>
        </Footer>
    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/javascript">
  const tabsLayouts = [
    'icon-top',
    'icon-start',
    'icon-end',
    'icon-bottom',
    'icon-hide',
    'title-hide'
  ]
  
  export default {
    name: 'DemoTabs',
    i18n: {
      messages: {
        'zh-CN': {
          user: '用户',
          cars: '汽车',
          star: '明星'
        },
        'en-US': {
          user: 'User',
          cars: 'Cars',
          star: 'Star'
        }
      }
    },
    data () {
      return {
        timer: null,
        tabsLayout: tabsLayouts[Math.floor(Math.random() * 6)],
        routerType: 'replace',
        tabBadge1: Math.floor(Math.random() * 10),
        tabBadge2: Math.floor(Math.random() * 10),
        tabBadge3: Math.floor(Math.random() * 10)
      }
    }
  }
</script>
