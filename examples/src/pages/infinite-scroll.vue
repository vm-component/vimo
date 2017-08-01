<template>
    <Page>
        <Header>
            <Navbar>
                <Title>InfiniteScroll</Title>
            </Navbar>
        </Header>
        <Content>
            <List>
                <Item v-for="(i,index) in list" :key="index">{{i}}</Item>
            </List>
            <InfiniteScroll class="infiniteScroll" :enabled="true" threshold="10%" @onInfinite="onInfinite">
                <!--<InfiniteScroll class="infiniteScroll" :enabled="true" threshold="20%" @onInfinite="$event.waitFor(onInfinitePromise())">-->
                <InfiniteScrollContent loadingSpinner="ios" loadingText="正在加载..."></InfiniteScrollContent>
                <h5 class="loadedAll" text-center>全部加载完毕</h5>
            </InfiniteScroll>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .ion-infinite-scroll {
        .loadedAll {
            display: none;
        }
    }

    .ion-infinite-scroll[state=disabled] {
        .loadedAll {
            display: block;
        }
    }

    .infiniteScroll {
        margin-top: 20px;

    }
</style>
<script type="text/javascript">
  export default{
    name: 'page',
    data () {
      return {
        i: 0,
        list: []
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      onInfinite (infiniteScroll) {
        console.debug('onInfinite')
        let _start = this.i
        if (_start < 400) {
          setTimeout(() => {
            for (; (10 + _start) > this.i; this.i++) {
              this.list.push(`item - ${this.i}`)
            }
            // 当前异步完成
            infiniteScroll.complete()
            console.debug('onInfinite-complete')
          }, 500)
        } else {
          // 当前异步结束, 没有新数据了
          infiniteScroll.enable(false)
          console.debug('onInfinite-enable-false')
        }
      },
      onInfinitePromise () {
        console.debug('Begin async operation')
        return new Promise((resolve) => {
          let _start = this.i
          setTimeout(() => {
            for (; (10 + _start) > this.i; this.i++) {
              this.list.push(`item - ${this.i}`)
            }
            console.debug('Async operation has ended')
            // resolve就是infiniteScroll.complete();
            resolve()
          }, 500)
        })
      }
    },
    created () {
      for (; this.i < 15; this.i++) {
        this.list.push(`item - ${this.i}`)
      }
    },
    mounted () {},
    activated () {}
  }

</script>
