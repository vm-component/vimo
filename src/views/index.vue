<template>
  <ion-page>
    <!--content-->
    <ion-header>
      <!--menutoggle-->
      <ion-navbar color="primary" :hideBackButton="true">
        <!--menutoggle-->
        <ion-button @click="$menu.open('menu')" left icon-only role="bar-button" shape="menutoggle" slot="button">
          <ion-icon class="icon" name="menu"></ion-icon>
        </ion-button>

        <ion-title slot="content" title="VueMobile"></ion-title>

        <ion-button @click="$menu.open('author')" right icon-only role="bar-button" shape="menutoggle" slot="button">
          <ion-icon class="icon" name="person"></ion-icon>
        </ion-button>


      </ion-navbar>
      <!--<ion-navbar>-->
      <!--<ion-title>Action Sheet</ion-title>-->
      <!--</ion-navbar>-->
    </ion-header>
    <ion-content>
      <ion-list>
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
  </ion-page>
</template>
<style lang="scss">
  ul {
    li {
      padding-left: 10px;
      margin: 5px 0;
      &.title {
        background: #eee;
        font-size: 18px;
      }
      &.item {
        background: #fff;
        font-size: 20px;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'index',
    data(){
      return {
        mixin2: true,
      }
    },
    mounted: function () {
      const _this = this;
      console.log('index-this')
      console.log(this)
    },
    components: {}

  }
</script>
