<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>InfiniteScroll</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content>
            <vm-list>
                <vm-item v-for="(i,index) in list" :key="index">{{i}}</vm-item>
            </vm-list>
            <InfiniteScroll ref="infiniteScroll" class="infiniteScroll" :enabled="true" threshold="10%"
                            @onInfinite="onInfinite">
                <!--<InfiniteScroll class="infiniteScroll" :enabled="true" threshold="20%" @onInfinite="$event.waitFor(onInfinitePromise())">-->
                <InfiniteScrollContent loadingSpinner="ios" loadingText="正在加载..."></InfiniteScrollContent>
                <h5 class="loadedAll" text-center>全部加载完毕</h5>
            </InfiniteScroll>
        </vm-content>
    </vm-page>
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
    name: 'page',
    data () {
      return {
        i: 0,
        total: 40,
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
        return new Promise((resolve, reject) => {
          let list = []
          window.setTimeout(() => {
            if (this.total > 0) {
              for (let j = 0; this.total > 0 && j < 20; j++, this.i++, this.total--) {
                this.list.push(`item - ${this.i}`)
              }
              resolve(list)
            } else {
              reject([])
            }
          }, 500)
        })
      },
      onInfinite () {
        console.debug('onInfinite')
        this.fetchData().then((list) => {
          this.list = [].concat(this.list, list)
          // 当前异步完成
          this.infiniteScrollComponent && this.infiniteScrollComponent.complete()
          console.debug('onInfinite-complete')
        }, () => {
          // 当前异步结束, 没有新数据了
          this.infiniteScrollComponent && this.infiniteScrollComponent.enable(false)
          console.debug('onInfinite-enable-false')
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
      this.onInfinite(this.infiniteScrollComponent)
    },
    mounted () {},
    activated () {}
  }

</script>
