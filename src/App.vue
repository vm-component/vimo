<template>
  <ion-app id="app">
    <!--menu-->
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
            <ion-label slot="label">开始</ion-label>
          </ion-list-header>
          <!--group-->
          <ion-item-group>
            <ion-item button :to="{name: 'introduce'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">介绍</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'howToStart'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">如何开始</ion-label>
            </ion-item>


          </ion-item-group>


          <!--基础组件-->
          <ion-list-header>
            <ion-label slot="label">基础组件</ion-label>
          </ion-list-header>
          <!--group-->
          <ion-item-group>
            <ion-item button :to="{name: 'app'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">App(ion-app)</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'content'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Content(ion-content)</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'toolbar'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Toolbar(ion-toolbar)</ion-label>
            </ion-item>

          </ion-item-group>


          <!--通用组件-->
          <ion-list-header>
            <ion-label slot="label">通用组件</ion-label>
          </ion-list-header>
          <!--group-->
          <ion-item-group>
            <ion-item button :to="{name: 'button'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Button(ion-button)</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'icon'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Icon(ion-icon)</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'spinner'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Spinner(ion-spinner)</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'list'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">List(ion-list)</ion-label>
            </ion-item>

            <ion-item button :to="{name: 'searchbar'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Searchbar(ion-searchbar)</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'tabs'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Tabs(ion-tabs)</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'segment'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Segment(ion-segment)</ion-label>
            </ion-item>

          </ion-item-group>


          <!--弹出层组件-->
          <ion-list-header>
            <ion-label slot="label">弹出层组件</ion-label>
          </ion-list-header>
          <!--group-->
          <ion-item-group>
            <ion-item button :to="{name: 'actionSheet'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">ActionSheet</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'alert'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Alert</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'toast'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Toast</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'backdrop'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Backdrop</ion-label>
            </ion-item>
            <ion-item button :to="{name: 'loading'}">
              <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
              <ion-label slot="label">Loading</ion-label>
            </ion-item>


          </ion-item-group>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!--menu-->
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
    // mixins: [mixin],
    data () {
      return {}
    },
    methods: {
      goBack () {
        window.$router.go(-1);
      }
    },
  }

</script>
<style lang="scss"></style>
