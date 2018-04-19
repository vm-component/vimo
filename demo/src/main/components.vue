<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{ $t('title') }}</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>{{ $t('layout') }}</ListHeader>
                <Item detail-push :to="{path: '/app'}">
                    <Icon slot="item-left" name="apps"></Icon>
                    <span>{{$t('app')}}</span>
                </Item>
                <Item detail-push :to="{name: 'content'}">
                    <Icon slot="item-left" name="paper"></Icon>
                    <span>{{$t('page')}}</span>
                </Item>
                <Item detail-push :to="{name: 'grid'}">
                    <Icon slot="item-left" name="grid"></Icon>
                    <span>{{$t('grid')}}</span>
                </Item>
            </List>
            <!--<List>-->
            <!--<ListHeader>基础服务/Service</ListHeader>-->
            <!--<Item detail-push :to="{name:'config'}">-->
            <!--<Icon slot="item-left" name="settings"></Icon>-->
            <!--<span>配置参数</span>-->
            <!--<Note slot="item-right">Config</Note>-->
            <!--</Item>-->
            <!--<Item detail-push :to="{name:'platform'}">-->
            <!--<Icon slot="item-left" md="logo-android" ios="logo-apple"></Icon>-->
            <!--<span>平台参数</span>-->
            <!--<Note slot="item-right">Platform</Note>-->
            <!--</Item>-->
            <!--<Item detail-push :to="{name:'history'}">-->
            <!--<Icon slot="item-left" name="logo-buffer"></Icon>-->
            <!--<span>历史记录</span>-->
            <!--<Note slot="item-right">History</Note>-->
            <!--</Item>-->
            <!--</List>-->
            <!--<List>-->
            <!--<ListHeader>跨平台组件/Cross</ListHeader>-->
            <!--<Item detail-push :to="{name:'crossPlatform'}">-->
            <!--<Icon slot="item-left" name="logo-javascript"></Icon>-->
            <!--<Label>-->
            <!--<h2>跨平台组件</h2>-->
            <!--<p>支付宝/钉钉/微信/自研Hybrid</p>-->
            <!--</Label>-->
            <!--<Note slot="item-right">Cross Platform</Note>-->
            <!--</Item>-->
            <!--</List>-->
            <List>
                <ListHeader>{{$t('navigator')}}</ListHeader>
                <Item detail-push :to="{name: 'menu'}">
                    <Icon slot="item-left" name="apps"></Icon>
                    <span>{{$t('menu')}}</span>
                </Item>
                <Item detail-push :to="{name: 'segment'}">
                    <Icon slot="item-left" name="book"></Icon>
                    <span>{{$t('segment')}}</span>
                </Item>
                <Item detail-push :to="{name: 'scrollSegment'}">
                    <Icon slot="item-left" name="egg"></Icon>
                    <span>{{$t('scrollSegment')}}</span>
                </Item>
                <Item detail-push :to="{name: 'tabs.index'}">
                    <Icon slot="item-left" name="link"></Icon>
                    <span>{{$t('tabs')}}</span>
                </Item>
            </List>
            <List>
                <ListHeader>{{$t('common')}}</ListHeader>
                <Item detail-push :to="{name: 'button'}">
                    <Icon slot="item-left" name="download"></Icon>
                    <span>{{$t('button')}}</span>
                </Item>
                <Item detail-push :to="{name: 'icon'}">
                    <Icon slot="item-left" name="ionitron"></Icon>
                    <span>{{$t('icon')}}</span>
                </Item>
                <Item detail-push :to="{name: 'spinner'}">
                    <Icon slot="item-left" name="medical"></Icon>
                    <span>{{$t('spinner')}}</span>
                </Item>
                <Item detail-push :to="{name: 'badge'}">
                    <Icon slot="item-left" name="ribbon"></Icon>
                    <span>{{$t('badge')}}</span>
                </Item>
                <Item detail-push :to="{name: 'toolbar'}">
                    <Icon slot="item-left" name="briefcase"></Icon>
                    <span>{{$t('toolbar')}}</span>
                </Item>
                <Item detail-push :to="{name: 'img'}">
                    <Icon slot="item-left" name="image"></Icon>
                    <span>{{$t('image')}}</span>
                </Item>
                <Item detail-push :to="{name: 'backdrop'}">
                    <Icon slot="item-left" name="barcode"></Icon>
                    <span>{{$t('backdrop')}}</span>
                </Item>
            </List>
            <List>
                <ListHeader>{{$t('dataEntry')}}</ListHeader>
                <Item detail-push :to="{name: 'toggle'}">
                    <Icon slot="item-left" name="swap"></Icon>
                    <span>{{$t('toggle')}}</span>
                </Item>
                <Item detail-push :to="{name: 'checkbox'}">
                    <Icon slot="item-left" name="checkbox"></Icon>
                    <span>{{$t('checkbox')}}</span>
                </Item>
                <Item detail-push :to="{name: 'radio'}">
                    <Icon slot="item-left" name="radio-button-on"></Icon>
                    <span>{{$t('radio')}}</span>
                </Item>
                <Item detail-push :to="{name: 'select'}">
                    <Icon slot="item-left" name="list-box"></Icon>
                    <span>{{$t('select')}}</span>
                </Item>
                <Item detail-push :to="{name: 'input'}">
                    <Icon slot="item-left" name="backspace"></Icon>
                    <span>{{$t('input')}}</span>
                </Item>
                <Item detail-push :to="{name: 'textarea'}">
                    <Icon slot="item-left" name="reorder"></Icon>
                    <span>{{$t('textarea')}}</span>
                </Item>
                <Item detail-push :to="{name: 'range'}">
                    <Icon slot="item-left" name="options"></Icon>
                    <span>{{$t('range')}}</span>
                </Item>
                <Item detail-push :to="{name: 'searchbar'}">
                    <Icon slot="item-left" name="search"></Icon>
                    <span>{{$t('searchbar')}}</span>
                </Item>
                <!--<Item detail-push :to="{name: 'feedback'}">-->
                <!--<Icon slot="item-left" name="archive"></Icon>-->
                <!--<span>反馈</span>-->
                <!--<Note slot="item-right">Feedback</Note>-->
                <!--</Item>-->
                <Item detail-push :to="{name: 'picker'}">
                    <Icon slot="item-left" name="basket"></Icon>
                    <span>{{$t('picker')}}</span>
                </Item>
                <!--<Item detail-push :to="{name: 'sheet'}">-->
                <!--<Icon slot="item-left" name="barcode"></Icon>-->
                <!--<span>弹出单</span>-->
                <!--<Note slot="item-right">Sheet</Note>-->
                <!--</Item>-->
                <!--<Item detail-push :to="{name: 'popSheet'}">-->
                <!--<Icon slot="item-left" name="archive"></Icon>-->
                <!--<span>弹出窗</span>-->
                <!--<Note slot="item-right">PopSheet</Note>-->
                <!--</Item>-->
                <!--<Item detail-push>-->
                <!--<Icon slot="item-left" name="star"></Icon>-->
                <!--<Label>数字支付键盘(未完成)</Label>-->
                <!--<Note slot="item-right">Keyboard-1</Note>-->
                <!--</Item>-->
                <!--<Item detail-push>-->
                <!--<Icon slot="item-left" name="star"></Icon>-->
                <!--<Label>第三方保密键盘(未完成)</Label>-->
                <!--<Note slot="item-right">Keyboard-2</Note>-->
                <!--</Item>-->
                <!--<Item detail-push>-->
                <!--<Icon slot="item-left" name="star"></Icon>-->
                <!--<Label>进步器(未完成)</Label>-->
                <!--<Note slot="item-right">Stepper</Note>-->
                <!--</Item>-->
            </List>
            <List>
                <ListHeader>{{$t('dataLoading')}}</ListHeader>
                <Item detail-push :to="{name: 'infiniteScroll'}">
                    <Icon slot="item-left" name="arrow-dropup-circle"></Icon>
                    <span>{{$t('infiniteScroll')}}</span>
                </Item>
                <Item detail-push :to="{name: 'refresher'}">
                    <Icon slot="item-left" name="arrow-dropdown-circle"></Icon>
                    <span>{{$t('refresher')}}</span>
                </Item>
            </List>
            <List>
                <ListHeader>内容展示/Content Display</ListHeader>
                <Item detail-push :to="{name: 'list'}">
                    <Icon slot="item-left" name="list"></Icon>
                    <span>列表</span>
                    <Note slot="item-right">List</Note>
                </Item>
                <Item detail-push :to="{name:'list.collapse'}">
                    <Icon slot="item-left" name="filing"></Icon>
                    <span>手风琴</span>
                    <Note slot="item-right">Collapse</Note>
                </Item>
                <Item detail-push :to="{name:'list.slidingList'}">
                    <Icon slot="item-left" name="hand"></Icon>
                    <span>侧滑操作</span>
                    <Note slot="item-right">SlidingItem</Note>
                </Item>
                <Item detail-push :to="{name: 'slides'}">
                    <Icon slot="item-left" name="photos"></Icon>
                    <span>轮播/跑马灯</span>
                    <Note slot="item-right">Slides</Note>
                </Item>
                <Item detail-push :to="{name: 'slidesLite'}">
                    <Icon slot="item-left" name="film"></Icon>
                    <span>轮播(Lite)</span>
                    <Note slot="item-right">SlidesLite</Note>
                </Item>
                <Item detail-push :to="{name: 'cards'}">
                    <Icon slot="item-left" name="calendar"></Icon>
                    <span>卡片</span>
                    <Note slot="item-right">Cards</Note>
                </Item>
                <Item detail-push :to="{name: 'scroll'}">
                    <Icon slot="item-left" name="flash"></Icon>
                    <span>滚动</span>
                    <Note slot="item-right">Scroll</Note>
                </Item>
                <Item detail-push :to="{name: 'separation'}">
                    <Icon slot="item-left" name="remove"></Icon>
                    <span>分割段</span>
                    <Note slot="item-right">Separation</Note>
                </Item>
                <Item detail-push :to="{name: 'previewImage'}">
                    <Icon slot="item-left" name="image"></Icon>
                    <span>图片预览</span>
                    <Note slot="item-right">PreviewImage</Note>
                </Item>
                <!--<Item detail-push>-->
                <!--<Icon slot="item-left" name="star"></Icon>-->
                <!--<span>步骤条(未完成)</span>-->
                <!--<Note slot="item-right">Steps</Note>-->
                <!--</Item>-->

                <!--<Item detail-push>-->
                <!--<Icon slot="item-left" name="star"></Icon>-->
                <!--<span>评分(未完成)</span>-->
                <!--<Note slot="item-right">Rating</Note>-->
                <!--</Item>-->
                <!--<Item detail-push>-->
                <!--<Icon slot="item-left" name="star"></Icon>-->
                <!--<Label>-->
                <!--<h2>状态页面(未完成)</h2>-->
                <!--<p>成功/失败/开发中/无信号/空白</p>-->
                <!--</Label>-->
                <!--<Note slot="item-right">StatePage</Note>-->
                <!--</Item>-->
            </List>
            <List>
                <ListHeader>提示&操作/Notice&Action</ListHeader>
                <Item detail-push :to="{name: 'alert'}">
                    <Icon slot="item-left" name="alert"></Icon>
                    <span>对话框</span>
                    <Note slot="item-right">Alert</Note>
                </Item>
                <Item detail-push :to="{name: 'loading'}">
                    <Icon slot="item-left" name="refresh"></Icon>
                    <span>加载提示</span>
                    <Note slot="item-right">Loading</Note>
                </Item>
                <Item detail-push :to="{name: 'indicator'}">
                    <Icon slot="item-left" name="more"></Icon>
                    <span>指示器</span>
                    <Note slot="item-right">Indicator</Note>
                </Item>
                <Item detail-push :to="{name: 'modal'}">
                    <Icon slot="item-left" name="chatboxes"></Icon>
                    <span>弹出页</span>
                    <Note slot="item-right">Modal</Note>
                </Item>
                <Item detail-push :to="{name: 'toast'}">
                    <Icon slot="item-left" name="information-circle"></Icon>
                    <span>通知</span>
                    <Note slot="item-right">Toast</Note>
                </Item>
                <Item detail-push :to="{name: 'toastState'}">
                    <Icon slot="item-left" name="information-circle"></Icon>
                    <span>通知(状态)</span>
                    <Note slot="item-right">ToastState</Note>
                </Item>
                <Item detail-push :to="{name: 'popover'}">
                    <Icon slot="item-left" name="text"></Icon>
                    <span>提示框</span>
                    <Note slot="item-right">Popover</Note>
                </Item>
                <Item detail-push :to="{name: 'actionSheet'}">
                    <Icon slot="item-left" name="list-box"></Icon>
                    <span>选择单</span>
                    <Note slot="item-right">ActionSheet</Note>
                </Item>
                <Item detail-push :to="{name: 'fab'}">
                    <Icon slot="item-left" name="basketball"></Icon>
                    <span>浮动按钮</span>
                    <Note slot="item-right">Fab</Note>
                </Item>
                <Item detail-push :to="{name: 'noticeBar'}">
                    <Icon slot="item-left" name="compass"></Icon>
                    <span>提示条</span>
                    <Note slot="item-right">NoticeBar</Note>
                </Item>
                <!--<Item detail-push>-->
                <!--<Icon slot="item-left" name="star"></Icon>-->
                <!--<span>返回顶部(未完成)</span>-->
                <!--<Note slot="item-right">BackToTop</Note>-->
                <!--</Item>-->
            </List>
            <!--<List>-->
            <!--<ListHeader>业务组件/Business Component</ListHeader>-->
            <!--<Item detail-push :to="{name: 'chooseCity'}">-->
            <!--<Icon slot="item-left" name="boat"></Icon>-->
            <!--<span>城市选择</span>-->
            <!--<Note slot="item-right">ChooseCity</Note>-->
            <!--</Item>-->
            <!--<Item detail-push :to="{name: 'slideBox'}">-->
            <!--<Icon slot="item-left" name="key"></Icon>-->
            <!--<span>滑动验证</span>-->
            <!--<Note slot="item-right">SlideBox</Note>-->
            <!--</Item>-->
            <!--<Item detail-push>-->
            <!--<Icon slot="item-left" name="pricetag"></Icon>-->
            <!--<span>分类选择(未完成)</span>-->
            <!--<Note slot="item-right">Category</Note>-->
            <!--</Item>-->
            <!--</List>-->
        </Content>
    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/javascript">
  export default {
    name: 'DemoComponent',
    i18n: {
      messages: {
        'zh-CN': {
          title: '组件',
          // 布局
          layout: '布局',
          app: '根组件',
          page: '页面组件',
          grid: '栅格',
          // 导航
          navigator: '导航',
          menu: '菜单',
          segment: '小标签',
          scrollSegment: '滚动标签',
          tabs: '大标签',
          // 通用组件
          common: '通用组件',
          button: '按钮',
          icon: '图标',
          spinner: '菊花图',
          badge: '徽章',
          toolbar: '工具条',
          image: '图片',
          backdrop: '幕布',
          // 数据录入
          dataEntry: '数据录入',
          toggle: '开关',
          checkbox: '复选框',
          radio: '单选框',
          select: '选择弹层',
          input: '输入框',
          textarea: '多行输入',
          range: '范围选择',
          searchbar: '搜索栏',
          picker: '单多列选择器',
          // 数据加载
          dataLoading: '数据加载',
          infiniteScroll: '无限滚动',
          refresher: '下拉刷新',

          rest: '页面组件'
        },
        'en-US': {
          title: 'Components',
          // 布局
          layout: 'Layout',
          app: 'App',
          page: 'Page',
          grid: 'Grid',
          // 导航
          navigator: 'Navigator',
          menu: 'Menu',
          segment: 'Segment',
          scrollSegment: 'Scroll Segment',
          tabs: 'Tabs',
          // 通用组件
          common: 'Common',
          button: 'Button',
          icon: 'Icon',
          spinner: 'Spinner',
          badge: 'Badge',
          toolbar: 'Toolbar',
          image: 'Img',
          backdrop: 'Backdrop',
          // 数据录入
          dataEntry: 'Data Entry',
          toggle: 'Toggle',
          checkbox: 'Checkbox',
          radio: 'Radio',
          select: 'Select',
          input: 'Input',
          textarea: 'Textarea',
          range: 'Range',
          searchbar: 'SearchBar',
          picker: 'Picker',
          // 数据加载
          dataLoading: 'Data Loading',
          infiniteScroll: 'Infinite Scroll',
          refresher: 'Refresher',

          rest: '页面组件'
        }
      }
    },
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {
    },
    activated () {
    }
  }
</script>
