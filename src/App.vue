<template>
    <App id="app">
        <!--menu menu-->
        <Menus id="menu" side="left" type="reveal">
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
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </Nav>
    </App>
</template>
<script>
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
    computed: {},
    methods: {

    },
    created(){},
    mounted(){},
    components: {
      Menus, List, ListHeader, ItemGroup, Item
    }
  }

</script>
<style lang="scss"></style>