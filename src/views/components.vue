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
            <Icon slot="left" name="browsers"></Icon>
            整体 (App)
          </Item>
          <Item button :to="{name: 'content'}">
            <Icon slot="left" name="chatboxes"></Icon>
            布局 (Header/Content/Footer)
          </Item>
          <Item button :to="{name: 'toolbar'}">
            <Icon slot="left" name="briefcase"></Icon>
            工具条 (Toolbar)
          </Item>
        </ItemGroup>

        <!--通用组件-->
        <ListHeader>通用组件</ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'button'}">
            <Icon slot="left" name="download"></Icon>
            按钮 (Button)
          </Item>
          <Item button :to="{name: 'icon'}">
            <Icon slot="left" name="color-filter"></Icon>
            图标 (Icon)
          </Item>
          <Item button :to="{name: 'spinner'}">
            <Icon slot="left" name="medical"></Icon>
            菊花图 (Spinner)
          </Item>
          <Item button :to="{name: 'list'}">
            <Icon slot="left" name="list"></Icon>
            列表 (List)
          </Item>
          <Item button :to="{name: 'searchbar'}">
            <Icon slot="left" name="search"></Icon>
            搜索栏 (SearchBar)
          </Item>
          <Item button :to="{name: 'tabs'}">
            <Icon slot="left" name="star"></Icon>
            Tabs
          </Item>
          <Item button :to="{name: 'segment'}">
            <Icon slot="left" name="book"></Icon>
            Segment
          </Item>
          <Item button :to="{name: 'input'}">
            <Icon slot="left" name="cart"></Icon>
            输入框 (Input)
          </Item>
          <Item button :to="{name: 'grid'}">
            <Icon slot="left" name="keypad"></Icon>
            栅格 (Grid)
          </Item>
          <Item button :to="{name: 'cards'}">
            <Icon slot="left" name="calendar"></Icon>
            卡片 (Cards)
          </Item>
          <Item button :to="{name: 'fab'}">
            <Icon slot="left" name="basketball"></Icon>
            Fab
          </Item>
        </ItemGroup>

        <!--弹出层组件-->
        <ListHeader>
          弹出层组件
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'actionSheet'}">
            <Icon slot="left" name="list"></Icon>
            ActionSheet
          </Item>
          <Item button :to="{name: 'alert'}">
            <Icon slot="left" name="albums"></Icon>
            Alert
          </Item>
          <Item button :to="{name: 'backdrop'}">
            <Icon slot="left" name="barcode"></Icon>
            Backdrop
          </Item>
          <Item button :to="{name: 'loading'}">
            <Icon slot="left" name="refresh"></Icon>
            Loading
          </Item>
          <Item button :to="{name: 'modal'}">
            <Icon slot="left" name="photos"></Icon>
            Modal
          </Item>
          <Item button :to="{name: 'toast'}">
            <Icon slot="left" name="cloud"></Icon>
            Toast
          </Item>
        </ItemGroup>

        <!--Demo-->
        <ListHeader>
          Demo
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'demo'}">Demo</Item>
          <Item button :to="{name: 'gl-input'}">GL-Input</Item>
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
