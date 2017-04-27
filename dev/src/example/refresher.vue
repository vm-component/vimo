<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Refresher</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" :enableJsScroll="true">
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
<style scoped lang="scss">
    .state {
        background: #fff;
    }
</style>
<script type="text/ecmascript-6">
  import { Refresher, RefresherContent } from 'vimo/components/refresher'
  import { List } from 'vimo/components/list'
  import { Item } from 'vimo/components/item'
  export default{
    name: 'name',
    data(){
      return {
        i: 0,
        list: [],

        enabled: true,
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      //
      toggleDisabled(){
        this.enabled = !this.enabled
      },

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
    mounted () {},
    activated () {},
    components: {Refresher, RefresherContent, List, Item}
  }
</script>
