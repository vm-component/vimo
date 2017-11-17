<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-buttons left slot="buttons">
                    <vm-button icon-only role="bar-button" @click="toolbarButtonClick('contact')">
                        <vm-icon class="icon" name="contact"></vm-icon>
                    </vm-button>
                    <vm-button icon-only role="bar-button" @click="toolbarButtonClick('more')">
                        <vm-icon class="icon" name="more"></vm-icon>
                    </vm-button>
                </vm-buttons>
                <vm-title>Toolbar</vm-title>
                <vm-buttons end slot="buttons">
                    <vm-button icon-only role="bar-button" @click="toolbarButtonClick('search')">
                        <vm-icon class="icon" name="search"></vm-icon>
                    </vm-button>
                </vm-buttons>
            </vm-navbar>
        </vm-header>
        <vm-content>
            <div padding>
                <h1>Toolbar组件</h1>
                <p>组件用于放置Title/Segment/Searchbar等组件, 也可以放置操作的按钮. 可定义slot插槽决定摆放的位置.</p>
                <p>Toolbar组件不同于Navbar组件, 前者可放置在任何位置, 且只有展示的功能.</p>
            </div>
            <!--1-->
            <vm-toolbar color="primary">
                <!--title-->
                <vm-title>This is a long title long title</vm-title>
            </vm-toolbar>

            <!--2-->
            <vm-toolbar color="danger">
                <!--start-->
                <vm-buttons start slot="buttons">
                    <vm-button icon-only role="bar-button">
                        <vm-icon class="icon" name="contact"></vm-icon>
                    </vm-button>
                    <vm-button icon-only role="bar-button">
                        <vm-icon class="icon" name="search"></vm-icon>
                    </vm-button>
                </vm-buttons>
                <!--start-->
                <vm-buttons end slot="buttons">
                    <vm-button icon-only role="bar-button">
                        <vm-icon class="icon" name="more"></vm-icon>
                    </vm-button>
                </vm-buttons>
                <!--title-->
                <vm-title>My Toolbar Title</vm-title>
            </vm-toolbar>

            <!--3-->
            <vm-toolbar>
                <!--start-->
                <vm-buttons start slot="buttons">
                    <vm-button icon-only role="bar-button" color="danger">
                        <vm-icon class="icon" name="contact"></vm-icon>
                    </vm-button>
                </vm-buttons>
                <vm-buttons start slot="buttons">
                    <vm-button icon-only role="bar-button" color="secondary">
                        <vm-icon class="icon" name="search"></vm-icon>
                    </vm-button>
                </vm-buttons>
                <!--end-->
                <vm-buttons end slot="buttons">
                    <vm-button icon-only role="bar-button" color="danger">
                        <vm-icon class="icon" name="more"></vm-icon>
                    </vm-button>
                </vm-buttons>
                <!--title-->
                <vm-title>My Toolbar Title</vm-title>
            </vm-toolbar>

            <!--4-->
            <vm-toolbar>
                <!--start-->
                <vm-buttons start slot="buttons">
                    <vm-button icon-only role="bar-button" type="solid">
                        <vm-icon class="icon" name="contact"></vm-icon>
                    </vm-button>
                </vm-buttons>

                <!--end-->
                <vm-buttons end slot="buttons">
                    <vm-button icon-right role="bar-button" color="secondary" type="solid">
                        <span>Help</span>
                        <vm-icon class="icon" name="help-circle"></vm-icon>
                    </vm-button>
                </vm-buttons>
                <!--title-->
                <vm-title>Solid</vm-title>
            </vm-toolbar>

            <!--5-->
            <vm-toolbar>
                <!--start-->
                <vm-buttons start slot="buttons">
                    <vm-button icon-only role="bar-button" outline>
                        <vm-icon class="icon" name="contact"></vm-icon>
                    </vm-button>
                </vm-buttons>
                <vm-buttons start slot="buttons">
                    <vm-button icon-only role="bar-button" outline color="danger">
                        <vm-icon class="icon" name="contact"></vm-icon>
                    </vm-button>
                </vm-buttons>

                <!--end-->
                <vm-buttons end slot="buttons">
                    <vm-button icon-right role="bar-button" color="secondary" outline>
                        <span>Help</span>
                        <vm-icon class="icon" name="help-circle"></vm-icon>
                    </vm-button>
                </vm-buttons>
                <!--title-->
                <vm-title>Outline</vm-title>
            </vm-toolbar>

            <!--6-->
            <vm-toolbar>
                <!--menutoggle-->
                <vm-button left icon-only role="bar-button" menutoggle slot="buttons">
                    <vm-icon class="icon" name="menu"></vm-icon>
                </vm-button>
                <!--title-->
                <vm-title>Left Menu</vm-title>
            </vm-toolbar>

            <!--7-->
            <vm-toolbar>
                <!--menutoggle-->
                <vm-button right icon-only role="bar-button" menutoggle slot="buttons">
                    <vm-icon class="icon" name="menu"></vm-icon>
                </vm-button>
                <!--title-->
                <vm-title>Right Menu</vm-title>
            </vm-toolbar>

            <!--7-->
            <vm-toolbar>
                <!--menutoggle-->
                <vm-buttons end slot="buttons">
                    <vm-button icon-only role="bar-button">
                        <vm-icon class="icon" name="search"></vm-icon>
                    </vm-button>
                </vm-buttons>
                <!--title-->
                <vm-title>Right Menu</vm-title>
            </vm-toolbar>

            <!--8-->
            <vm-toolbar>
                <!--menutoggle-->
                <vm-buttons end slot="buttons">
                    <vm-button icon-only role="bar-button">
                        <vm-icon class="icon" name="search"></vm-icon>
                    </vm-button>
                </vm-buttons>
                <!--content-->
                <vm-segment :value="relationship8" @ionChange="onSegmentChange8" color="danger">
                    <vm-segment-button value="friend1" @ionSelect="onSelectChangeFriend1">friend1</vm-segment-button>
                    <vm-segment-button value="friend2" @ionSelect="onSelectChangeFriend2">friend2</vm-segment-button>
                </vm-segment>
            </vm-toolbar>

            <!--9-->
            <vm-toolbar>
                <!--content-->
                <vm-segment :value="relationship9" @ionChange="onSegmentChange9">
                    <vm-segment-button value="friend1">friend1</vm-segment-button>
                    <vm-segment-button value="friend2">friend2</vm-segment-button>
                    <vm-segment-button value="friend3">friend2</vm-segment-button>
                </vm-segment>
            </vm-toolbar>


            <!--10-->
            <vm-toolbar>
                <vm-searchbar :animated="true"
                           :debounce="1000"
                           mode="ios"
                           v-model="myInput"
                           :showCancelButton="true"
                           cancelButtonText="取消"
                           @ionInput="onInput"
                           @ionFocus="onFocus"
                           @ionBlur="onBlur"
                           @ionCancel="onCancel"
                           @ionClear="onClear"></vm-searchbar>
            </vm-toolbar>

            <!--11-->
            <vm-toolbar color="primary">
                <vm-searchbar :animated="true"
                           :debounce="1000"
                           v-model="myInput"
                           :showCancelButton="true"
                           cancelButtonText="取消"
                           @ionInput="onInput"
                           @ionFocus="onFocus"
                           @ionBlur="onBlur"
                           @ionCancel="onCancel"
                           @ionClear="onClear"></vm-searchbar>
            </vm-toolbar>
        </vm-content>
        <vm-footer>
            <vm-toolbar>
                <vm-searchbar :animated="true"
                           :debounce="1000"
                           v-model="myInput"
                           :showCancelButton="true"
                           cancelButtonText="取消"
                           @ionInput="onInput"
                           @ionFocus="onFocus"
                           @ionBlur="onBlur"
                           @ionCancel="onCancel"
                           @ionClear="onClear"></vm-searchbar>
            </vm-toolbar>
        </vm-footer>
    </vm-page>
</template>
<style lang="scss">
    .main {
        height: 100%;
    }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        relationship8: 'friend1',
        relationship9: 'friend2',
        myInput: ''
      }
    },
    methods: {
      toolbarButtonClick (content) {
        alert(content)
      },
      onSegmentChange8 (val) {
        this.relationship8 = val
      },
      onSelectChangeFriend1 (val) {
        console.debug('segment8 friend1 select:' + val)
      },
      onSelectChangeFriend2 (val) {
        console.debug('segment8 friend2 select:' + val)
      },
      onSegmentChange9 (val) {
        this.relationship9 = val
      },
      onInput ($event) {
        console.debug('outer-onInput:')
      },
      onCancel ($event) {
        console.debug('outer-onCancel:')
      },
      onClear ($event) {
        console.debug('outer-onClear:')
      },
      onBlur ($event) {
        console.debug('outer-onBlur:')
      },
      onFocus ($event) {
        console.debug('outer-onFocus:')
      }

    },
    created () {
    },
    mounted () {
      console.debug('this.count-toolbar')
      console.debug(this.count)
    },
    activated () {
    }
  }
</script>
