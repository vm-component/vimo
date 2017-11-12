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
            <InfiniteScroll ref="infiniteScroll" class="infiniteScroll" :enabled="true" threshold="10%"
                            @onInfinite="onInfinite">
                <!--<InfiniteScroll class="infiniteScroll" :enabled="true" threshold="20%" @onInfinite="$event.waitFor(onInfinitePromise())">-->
                <InfiniteScrollContent loadingSpinner="ios" loadingText="正在加载..."></InfiniteScrollContent>
                <h5 class="loadedAll" text-center>全部加载完毕</h5>
            </InfiniteScroll>
        </Content>
    </Page>
</template>
<style scoped lang="less">
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
  export default {
    name: 'InfiniteScrollDemo',
    data () {
      return {
        page: 1,
        size: 30,
        timer: null,
        list: []
      }
    },
    props: {},
    watch: {},
    computed: {
      infiniteScrollComponent () {
        return this.$refs.infiniteScroll
      }
    },
    methods: {
      fetchData () {
        return new Promise((resolve) => {
          let list = []
          this.timer && window.clearTimeout(this.timer)
          this.timer = window.setTimeout(() => {
            for (let j = 0; j < this.size; j++) {
              list.push(`item - ${j + (this.page - 1) * this.size}`)
            }
            this.page++
            resolve(list)
            console.log('sended')
          }, 100)
        })
      },
      onInfinite () {
        console.log('onInfinite')
        this.fetchData().then((list) => {
          let length = list.length
          if (length < this.size) {
            // 当前异步结束, 没有新数据了
            this.infiniteScrollComponent && this.infiniteScrollComponent.enable(false)
            console.log('onInfinite-enable-false')
          } else {
            this.list = [].concat(this.list, list)
            // 当前异步完成
            this.infiniteScrollComponent && this.infiniteScrollComponent.complete()
            console.log('onInfinite-complete')
          }
        })
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
      this.onInfinite()
    },
    mounted () {},
    activated () {}
  }

</script>
