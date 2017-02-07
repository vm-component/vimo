<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content" title="Content"></ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content :fullscreen="fullscreenVal" padding>
      <h3 slot="fixed">normal组件：</h3>
      <h3 slot="fixedTop">fixTop组件：</h3>
      <h3 slot="fixedBottom">fixBottom组件：</h3>

      <p>
        业务部分的页面内容就是在此完成的，除去Header部分到最下面都欧式content的内容
      </p>

      <p>
        包括固定部分(fixedContent)和可滚动部分(scrollContent)，scrollContent为默认的内容放置区域，fixedContent需要使用slot命名插槽：fixed
      </p>


      <ion-button type="block" @click="setTitle('Hello Vue')">点击设置Title='Hello Vue'</ion-button>

      <ion-button type="block" @click="scrollToBottom()">滚动到底部</ion-button>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <ion-button @click="$keyBoardOpen()" type="">打开键盘的Padding</ion-button>
      <ion-button @click="$keyBoardClose()" type="">关闭键盘的Padding</ion-button>

      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>
      <h1>ion-app test</h1>

      <ion-button type="block" @click="scrollToTop()">返回顶部</ion-button>

s
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <!--<ion-title slot="content" title="ion-app test"></ion-title>-->
      </ion-toolbar>
    </ion-footer>


  </ion-page>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  import mixin from '../mixins/baseMethodMixin'
  export default{
    mixins: [mixin],
    data(){
      return {
        fullscreenVal: false
      }
    },
    watch: {},
    computed: {},
    methods: {
      setTitle(val){
        this.$setTitle(val)
      },
      scrollToTop: function () {
        this.$scrollToTop();
      },
      scrollToBottom: function () {
        this.$scrollToBottom();
      }
    },
    created: function () {},
    mounted: function () {
      const _this = this;
      // console.debug('app this')
      // console.debug(this)
    },
    activated: function () {},
    components: {}
  }
</script>
