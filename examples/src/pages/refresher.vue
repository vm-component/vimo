<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Refresher</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" record-position>
            <Refresher slot="refresher" :enabled="enabled" @onRefresh="doRefresh($event)">
                <RefresherContent
                        pullingText="下拉刷新..."
                        refreshingText="正在刷新...">
                </RefresherContent>
            </Refresher>
            <div padding class="state" text-center>
                <p>状态: {{enabled}}</p>
                <Button small outline @click="toggleDisabled">禁用/启用</Button>
            </div>
            <List>
                <Item v-for="(i,index) in list" :key="index">{{i}}</Item>
            </List>
        </Content>
    </Page>
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
