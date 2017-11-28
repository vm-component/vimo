<template>
    <Page>
        <router-view></router-view>
        <Footer>
            <Tabs :tabsLayout="tabsLayout" @onTabChange="onTabChange" tabsHighlight ref=tabs>
                <Tab routerType="push" :to="{name:'tabsBottom.demoTab1'}" :tabBadge="tabBadge1" tabTitle="User" tabBadgeStyle="danger"
                     tabIcon="person"></Tab>
                <Tab routerType="push" :to="{name:'tabsBottom.demoTab2'}" :tabBadge="tabBadge2" tabTitle="Cars" tabBadgeStyle="dark"
                     tabIcon="car"></Tab>
                <Tab :to="{name:'tabsBottom.demoTab3'}" :tabBadge="tabBadge3" tabTitle="Star" tabIcon="star"
                     :disabled="false"></Tab>
            </Tabs>
        </Footer>
    </Page>
</template>
<style scoped lang="less"></style>
<script type="text/javascript">
  export default {
    name: 'TabsBottomDemo',
    data () {
      return {
        timer: null,
        tabsLayout: this.$store.state.tabsLayout,
        tabBadge1: 1,
        tabBadge2: 2,
        tabBadge3: 3
      }
    },
    computed: {
      tabsComponent () {
        return this.$refs.tabs
      }
    },
    methods: {
      onTabChange (index) {
        console.log('事件 -> onTabChange-selectedIndex:' + index)
        console.log('当前选择index的tab实例:')
        console.log(this.tabsComponent.getByIndex(index))
        console.log('获取当前在激活状态的tab实例:')
        console.log(this.tabsComponent.getSelected())
        console.log('由Tabs组件获取当前激活的index:' + this.tabsComponent.getActivatedIndex())
//
//        console.log('3s后选择第一个')
//        clearTimeout(this.timer)
//        this.timer = setTimeout(() => {
//          this.tabsComponent.select(0)
//        }, 3000)
      }
    }
  }
</script>
