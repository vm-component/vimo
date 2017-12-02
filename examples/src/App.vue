<template>
    <App>
        <Menu id="menu" :side="menu.side" :type="menu.type">
            <List>
                <ListHeader>
                    <span>Start</span>
                </ListHeader>
                <Item detail-push :to="{name: 'introduce'}" wait>
                    <Icon slot="item-left" name="apps"></Icon>
                    <span>Introduction</span>
                </Item>
                <Item detail-push :to="{name: 'config'}" wait>
                    <Icon slot="item-left" name="settings"></Icon>
                    <span>Config</span>
                </Item>
                <Item detail-push :to="{name: 'platform'}" wait>
                    <Icon slot="item-left" md="logo-android" ios="logo-apple"></Icon>
                    <span>Platfrom</span>
                </Item>
                <Item detail-push :to="{name: 'crossPlatform'}" wait>
                    <Icon slot="item-left" name="logo-javascript"></Icon>
                    <span>Cross Platorm</span>
                </Item>
            </List>
            <List>
                <ListHeader>
                    <span>Main</span>
                </ListHeader>
                <Item detail-push :to="{name: 'components'}" wait>
                    <Icon slot="item-left" name="logo-rss"></Icon>
                    <span>Components</span>
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
</script>
<style lang="scss"></style>