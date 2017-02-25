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
          <p>
            我是一名在一线工作的前端开发工程师，因为一直委派开发移动端H5页面，因此对移动端H5开发这方面比较熟。另外，以前的项目有接触过IONIC开发跨端应用，所以想从Vue2.x的角度试着复写部分IONIC的组件，因此有了这个项目，这个项目还未通过充分的测试，另外移动端的样式变化多端，组件化越多意味着个性化定制的难度越高。所以，此项目比建议用于种子开发。关于组件的构思和组件实现，我觉得的是这个尝试的精华，希望各位前端开发者能够借鉴学习！</p>
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
