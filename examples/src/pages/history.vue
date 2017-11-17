<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>History</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding class="outer-content">
            <h1>访问历史</h1>
            <p>该组件维护了一个本地历史记录, 并且根据导航状态判断当前是前进还是后退, 因为App的导航需要和手机浏览器的导航功能效果一致.</p>

            <vm-button block @click="back">使用back()</vm-button>
            <vm-button block @click="go(-1)">使用go(-1)</vm-button>
            <vm-button block @click="go(-2)">使用go(-2)</vm-button>
            <vm-button block @click="toRoot">返回首页</vm-button>

            <h5>常用函数</h5>
            <vm-grid>
                <vm-row>
                    <vm-col col-4>getDirection(): </vm-col>
                    <vm-col col-8>获取当前页面是前进进入还是后退进入</vm-col>
                </vm-row>
                <vm-row>
                    <vm-col col-4>canGoBack(): </vm-col>
                    <vm-col col-8>是否能后退</vm-col>
                </vm-row>
                <vm-row>
                    <vm-col col-4>toRoot(): </vm-col>
                    <vm-col col-8>返回首页</vm-col>
                </vm-row>
            </vm-grid>


            <h5>当前状态</h5>

            <vm-grid>
                <vm-row>
                    <vm-col col-4>getDirection(): </vm-col>
                    <vm-col col-8>{{$history.getDirection()}}</vm-col>
                </vm-row>
                <vm-row>
                    <vm-col col-4>canGoBack(): </vm-col>
                    <vm-col col-8>{{$history.canGoBack()}}</vm-col>
                </vm-row>
            </vm-grid>


            <h5>当前堆栈</h5>

            <vm-grid>
                <vm-row>
                    <vm-col col-2>NO.</vm-col>
                    <vm-col col-10>INFO</vm-col>
                </vm-row>
                <vm-row v-for="(item,index) in history" :key="index" justify-content-center align-items-center>
                    <vm-col col-2>{{index}}</vm-col>
                    <vm-col col-10>
                        <div><strong>name: </strong>{{item.name}}</div>
                        <div><strong>fullPath: </strong>{{item.fullPath}}</div>
                    </vm-col>
                </vm-row>
            </vm-grid>


        </vm-content>
    </vm-page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  export default {
    name: 'name',
    data () {
      return {
        history: this.$history.getHistory()
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      replace () {
        this.$router.replace({
          name: this.$route.name,
          query: {
            name: Math.floor(Math.random() * 10)
          },
          params: {
            id: Math.floor(Math.random() * 10)
          }
        })
      },
      back () {
        this.$router.back()
      },
      go (index) {
        this.$router.go(index)
      },
//      pushWindow () {
//        AlipayJSBridge.call('pushWindow', {
//          url: 'https://m.taobao.com/',
//          param: {
//            readTitle: true,
//            showOptionMenu: false
//          }
//        })
//      },
//      appWindow () {
//        AlipayJSBridge.call('pushWindow', {
//          url: '#/app',
//          param: {
//            readTitle: true,
//            showOptionMenu: false
//          }
//        })
//      },
      toRoot () {
        this.$history.toRoot()
      }
    },
    created () {},
    mounted () {
    },
    activated () {},
    components: {}
  }
</script>
