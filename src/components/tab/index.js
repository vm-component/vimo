export { default } from './tab.vue'
/**
 * @component Tabs/Tab
 * @description
 *
 * ## 大标签 / Tab
 *
 * 还是需要再声明下，Tab组件必须和Tabs组件配合使用， Tab组件内部与路由`$router`结合,
 * Tab点击切换使用的是`$router.[this.routerType](this.to)`处理的， 因此应该包含:to属性用于跳转。
 *
 * @props {String} [mode] - Tab组件内Icon核Badge的模式, 不可较差定义不同mode, 默认跟随系统
 * @props {Boolean} [disabled=false] - 是否能选择
 * @props {Object} to - 路由跳转，必填
 * @props {String} [routerType='replace'] - 路由跳转类型: replace/push
 * @props {Boolean} [show=true] - 是否显示, 用于灰度发布等场景
 * @props {String} [tabBadge] - 徽章显示值
 * @props {String} [tabBadgeStyle] - 徽章颜色
 * @props {String} [tabIcon] - tab的IconName
 * @props {String} [tabTitle] - tab的tabTitle
 *
 * @fires component:Tabs#onTabSelect
 *
 * @usage
 * <Tab routerType="replace" :to="{name:'tabsBottom.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star" :disabled="false"></Tab>
 *
 * */
