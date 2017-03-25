<template>
    <App id="app">
        <!--menu menu-->
        <Menus id="menu" side="left" type="reveal">
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
                            <span>开始</span>
                        </ListHeader>
                        <!--group-->
                        <ItemGroup>
                            <!--delay 表示等待关闭事件-->
                            <Item button :to="{name: 'introduce'}" delay>
                                <span>介绍</span>
                            </Item>
                            <Item button :to="{name: 'howToStart'}" delay>
                                <span>如何开始</span>
                            </Item>
                            <Item button :to="{name: 'equipment'}" delay>
                                <span>当前设备信息</span>
                            </Item>
                        </ItemGroup>
                    </List>
                    <Button @click="openOtherOne">开启另一个</Button>
                </Content>
            </Page>
        </Menus>
        <!--menu author-->
        <Menus id="author" side="right" type="overlay">
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
        </Menus>
        <Nav>
            <router-view></router-view>
        </Nav>
    </App>
</template>
<script type="text/ecmascript-6">
  /**
   * @name App.vue
   * @description
   * 项目描述
   * */
  import { Menus } from 'vimo/components/menus'
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item } from 'vimo/components/item'
  export default {
    name: 'app-root',
    data () {
      return {}
    },
    methods: {
      openOtherOne(){
        this.$menus.open('author')
      }
    },
    components: {
      Menus, List, ListHeader, ItemGroup, Item
    }
  }

</script>
<style lang="scss"></style>