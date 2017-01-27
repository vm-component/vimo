<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">
          <span>Toolbar</span>
        </ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <!--1-->
      <ion-toolbar color="primary">
        <!--title-->
        <ion-title slot="content">This is a long title long title</ion-title>
      </ion-toolbar>

      <!--2-->
      <ion-toolbar color="danger">
        <!--start-->
        <ion-buttons start slot="ion-button">
          <ion-button icon-only role="bar-button">
            <ion-icon class="icon" name="contact"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons start slot="ion-button">
          <ion-button icon-only role="bar-button">
            <ion-icon class="icon" name="search"></ion-icon>
          </ion-button>
        </ion-buttons>
        <!--start-->
        <ion-buttons end slot="ion-button">
          <ion-button icon-only role="bar-button">
            <ion-icon class="icon" name="more"></ion-icon>
          </ion-button>
        </ion-buttons>
        <!--title-->
        <ion-title slot="content">My Toolbar Title</ion-title>
      </ion-toolbar>

      <!--3-->
      <ion-toolbar>
        <!--start-->
        <ion-buttons start slot="ion-button">
          <ion-button icon-only role="bar-button" color="danger">
            <ion-icon class="icon" name="contact"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons start slot="ion-button">
          <ion-button icon-only role="bar-button" color="secondary">
            <ion-icon class="icon" name="search"></ion-icon>
          </ion-button>
        </ion-buttons>
        <!--end-->
        <ion-buttons end slot="ion-button">
          <ion-button icon-only role="bar-button" color="danger">
            <ion-icon class="icon" name="more"></ion-icon>
          </ion-button>
        </ion-buttons>
        <!--title-->
        <ion-title slot="content">My Toolbar Title</ion-title>
      </ion-toolbar>

      <!--4-->
      <ion-toolbar>
        <!--start-->
        <ion-buttons start slot="ion-button">
          <ion-button icon-only role="bar-button" type="solid">
            <ion-icon class="icon" name="contact"></ion-icon>
          </ion-button>
        </ion-buttons>

        <!--end-->
        <ion-buttons end slot="ion-button">
          <ion-button icon-right role="bar-button" color="secondary" type="solid">
            Help
            <ion-icon class="icon" name="help-circle"></ion-icon>
          </ion-button>
        </ion-buttons>
        <!--title-->
        <ion-title slot="content">Solid</ion-title>
      </ion-toolbar>

      <!--5-->
      <ion-toolbar>
        <!--start-->
        <ion-buttons start slot="ion-button">
          <ion-button icon-only role="bar-button" type="outline">
            <ion-icon class="icon" name="contact"></ion-icon>
          </ion-button>
        </ion-buttons>

        <!--end-->
        <ion-buttons end slot="ion-button">
          <ion-button icon-right role="bar-button" color="secondary" type="outline">
            Help
            <ion-icon class="icon" name="help-circle"></ion-icon>
          </ion-button>
        </ion-buttons>
        <!--title-->
        <ion-title slot="content">Outline</ion-title>
      </ion-toolbar>

      <!--6-->
      <ion-toolbar>
        <!--menutoggle-->
        <ion-button icon-only role="bar-button" shape="menutoggle" slot="ion-button">
          <ion-icon class="icon" name="menu"></ion-icon>
        </ion-button>
        <!--title-->
        <ion-title slot="content">Left Menu</ion-title>
      </ion-toolbar>

      <!--7-->
      <ion-toolbar>
        <!--menutoggle-->
        <ion-button right icon-only role="bar-button" shape="menutoggle" slot="ion-button">
          <ion-icon class="icon" name="menu"></ion-icon>
        </ion-button>
        <!--title-->
        <ion-title slot="content">Right Menu</ion-title>
      </ion-toolbar>

      <!--7-->
      <ion-toolbar>
        <!--menutoggle-->
        <ion-buttons end slot="ion-button">
          <ion-button icon-only role="bar-button">
            <ion-icon class="icon" name="search"></ion-icon>
          </ion-button>
        </ion-buttons>
        <!--title-->
        <ion-title slot="content">Right Menu</ion-title>
      </ion-toolbar>

      <!--8-->
      <ion-toolbar>
        <!--menutoggle-->
        <ion-buttons end slot="ion-button">
          <ion-button icon-only role="bar-button">
            <ion-icon class="icon" name="search"></ion-icon>
          </ion-button>
        </ion-buttons>
        <!--content-->
        <ion-segment :value="relationship8" @ionChange="onSegmentChange8" slot="content" color="danger">
          <ion-segment-button value="friend1" @ionSelect="onSelectChangeFriend1">friend1</ion-segment-button>
          <ion-segment-button value="friend2" @ionSelect="onSelectChangeFriend2">friend2</ion-segment-button>
        </ion-segment>
      </ion-toolbar>

      <!--9-->
      <ion-toolbar>
        <!--content-->
        <ion-segment :value="relationship9" @ionChange="onSegmentChange9" slot="content">
          <ion-segment-button value="friend1">friend1</ion-segment-button>
          <ion-segment-button value="friend2">friend2</ion-segment-button>
          <ion-segment-button value="friend3">friend2</ion-segment-button>
        </ion-segment>
      </ion-toolbar>


      <!--10-->
      <ion-toolbar>
        <ion-searchbar :animated="true" slot="content"
                       :debounce="1000"
                       mode="ios"
                       v-model="myInput"
                       :showCancelButton="true"
                       cancelButtonText="取消"
                       @ionInput="onInput"
                       @ionFocus="onFocus"
                       @ionBlur="onBlur"
                       @ionCancel="onCancel"
                       @ionClear="onClear"></ion-searchbar>
      </ion-toolbar>

      <!--11-->
      <ion-toolbar color="primary">
        <ion-searchbar :animated="true" slot="content"
                       :debounce="1000"
                       mode="ios"
                       v-model="myInput"
                       :showCancelButton="true"
                       cancelButtonText="取消"
                       @ionInput="onInput"
                       @ionFocus="onFocus"
                       @ionBlur="onBlur"
                       @ionCancel="onCancel"
                       @ionClear="onClear"></ion-searchbar>
      </ion-toolbar>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-searchbar :animated="true" slot="content"
                       :debounce="1000"
                       mode="ios"
                       v-model="myInput"
                       :showCancelButton="true"
                       cancelButtonText="取消"
                       @ionInput="onInput"
                       @ionFocus="onFocus"
                       @ionBlur="onBlur"
                       @ionCancel="onCancel"
                       @ionClear="onClear"></ion-searchbar>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
