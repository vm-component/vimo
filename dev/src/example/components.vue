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
                    <Item button :to="{name: 'app'}">
                        <Icon slot="item-left" name="browsers"></Icon>
                        <span>整体 (App)</span>
                    </Item>
                    <Item button :to="{name: 'content'}">
                        <Icon slot="item-left" name="chatboxes"></Icon>
                        <span>布局 (Content)</span>
                    </Item>

                </ItemGroup>

                <!--通用组件-->
                <ListHeader>通用组件</ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item button :to="{name: 'toolbar'}">
                        <Icon slot="item-left" name="briefcase"></Icon>
                        <span>工具条 (Toolbar)</span>
                    </Item>
                    <Item button :to="{name: 'grid'}">
                        <Icon slot="item-left" name="keypad"></Icon>
                        <span>栅格 (Grid)</span>
                    </Item>
                    <Item button :to="{name: 'button'}">
                        <Icon slot="item-left" name="download"></Icon>
                        <span>按钮 (Button)</span>
                    </Item>
                    <Item button :to="{name: 'icon'}">
                        <Icon slot="item-left" name="color-filter"></Icon>
                        <span>图标 (Icon)</span>
                    </Item>
                    <Item button :to="{name: 'spinner'}">
                        <Icon slot="item-left" name="medical"></Icon>
                        <span>菊花图 (Spinner)</span>
                    </Item>
                    <Item button :to="{name: 'cards'}">
                        <Icon slot="item-left" name="calendar"></Icon>
                        <span>卡片 (Cards)</span>
                    </Item>
                    <Item button :to="{name: 'fab'}">
                        <Icon slot="item-left" name="basketball"></Icon>
                        <span>Fab</span>
                    </Item>
                    <Item button :to="{name: 'img'}">
                        <Icon slot="item-left" name="image"></Icon>
                        <span>图片 (Img)</span>
                    </Item>
                    <Item button :to="{name: 'slides'}">
                        <Icon slot="item-left" name="image"></Icon>
                        <span>轮播 (Slides)</span>
                    </Item>
                </ItemGroup>

                <!--List组件-->
                <ListHeader>List组件</ListHeader>
                <ItemGroup>
                    <Item button :to="{name: 'list'}">
                        <Icon slot="item-left" name="list"></Icon>
                        <span>列表 (List)</span>
                    </Item>
                    <Item button :to="{name: 'infinite-scroll'}">
                        <Icon slot="item-left" name="car"></Icon>
                        <span>无限滚动 (InfiniteScroll)</span>
                    </Item>
                    <Item button :to="{name: 'refresher'}">
                        <Icon slot="item-left" name="book"></Icon>
                        <span>下拉刷新 (Refresher)</span>
                    </Item>
                </ItemGroup>

                <!--Tabs组件-->
                <ListHeader>Tabs组件</ListHeader>
                <ItemGroup>
                    <Item button :to="{name: 'segment'}">
                        <Icon slot="item-left" name="book"></Icon>
                        <span>小标签 (Segment)</span>
                    </Item>
                    <Item button :to="{name: 'tabs'}">
                        <Icon slot="item-left" name="star"></Icon>
                        <span>大标签 (Tabs)</span>
                    </Item>
                </ItemGroup>


                <!--Form组件-->
                <ListHeader>Form组件</ListHeader>
                <ItemGroup>
                    <Item button :to="{name: 'toggle'}">
                        <Icon slot="item-left" name="settings"></Icon>
                        <span>开关 (Toggle)</span>
                    </Item>
                    <Item button :to="{name: 'checkbox'}">
                        <Icon slot="item-left" name="checkmark"></Icon>
                        <span>复选框 (Checkbox)</span>
                    </Item>
                    <Item button :to="{name: 'radio'}">
                        <Icon slot="item-left" name="flask"></Icon>
                        <span>单选框 (Radio)</span>
                    </Item>

                    <Item button :to="{name: 'select'}">
                        <Icon slot="item-left" name="pie"></Icon>
                        <span>选择弹层 (Select)</span>
                    </Item>

                    <Item button :to="{name: 'input'}">
                        <Icon slot="item-left" name="cart"></Icon>
                        <span>输入框 (Input)</span>
                    </Item>
                    <Item button :to="{name: 'range'}">
                        <Icon slot="item-left" name="book"></Icon>
                        <span>范围选择 (Range)</span>
                    </Item>
                    <Item button :to="{name: 'searchbar'}">
                        <Icon slot="item-left" name="search"></Icon>
                        <span>搜索栏 (SearchBar)</span>
                    </Item>
                </ItemGroup>


                <!--弹出层组件-->
                <ListHeader>
                    <span>弹出层组件</span>
                </ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item button :to="{name: 'actionSheet'}">
                        <Icon slot="item-left" name="list"></Icon>
                        <span>选择单 (ActionSheet)</span>
                    </Item>
                    <Item button :to="{name: 'alert'}">
                        <Icon slot="item-left" name="albums"></Icon>
                        <span>提示框 (Alert)</span>
                    </Item>
                    <Item button :to="{name: 'backdrop'}">
                        <Icon slot="item-left" name="barcode"></Icon>
                        <span>幕布 (Backdrop)</span>
                    </Item>
                    <Item button :to="{name: 'loading'}">
                        <Icon slot="item-left" name="refresh"></Icon>
                        <span>加载提示 (Loading)</span>
                    </Item>
                    <Item button :to="{name: 'indicator'}">
                        <Icon slot="item-left" name="refresh"></Icon>
                        <span>指示器 (Indicator)</span>
                    </Item>
                    <Item button :to="{name: 'modal'}">
                        <Icon slot="item-left" name="photos"></Icon>
                        <span>弹出页 (Modal)</span>
                    </Item>
                    <Item button :to="{name: 'toast'}">
                        <Icon slot="item-left" name="cloud"></Icon>
                        <span>通知 (Toast)</span>
                    </Item>
                    <Item button :to="{name: 'city-picker'}">
                        <Icon slot="item-left" name="cloud"></Icon>
                        <span>Picker</span>
                    </Item>
                    <!--<Item button :to="{name: 'popover'}">-->
                    <!--<Icon slot="item-left" name="ios-flame"></Icon>-->
                    <!--<span>Popover</span>-->
                    <!--</Item>-->


                </ItemGroup>

                <!--模块-->
                <ListHeader>
                    <span>模块</span>
                </ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item button :to="{name: 'storage'}">
                        <Icon slot="item-left" name="list"></Icon>
                        <span>本地存储 (Storage)</span>
                    </Item>
                    <Item button :to="{name: 'position'}">
                        <Icon slot="item-left" name="list"></Icon>
                        <span>获取位置 (Position)</span>
                    </Item>
                </ItemGroup>

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
<style scoped lang="scss">
</style>
<script type="text/javascript">
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item } from 'vimo/components/item'
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
      List, ListHeader, ItemGroup, Item
    }
  }
</script>
