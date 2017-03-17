<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Refresher</Title>
      </Navbar>
    </Header>
    <Content>
      <Refresher slot="refresher" @onRefresh="doRefresh($event)" @onPull="doPulling($event)">
        <RefresherContent
          pullingText="下拉刷新..."
          refreshingText="正在刷新...">
        </RefresherContent>
      </Refresher>
      <List>
        <Item v-for="i in list">{{i}}</Item>
      </List>
    </Content>
  </Page>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'name',
    data(){
      return {
        i: 0,
        list: [],
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      doRefresh(ins){
        console.debug('doRefresh $event')
        let _start = this.i;
        setTimeout(() => {
          for (; (10 + _start) > this.i; this.i++) {
            this.list.unshift(`item - ${this.i}`)
          }
          // 当前异步完成
          ins.complete();
          console.debug('onInfinite-complete')
        }, 500)

      },
    },
    created(){
      for (; 15 > this.i; this.i++) {
        this.list.unshift(`item - ${this.i}`)
      }
    },
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>
