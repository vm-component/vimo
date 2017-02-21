<template>
  <Page>
    <!--content-->
    <Header>
      <!--menutoggle-->
      <Navbar :hideBackButton="true">
        <!--menutoggle-->
        <Button @click="$menu.open('menu')" left icon-only role="bar-button" shape="menutoggle" slot="button">
          <Icon class="icon" name="menu"></Icon>
        </Button>

        <Title>Vimo组件</Title>

        <Button @click="$menu.open('author')" right icon-only role="bar-button" shape="menutoggle" slot="button">
          <Icon class="icon" name="person"></Icon>
        </Button>


      </Navbar>
      <!--<Navbar>-->
      <!--<Title>Action Sheet</Title>-->
      <!--</Navbar>-->
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
            <!--<Icon slot="left" color="danger" name="plane"></Icon>-->
            App
          </Item>
          <Item button :to="{name: 'content'}">Content</Item>
          <Item button :to="{name: 'toolbar'}">Toolbar</Item>
        </ItemGroup>

        <!--通用组件-->
        <ListHeader>通用组件</ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'button'}">Button</Item>
          <Item button :to="{name: 'icon'}">Icon</Item>
          <Item button :to="{name: 'spinner'}">Spinner</Item>
          <Item button :to="{name: 'list'}">List</Item>
          <Item button :to="{name: 'searchbar'}">Searchbar</Item>
          <Item button :to="{name: 'tabs'}">Tabs</Item>
          <Item button :to="{name: 'segment'}">Segment</Item>
          <Item button :to="{name: 'input'}">Input</Item>
        </ItemGroup>

        <!--弹出层组件-->
        <ListHeader>
          弹出层组件
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'actionSheet'}">ActionSheet</Item>
          <Item button :to="{name: 'alert'}">Alert</Item>
          <Item button :to="{name: 'toast'}">Toast</Item>
          <Item button :to="{name: 'backdrop'}">Backdrop</Item>
          <Item button :to="{name: 'loading'}">Loading</Item>
          <Item button :to="{name: 'modal'}">Modal</Item>

        </ItemGroup>
      </List>
    </Content>
  </Page>
</template>
<style lang="scss">


</style>
<script type="text/ecmascript-6">
  export default{
    name: 'index',
    data(){
      return {
        nameTest:'index'
      }
    },
    created(){
      console.debug('index: created')
    },
    mounted: function () {
      const _this = this;
      // console.log('index-this')
      console.debug('index: mounted')
    },
    activated(){
      // console.log('activated index-this')
      console.debug('index: activated')
    },
    components: {}

  }
</script>
