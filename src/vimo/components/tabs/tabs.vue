<template>
  <article class="ion-tabs tabs" :class="[modeClass,colorClass]" :tabsLayout="tabsLayout"
           :tabsHighlight="tabsHighlight">
    <section class="tabs-content" :style="tabsContentStyle">
      <!--tabbar-->
      <div class="tabbar" role="tablist" ref="tabbar" :tabsLayout="tabsLayout">
        <router-link v-for="(t,index) of tabs"
                     class="tab-button"
                     :id="t._tabId"
                     :aria-controls="t._tabId"
                     :class="{'has-title':t.hasTitle,
                            'has-icon':t.hasIcon,
                            'has-title-only':t.hasTitleOnly,
                            'icon-only':t.hasIconOnly,
                            'has-badge':t.hasBadge,
                            'disable-hover':t.disHover,
                            'tab-disabled':!t.enabled,
                            'tab-hidden':!t.show}"
                     role="tab"
                     :to="t.to"
                     tag="a"
                     active-class="tab-active"
                     @onSelect="select($event)">
          <Icon v-if="t.tabIcon" :name="t.tabIcon" :isActive="t.isSelected" class="tab-button-icon"></Icon>
          <span v-if="t.tabTitle" class="tab-button-text">{{t.tabTitle}}</span>
          <Badge v-if="t.tabBadge" class="tab-badge" :color="t.tabBadgeStyle">{{t.tabBadge}}</Badge>
          <div class="button-effect"></div>
        </router-link>
        <div ref="tabHighlight" class="tab-highlight"></div>
      </div>

      <!--不用但是必须写上的-->
      <div hidden>
        <slot></slot>
      </div>

      <!--tabs-content-wrap-->
      <div class="tabs-content-wrap" :style="tabsContentWrapStyle" v-if="isKeepAlive">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <div class="tabs-content-wrap" :style="tabsContentWrapStyle" v-else>
        <router-view></router-view>
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
      margin: 0;
      top: 0;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      will-change: scroll-position;
      contain: size style layout;
      box-sizing: border-box;

      /*border: 3px solid red;*/
    }

  }

