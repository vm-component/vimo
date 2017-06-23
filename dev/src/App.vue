<template>
    <App>
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
                            <Icon slot="item-left" name="apps"></Icon>
                            <span>介绍</span>
                        </Item>
                        <!--<Item button :to="{name: 'howToStart'}" wait>-->
                            <!--<Icon slot="item-left" name="apps"></Icon>-->
                            <!--<span>如何开始</span>-->
                        <!--</Item>-->
                    </ItemGroup>

                    <ListHeader>特性</ListHeader>
                    <!--group-->
                    <ItemGroup>
                        <Item button :to="{name: 'config'}" wait>
                            <Icon slot="item-left" name="settings"></Icon>
                            <span>配置参数</span>
                        </Item>
                        <Item button :to="{name: 'platform'}" wait>
                            <Icon slot="item-left" md="logo-android" ios="logo-apple"></Icon>
                            <span>平台参数</span>
                        </Item>
                        <Item button :to="{name: 'crossPlatform'}" wait>
                            <Icon slot="item-left" name="logo-javascript"></Icon>
                            <span>跨平台组件</span>
                        </Item>
                    </ItemGroup>
                </List>
            </Content>
        </Menus>
        <Nav :showIndicatorWhenPageChange="true">
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
