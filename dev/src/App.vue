<template>
    <App>
        <!--<img class="statusbar-img statusbar-img-ios" src="./assets/img/ios-statusbar.png">-->
        <!--<img class="statusbar-img statusbar-img-md" src="./assets/img/android-statusbar.png">-->
        <!--menu menu-->
        <Menus id="menu" side="left">
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
                        <!--wait 表示等待关闭事件-->
                        <Item button :to="{name: 'introduce'}" wait>
                            <span>介绍</span>
                        </Item>
                        <Item button :to="{name: 'howToStart'}" wait>
                            <span>如何开始</span>
                        </Item>
                        <Item button :to="{name: 'equipment'}" wait>
                            <span>当前设备信息</span>
                        </Item>
                    </ItemGroup>
                </List>
            </Content>
        </Menus>
        <Nav>
            <!--<keep-alive>-->
            <router-view></router-view>
            <!--</keep-alive>-->
        </Nav>
    </App>
</template>
<script type="text/javascript">
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
    components: {
      Menus, List, ListHeader, ItemGroup, Item
    }
  }
</script>
<style lang="scss">
    .statusbar-img {
        display: none;
    }

    .md .statusbar-img-md {
        display: block !important;
        position: absolute;
        background-color: transparent;
        top: 0;
        width: 100%;
        height: auto;
        z-index: 999;
    }

    .ios .statusbar-img-ios {
        display: block !important;
        position: absolute;
        background-color: transparent;
        padding: 5px 0;
        top: 0px;
        width: 100%;
        height: auto;
        z-index: 999;
    }
</style>
