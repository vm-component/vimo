<template>
    <article class="ion-tabs" :class="[modeClass,colorClass]"
             :tabsLayout="tabsLayout"
             :tabsHighlight="tabsHighlight"
             :tabsPlacement="tabsPlacement">
        <div class="tabbar" role="tablist" ref="tabbar">
            <slot></slot>
            <div ref="tabHighlight"
                 class="tab-highlight"
                 :class="{'animate':canTabHighlightAnimate}"
                 :style="tabHighlightStyle"></div>
        </div>
    </article>
</template>
<style lang="scss" src="./style.scss"></style>
<script type="text/javascript">
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
  import { isNumber } from '../../util/type'
  import css from '../../util/get-css'

  export default {
    name: 'Tabs',
    props: {
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      color: String,
      tabsHighlight: {
        type: Boolean,
        default () { return this.$config && this.$config.getBoolean('tabsHighlight', false) }
      },
      // tabbar的样式: icon和title的放置位置
      tabsLayout: {
        type: String,
        default: 'icon-top',
        validator (val) {
          return ~[
            'icon-top',
            'icon-start',
            'icon-end',
            'icon-bottom',
            'icon-hide',
            'title-hide'
          ].indexOf(val)
        }
      }
    },
    data () {
      return {
        tabHighlightStyle: {},
        canTabHighlightAnimate: false,
        selectedIndex: -1 // 内部使用的, 表示当前处于激活的Tab的index
      }
    },
    inject: {
      headerComponent: {
        from: 'headerComponent',
        default: null
      },
      footerComponent: {
        from: 'footerComponent',
        default: null
      }
    },
    watch: {
      $route () {
        let _index = this.getActivatedIndex()
        if (this.selectedIndex !== _index) {
          this.selectedIndex = _index
          this.$_tabHighlightSelect(this.selectedIndex)
          /**
           * @event component:Tabs#onTabChange
           * @description tabs切换触发
           * @property {string}
           */
          this.$emit('onTabChange', _index)
        }
      }
    },
    computed: {
      // top, bottom
      tabsPlacement () {
        if (this.headerComponent) {
          return 'top'
        } else {
          return 'bottom'
        }
      },
      // 环境样式
      modeClass () {
        return `tabs-${this.mode}`
      },
      // 颜色
      colorClass () {
        return this.color ? (`tabs-${this.mode}-${this.color}`) : ''
      },
      // TabHighlight元素
      tabHighlightEle () {
        return this.$refs.tabHighlight
      },
      // 获取tabbar元素
      tabSlots () {
        return this.$slots.default.filter((item) => !!item.tag)
      },
      // 每个tab的宽度, 用于tabHighLight
      tabElementWidth () {
        return this.$refs.tabbar.offsetWidth / this.tabSlots.length || 0
      }
    },
    provide () {
      const _this = this
      return {
        tabsComponent: _this
      }
    },
    methods: {
      /**
       * @function getByIndex
       * @description
       * 获取第几个index的Tab组件实例
       * @param {number} index - 第几个index
       * @return {Tab}
       * */
      getByIndex (index) {
        return this.tabSlots[index] && this.tabSlots[index].componentInstance
      },

      /**
       * @function getActivatedIndex
       * @description
       * 获取当前被选中Tab实例的index
       * @return {number}
       * */
      getActivatedIndex () {
        for (let i = 0, len = this.tabSlots.length; len > i; i++) {
          let tabIns = this.tabSlots[i].componentInstance
          if (tabIns.$_isMatch()) {
            return i
          }
        }
        return 0
      },

      /**
       * @function getSelected
       * @description
       * 获取当前选中的Tab实例
       * @return {Tab}
       * */
      getSelected () {
        return this.getByIndex(this.getActivatedIndex())
      },

      /**
       * @function select
       * @description
       * 根据传入值选中Tab
       * @param {Number/Tab} tabOrIndex - 传入的Tab实例或者Tab的序号
       * @return {Tab}
       * */
      select (tabOrIndex) {
        let tabIns = tabOrIndex
        if (isNumber(tabOrIndex)) {
          tabIns = this.getByIndex(tabOrIndex)
        }

        if (tabIns === this.getSelected()) {
          return tabIns
        } else {
          this.$router[tabIns.routerType](tabIns.to)
          return tabIns
        }
      },

      /**
       * 第一次进入是的初始化
       * @private
       */
      $_initTabs () {
        this.selectedIndex = this.getActivatedIndex()
        // 激活当前选中的Highlight
        if (this.tabsHighlight && this.mode === 'md') {
          this.$_tabHighlightSelect(this.selectedIndex)
        }
      },

      /**
       * 下滑线定位
       * @param {number} index
       * @private
       */
      $_tabHighlightSelect (index) {
        let _offsetLeft = this.tabElementWidth * index
        let transform = `translate3d(${_offsetLeft}px,0,0) scaleX(${this.tabElementWidth})`

        this.tabHighlightStyle = {
          [css.transform]: transform
        }

        // wait for style set
        window.setTimeout(() => {
          this.canTabHighlightAnimate = true
        }, 16)
      }
    },
    mounted () {
      this.$_initTabs()
    }
  }
</script>
