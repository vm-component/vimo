<template>
    <vm-app>
        <!--menu menu-->
        <!--type: overlay/reveal/push-->
        <vm-menus id="menu" side="left" type="reveal">
            <vm-content>
                <vm-list>
                    <!--开始-->
                    <vm-list-header>
                        <span>{{$t('menu.start')}}</span>
                    </vm-list-header>
                    <!--group-->
                    <vm-item-group>
                        <!--wait 表示等待关闭事件-->
                        <vm-item button :to="{name: 'introduce'}" wait>
                            <vm-icon slot="item-left" name="apps"></vm-icon>
                            <span>{{$t('menu.introduce')}}</span>
                        </vm-item>
                    </vm-item-group>
                    <vm-list-header>{{$t('menu.character')}}</vm-list-header>
                    <!--group-->
                    <vm-item-group>
                        <vm-item button :to="{name: 'config'}" wait>
                            <vm-icon slot="item-left" name="settings"></vm-icon>
                            <span>{{$t('menu.configParameter')}}</span>
                        </vm-item>
                        <vm-item button :to="{name: 'platform'}" wait>
                            <vm-icon slot="item-left" md="logo-android" ios="logo-apple"></vm-icon>
                            <span>{{$t('menu.platformParameter')}}</span>
                        </vm-item>
                        <vm-item button :to="{name: 'crossPlatform'}" wait>
                            <vm-icon slot="item-left" name="logo-javascript"></vm-icon>
                            <span>{{$t('menu.crossPlatform')}}</span>
                        </vm-item>
                        <vm-item>
                            <vm-icon slot="item-left" name="plane"></vm-icon>
                            <span>{{$t('menu.switchLanguage')}}({{$i18n.locale}})</span>
                            <vm-toggle slot="item-right"
                                    :value="$i18n.locale==='cn'"
                                    @onChange="onToggleChangeHandler"></vm-toggle>
                        </vm-item>
                    </vm-item-group>
                </vm-list>
            </vm-content>
        </vm-menus>
        <vm-nav :showIndicatorWhenPageChange="true">
            <!--<keep-alive>-->
            <router-view></router-view>
            <!--</keep-alive>-->
        </vm-nav>
    </vm-app>
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
      console.log('mountedmounted')
      this.$platform.onNetworkChange((type) => {
        alert(`网路状况发生变化, 当前状态: ${type}, 即将立即推出App!`)
        this.$platform.exitApp()
      })
    }
  }
</script><style lang="less"></style>