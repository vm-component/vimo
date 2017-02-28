<template>
  <App id="app">
    <!--menu menu-->
    <Menu id="menu" side="left" type="overlay">
      <!--<Menu [content]="content" id="menu1">-->
      <Page>
        <Header>
          <Toolbar color="primary">
            <Title>Menu</Title>
          </Toolbar>
        </Header>
        <Content>
          <List>
            <!--开始-->
            <ListHeader>
              开始
            </ListHeader>
            <!--group-->
            <ItemGroup>
              <Item button :to="{name: 'introduce'}">
                介绍
              </Item>
              <Item button :to="{name: 'howToStart'}">
                如何开始
              </Item>
            </ItemGroup>
          </List>
        </Content>
      </Page>
    </Menu>
    <!--menu author-->
    <Menu id="author" side="right" type="overlay">
      <!--<Menu [content]="content" id="menu1">-->
      <Page>
        <Header>
          <Toolbar color="primary">
            <Title slot="content" title="About Me"></Title>
          </Toolbar>
        </Header>
        <Content padding>
          <List>
            <!--<Button  @click="$closeMenu()">-->
            <!--&lt;!&ndash;<button ion-item menuClose="menu1" detail-none>&ndash;&gt;-->
            <!--Close Menu 1-->
            <!--</Button>-->
          </List>
          <p>这里是介绍</p>
        </Content>
      </Page>
    </Menu>

    <Nav>
      <div nav-viewport></div>
      <!--业务视图部分-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!--业务视图部分 end-->
      <div class="nav-decor"></div>
    </Nav>
  </App>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'app-root',
    data () {
      return {}
    },
    methods: {
      /**
       * 后退操作
       * */
      goBack () {
        window.$router.go(-1);
      },
      /**
       * 返回主页(首页)
       * */
      goRoot(){

      },
      /**
       * 获取首页的位置
       * */
      getRootNav(){

      }
    },
  }

</script>
<style lang="scss"></style>
