export { default } from './tabs.vue'
/**
 * @component Tabs
 * @description
 *
 * ## 大标签 / Tabs
 *
 * ### 概述
 *
 * Tabs使用场景类似于"栏目切换", Tab组件中传入`props`定义每个tab的结构/样式/路由位子等信息。
 *
 * ### 使用规则
 *
 * 1. 页面结构参考下面示例
 * 2. 页面进入究竟激活那个子页面由路由规则决定
 * 3. `tabsHighlight`特性只能在`md`模式下使用
 *
 *
 * @props {String=} color                        - 颜色
 * @props {String} [mode='ios']                  - 模式
 * @props {Boolean} [tabsHighlight='false']      - tab下面是否显示选中bar, 只在md模式生效
 * @props {String} [tabsLayout='icon-top']       - tabbar的样式，可选配置: icon-top, icon-start, icon-end, icon-bottom, icon-hide, title-hide.
 *
 *
 * @fires component:Tabs#onTabChange
 *
 * @demo #/tabs
 * @usage
 *
 * <Page>
 *    <Content>
 *        <router-view></router-view>
 *    </Content>
 *    <Footer>
 *        <Tabs tabsLayout="icon-top" @onTabChange="onTabChange" ref=tabs>
 *            <router-view></router-view>
 *            <Tab slot="tab" :to="{name:'tabsBottom.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger" tabIcon="person"></Tab>
 *            <Tab slot="tab" :to="{name:'tabsBottom.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="dark" tabIcon="car"></Tab>
 *            <Tab slot="tab" :to="{name:'tabsBottom.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star" :enabled="true"></Tab>
 *        </Tabs>
 *    </Footer>
 * </Page>
 * ...
 * computed: {
   *   tabsComponent () {
   *    // 获取tabs的实例
   *    return this.$refs.tabs
   *   }
   * },
 * methods: {
   *    onTabChange(index){
   *      console.debug('事件 -> onTabChange-selectedIndex:' + index);
   *      console.debug('当前选择index的tab实例:')
   *      console.debug(this.tabsComponent.getByIndex(index))
   *      console.debug('获取当前在激活状态的tab实例:')
   *      console.debug(this.tabsComponent.getSelected())
   *      console.debug('由Tabs组件获取当前激活的index:' + this.tabsComponent.getActivatedIndex());
   *      console.debug('3s后选择第一个')
   *      clearTimeout(this.timer)
   *      this.timer = setTimeout(()=>{
   *        this.tabsComponent.select(0)
   *      },3000)
   *    },
   *  },
 *
 * */
