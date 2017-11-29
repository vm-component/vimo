<template>
    <App>
        <Menu id="menu" :side="menu.side" :type="menu.type">
            <List>
                <ListHeader>
                    <span>开始</span>
                </ListHeader>
                <Item button :to="{name: 'introduce'}" wait>
                    <Icon slot="item-left" name="apps"></Icon>
                    <span>介绍</span>
                </Item>
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
                    <span>平台参数</span>
                </Item>
            </List>
        </Menu>
        <Nav>
            <!--<keep-alive>-->
            <router-view></router-view>
            <!--</keep-alive>-->
        </Nav>
    </App>
</template>
<script type="text/javascript">
  import { mapState } from 'vuex'
  import { Toggle, List, ListHeader, Icon, Item, Menu } from 'vimo'

  export default {
    name: 'AppDemo',
    components: {Toggle, List, ListHeader, Icon, Item, Menu},
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'menu'
      ])
    },
    mounted () {
      this.$platform.onNetworkChange((type) => {
        alert(`网路状况发生变化, 当前状态: ${type}, 即将立即推出App!`)
        this.$platform.exitApp()
      })
    }
  }
  // 如果都是defaut, 则取最后一个
  // 如果都非default, 则取最后一个
</script>
<style lang="scss">
    $color: red;
    $color: blue !default;

    body {
        // background: $a;
    }
</style>