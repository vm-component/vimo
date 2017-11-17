<template>
    <a class="tab-button" ref="routerLink" @click="$_tabClickHandler($event)" :id="tabId" :class="componentClass">
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
  import Badge from '../badge'

  export default {
    name: 'Tab',
    components: {Badge},
    props: {
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      // 是否能选择
      disabled: {
        type: Boolean,
        default: false
      },
      // 路由跳转
      to: {
        type: Object,
        required: true,
        validator (obj) {
          return !!obj && (!!obj.name || !!obj.path)
        }
      },
      routerType: {
        type: String,
        default: 'replace',
        validator (val) {
          return ~[
            'replace',
            'push'
          ].indexOf(val)
        }
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      tabBadge: [String, Number],         // 徽章显示值
      tabBadgeStyle: String,    // 徽章颜色
      tabIcon: String,          // tab的IconName
      tabTitle: String          // tab的tabTitle
    },
    data () {
      return {
        isActive: false // 这个值具有滞后性, 只代表当前的页面的状态, 不能用于其他
      }
    },
    computed: {
      componentClass () {
        return {
          'has-title': this.hasTitle,
          'has-icon': this.hasIcon,
          'has-title-only': this.hasTitleOnly,
          'icon-only': this.hasIconOnly,
          'has-badge': this.hasBadge,
          'tab-disabled': this.disabled,
          'tab-hidden': !this.show,
          'tab-active': this.isActive
        }
      },
      hasTitle () {
        return this.tabTitle
      },
      tabId () {
        return `tabId-${this._uid}`
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
        this.$_refreshMatchState()
      }
    },
    inject: ['tabsComponent'],
    methods: {
      /**
       * 当前路由是否匹配当前Tab组件状态
       * @private
       * */
      $_isMatch () {
        return this.to.name === this.$route.name || this.to.path === this.$route.path
      },
      /**
       * Tab点击时动作
       * @private
       * */
      $_tabClickHandler () {
        if (!this.disabled) {
          this.$router && this.$router[this.routerType](this.to)
          /**
           * @event component:Tabs#onTabSelect
           * @description Tab选中时触发
           * @property {string}
           */
          this.$emit('onTabSelect', this)
        }
      },
      $_refreshMatchState () {
        this.isActive = this.$_isMatch()
      }
    },
    created () {
      this.$_refreshMatchState()
    }
  }
</script>
