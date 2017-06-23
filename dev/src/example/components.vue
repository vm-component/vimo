<template>
    <Page>
        <Header>
            <Navbar>
                <Title>组件</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" no-bounce>
            <List>
                <!--基础组件-->
                <ListHeader>
                    <span>基础组件</span>
                </ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item detail-push :to="{name: 'app'}">
                        <Icon slot="item-left" name="apps"></Icon>
                        <span>根组件</span>
                        <Note slot="item-right">App</Note>
                    </Item>
                    <Item detail-push :to="{name: 'nav'}">
                        <Icon slot="item-left" name="navigate"></Icon>
                        <span>导航</span>
                        <Note slot="item-right">Nav</Note>
                    </Item>
                    <Item detail-push :to="{name: 'content'}">
                        <Icon slot="item-left" name="paper"></Icon>
                        <span>页面</span>
                        <Note slot="item-right">Page</Note>
                    </Item>
                </ItemGroup>

                <ListHeader>
                    <span>公共服务</span>
                </ListHeader>
                <ItemGroup>
                    <Item detail-push :to="{name:'config'}">
                        <Icon slot="item-left" name="settings"></Icon>
                        <span>配置参数</span>
                        <Note slot="item-right">Config</Note>
                    </Item>
                    <Item detail-push :to="{name:'platform'}">
                        <Icon slot="item-left" md="logo-android" ios="logo-apple"></Icon>
                        <span>平台参数</span>
                        <Note slot="item-right">Platform</Note>
                    </Item>
                    <Item detail-push :to="{name:'crossPlatform'}">
                        <Icon slot="item-left" name="logo-javascript"></Icon>
                        <span>跨平台组件</span>
                        <Note slot="item-right">Cross Platform</Note>
                    </Item>
                    <Item detail-push :to="{name:'history'}">
                        <Icon slot="item-left" name="logo-buffer"></Icon>
                        <span>历史记录</span>
                        <Note slot="item-right">History</Note>
                    </Item>
                </ItemGroup>
                <!--通用组件-->
                <ListHeader>通用组件</ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item detail-push :to="{name: 'toolbar'}">
                        <Icon slot="item-left" name="briefcase"></Icon>
                        <span>工具条</span>
                        <Note slot="item-right">Toolbar</Note>
                    </Item>
                    <Item detail-push :to="{name: 'grid'}">
                        <Icon slot="item-left" name="grid"></Icon>
                        <span>栅格</span>
                        <Note slot="item-right">Grid</Note>
                    </Item>
                    <Item detail-push :to="{name: 'button'}">
                        <Icon slot="item-left" name="download"></Icon>
                        <span>按钮</span>
                        <Note slot="item-right">Button</Note>
                    </Item>
                    <Item detail-push :to="{name: 'icon'}">
                        <Icon slot="item-left" name="ionitron"></Icon>
                        <span>图标</span>
                        <Note slot="item-right">Icon</Note>
                    </Item>
                    <Item detail-push :to="{name: 'spinner'}">
                        <Icon slot="item-left" name="medical"></Icon>
                        <span>菊花图</span>
                        <Note slot="item-right">Spinner</Note>
                    </Item>
                    <Item detail-push :to="{name: 'badge'}">
                        <Icon slot="item-left" name="ribbon"></Icon>
                        <span>徽章</span>
                        <Note slot="item-right">Badge</Note>
                    </Item>
                    <Item detail-push :to="{name: 'cards'}">
                        <Icon slot="item-left" name="calendar"></Icon>
                        <span>卡片</span>
                        <Note slot="item-right">Cards</Note>
                    </Item>
                    <Item detail-push :to="{name: 'fab'}">
                        <Icon slot="item-left" name="basketball"></Icon>
                        <span>浮动按钮</span>
                        <Note slot="item-right">Fab</Note>
                    </Item>
                    <Item detail-push :to="{name: 'img'}">
                        <Icon slot="item-left" name="image"></Icon>
                        <span>图片</span>
                        <Note slot="item-right">Img</Note>
                    </Item>
                    <Item detail-push :to="{name: 'slides'}">
                        <Icon slot="item-left" name="photos"></Icon>
                        <span>轮播</span>
                        <Note slot="item-right">Slides</Note>
                    </Item>
                    <Item detail-push :to="{name: 'slidesLite'}">
                        <Icon slot="item-left" name="film"></Icon>
                        <span>轮播(Lite)</span>
                        <Note slot="item-right">SlidesLite</Note>
                    </Item>
                    <Item detail-push :to="{name: 'scroll'}">
                        <Icon slot="item-left" name="flash"></Icon>
                        <span>滚动</span>
                        <Note slot="item-right">Scroll</Note>
                    </Item>
                    <Item detail-push :to="{name: 'feedback'}">
                        <Icon slot="item-left" name="archive"></Icon>
                        <span>反馈</span>
                        <Note slot="item-right">Feedback</Note>
                    </Item>
                    <Item detail-push :to="{name: 'scrollSegment'}">
                        <Icon slot="item-left" name="egg"></Icon>
                        <span>滚动段</span>
                        <Note slot="item-right">ScrollSegment</Note>
                    </Item>
                    <Item detail-push :to="{name: 'noticeBar'}">
                        <Icon slot="item-left" name="compass"></Icon>
                        <span>提示条</span>
                        <Note slot="item-right">NoticeBar</Note>
                    </Item>
                    <Item detail-push :to="{name: 'separation'}">
                        <Icon slot="item-left" name="remove"></Icon>
                        <span>分割段</span>
                        <Note slot="item-right">Separation</Note>
                    </Item>
                    <Item detail-push :to="{name: 'slideBox'}">
                        <Icon slot="item-left" name="key"></Icon>
                        <span>滑动验证</span>
                        <Note slot="item-right">SlideBox</Note>
                    </Item>
                    <Item detail-push :to="{name: 'deeplink'}">
                        <Icon slot="item-left" name="link"></Icon>
                        <span>跳转到App</span>
                        <Note slot="item-right">Deeplink</Note>
                    </Item>
                    <Item detail-push :to="{name: 'previewImage'}">
                        <Icon slot="item-left" name="image"></Icon>
                        <span>图片预览</span>
                        <Note slot="item-right">PreviewImage</Note>
                    </Item>
                    <Item detail-push :to="{name: 'chooseCity'}">
                        <Icon slot="item-left" name="boat"></Icon>
                        <span>城市选择</span>
                        <Note slot="item-right">ChooseCity</Note>
                    </Item>
                </ItemGroup>

                <!--List组件-->
                <ListHeader>List组件</ListHeader>
                <ItemGroup>
                    <Item detail-push :to="{name: 'list'}">
                        <Icon slot="item-left" name="list"></Icon>
                        <span>列表</span>
                        <Note slot="item-right">List</Note>
                    </Item>
                    <Item detail-push :to="{name: 'infinite-scroll'}">
                        <Icon slot="item-left" name="arrow-dropup-circle"></Icon>
                        <span>无限滚动</span>
                        <Note slot="item-right">InfiniteScroll</Note>
                    </Item>
                    <Item detail-push :to="{name: 'refresher'}">
                        <Icon slot="item-left" name="arrow-dropdown-circle"></Icon>
                        <span>下拉刷新</span>
                        <Note slot="item-right">Refresher</Note>
                    </Item>
                </ItemGroup>

                <!--Tabs组件-->
                <ListHeader>Tabs组件</ListHeader>
                <ItemGroup>
                    <Item detail-push :to="{name: 'segment'}">
                        <Icon slot="item-left" name="book"></Icon>
                        <span>小标签</span>
                        <Note slot="item-right">Segment</Note>
                    </Item>
                    <Item detail-push :to="{name: 'tabs'}">
                        <Icon slot="item-left" name="link"></Icon>
                        <span>大标签</span>
                        <Note slot="item-right">Tabs</Note>
                    </Item>
                </ItemGroup>


                <!--Form组件-->
                <ListHeader>Form组件</ListHeader>
                <ItemGroup>
                    <Item detail-push :to="{name: 'toggle'}">
                        <Icon slot="item-left" name="swap"></Icon>
                        <span>开关</span>
                        <Note slot="item-right">Toggle</Note>
                    </Item>
                    <Item detail-push :to="{name: 'checkbox'}">
                        <Icon slot="item-left" name="checkbox"></Icon>
                        <span>复选框</span>
                        <Note slot="item-right">Checkbox</Note>
                    </Item>
                    <Item detail-push :to="{name: 'radio'}">
                        <Icon slot="item-left" name="radio-button-on"></Icon>
                        <span>单选框</span>
                        <Note slot="item-right">Radio</Note>
                    </Item>

                    <Item detail-push :to="{name: 'select'}">
                        <Icon slot="item-left" name="list-box"></Icon>
                        <span>选择弹层</span>
                        <Note slot="item-right">Select</Note>
                    </Item>

                    <Item detail-push :to="{name: 'input'}">
                        <Icon slot="item-left" name="backspace"></Icon>
                        <span>输入框</span>
                        <Note slot="item-right">Input</Note>
                    </Item>
                    <Item detail-push :to="{name: 'range'}">
                        <Icon slot="item-left" name="options"></Icon>
                        <span>范围选择</span>
                        <Note slot="item-right">Range</Note>
                    </Item>
                    <Item detail-push :to="{name: 'searchbar'}">
                        <Icon slot="item-left" name="search"></Icon>
                        <span>搜索栏</span>
                        <Note slot="item-right">SearchBar</Note>
                    </Item>
                </ItemGroup>


                <!--弹出层组件-->
                <ListHeader>
                    <span>弹出层组件</span>
                </ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item detail-push :to="{name: 'actionSheet'}">
                        <Icon slot="item-left" name="list-box"></Icon>
                        <span>选择单</span>
                        <Note slot="item-right">ActionSheet</Note>
                    </Item>
                    <Item detail-push :to="{name: 'alert'}">
                        <Icon slot="item-left" name="alert"></Icon>
                        <span>对话框</span>
                        <Note slot="item-right">Alert</Note>
                    </Item>
                    <Item detail-push :to="{name: 'backdrop'}">
                        <Icon slot="item-left" name="barcode"></Icon>
                        <span>幕布</span>
                        <Note slot="item-right">Backdrop</Note>
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
                    <Item detail-push :to="{name: 'picker'}">
                        <Icon slot="item-left" name="basket"></Icon>
                        <span>单多列选择器</span>
                        <Note slot="item-right">Picker</Note>
                    </Item>
                    <Item detail-push :to="{name: 'popover'}">
                        <Icon slot="item-left" name="text"></Icon>
                        <span>提示框</span>
                        <Note slot="item-right">Popover</Note>
                    </Item>
                </ItemGroup>

                <!--模块-->
                <ListHeader>
                    <span>模块</span>
                </ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item detail-push :to="{name: 'storage'}">
                        <Icon slot="item-left" name="filing"></Icon>
                        <span>本地存储</span>
                        <Note slot="item-right">Storage</Note>
                    </Item>
                    <Item detail-push :to="{name: 'geo'}">
                        <Icon slot="item-left" name="pin"></Icon>
                        <span>获取位置</span>
                        <Note slot="item-right">Geolocation</Note>
                    </Item>

                    <Item detail-push :to="{name: 'log'}">
                        <Icon slot="item-left" name="analytics"></Icon>
                        <span>日志</span>
                        <Note slot="item-right">Log</Note>
                    </Item>
                </ItemGroup>

                <!--&lt;!&ndash;Demo&ndash;&gt;-->
                <!--<ListHeader>-->
                <!--<span>Demo</span>-->
                <!--</ListHeader>-->
                <!--&lt;!&ndash;group&ndash;&gt;-->
                <!--<ItemGroup>-->
                <!--<Item detail-push :to="{name: 'demo'}">Demo</Item>-->
                <!--<Item detail-push :to="{name: 'demo_banshi'}">办事指南</Item>-->
                <!--<Item detail-push :to="{name: 'ghostvue'}">ghost</Item>-->
                <!--<Item detail-push :to="{name: 'gl-input'}">GL-Input</Item>-->
                <!--<Item detail-push :to="{name: 'log'}">Log</Item>-->
                <!--</ItemGroup>-->
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
</style>
<script type="text/javascript">
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item } from 'vimo/components/item'
  import { Note } from 'vimo/components/note'
  export default{
    name: 'name',
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
    components: {
      List, ListHeader, ItemGroup, Item, Note
    }
  }
</script>
