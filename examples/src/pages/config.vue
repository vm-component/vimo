<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Config</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding class="outer-content">

            <h1>应用状态配置</h1>

            <p>Config组件用于放置应用级别的属性配置, 存储形式为key-value. 其中value可以是用function返回配置value.</p>

            <p>同时, 合成变量也建议放在config中, 业务通过this.$config.get获取配置.</p>

            <h5>当前用户配置</h5>
            <vm-row v-for="(value,key) in settingConfig" :key="key">
                <vm-col col-6><strong>{{key}}:</strong></vm-col>
                <vm-col col-6>
                    {{value}}
                </vm-col>
            </vm-row>

            <h5>已缓存配置</h5>
            <vm-row v-for="(value,key) in cachedConfig" :key="key">
                <vm-col col-6><strong>{{key}}:</strong></vm-col>
                <vm-col col-6>
                    {{value}}
                </vm-col>
            </vm-row>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less"></style>
<script type="text/javascript">
  export default {
    name: 'ConfigDemo',
    data () {
      return {
        cachedConfig: [],
        settingConfig: []
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {
      this.$platform.ready().then(() => {
        window.setTimeout(() => {
          this.cachedConfig = this.$config.cache()
          this.settingConfig = this.$config.settings()
        }, 100)
      }, () => {})
    },
    activated () {},
    components: {}
  }
</script>
