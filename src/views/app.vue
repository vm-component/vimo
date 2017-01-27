<template>
  <ion-page>
    <ion-header class="statusbar-padding" style="opacity:0.9">
      <ion-navbar>
        <ion-title slot="content" title="ion-app test"></ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content :fullscreen="fullscreenVal">
      <ion-button @click="scrollToBottom()">滚动到底部</ion-button>
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

      <ion-button @click="scrollToTop()" type="">返回顶部</ion-button>

    </ion-content>

    <ion-footer class="statusbar-padding" style="opacity:0.9">
      <ion-toolbar>
        <ion-title slot="content" title="ion-app test"></ion-title>
      </ion-toolbar>
    </ion-footer>


  </ion-page>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        fullscreenVal: false
      }
    },
    watch: {},
    computed: {},
    methods: {
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
      console.debug('view-app')
      console.debug(_this.$dimensions)
      console.debug(_this.$dimensions.contentHeight)
      console.debug('_this.$hasHeaderBar')
      console.debug(_this.$hasHeaderBar)
      console.debug(_this.$hasFooterBar)

      // setTimeout(function () {
      //   _this.fullscreenVal = true
      // },8000)

      // _this.$scrollToBottom(500);


    },
    activated: function () {},
    components: {}
  }
</script>
