<template>
    <App>
        <!--menu menu-->
        <Menus id="menu" side="left">
            <Header>
                <Toolbar>
                    <Title>{{$t('menu.menu')}}</Title>
                </Toolbar>
            </Header>
            <Content>
                <List>
                    <!--开始-->
                    <ListHeader>
                        <span>{{$t('menu.start')}}</span>
                    </ListHeader>
                    <!--group-->
                    <ItemGroup>
                        <!--wait 表示等待关闭事件-->
                        <Item button :to="{name: 'introduce'}" wait>
                            <Icon slot="item-left" name="apps"></Icon>
                            <span>{{$t('menu.introduce')}}</span>
                        </Item>
                    </ItemGroup>
                    <ListHeader>{{$t('menu.character')}}</ListHeader>
                    <!--group-->
                    <ItemGroup>
                        <Item button :to="{name: 'config'}" wait>
                            <Icon slot="item-left" name="settings"></Icon>
                            <span>{{$t('menu.configParameter')}}</span>
                        </Item>
                        <Item button :to="{name: 'platform'}" wait>
                            <Icon slot="item-left" md="logo-android" ios="logo-apple"></Icon>
                            <span>{{$t('menu.platformParameter')}}</span>
                        </Item>
                        <Item button :to="{name: 'crossPlatform'}" wait>
                            <Icon slot="item-left" name="logo-javascript"></Icon>
                            <span>{{$t('menu.crossPlatform')}}</span>
                        </Item>
                        <Item>
                            <Icon slot="item-left" name="plane"></Icon>
                            <span>{{$t('menu.switchLanguage')}}({{$i18n.locale}})</span>
                            <Toggle slot="item-right"
                                    :value="$i18n.locale==='cn'"
                                    @onChange="onToggleChangeHandler"></Toggle>
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
  import { Toggle } from 'vimo/components/toggle'
  import { Menus } from 'vimo/components/menus'
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item } from 'vimo/components/item'
  export default {
    name: 'app-root',
    data () {
      return {}
    },
    methods: {
      onToggleChangeHandler (val) {
        if (val) {
          this.$i18n.locale = 'cn'
        } else {
          this.$i18n.locale = 'en'
        }
      }
    },
    components: {
      Menus, List, ListHeader, ItemGroup, Item, Toggle
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
