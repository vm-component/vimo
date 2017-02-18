<template>
  <ion-app id="app">
    <!--menu menu-->
    <ion-menu id="menu" side="left" type="overlay">
      <!--<ion-menu [content]="content" id="menu1">-->
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title slot="content" title="Menu"></ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <!--开始-->
          <ion-list-header>
            开始
          </ion-list-header>
          <!--group-->
          <ion-item-group>
            <ion-item button :to="{name: 'introduce'}">
              介绍
            </ion-item>
            <ion-item button :to="{name: 'howToStart'}">
              如何开始
            </ion-item>
          </ion-item-group>
        </ion-list>

        <ion-footer>
          <ion-toolbar>
            <ion-title slot="content" title="Footer"></ion-title>
          </ion-toolbar>
        </ion-footer>
      </ion-content>
    </ion-menu>
    <!--menu author-->
    <ion-menu id="author" side="right" type="overlay">
      <!--<ion-menu [content]="content" id="menu1">-->
      <ion-header>
        <ion-toolbar color="primary">
          <ion-icon class="icon" name="person"></ion-icon>
          <ion-title slot="content" title="About Me"></ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content padding>
        <ion-list>
          <!--<ion-button  @click="$closeMenu()">-->
          <!--&lt;!&ndash;<button ion-item menuClose="menu1" detail-none>&ndash;&gt;-->
          <!--Close Menu 1-->
          <!--</ion-button>-->
        </ion-list>
        <p>
          我是一名在一线工作的前端开发工程师，因为一直委派开发移动端H5页面，因此对移动端H5开发这方面比较熟。另外，以前的项目有接触过IONIC开发跨端应用，所以想从Vue2.x的角度试着复写部分IONIC的组件，因此有了这个项目，这个项目还未通过充分的测试，另外移动端的样式变化多端，组件化越多意味着个性化定制的难度越高。所以，此项目比建议用于种子开发。关于组件的构思和组件实现，我觉得的是这个尝试的精华，希望各位前端开发者能够借鉴学习！</p>
      </ion-content>
    </ion-menu>

    <ion-nav>
      <div nav-viewport></div>
      <!--业务视图部分-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!--业务视图部分 end-->
      <div class="nav-decor"></div>
    </ion-nav>
  </ion-app>
</template>
<script type="text/ecmascript-6">

  export default {
    name: 'app-root',
    data () {
      return {}
    },
    methods: {
      /**
       * 后退操作
       * */
      goBack () {
        window.$router.go(-1);
      },
      /**
       * 返回主页(首页)
       * */
      goRoot(){

      },
      /**
       * 获取首页的位置
       * */
      getRootNav(){

      }
    },
  }

</script>
<style lang="scss">

  /*@import './themes/normalize.scss';*/
  /*@import './themes/util';*/




  /*html{*/
    /*font-size: 62.5%;*/
  /*}*/
</style>
