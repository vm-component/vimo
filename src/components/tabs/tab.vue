<template>
    <a class="tab-button" ref="routerLink" @click="tabClickHandler($event)"
       :id="tabId"
       :class="{'has-title':hasTitle, 'has-icon':hasIcon, 'has-title-only':hasTitleOnly, 'icon-only':hasIconOnly, 'has-badge':hasBadge,  'tab-disabled':!enabled, 'tab-hidden':!show,'tab-active':isActive}">
        <Icon :mode="mode" v-if="tabIcon" :name="tabIcon" :isActive="isActive" class="tab-button-icon"></Icon>
        <span v-if="tabTitle" class="tab-button-text">{{tabTitle}}</span>
        <Badge :mode="mode" v-if="tabBadge" class="tab-badge" :color="tabBadgeStyle">{{tabBadge}}</Badge>
    </a>
</template>
<script type="text/javascript">
  /**
   * @component Tabs/Tab
   * @description
   *
   * ## 大标签 / Tab
   *
   * 还是需要再声明下，Tab组件必须和Tabs组件配合使用， Tab组件内部与路由`$router`结合,
   * Tab点击切换使用的是`$router.replace(this.to)`处理的， 因此应该包含:to属性用于跳转。
   *
   *
   * @props {String} [mode] - Tab组件内Icon核Badge的模式, 不可较差定义不同mode, 默认跟随系统
   * @props {Boolean} [enabled] - 是否能选择
   * @props {Object} to - 路由跳转，必填
   * @props {Boolean} [show=true] - 是否显示
   * @props {String} [tabBadge] - 徽章显示值
   * @props {String} [tabBadgeStyle] - 徽章颜色
   * @props {String} [tabIcon] - tab的IconName
   * @props {String} [tabTitle] - tab的tabTitle
   *
   * @fires component:Tabs#onTabSelect
   *
   * @usage
   * <Tab slot="tab" :to="{name:'tabsBottom.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star" :enabled="true"></Tab>
   *
   * */
  import Badge from '../badge'

  let _tabId = -1
  export default {
    name: 'Tab',
    props: {
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      // 是否能选择
      enabled: {
        type: Boolean,
        default: true
      },
      // 路由跳转
      to: {
        type: Object,
        required: true
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 徽章显示值
      tabBadge: [String],
      // 徽章颜色
      tabBadgeStyle: [String],
      // tab的IconName
      tabIcon: [String],
      // tab的tabTitle
      tabTitle: [String]
    },
    data () {
      return {
        index: ++_tabId,
        isActive: false // 这个值具有滞后性, 只代表当前的页面的状态, 不能用于其他
      }
    },
    computed: {
      hasTitle () {
        return this.tabTitle
      },
      tabId () {
        return `tabId-${this.index}`
      },
      hasIcon () {
        return this.tabIcon
      },
      hasTitleOnly () {
        return this.tabTitle && !this.tabIcon
      },
      hasIconOnly () {
        return this.tabIcon && !this.tabTitle
      },
      hasBadge () {
        return this.tabBadge
      }
    },
    watch: {
      $route () {
        this.refreshMatchState()
      }
    },
    methods: {
      isMatch () {
        return this.to.name === this.$route.name || this.to.path === this.$route.path
      },
      tabClickHandler () {
        if (this.enabled) {
          this.$router.replace(this.to)
          /**
           * @event component:Tabs#onTabSelect
           * @description Tab选中时触发
           * @property {string}
           */
          this.$emit('onTabSelect', this)
        }
      },
      refreshMatchState () {
        this.isActive = this.isMatch()
      }
    },
    created () {
      this.refreshMatchState()
      console.assert(this.$parent.$options._componentTag.toLowerCase() === 'tabs', 'Tab component must combine with Tabs')
    },
    components: {Badge}
  }
</script>
