<template>
    <article class="ion-tabs tabs" :class="[modeClass,colorClass]"
             :tabsLayout="tabsLayout"
             :tabsHighlight="tabsHighlight"
             :tabsPlacement="tabsPlacement">
        <section class="tabs-content" ref="tabsContent">
            <!--tabbar-->
            <div class="tabbar" role="tablist" ref="tabbar" :tabsLayout="tabsLayout">
                <slot name="tab"></slot>
                <div ref="tabHighlight" class="tab-highlight"></div>
            </div>
            <!--tabs-content-wrap-->
            <div ref="tabsContentWrap" class="tabs-content-wrap">
                <section class="wrap-inner">
                    <slot></slot>
                </section>
            </div>
        </section>
    </article>
</template>
<style lang="less">
    @import "tabs";
    @import "tabs.ios.less";
    @import "tabs.md.less";
</style>
<script type="text/javascript">
  /**
   * @component Tabs
   * @description
   *
   * ## 大标签 / Tabs
   *
   * ### 概述
   *
   * Tabs是一个使用`$router.replace`进行页面导航的组件，其中Tab组件中传入`props`定义每个tab的结构/样式/路由位子等信息。 Tabs使用场景类似于"栏目切换"， 如果你使用的是IOS手机，请参考"App Store"应用。下图也许能更直观的表达Tabs的职责范围。
   *
   * ![tabs的设计](https://github.com/vm-component/Vimo/blob/master/dev/static/img/tabs.png?raw=true)
   *
   * ### 使用规则
   *
   * 1. Tabs和Tab必须组合使用
   * 2. Tab组件需要增加`slot="tab"`插槽标记
   * 3. Tabs组件必须在Page组件中，而且子路由也是一个Page包裹的页面
   * 4. 页面路由插槽`<router-view></router-view>`写在Tabs中，是否开启`keep-alive`由业务自己决定
   * 5. 页面进入究竟激活那个子页面由路由规则决定
   * 6. `tabsHighlight`特性只能在`md`模式下使用
   *
   *
   * @props {String=} color                        - 颜色
   * @props {String} [mode='ios']                  - 模式
   * @props {Boolean} [tabsHighlight='false']      - tab下面是否显示选中bar
   * @props {String} [tabsLayout='icon-top']       - tabbar的样式，可选配置: icon-top, icon-left, icon-right, icon-bottom, icon-hide, title-hide.
   * @props {String} [tabsPlacement='bottom']      - tabbar的位置，可选配置: top, bottom
   *
   * @slot tab - Tab组件的插槽
   *
   * @fires component:Tabs#onTabChange
   *
   * @demo #/tabs
   * @usage
   *
   * <Page>
   *    <Tabs tabsLayout="icon-top" tabsPlacement="bottom" @onTabChange="onTabChange" ref=tabs>
   *        <router-view></router-view>
   *        <Tab slot="tab" :to="{name:'tabsBottom.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger" tabIcon="person"></Tab>
   *        <Tab slot="tab" :to="{name:'tabsBottom.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="dark" tabIcon="car"></Tab>
   *        <Tab slot="tab" :to="{name:'tabsBottom.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star" :enabled="true"></Tab>
   *    </Tabs>
   * </Page>
   *
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
  import { parsePxUnit, firstUpperCase, setElementClass } from '../util/util'
  import css from '../util/getCss'

  export default {
    name: 'Tabs',
    props: {
      color: [String],
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      // tab下面是否显示选中bar
      tabsHighlight: {
        type: Boolean,
        default () { return this.$config && this.$config.getBoolean('tabsHighlight', false) }
      },
      // tabbar的样式: icon和title的放置位置
      // 可选配置: icon-top, icon-left, icon-right, icon-bottom, icon-hide, title-hide.
      tabsLayout: {
        type: String,
        default: 'icon-top'
      },
      // tabbar的位置 top, bottom
      tabsPlacement: {
        type: String,
        default: 'bottom'
      }
    },
    data () {
      return {
        isInit: false, // 当前组件初始化状态
        tabElementWidth: 0, // 每个tab的宽度, 用于tabHighLight
        selectedIndex: -1 // 内部使用的, 表示当前处于激活的Tab的index
      }
    },
    watch: {
      $route () {
        if (!this.isInit) return
        let _index = this.getActivatedIndex()
        if (this.selectedIndex !== _index) {
          this.selectedIndex = _index
          this.tabHighlightSelect(this.selectedIndex)
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
      // 环境样式
      modeClass () {
        return `tabs-${this.mode}`
      },
      // 颜色
      colorClass () {
        return this.color ? (`tabs-${this.mode}-${this.color}`) : ''
      },
      // tabbar元素
      tabbarElement () {
        return this.$refs.tabbar
      },
      // TabHighlight元素
      tabHighlightEle () {
        return this.$refs.tabHighlight
      },
      tabsContentElement () {
        return this.$refs.tabsContent
      },
      tabsContentWrapElement () {
        return this.$refs.tabsContentWrap
      },
      // 获取tabbar元素
      tabSlots () {
        return this.$slots.tab
      }
    },
    methods: {
      // ------ public ------
      /**
       * @function getByIndex
       * @description
       * 获取第几个index的Tab组件实例
       * @param {number} index - 第几个index
       * @return {Tab}
       * */
      getByIndex (index) {
        if (this.tabSlots[index]) {
          return this.tabSlots[index].componentInstance
        }
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
          if (tabIns.to.name === this.$route.name || tabIns.to.path === this.$route.path) {
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
       * @param {number/Tab} tabOrIndex - 传入的Tab实例或者Tab的序号
       * @return {Tab}
       * */
      select (tabOrIndex) {
        let tabIns = tabOrIndex
        if (typeof tabOrIndex === 'number') {
          tabIns = this.getByIndex(tabOrIndex)
        }
        if (tabIns === this.getSelected()) {
          return tabIns
        } else {
          this.$router.replace(tabIns.to)
          return tabIns
        }
      },

      // ------ private ------

      /**
       * 获取每个tab的宽度, 因为是平均, 故用除法就行
       * @private
       * */
      getTabElementWidth () {
        let _count = this.tabSlots.length
        let _warpWidth = this.tabbarElement.offsetWidth
        return _warpWidth / _count
      },

      /**
       * 第一次进入是的初始化
       * @private
       */
      initTabs () {
        if (this.isInit) return

        this.tabElementWidth = this.getTabElementWidth()
        this.selectedIndex = this.getActivatedIndex()

        // 计算属性盒子的尺寸
        this.computeTabsContentStyle()
        this.computeTabsContentWrapStyle()

        // 激活当前选中的Highlight
        if (this.tabsHighlight) {
          this.tabHighlightSelect(this.selectedIndex)
        }

        this.isInit = true
      },

      /**
       * 计算tabs-content的样式
       * 因为这部分首一下因素影响：fullscreen、Header，Footer
       * @private
       * */
      computeTabsContentStyle () {
        let headerBarHeight = 0
        let footerBarHeight = 0
        let computedStyle
        let children = this.$parent.$children
        let ele
        let tagName

        children.forEach((child) => {
          ele = child.$el
          tagName = child.$options._componentTag.toLowerCase()
          if (tagName === 'header') {
            // this.headerElement = ele
            computedStyle = window.getComputedStyle(ele)
            headerBarHeight = parsePxUnit(computedStyle.height)
          } else if (tagName === 'footer') {
            // this.footerElement = ele
            computedStyle = window.getComputedStyle(ele)
            footerBarHeight = parsePxUnit(computedStyle.height)
          }
        })

        if (headerBarHeight > 0) {
          this.tabsContentElement.style.marginTop = headerBarHeight + 'px'
        }
        if (footerBarHeight > 0) {
          this.tabsContentElement.style.marginBottom = footerBarHeight + 'px'
        }
      },

      /**
       * 计算stabs-content-wrap的样式
       * 这部分的因素影响：tabbar的位置及高度
       * @private
       * */
      computeTabsContentWrapStyle () {
        let tabBarHeight = window.getComputedStyle(this.tabbarElement).height
        tabBarHeight = parsePxUnit(tabBarHeight)
        let _styleType = 'margin' + firstUpperCase(this.tabsPlacement)
        if (tabBarHeight > 0) {
          this.tabsContentWrapElement.style[_styleType] = tabBarHeight + 'px'
        }
        this.setTabbarPosition(this.tabsPlacement)
      },

      /**
       * 给TabBar定位
       * @param {string} position - top, bottom
       * @private
       */
      setTabbarPosition (position) {
        position = position && position.toLowerCase()
        if (position === 'bottom') {
          this.tabbarElement.style.bottom = '0px'
          this.tabbarElement.style.top = 'auto'
        } else {
          this.tabbarElement.style.top = '0px'
          this.tabbarElement.style.bottom = 'auto'
        }
        this.tabbarElement.classList.add('show-tabbar')
      },

      /**
       * 下滑线定位
       * @param {number} index
       * @private
       */
      tabHighlightSelect (index) {
        if (this.mode !== 'md') return
        let _offsetLeft = this.tabElementWidth * index
        let transform = `translate3d(${_offsetLeft}px,0,0) scaleX(${this.tabElementWidth})`
        setElementClass(this.tabHighlightEle, 'animate', true)
        this.tabHighlightEle.style[css.transform] = transform
      }
    },
    mounted () {
      console.assert(this.$parent.$options._componentTag.toLowerCase() === 'page', 'Tabs component must place in Page Component')
      // 初始化
      this.initTabs()
    }
  }
</script>
