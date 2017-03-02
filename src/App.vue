<template>
  <App id="app">
    <!--menu menu-->
    <Menu id="menu" side="left">
      <!--<Menu [content]="content" id="menu1">-->
      <Page>
        <Header>
          <Toolbar>
            <Title>菜单</Title>
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
              <Item button :to="{name: 'equipment'}">
                当前设备信息
              </Item>
            </ItemGroup>
          </List>
        </Content>
      </Page>
    </Menu>
    <!--menu author-->
    <Menu id="author" side="right">
      <!--<Menu [content]="content" id="menu1">-->
      <Page>
        <Header>
          <Toolbar>
            <Title>项目介绍</Title>
          </Toolbar>
        </Header>
        <Content padding>
          <h5>起源</h5>
          <p>这里是介绍</p>

          <h5>Vimo需要解决的问题</h5>
          <p>这里是介绍</p>

          <h5>团队成员</h5>
          <p>这里是介绍</p>
        </Content>
        <Footer>
          <Toolbar style="text-align:center;color:#444;"><p>Copyright © 2017(MIT)</p></Toolbar>
        </Footer>
      </Page>
    </Menu>

    <Nav>
      <div nav-viewport></div>
      <!--业务视图部分-->
      <!--<keep-alive>-->
      <router-view></router-view>
      <!--</keep-alive>-->
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
