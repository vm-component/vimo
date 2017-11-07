<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Refresher</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content" record-position>
            <Refresher slot="refresher" :enabled="enabled" @onRefresh="doRefresh($event)">
                <RefresherContent
                        pullingText="下拉刷新..."
                        refreshingText="正在刷新...">
                </RefresherContent>
            </Refresher>
            <div padding class="state" text-center>
                <p>状态: {{enabled}}</p>
                <vm-button small outline @click="toggleDisabled">禁用/启用</vm-button>
            </div>
            <vm-list>
                <vm-item v-for="(i,index) in list" :key="index">{{i}}</vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">
    .state {
        background: #fff;
    }
</style>
<script type="text/javascript">
  export default{
    name: 'RefresherDemo',
    data () {
      return {
        i: 0,
        list: [],

        enabled: true
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      //
      toggleDisabled () {
        this.enabled = !this.enabled
      },
      doRefresh (ins) {
        console.debug('doRefresh $event')
        let _start = this.i
        setTimeout(() => {
          for (; (10 + _start) > this.i; this.i++) {
            this.list.unshift(`item - ${this.i}`)
          }
          // 当前异步完成
          ins.complete()
          console.debug('onInfinite-complete')
        }, 500)
      }
    },
    created () {
      for (; this.i < 15; this.i++) {
        this.list.unshift(`item - ${this.i}`)
      }
    },
    mounted () {},
    activated () {}
  }
</script>
