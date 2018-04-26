<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content class="outer-content" record-position ref="content" @onScroll="onScrollHandler">
            <Refresher slot="refresher" :enabled="enabled" @onRefresh="doRefresh($event)">
                <RefresherContent/>
            </Refresher>
            <div padding class="state" text-center>
                <p>Refresher Enabled: {{enabled}}</p>
                <p>IsScrollDisabled: {{$app.isScrollDisabled}}</p>
                <p>PageScrollTop: {{ev.scrollTop}}</p>
                <Button small outline @click="toggleDisabled">{{$t('state')}}</Button>
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
<script type="text/javascript">
  export default {
    name: 'DemoRefresher',
    i18n: {
      messages: {
        'zh-CN': {
          title: '下拉刷新',
          state: '禁用/启用'
        },
        'en-US': {
          title: 'Refresher',
          state: 'Disable/Enable'
        }
      }
    },
    data () {
      return {
        i: 0,
        list: [],

        enabled: true,
        ev: true
      }
    },
    computed: {
      contentComponent () {
        return this.$refs.content
      }
    },
    methods: {
      onScrollHandler (ev) {
        this.ev = ev
      },
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
        }, 500)
      }
    },
    created () {
      for (; this.i < 15; this.i++) {
        this.list.unshift(`item - ${this.i}`)
      }
    }
  }
</script>
