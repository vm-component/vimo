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
            <Icon slot="left" name="browsers" :isActive="true"></Icon>
            整体 (App)
          </Item>
          <Item button :to="{name: 'content'}">
            <Icon slot="left" name="chatboxes" :isActive="true"></Icon>
            布局 (Header/Content/Footer)
          </Item>
          <Item button :to="{name: 'toolbar'}">
            <Icon slot="left" name="briefcase" :isActive="true"></Icon>
            工具条 (Toolbar)
          </Item>
        </ItemGroup>

        <!--通用组件-->
        <ListHeader>通用组件</ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'button'}">
            <Icon slot="left" name="download" :isActive="true"></Icon>
            按钮 (Button)
          </Item>
          <Item button :to="{name: 'icon'}">
            <Icon slot="left" name="color-filter" :isActive="true"></Icon>
            图标 (Icon)
          </Item>
          <Item button :to="{name: 'spinner'}">
            <Icon slot="left" name="medical" :isActive="true"></Icon>
            菊花图 (Spinner)
          </Item>
          <Item button :to="{name: 'list'}">
            <Icon slot="left" name="list" :isActive="true"></Icon>
            列表 (List)
          </Item>
          <Item button :to="{name: 'searchbar'}">
            <Icon slot="left" name="search" :isActive="true"></Icon>
            搜索栏 (SearchBar)
          </Item>
          <Item button :to="{name: 'tabs'}">
            <Icon slot="left" name="star" :isActive="true"></Icon>
            Tabs
          </Item>
          <Item button :to="{name: 'segment'}">
            <Icon slot="left" name="book" :isActive="true"></Icon>
            Segment
          </Item>
          <Item button :to="{name: 'input'}">
            <Icon slot="left" name="cart" :isActive="true"></Icon>
            输入框 (Input)
          </Item>
          <Item button :to="{name: 'grid'}">
            <Icon slot="left" name="keypad" :isActive="true"></Icon>
            栅格 (Grid)
          </Item>
          <Item button :to="{name: 'cards'}">
            <Icon slot="left" name="calendar" :isActive="true"></Icon>
            卡片 (Cards)
          </Item>
          <Item button :to="{name: 'fab'}">
            <Icon slot="left" name="basketball" :isActive="true"></Icon>
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
            <Icon slot="left" name="list" :isActive="true"></Icon>
            ActionSheet
          </Item>
          <Item button :to="{name: 'alert'}">
            <Icon slot="left" name="albums" :isActive="true"></Icon>
            Alert
          </Item>
          <Item button :to="{name: 'backdrop'}">
            <Icon slot="left" name="barcode" :isActive="true"></Icon>
            Backdrop
          </Item>
          <Item button :to="{name: 'loading'}">
            <Icon slot="left" name="refresh" :isActive="false"></Icon>
            Loading
          </Item>
          <Item button :to="{name: 'modal'}">
            <Icon slot="left" name="photos" :isActive="true"></Icon>
            Modal
          </Item>
          <Item button :to="{name: 'toast'}">
            <Icon slot="left" name="cloud" :isActive="true"></Icon>
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