</style>
<script type="text/ecmascript-6">
  /**
   * Tabs组件(父集组件)
   * 作用与Content相当, 内部为TabBar和Tab组件的区域
   *
   * 对外事件: onChange
   *
   * 用于激活当前那个tab未激活状态的方法有两个: (保证控制集中,所以去掉了selectedIndex控制)
   * 1. 路由控制: 设置redirect参数
   * 2. select(): 传入index或者Tab
   *
   * */
  import { getStyle, getNum, firstUpperCase } from '../../util/assist'
  // import { isBlank } from '../../util/util'
  import { setElementClass, urlChange } from '../../util/dom'
  export default{
    name: 'Tabs',
    props: {
      color: {
        type: String,
        default: ''
      },
      mode: {
        type: String,
        default: VM.config.get('mode', 'ios')
      },

      /**
       * tab下面是否显示选中bar
       * */
      tabsHighlight: {
        type: Boolean,
        default: VM.config.getBoolean('tabsHighlight', false)
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

        tabsContentStyle: {}, // tabs-content 内容的位置样式
        tabsContentWrapStyle: {}, // tabs-content-wrap 内容的位置样式

        tabs: [], // Tab子组件的参数列表, 不是实例, 因为实例没有用!
        tabBarEles: [], // 这个是真正显示的TabBar元素列表

        tabHighlightEle: null, // TabHighlight元素
        isTabHighlightInit: false, // 判断TabHighlight是否已经初始化

        selectedIndex: 0, // 内部使用的, 表示当前处于激活的Tab的index

        statusbarPadding: VM.config.getBoolean('statusbarPadding', false), // 是否有statusbar的padding

        _highLightBtnWidth: 0, //
        _highLightBtnOffsetWidth: 0, //

      }
    },
    watch: {},
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
      getByIndex(index){},

      /**
       * 获取当前选中的Tab组件
       * @return {Tab}
       * */
      getSelected(){},

      /**
       * 获取上一个选中的Tab组件, 不是disabled和hidden的Tab组件
       * @param {boolean} trimHistory - 是get还是pop
       * @return {Tab}
       * */
      previousTab(trimHistory){},

      /**
       * 选中
       * @param {number/Tab} tabOrIndex -
       * @return {Tab}
       * */
      select(tabOrIndex){},

      /**
       * 获取当前被选中的index
       * @return {number}
       * */
      getActivatedIndex(){
        if (!this.isInit) {
          let _route = this.$route;
          for (let i = 0, len = this.tabs.length; len > i; i++) {
            let _tab = this.tabs[i];
            if (!!_tab.to.name && _tab.to.name === _route.name) {
              this.selectedIndex = i;
              break;
            } else if (!!_tab.to.path && _tab.to.path === _route.path) {
              this.selectedIndex = i;
              break;
            }
          }
        }

        this.isInit = true;
        return this.selectedIndex
      },

      // ------ private ------

      tabClick(index){
        this.selectedIndex = index;
        this.tabHighlightSelect(index)
        console.debug('index')
        console.debug(index)
      },

      /**
       * 第一次进入是的初始化,
       */
      initTabs(){
        const _this = this;

        // 获取子组件(Tab组件)的参数
        _this.getTabParams();

        // 计算属性盒子的尺寸
        _this.$nextTick(function () {
          _this.computeTabsContentStyle();
          _this.computeTabsContentWrapStyle();
          // 获取子组件(Tab组件)真正显示的TabBar元素列表
          _this.tabBarEles = _this.$refs.tabbar.querySelectorAll('a');

          // 激活当前选中的Highlight
          if (_this.tabsHighlight) {
            _this.tabHighlightSelect(_this.getActivatedIndex())
          }
        });

        // Tabs的方法对页面开放
        _this.$vnode.context.$tabs = {
          getByIndex: _this.getByIndex,
          getSelected: _this.getSelected,
          previousTab: _this.previousTab,
          select: _this.select,
          getActivatedIndex: _this.getActivatedIndex,
        }
      },

      /**
       * 计算stabs-content的样式
       * 因为这部分首一下因素影响：statusbarPadding、fullscreen、Header，Footer
       * */
      computeTabsContentStyle () {
        let _this = this;
        let _valHeader, _styleType;
        let headerBarHeight = 0;
        let footerBarHeight = 0;

        // 得到header和footer的高度
        // 一般情况下，ion-conent在ion-page中是唯一的，但是在ion-menu组件中也包含ion-content
        // 所以ion-header和ion-footer的高度应该在父组件的子组件中查找，这样计算高度才有意义
        // 而不是全局
        _this.$vnode.context.$children[0].$children.forEach((item) => {
          if (!!item.$options._componentTag && item.$options._componentTag.toLowerCase() === 'header') {
            headerBarHeight = getStyle(item.$el, 'height');
            headerBarHeight === 'auto' ? (headerBarHeight = '44') : (headerBarHeight = getNum(headerBarHeight));
          }
          if (!!item.$options._componentTag && item.$options._componentTag.toLowerCase() === 'footer') {
            footerBarHeight = getStyle(item.$el, 'height');
            footerBarHeight === 'auto' ? (footerBarHeight = '44') : (footerBarHeight = getNum(footerBarHeight));
          }
        });

        if (_this.statusbarPadding) {
          // 存在statusBar的情况下，header高20px
          // TODO: statusBarHeight
          // _valHeader = headerBarHeight + _this.$config.statusBarHeight;
          _valHeader = headerBarHeight + 20;
        } else {
          _valHeader = headerBarHeight
        }

        _styleType = 'margin';

        // empty
        _this.tabsContentStyle = {};

        if (_valHeader > 0) {
          _this.tabsContentStyle[_styleType + 'Top'] = _valHeader + 'px';
        }
        if (footerBarHeight > 0) {
          _this.tabsContentStyle[_styleType + 'Bottom'] = footerBarHeight + 'px';
        }

      },

      /**
       * 计算stabs-content-wrap的样式
       * 这部分的因素影响：tabbar的位置及高度
       * */
      computeTabsContentWrapStyle(){
        const _this = this;
        let tabBarHeight = getStyle(this.$refs.tabbar, 'height');
        let _styleType = 'margin';

        if (tabBarHeight === 'auto') {
          console.error('无法计算tabBar的高度, height:auto')
        }
        tabBarHeight === 'auto' ? (tabBarHeight = '44') : (tabBarHeight = getNum(tabBarHeight));

        if (tabBarHeight > 0) {
          _this.tabsContentWrapStyle[_styleType + firstUpperCase(_this.tabsPlacement)] = tabBarHeight + 'px';
        }

        _this.setTabbarPosition(_this.tabsPlacement);

      },

      /**
       * 获取子组件(Tab组件)的参数
       * */
      getTabParams(){
        const _this = this;
        _this.$children.forEach(function (item) {
          if (!!item && !!item.$options._componentTag && item.$options._componentTag.toLowerCase() === 'tab') {
            _this.tabs.push(item.getTabInfo());
          }
        })
      },

      /**
       * 给TabBar定位
       * @param {string} position - top, bottom
       */
      setTabbarPosition(position) {
        const tabbarEle = this.$refs.tabbar;
        position = !!position && position.toLowerCase();
        if (position === 'bottom') {
          tabbarEle.style.bottom = '0px';
          tabbarEle.style.top = 'auto';
        } else {
          tabbarEle.style.top = '0px';
          tabbarEle.style.bottom = 'auto';
        }
        tabbarEle.classList.add('show-tabbar');
      },

      /**
       * 开启下划线模式
       * @param {number} index
       */
      tabHighlightSelect(index){
        const _this = this;

        if (!_this.isTabHighlightInit) {
          let btnEle = _this.tabBarEles[index];
          // 获取TabHighlight元素
          _this.tabHighlightEle = _this.$refs.tabHighlight;

          _this._highLightBtnWidth = btnEle.offsetLeft;
          _this._highLightBtnOffsetWidth = btnEle.offsetWidth;

          _this.isTabHighlightInit = true;
          setElementClass(_this.tabHighlightEle, 'animate', true)
        }

        let transform = `translate3d(${_this._highLightBtnWidth * index}px,0,0) scaleX(${_this._highLightBtnOffsetWidth})`;

        _this.tabHighlightEle.style[VM.platform.Css.transform] = transform;

      },

    },
    created () {
    },
    mounted () {
      const _this = this;
      let _context = _this.$vnode.context;
      // console.debug('****tabs/tabs.vue页面 组件****')
      // console.log(_this)
      // console.debug('****tabs/tabs.vue页面 组件的调用页面****')
      // console.log(_this.$vnode.context)

      // 初始化
      _this.initTabs();

      // console.info('Tabs mounted this')
      // console.log(_this.$route)
      // console.log(_this.$router)

      /**
       * 监听页面及url的变化
       *
       * 如果router的变化还是在 业务页面(this.$vnode.coontext)中切换,
       * 则计算当前激活的tab然后更新selectedIndex数据;
       *
       * 如果router的变化离开了业务页面, 则不做处理
       *
       * */
      // 激活当前选中的Highlight
      if (_this.tabsHighlight) {
        _this.$eventBus.$on('onPageEnter', ({to, from}) => {

          let _route = to;
          let _tab;
          for (let i = 0, len = _this.tabs.length; len > i; i++) {
            _tab = _this.tabs[i];
            if (!!_tab.to.name && _tab.to.name === _route.name) {
              _this.selectedIndex = i;
              break;
            } else if (!!_tab.to.path && _tab.to.path === _route.path) {
              _this.selectedIndex = i;
              break;
            }
          }


          _this.tabHighlightSelect(_this.selectedIndex)

        })
      }

      //
      // this.$eventBus.$on('onPageLeave',function (params) {
      //   console.debug('onPageLeave')
      //   console.debug(params)
      // })

    },

    activated () {
    },
    deactivated () {
    },
    components: {},
    destroy(){
    }
  }
</script>
