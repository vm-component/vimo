<template>
  <Page>
    <Header>
      <Navbar>
        <Title>组件</Title>
      </Navbar>
    </Header>
    <Content>
      <List>
        <!--基础组件-->
        <ListHeader>
          基础组件
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'app'}">
            <Icon slot="item-left" name="browsers"></Icon>
            整体 (App)
          </Item>
          <Item button :to="{name: 'content'}">
            <Icon slot="item-left" name="chatboxes"></Icon>
            布局 (Header/Content/Footer)
          </Item>
          <Item button :to="{name: 'toolbar'}">
            <Icon slot="item-left" name="briefcase"></Icon>
            工具条 (Toolbar)
          </Item>
          <Item button :to="{name: 'grid'}">
            <Icon slot="item-left" name="keypad"></Icon>
            栅格 (Grid)
          </Item>
        </ItemGroup>

        <!--通用组件-->
        <ListHeader>通用组件</ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'button'}">
            <Icon slot="item-left" name="download"></Icon>
            按钮 (Button)
          </Item>
          <Item button :to="{name: 'icon'}">
            <Icon slot="item-left" name="color-filter"></Icon>
            图标 (Icon)
          </Item>
          <Item button :to="{name: 'spinner'}">
            <Icon slot="item-left" name="medical"></Icon>
            菊花图 (Spinner)
          </Item>
          <Item button :to="{name: 'cards'}">
            <Icon slot="item-left" name="calendar"></Icon>
            卡片 (Cards)
          </Item>
          <Item button :to="{name: 'fab'}">
            <Icon slot="item-left" name="basketball"></Icon>
            Fab
          </Item>
          <Item button :to="{name: 'img'}">
            <Icon slot="item-left" name="image"></Icon>
            图片 (Img)
          </Item>
          <Item button :to="{name: 'swiper'}">
            <Icon slot="item-left" name="image"></Icon>
            轮播 (Swiper)
          </Item>
        </ItemGroup>

        <!--List组件-->
        <ListHeader>List组件</ListHeader>
        <ItemGroup>
          <Item button :to="{name: 'list'}">
            <Icon slot="item-left" name="list"></Icon>
            列表 (List)
          </Item>
          <Item button :to="{name: 'infinite-scroll'}">
            <Icon slot="item-left" name="car"></Icon>
            无限滚动 (InfiniteScroll)
          </Item>
          <Item button :to="{name: 'refresher'}">
            <Icon slot="item-left" name="book"></Icon>
            下拉刷新 (Refresher)
          </Item>
        </ItemGroup>

        <!--Tabs组件-->
        <ListHeader>Tabs组件</ListHeader>
        <ItemGroup>
          <Item button :to="{name: 'segment'}">
            <Icon slot="item-left" name="book"></Icon>
            分段 (Segment)
          </Item>
          <Item button :to="{name: 'tabs'}">
            <Icon slot="item-left" name="star"></Icon>
            标签页 (Tabs)
          </Item>
        </ItemGroup>


        <!--Form组件-->
        <ListHeader>Form组件</ListHeader>
        <ItemGroup>
          <Item button :to="{name: 'toggle'}">
            <Icon slot="item-left" name="book"></Icon>
            开关 (Toggle)
          </Item>
          <Item button :to="{name: 'input'}">
            <Icon slot="item-left" name="cart"></Icon>
            输入框 (Input)
          </Item>
          <Item button :to="{name: 'range'}">
            <Icon slot="item-left" name="book"></Icon>
            范围选择 (Range)
          </Item>
          <Item button :to="{name: 'searchbar'}">
            <Icon slot="item-left" name="search"></Icon>
            搜索栏 (SearchBar)
          </Item>
        </ItemGroup>


        <!--弹出层组件-->
        <ListHeader>
          弹出层组件
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'actionSheet'}">
            <Icon slot="item-left" name="list"></Icon>
            ActionSheet
          </Item>
          <Item button :to="{name: 'alert'}">
            <Icon slot="item-left" name="albums"></Icon>
            Alert
          </Item>
          <Item button :to="{name: 'backdrop'}">
            <Icon slot="item-left" name="barcode"></Icon>
            Backdrop
          </Item>
          <Item button :to="{name: 'loading'}">
            <Icon slot="item-left" name="refresh"></Icon>
            Loading
          </Item>
          <Item button :to="{name: 'modal'}">
            <Icon slot="item-left" name="photos"></Icon>
            Modal
          </Item>
          <Item button :to="{name: 'toast'}">
            <Icon slot="item-left" name="cloud"></Icon>
            Toast
          </Item>
           <Item button :to="{name: 'popover'}">
            <Icon slot="item-left" name="ios-flame"></Icon>
            Popover
          </Item>
        </ItemGroup>

        <!--模块-->
        <ListHeader>
          模块
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'storage'}">
            <Icon slot="item-left" name="list"></Icon>
            本地存储 (Storage)
          </Item>
          <Item button :to="{name: 'position'}">
            <Icon slot="item-left" name="list"></Icon>
            获取位置 (Position)
          </Item>
        </ItemGroup>

        <!--Demo-->
        <ListHeader>
          Demo
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'demo'}">Demo</Item>
          <Item button :to="{name: 'ghostvue'}">ghost</Item>
          <Item button :to="{name: 'gl-input'}">GL-Input</Item>
          <Item button :to="{name: 'log'}">Log</Item>
        </ItemGroup>

      </List>
    </Content>
  </Page>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  import { List, ListHeader, ItemGroup, Item } from 'vimo/comps'
  export default{
    name: 'name',
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {
      List, ListHeader, ItemGroup, Item
    }
  }
</script>
