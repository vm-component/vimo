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
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            App(ion-app)
          </Item>
          <Item button :to="{name: 'content'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Content(ion-content)
          </Item>
          <Item button :to="{name: 'toolbar'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Toolbar(ion-toolbar)
          </Item>

        </ItemGroup>


        <!--通用组件-->
        <ListHeader>
          通用组件
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'button'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Button(ion-button)
          </Item>
          <Item button :to="{name: 'icon'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Icon(ion-icon)
          </Item>
          <Item button :to="{name: 'spinner'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Spinner(ion-spinner)
          </Item>
          <Item button :to="{name: 'list'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            List(ion-list)
          </Item>

          <Item button :to="{name: 'searchbar'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Searchbar(ion-searchbar)
          </Item>
          <Item button :to="{name: 'tabs'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Tabs(ion-tabs)
          </Item>
          <Item button :to="{name: 'segment'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Segment(ion-segment)
          </Item>

        </ItemGroup>


        <!--弹出层组件-->
        <ListHeader>
          弹出层组件
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'actionSheet'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            ActionSheet
          </Item>
          <Item button :to="{name: 'alert'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Alert
          </Item>
          <Item button :to="{name: 'toast'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Toast
          </Item>
          <Item button :to="{name: 'backdrop'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Backdrop
          </Item>
          <Item button :to="{name: 'loading'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Loading
          </Item>
          <Item button :to="{name: 'modal'}">
            <!--<Icon slot="item-left" item-left color="danger" name="plane"></Icon>-->
            Modal
          </Item>

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
