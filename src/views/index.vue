<template>
  <ion-page>
    <!--content-->
    <ion-header>
      <!--menutoggle-->
      <ion-navbar :hideBackButton="true">
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
          基础组件
        </ion-list-header>
        <!--group-->
        <ion-item-group>
          <ion-item button :to="{name: 'app'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            App(ion-app)
          </ion-item>
          <ion-item button :to="{name: 'content'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Content(ion-content)
          </ion-item>
          <ion-item button :to="{name: 'toolbar'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Toolbar(ion-toolbar)
          </ion-item>

        </ion-item-group>


        <!--通用组件-->
        <ion-list-header>
          通用组件
        </ion-list-header>
        <!--group-->
        <ion-item-group>
          <ion-item button :to="{name: 'button'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Button(ion-button)
          </ion-item>
          <ion-item button :to="{name: 'icon'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Icon(ion-icon)
          </ion-item>
          <ion-item button :to="{name: 'spinner'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Spinner(ion-spinner)
          </ion-item>
          <ion-item button :to="{name: 'list'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            List(ion-list)
          </ion-item>

          <ion-item button :to="{name: 'searchbar'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Searchbar(ion-searchbar)
          </ion-item>
          <ion-item button :to="{name: 'tabs'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Tabs(ion-tabs)
          </ion-item>
          <ion-item button :to="{name: 'segment'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Segment(ion-segment)
          </ion-item>

        </ion-item-group>


        <!--弹出层组件-->
        <ion-list-header>
          弹出层组件
        </ion-list-header>
        <!--group-->
        <ion-item-group>
          <ion-item button :to="{name: 'actionSheet'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            ActionSheet
          </ion-item>
          <ion-item button :to="{name: 'alert'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Alert
          </ion-item>
          <ion-item button :to="{name: 'toast'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Toast
          </ion-item>
          <ion-item button :to="{name: 'backdrop'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Backdrop
          </ion-item>
          <ion-item button :to="{name: 'loading'}">
            <!--<ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>-->
            Loading
          </ion-item>


        </ion-item-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<style lang="scss">


</style>
<script type="text/ecmascript-6">
  export default{
    name: 'index',
    data(){
      return {
        nameTest:'index'
      }
    },
    created(){
      console.debug('index: created')
    },
    mounted: function () {
      const _this = this;
      // console.log('index-this')
      console.debug('index: mounted')
    },
    activated(){
      // console.log('activated index-this')
      console.debug('index: activated')
    },
    components: {}

  }
</script>
