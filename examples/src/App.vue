<template>
    <App>
        <!--menu menu-->
        <!--type: overlay/reveal/push-->
        <Menus id="menu" side="left" type="reveal">
            <article>
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
            </article>
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
  export default {
    name: 'RootDemo',
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
    mounted () {
      this.$platform.onNetworkChange((type) => {
        alert(`网路状况发生变化, 当前状态: ${type}, 即将立即推出App!`)
        this.$platform.exitApp()
      })
    }
  }
</script>
<style lang="less"></style>