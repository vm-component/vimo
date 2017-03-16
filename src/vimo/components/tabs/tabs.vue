<template>
  <article class="ion-tabs tabs" :class="[modeClass,colorClass]" :tabsLayout="tabsLayout"
           :tabsHighlight="tabsHighlight">
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
<style lang="scss">
  @import "./tabs.scss";
  @import "./tabs.ios.scss";
  @import "./tabs.md.scss";
  @import "./tabs.wp.scss";

  .tabs-content {
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: block;
    overflow: hidden;
    contain: size style layout;
    .tabs-content-wrap {
      position: absolute;
      width: 100%;
      display: block;
      padding: 0;
      margin: 0;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-sizing: border-box;
      .wrap-inner {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
        margin: 0;
        top: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        will-change: scroll-position;
        contain: size style layout;
        box-sizing: border-box;
      }
      border: 3px solid red;
    }
  }
</style>
<script type="text/ecmascript-6">
  /**
   * Tabs组件(父集组件)
   * 作用与Content相当, 内部为TabBar和Tab组件的区域
   *
   * 对外事件: onTabChange
   *
   * 用于激活当前那个tab未激活状态的方法有两个: (保证控制集中,所以去掉了selectedIndex控制)
   * 1. 路由控制: 设置redirect参数
   * 2. select(): 传入index或者Tab
   *
   * */
  import { getNum, firstUpperCase } from '../../util/util'
  import { getStyle, setElementClass } from '../../util/dom'
  export default{
    name: 'Tabs',
    props: {
      color: {
        type: String,
        default: ''
      },
      mode: {
        type: String,
        default: VM && VM.config.get('mode', 'ios') || 'ios'
      },

      /**
       * tab下面是否显示选中bar
       * */
      tabsHighlight: {
        type: Boolean,
        default: VM && VM.config.getBoolean('tabsHighlight', false)
      },

      /**
       * tabbar的样式: icon和title的放置位置
       * 可选配置: icon-top, icon-left, icon-right, icon-bottom, icon-hide, title-hide.
       * */
      tabsLayout: {
        type: String,
        default: 'icon-top',
      },

      /**
       * tabbar的位置 top, bottom
       * */
      tabsPlacement: {
        type: String,
        default: 'bottom',
      },

      /**
       * 子路由的模式
       * */
      isKeepAlive: {
        type: Boolean,
        default: false
      },
    },
    data(){
      return {
        isInit: false, // 当前组件初始化状态

        // tabs: [], // Tab子组件的参数列表, 不是实例, 因为实例没有用!

        tabElementWidth: 0, // 每个tab的宽度, 用于tabHighLight
        tabSlots: null,

        // headerElement: null,
        // footerElement: null,
        tabbarElement: null, // tabbar元素

        tabsContentElement: null,
        tabsContentWrapElement: null,

        tabHighlightEle: null, // TabHighlight元素

        selectedIndex: -1, // 内部使用的, 表示当前处于激活的Tab的index

        statusbarPadding: VM.config.getBoolean('statusbarPadding', false), // 是否有statusbar的padding
      }
    },
    watch: {
      $route(){
        if (!this.isInit) return;
        this.selectedIndex = this.getActivatedIndex();
        this.tabHighlightSelect(this.selectedIndex)
      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return `tabs-${this.mode}`
      },
      // 颜色
      colorClass () {
        return !!this.color ? (`tabs-${this.mode}-${this.color}`) : ''
      },
    },
    methods: {
      // ------ public ------
      /**
       * 获取第几个index的Tab组件实例
       * @param {number} index
       * @return {Tab}
       * */
      getByIndex(index){
        if (!!this.tabSlots[index]) {
          return this.tabSlots[index].componentInstance
        }
      },

      /**
       * 获取当前选中的Tab组件
       * @return {Tab}
       * */
      getSelected(){
        let tabSlots = this.tabSlots;
        for (let i = 0, len = tabSlots.length; len > i; i++) {
          let tabIns = tabSlots[i].componentInstance;
          if (tabIns.isActive) {
            return tabIns
          }
        }
      },

      // /**
      //  * 获取上一个选中的Tab组件, 不是disabled和hidden的Tab组件
      //  * @param {boolean} trimHistory - 是get还是pop
      //  * @return {Tab}
      //  * */
      // previousTab(trimHistory){},

      /**
       * 选中
       * @param {number/Tab} tabOrIndex -
       * @return {Tab}
       * */
      select(tabOrIndex){
        let tabIns = tabOrIndex;
        if (typeof tabOrIndex === 'number') {
          tabIns = this.getByIndex(tabOrIndex)
        }

        if (tabIns.isActive) {
          return tabIns
        } else {
          this.$router.replace(tabIns.to);
          return tabIns
        }
      },

      /**
       * 获取当前被选中的index
       * @return {number}
       * */
      getActivatedIndex(){
        for (let i = 0, len = this.tabSlots.length; len > i; i++) {
          let tabIns = this.tabSlots[i].componentInstance;
          if (tabIns.to.name === this.$route.name || tabIns.to.path === this.$route.path) {
            return i
          }
        }
        return 0
      },

      // ------ private ------

      /**
       * @private
       * 获取每个tab的宽度, 因为是平均, 故用除法就行
       * */
      getTabElementWidth(){
        let _count = this.tabSlots.length;
        let _warpWidth = this.tabbarElement.offsetWidth;
        return _warpWidth / _count
      },

      /**
       * @private
       * 第一次进入是的初始化,
       */
      initTabs(){
        if (this.isInit) return;

        // 获取tabbar元素
        this.tabSlots = this.$slots.tab;
        this.tabbarElement = this.$refs.tabbar;
        this.tabElementWidth = this.getTabElementWidth();
        this.selectedIndex = this.getActivatedIndex();

        this.tabHighlightEle = this.$refs.tabHighlight;
        this.tabsContentElement = this.$refs.tabsContent;
        this.tabsContentWrapElement = this.$refs.tabsContentWrap;

        // 计算属性盒子的尺寸
        this.computeTabsContentStyle();
        this.computeTabsContentWrapStyle();

        // 激活当前选中的Highlight
        if (this.tabsHighlight) {
          this.tabHighlightSelect(this.selectedIndex)
        }

        // Tabs的方法对页面开放
        // _this.$vnode.context.$tabs = {
        //   getByIndex: _this.getByIndex,
        //   getSelected: _this.getSelected,
        //   previousTab: _this.previousTab,
        //   select: _this.select,
        //   getActivatedIndex: _this.getActivatedIndex,
        // }

        this.isInit = true
      },

      /**
       * 计算stabs-content的样式
       * 因为这部分首一下因素影响：statusbarPadding、fullscreen、Header，Footer
       * */
      computeTabsContentStyle () {
        let _styleType = 'margin';
        let headerBarHeight = 0;
        let footerBarHeight = 0;
        let computedStyle;
        let children = this.$parent.$children;
        let ele;
        let tagName;

        children.forEach((child) => {
          ele = child.$el;
          tagName = child.$options._componentTag.toLowerCase();
          if (tagName === 'header') {
            // this.headerElement = ele;
            computedStyle = getComputedStyle(ele);
            headerBarHeight = parsePxUnit(computedStyle.height);
          } else if (tagName === 'footer') {
            // this.footerElement = ele;
            computedStyle = getComputedStyle(ele);
            footerBarHeight = parsePxUnit(computedStyle.height);
          }
        });

        if (this.statusbarPadding) {
          headerBarHeight = headerBarHeight + 20;
        }

        if (headerBarHeight > 0) {
          this.tabsContentElement.style.marginTop = headerBarHeight + 'px';
        }
        if (footerBarHeight > 0) {
          this.tabsContentElement.style.marginBottom = footerBarHeight + 'px';
        }
      },

      /**
       * 计算stabs-content-wrap的样式
       * 这部分的因素影响：tabbar的位置及高度
       * */
      computeTabsContentWrapStyle(){
        let tabBarHeight = getComputedStyle(this.tabbarElement).height;
        tabBarHeight = parsePxUnit(tabBarHeight)
        let _styleType = 'margin' + firstUpperCase(this.tabsPlacement);
        if (tabBarHeight > 0) {
          this.tabsContentWrapElement.style[_styleType] = tabBarHeight + 'px';
        }
        this.setTabbarPosition(this.tabsPlacement);
      },

      /**
       * 给TabBar定位
       * @param {string} position - top, bottom
       */
      setTabbarPosition(position) {
        position = !!position && position.toLowerCase();
        if (position === 'bottom') {
          this.tabbarElement.style.bottom = '0px';
          this.tabbarElement.style.top = 'auto';
        } else {
          this.tabbarElement.style.top = '0px';
          this.tabbarElement.style.bottom = 'auto';
        }
        this.tabbarElement.classList.add('show-tabbar');
      },

      /**
       * 下滑线定位
       * @param {number} index
       */
      tabHighlightSelect(index){
        let _offsetLeft = this.tabElementWidth * index;
        let transform = `translate3d(${_offsetLeft}px,0,0) scaleX(${this.tabElementWidth})`;
        setElementClass(this.tabHighlightEle, 'animate', true);
        this.tabHighlightEle.style[VM.platform.css.transform] = transform;
      },
    },
    created () {
      // 获取子组件(Tab组件)的参数
      // this.getTabParams();

    },
    mounted () {

      // 初始化
      this.initTabs();

      // /**
      //  * 监听页面及url的变化
      //  *
      //  * 如果router的变化还是在 业务页面(this.$vnode.coontext)中切换,
      //  * 则计算当前激活的tab然后更新selectedIndex数据;
      //  *
      //  * 如果router的变化离开了业务页面, 则不做处理
      //  *
      //  * */
      // // 激活当前选中的Highlight
      // if (_this.tabsHighlight && _this.mode === "md") {
      //   _this.$eventBus.$on('onPageEnter', ({to, from}) => {
      //
      //     let _route = to;
      //     let _tab;
      //     for (let i = 0, len = _this.tabs.length; len > i; i++) {
      //       _tab = _this.tabs[i];
      //       if (!!_tab.to.name && _tab.to.name === _route.name) {
      //         _this.selectedIndex = i;
      //         break;
      //       } else if (!!_tab.to.path && _tab.to.path === _route.path) {
      //         _this.selectedIndex = i;
      //         break;
      //       }
      //     }
      //
      //     _this.tabHighlightSelect(_this.selectedIndex)
      //
      //   })
      // }

    },
    destroy(){},
    components: {},
  }

  /**
   * @private
   * @param {string} val
   * @return {number}
   * */
  function parsePxUnit (val) {
    return (!!val && val.indexOf('px') > 0) ? parseInt(val, 10) : 0;
  }
</script>
