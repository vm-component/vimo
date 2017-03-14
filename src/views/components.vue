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
        </ItemGroup>

        <!--通用组件-->
        <ListHeader>通用组件</ListHeader>
        <!--group-->
        <ItemGroup>
          <!--<Item button :to="{name: 'button'}">Button</Item>-->
          <!--<Item button :to="{name: 'ghostvue'}">ghost</Item>-->
          <!--<Item button :to="{name: 'icon'}">Icon</Item>-->
          <!--<Item button :to="{name: 'spinner'}">Spinner</Item>-->
          <!--<Item button :to="{name: 'list'}">List</Item>-->
          <!--<Item button :to="{name: 'searchbar'}">Searchbar</Item>-->
          <!--<Item button :to="{name: 'tabs'}">Tabs</Item>-->
          <!--<Item button :to="{name: 'segment'}">Segment</Item>-->
          <!--<Item button :to="{name: 'input'}">Input</Item>-->
          <!--<Item button :to="{name: 'grid'}">Grid</Item>-->
          <!--<Item button :to="{name: 'cards'}">Cards</Item>-->
          <!--<Item button :to="{name: 'fab'}">Fab</Item>-->

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
          <Item button :to="{name: 'list'}">
            <Icon slot="item-left" name="list"></Icon>
            列表 (List)
          </Item>
          <Item button :to="{name: 'searchbar'}">
            <Icon slot="item-left" name="search"></Icon>
            搜索栏 (SearchBar)
          </Item>
          <Item button :to="{name: 'tabs'}">
            <Icon slot="item-left" name="star"></Icon>
            Tabs
          </Item>
          <Item button :to="{name: 'segment'}">
            <Icon slot="item-left" name="book"></Icon>
            Segment
          </Item>
          <Item button :to="{name: 'input'}">
            <Icon slot="item-left" name="cart"></Icon>
            输入框 (Input)
          </Item>

          <Item button :to="{name: 'toggle'}">
            <Icon slot="item-left" name="book"></Icon>
            开关 (Toggle)
          </Item>
          <Item button :to="{name: 'range'}">
            <Icon slot="item-left" name="book"></Icon>
            范围选择 (Range)
          </Item>

          <Item button :to="{name: 'grid'}">
            <Icon slot="item-left" name="keypad"></Icon>
            栅格 (Grid)
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
          <Item button :to="{name: 'infinite-scroll'}">
            <Icon slot="item-left" name="car"></Icon>
            无限滚动 (InfiniteScroll)
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
    components: {}
  }
</script>
