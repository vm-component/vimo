<template>
  <ion-app id="app">
    <ion-nav>
      <div nav-viewport></div>
      <!--业务视图部分-->
      <router-view></router-view>
      <!--业务视图部分 end-->
      <div class="nav-decor"></div>
    </ion-nav>
  </ion-app>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'app-root',
    data: function () {
      return {}
    },

    methods: {
      goBack: function () {
        window.$router.go(-1);
      }
    },
  }

</script>

<style lang="scss">

  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: left;*/
    /*color: #2c3e50;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*width: 100%;*/
    /*height: 100%;*/
    .back {
      position: fixed;
      top:0;

      width: 100%;
      text-align: left;
      background: #eee;
      height: 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      z-index: 2;
    }
    .container {
      position: fixed;
      padding-top: 40px;
      width: 100%;
      top: 0;
      outline: 1px dashed #eee;
      height: 100%;
      overflow: scroll;
      z-index: 1;
    }
  }


</style>
