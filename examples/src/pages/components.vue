<template>
    <Page>
        <Header>
            <Navbar>
                <Title>组件列表</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>布局/Layout</ListHeader>
                <Item button :to="{path: '/app'}">
                    <Icon slot="item-left" name="apps"></Icon>
                    <span>根组件</span>
                    <Note slot="item-right">App</Note>
                </Item>
                <Item button :to="{name: 'nav'}">
                    <Icon slot="item-left" name="navigate"></Icon>
                    <span>导航组件</span>
                    <Note slot="item-right">Nav</Note>
                </Item>
                <Item button :to="{name: 'content'}">
                    <Icon slot="item-left" name="paper"></Icon>
                    <span>页面组件</span>
                    <Note slot="item-right">Page</Note>
                </Item>
                <Item button :to="{name: 'grid'}">
                    <Icon slot="item-left" name="grid"></Icon>
                    <span>栅格</span>
                    <Note slot="item-right">Grid</Note>
                </Item>
            </List>
            <List>
                <ListHeader>基础服务/Service</ListHeader>
                <Item button :to="{name:'config'}">
                    <Icon slot="item-left" name="settings"></Icon>
                    <span>配置参数</span>
                    <Note slot="item-right">Config</Note>
                </Item>
                <Item button :to="{name:'platform'}">
                    <Icon slot="item-left" md="logo-android" ios="logo-apple"></Icon>
                    <span>平台参数</span>
                    <Note slot="item-right">Platform</Note>
                </Item>
                <Item button :to="{name:'history'}">
                    <Icon slot="item-left" name="logo-buffer"></Icon>
                    <span>历史记录</span>
                    <Note slot="item-right">History</Note>
                </Item>
            </List>
            <List>
                <ListHeader>跨平台组件/Cross</ListHeader>
                <Item button :to="{name:'crossPlatform'}">
                    <Icon slot="item-left" name="logo-javascript"></Icon>
                    <Label>
                        <h2>跨平台组件</h2>
                        <p>支付宝/钉钉/微信/自研Hybrid</p>
                    </Label>
                    <Note slot="item-right">Cross Platform</Note>
                </Item>
            </List>
            <List>
                <!--通用组件-->
                <ListHeader>通用组件/Common</ListHeader>
                <Item button :to="{name: 'button'}">
                    <Icon slot="item-left" name="download"></Icon>
                    <span>按钮</span>
                    <Note slot="item-right">Button</Note>
                </Item>
                <Item button :to="{name: 'icon'}">
                    <Icon slot="item-left" name="ionitron"></Icon>
                    <span>图标</span>
                    <Note slot="item-right">Icon</Note>
                </Item>
                <Item button :to="{name: 'spinner'}">
                    <Icon slot="item-left" name="medical"></Icon>
                    <span>菊花图</span>
                    <Note slot="item-right">Spinner</Note>
                </Item>
                <Item button :to="{name: 'badge'}">
                    <Icon slot="item-left" name="ribbon"></Icon>
                    <span>徽章</span>
                    <Note slot="item-right">Badge</Note>
                </Item>
                <Item button :to="{name: 'toolbar'}">
                    <Icon slot="item-left" name="briefcase"></Icon>
                    <span>工具条</span>
                    <Note slot="item-right">Toolbar</Note>
                </Item>
                <Item button :to="{name: 'img'}">
                    <Icon slot="item-left" name="image"></Icon>
                    <span>图片</span>
                    <Note slot="item-right">Img</Note>
                </Item>
                <Item button :to="{name: 'backdrop'}">
                    <Icon slot="item-left" name="barcode"></Icon>
                    <span>幕布</span>
                    <Note slot="item-right">Backdrop</Note>
                </Item>
            </List>
            <List>
                <ListHeader>数据录入/Data Entry</ListHeader>
                <Item button :to="{name: 'toggle'}">
                    <Icon slot="item-left" name="swap"></Icon>
                    <span>开关</span>
                    <Note slot="item-right">Toggle</Note>
                </Item>
                <Item button :to="{name: 'checkbox'}">
                    <Icon slot="item-left" name="checkbox"></Icon>
                    <span>复选框</span>
                    <Note slot="item-right">Checkbox</Note>
                </Item>
                <Item button :to="{name: 'radio'}">
                    <Icon slot="item-left" name="radio-button-on"></Icon>
                    <span>单选框</span>
                    <Note slot="item-right">Radio</Note>
                </Item>
                <Item button :to="{name: 'select'}">
                    <Icon slot="item-left" name="list-box"></Icon>
                    <span>选择弹层</span>
                    <Note slot="item-right">Select</Note>
                </Item>
                <Item button :to="{name: 'input'}">
                    <Icon slot="item-left" name="backspace"></Icon>
                    <span>输入框</span>
                    <Note slot="item-right">Input</Note>
                </Item>
                <Item button :to="{name: 'textarea'}">
                    <Icon slot="item-left" name="reorder"></Icon>
                    <span>多行输入</span>
                    <Note slot="item-right">Textarea</Note>
                </Item>
                <Item button :to="{name: 'range'}">
                    <Icon slot="item-left" name="options"></Icon>
                    <span>范围选择</span>
                    <Note slot="item-right">Range</Note>
                </Item>
                <Item button :to="{name: 'searchbar'}">
                    <Icon slot="item-left" name="search"></Icon>
                    <span>搜索栏</span>
                    <Note slot="item-right">SearchBar</Note>
                </Item>
                <Item button :to="{name: 'feedback'}">
                    <Icon slot="item-left" name="archive"></Icon>
                    <span>反馈</span>
                    <Note slot="item-right">Feedback</Note>
                </Item>
                <Item button :to="{name: 'chooseCity'}">
                    <Icon slot="item-left" name="boat"></Icon>
                    <span>城市选择</span>
                    <Note slot="item-right">ChooseCity</Note>
                </Item>
                <Item button :to="{name: 'slideBox'}">
                    <Icon slot="item-left" name="key"></Icon>
                    <span>滑动验证</span>
                    <Note slot="item-right">SlideBox</Note>
                </Item>
                <Item button :to="{name: 'picker'}">
                    <Icon slot="item-left" name="basket"></Icon>
                    <span>单多列选择器</span>
                    <Note slot="item-right">Picker</Note>
                </Item>
                <Item button :to="{name: 'sheet'}">
                    <Icon slot="item-left" name="car"></Icon>
                    <span>弹出单</span>
                    <Note slot="item-right">Sheet</Note>
                </Item>
                <Item button :to="{name: 'popSheet'}">
                    <Icon slot="item-left" name="car"></Icon>
                    <span>弹出窗</span>
                    <Note slot="item-right">PopSheet</Note>
                </Item>
                <Item button>
                    <Icon slot="item-left" name="star"></Icon>
                    <Label>数字支付键盘(未完成)</Label>
                    <Note slot="item-right">Keyboard-1</Note>
                </Item>
                <Item button>
                    <Icon slot="item-left" name="star"></Icon>
                    <Label>第三方保密键盘(未完成)</Label>
                    <Note slot="item-right">Keyboard-2</Note>
                </Item>
                <Item button>
                    <Icon slot="item-left" name="star"></Icon>
                    <Label>进步器(未完成)</Label>
                    <Note slot="item-right">Stepper</Note>
                </Item>
            </List>
            <List>
                <ListHeader>数据加载/Data Loading</ListHeader>
                <Item button :to="{name: 'infinite-scroll'}">
                    <Icon slot="item-left" name="arrow-dropup-circle"></Icon>
                    <span>无限滚动</span>
                    <Note slot="item-right">InfiniteScroll</Note>
                </Item>
                <Item button :to="{name: 'refresher'}">
                    <Icon slot="item-left" name="arrow-dropdown-circle"></Icon>
                    <span>下拉刷新</span>
                    <Note slot="item-right">Refresher</Note>
                </Item>
            </List>
            <List>
                <ListHeader>内容展示/Content Display</ListHeader>
                <Item button :to="{name: 'list'}">
                    <Icon slot="item-left" name="list"></Icon>
                    <span>列表</span>
                    <Note slot="item-right">List</Note>
                </Item>
                <Item button :to="{name:'list.collapse'}">
                    <Icon slot="item-left" name="list"></Icon>
                    <span>手风琴</span>
                    <Note slot="item-right">Collapse</Note>
                </Item>
                <Item button :to="{name:'list.slidingList'}">
                    <Icon slot="item-left" name="list"></Icon>
                    <span>侧滑操作</span>
                    <Note slot="item-right">SlidingItem</Note>
                </Item>
                <Item button :to="{name: 'slides'}">
                    <Icon slot="item-left" name="photos"></Icon>
                    <span>轮播/跑马灯</span>
                    <Note slot="item-right">Slides</Note>
                </Item>
                <Item button :to="{name: 'slidesLite'}">
                    <Icon slot="item-left" name="film"></Icon>
                    <span>轮播(Lite)</span>
                    <Note slot="item-right">SlidesLite</Note>
                </Item>
                <Item button :to="{name: 'cards'}">
                    <Icon slot="item-left" name="calendar"></Icon>
                    <span>卡片</span>
                    <Note slot="item-right">Cards</Note>
                </Item>
                <Item button :to="{name: 'scroll'}">
                    <Icon slot="item-left" name="flash"></Icon>
                    <span>滚动</span>
                    <Note slot="item-right">Scroll</Note>
                </Item>
                <Item button :to="{name: 'separation'}">
                    <Icon slot="item-left" name="remove"></Icon>
                    <span>分割段</span>
                    <Note slot="item-right">Separation</Note>
                </Item>
                <Item button :to="{name: 'deeplink'}">
                    <Icon slot="item-left" name="link"></Icon>
                    <span>跳转到App</span>
                    <Note slot="item-right">Deeplink</Note>
                </Item>
                <Item button :to="{name: 'previewImage'}">
                    <Icon slot="item-left" name="image"></Icon>
                    <span>图片预览</span>
                    <Note slot="item-right">PreviewImage</Note>
                </Item>
                <Item button>
                    <Icon slot="item-left" name="star"></Icon>
                    <span>步骤条(未完成)</span>
                    <Note slot="item-right">Steps</Note>
                </Item>
                <Item button>
                    <Icon slot="item-left" name="star"></Icon>
                    <span>返回顶部(未完成)</span>
                    <Note slot="item-right">BackToTop</Note>
                </Item>
                <Item button>
                    <Icon slot="item-left" name="star"></Icon>
                    <Label>
                        <h2>状态页面(未完成)</h2>
                        <p>成功/失败/开发中/无信号/空白</p>
                    </Label>
                    <Note slot="item-right">StatePage</Note>
                </Item>
                <Item button>
                    <Icon slot="item-left" name="star"></Icon>
                    <span>评分(未完成)</span>
                    <Note slot="item-right">Rating</Note>
                </Item>
            </List>
            <List>
                <ListHeader>提示&操作/Notice&Action</ListHeader>
                <Item button :to="{name: 'alert'}">
                    <Icon slot="item-left" name="alert"></Icon>
                    <span>对话框</span>
                    <Note slot="item-right">Alert</Note>
                </Item>
                <Item button :to="{name: 'loading'}">
                    <Icon slot="item-left" name="refresh"></Icon>
                    <span>加载提示</span>
                    <Note slot="item-right">Loading</Note>
                </Item>
                <Item button :to="{name: 'indicator'}">
                    <Icon slot="item-left" name="more"></Icon>
                    <span>指示器</span>
                    <Note slot="item-right">Indicator</Note>
                </Item>
                <Item button :to="{name: 'modal'}">
                    <Icon slot="item-left" name="chatboxes"></Icon>
                    <span>弹出页</span>
                    <Note slot="item-right">Modal</Note>
                </Item>
                <Item button :to="{name: 'toast'}">
                    <Icon slot="item-left" name="information-circle"></Icon>
                    <span>通知</span>
                    <Note slot="item-right">Toast</Note>
                </Item>
                <Item button :to="{name: 'popover'}">
                    <Icon slot="item-left" name="text"></Icon>
                    <span>提示框</span>
                    <Note slot="item-right">Popover</Note>
                </Item>
                <Item button :to="{name: 'actionSheet'}">
                    <Icon slot="item-left" name="list-box"></Icon>
                    <span>选择单</span>
                    <Note slot="item-right">ActionSheet</Note>
                </Item>
                <Item button :to="{name: 'fab'}">
                    <Icon slot="item-left" name="basketball"></Icon>
                    <span>浮动按钮</span>
                    <Note slot="item-right">Fab</Note>
                </Item>
                <Item button :to="{name: 'noticeBar'}">
                    <Icon slot="item-left" name="compass"></Icon>
                    <span>提示条</span>
                    <Note slot="item-right">NoticeBar</Note>
                </Item>
            </List>
            <List>
                <ListHeader>内容切换/Switch</ListHeader>
                <Item button>
                    <Icon slot="item-left" name="book"></Icon>
                    <span>菜单(Demo未实现)</span>
                    <Note slot="item-right">Menus</Note>
                </Item>
                <Item button :to="{name: 'segment'}">
                    <Icon slot="item-left" name="book"></Icon>
                    <span>小标签</span>
                    <Note slot="item-right">Segment</Note>
                </Item>
                <Item button :to="{name: 'scrollSegment'}">
                    <Icon slot="item-left" name="egg"></Icon>
                    <span>滚动标签</span>
                    <Note slot="item-right">ScrollSegment</Note>
                </Item>
                <Item button :to="{name: 'tabs'}">
                    <Icon slot="item-left" name="link"></Icon>
                    <span>大标签</span>
                    <Note slot="item-right">Tabs</Note>
                </Item>
            </List>
            <List>
                <ListHeader>
                    <span>第三方模块/Third Part</span>
                </ListHeader>
                <Item button :to="{name: 'storage'}">
                    <Icon slot="item-left" name="filing"></Icon>
                    <span>本地存储</span>
                    <Note slot="item-right">Storage</Note>
                </Item>
                <Item button :to="{name: 'geo'}">
                    <Icon slot="item-left" name="pin"></Icon>
                    <span>获取位置</span>
                    <Note slot="item-right">Geolocation</Note>
                </Item>
                <!--<Item button :to="{name: 'log'}">-->
                    <!--<Icon slot="item-left" name="analytics"></Icon>-->
                    <!--<span>日志</span>-->
                    <!--<Note slot="item-right">Log</Note>-->
                <!--</Item>-->
                <!--&lt;!&ndash;Demo&ndash;&gt;-->
                <!--<ListHeader>-->
                <!--<span>Demo</span>-->
                <!--</ListHeader>-->
                <!--&lt;!&ndash;group&ndash;&gt;-->
                <!--<ItemGroup>-->
                <!--<Item button :to="{name: 'demo'}">Demo</Item>-->
                <!--<Item button :to="{name: 'demo_banshi'}">办事指南</Item>-->
                <!--<Item button :to="{name: 'ghostvue'}">ghost</Item>-->
                <!--<Item button :to="{name: 'gl-input'}">GL-Input</Item>-->
                <!--<Item button :to="{name: 'log'}">Log</Item>-->
                <!--</ItemGroup>-->
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less">
</style>
<script type="text/javascript">
  export default {
    name: 'ComponentDemo',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