<style lang="scss">
  .main {
    height: 100%;
  }


</style>
<script type="text/ecmascript-6">
  // import Toolbar from '../components/toolbar/src/toolbar.vue';
  // import Title from '../components/toolbar/src/toolbar-title.vue';
  // import Buttons from '../components/toolbar/src/toolbar-buttons.vue';
  // import Button from '../components/button'
  // import Icon from '../components/icon'
  // import Segment from '../components/segment/src/segment.vue';
  // import SegmentButton from '../components/segment/src/segment-button.vue';
  //
  // import Searchbar from '../components/searchbar'

  export default{
    data(){
      return {
        relationship8: 'friend1',
        relationship9: 'friend2',

        myInput: ''
      }
    },
    methods: {

      onSegmentChange8: function (val) {
        this.relationship8 = val;
      },
      onSelectChangeFriend1: function (val) {
        console.debug('segment8 friend1 select:' + val)
      },
      onSelectChangeFriend2: function (val) {
        console.debug('segment8 friend2 select:' + val)
      },
      onSegmentChange9: function (val) {
        this.relationship9 = val;
      },

      //10
      onInput: function ($event) {
        console.debug('outer-onInput:');
      },
      onCancel: function ($event) {
        console.debug('outer-onCancel:');
      },
      onClear: function ($event) {
        console.debug('outer-onClear:');
      },
      onBlur: function ($event) {
        console.debug('outer-onBlur:');
      },
      onFocus: function ($event) {
        console.debug('outer-onFocus:');
      }

    },
    created: function () {
    },
    mounted: function () {
      console.debug('this.count-toolbar')
      console.debug(this.count)
    },
    activated: function () {
    },
    components: {
      // 'ion-toolbar': Toolbar,
      // 'ion-title': Title,
      // 'ion-buttons': Buttons,
      // 'ion-button': Button,
      // 'ion-icon': Icon,
      // 'ion-segment': Segment,
      // 'ion-segment-button': SegmentButton,
      // 'ion-searchbar': Searchbar,
    }
  }
</script>
