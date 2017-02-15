<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content" title="List"></ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <!--header-->
        <ion-list-header>
          Contents
        </ion-list-header>
        <!--group-->
        <ion-item-group>
          <ion-item button :to="{name:'list.basicList'}">BasicList</ion-item>
          <ion-item button :to="{name:'list.noLine'}">NoLine</ion-item>
          <ion-item button :to="{name:'list.insetList'}">InsetList</ion-item>
          <ion-item button :to="{name:'list.listDividers'}">ListDividers</ion-item>
          <ion-item button :to="{name:'list.listHeaders'}">listHeaders</ion-item>
          <ion-item button :to="{name:'list.iconList'}">IconList</ion-item>
          <ion-item button :to="{name:'list.avatarList'}">AvatarList</ion-item>
          <ion-item button :to="{name:'list.multi-lineList'}">Multi-lineList</ion-item>
          <ion-item button :to="{name:'list.slidingList'}">SlidingList</ion-item>
          <ion-item button :to="{name:'list.thumbnailList'}">ThumbnailList</ion-item>


        </ion-item-group>


      </ion-list>
    </ion-content>
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
        toggleValue: true,
        silencePhone: 'always',
      }
    },
    watch: {
      toggleValue: function () {
        console.debug('outer toggleValue change:' + this.toggleValue)
      }
    },
    computed: {},
    methods: {
      toggleChange: function (val) {
        console.debug('Outer Toggle Change Value - airPlane:' + val)
      }
    },
    created: function () {
    },
    mounted: function () {
    },
    activated: function () {
    },
    components: {}
  }
</script>
