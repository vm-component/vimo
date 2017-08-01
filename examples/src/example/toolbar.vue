<template>
    <Page>
        <Header>
            <Navbar>
                <Buttons start slot="buttons">
                    <Button icon-only role="bar-button">
                        <Icon class="icon" name="contact"></Icon>
                    </Button>
                    <Button icon-only role="bar-button">
                        <Icon class="icon" name="search"></Icon>
                    </Button>
                </Buttons>
                <Title>Toolbar</Title>
                <Buttons end slot="buttons">
                    <Button icon-only role="bar-button">
                        <Icon class="icon" name="more"></Icon>
                    </Button>
                </Buttons>
            </Navbar>
        </Header>
        <Content>
            <div padding>
                <h5>简介</h5>
                <p>Toolbar组件用于放置Title/Segment/Searchbar等组件, 也可以放置操作的按钮. 可定义slot插槽决定摆放的位置.</p>
            </div>
            <!--1-->
            <Toolbar color="primary">
                <!--title-->
                <Title>This is a long title long title</Title>
            </Toolbar>

            <!--2-->
            <Toolbar color="danger">
                <!--start-->
                <Buttons start slot="buttons">
                    <Button icon-only role="bar-button">
                        <Icon class="icon" name="contact"></Icon>
                    </Button>
                    <Button icon-only role="bar-button">
                        <Icon class="icon" name="search"></Icon>
                    </Button>
                </Buttons>
                <!--start-->
                <Buttons end slot="buttons">
                    <Button icon-only role="bar-button">
                        <Icon class="icon" name="more"></Icon>
                    </Button>
                </Buttons>
                <!--title-->
                <Title>My Toolbar Title</Title>
            </Toolbar>

            <!--3-->
            <Toolbar>
                <!--start-->
                <Buttons start slot="buttons">
                    <Button icon-only role="bar-button" color="danger">
                        <Icon class="icon" name="contact"></Icon>
                    </Button>
                </Buttons>
                <Buttons start slot="buttons">
                    <Button icon-only role="bar-button" color="secondary">
                        <Icon class="icon" name="search"></Icon>
                    </Button>
                </Buttons>
                <!--end-->
                <Buttons end slot="buttons">
                    <Button icon-only role="bar-button" color="danger">
                        <Icon class="icon" name="more"></Icon>
                    </Button>
                </Buttons>
                <!--title-->
                <Title>My Toolbar Title</Title>
            </Toolbar>

            <!--4-->
            <Toolbar>
                <!--start-->
                <Buttons start slot="buttons">
                    <Button icon-only role="bar-button" type="solid">
                        <Icon class="icon" name="contact"></Icon>
                    </Button>
                </Buttons>

                <!--end-->
                <Buttons end slot="buttons">
                    <Button icon-right role="bar-button" color="secondary" type="solid">
                        <span>Help</span>
                        <Icon class="icon" name="help-circle"></Icon>
                    </Button>
                </Buttons>
                <!--title-->
                <Title>Solid</Title>
            </Toolbar>

            <!--5-->
            <Toolbar>
                <!--start-->
                <Buttons start slot="buttons">
                    <Button icon-only role="bar-button" outline>
                        <Icon class="icon" name="contact"></Icon>
                    </Button>
                </Buttons>
                <Buttons start slot="buttons">
                    <Button icon-only role="bar-button" outline color="danger">
                        <Icon class="icon" name="contact"></Icon>
                    </Button>
                </Buttons>

                <!--end-->
                <Buttons end slot="buttons">
                    <Button icon-right role="bar-button" color="secondary" outline>
                        <span>Help</span>
                        <Icon class="icon" name="help-circle"></Icon>
                    </Button>
                </Buttons>
                <!--title-->
                <Title>Outline</Title>
            </Toolbar>

            <!--6-->
            <Toolbar>
                <!--menutoggle-->
                <Button left icon-only role="bar-button" menutoggle slot="buttons">
                    <Icon class="icon" name="menu"></Icon>
                </Button>
                <!--title-->
                <Title>Left Menu</Title>
            </Toolbar>

            <!--7-->
            <Toolbar>
                <!--menutoggle-->
                <Button right icon-only role="bar-button" menutoggle slot="buttons">
                    <Icon class="icon" name="menu"></Icon>
                </Button>
                <!--title-->
                <Title>Right Menu</Title>
            </Toolbar>

            <!--7-->
            <Toolbar>
                <!--menutoggle-->
                <Buttons end slot="buttons">
                    <Button icon-only role="bar-button">
                        <Icon class="icon" name="search"></Icon>
                    </Button>
                </Buttons>
                <!--title-->
                <Title>Right Menu</Title>
            </Toolbar>

            <!--8-->
            <Toolbar>
                <!--menutoggle-->
                <Buttons end slot="buttons">
                    <Button icon-only role="bar-button">
                        <Icon class="icon" name="search"></Icon>
                    </Button>
                </Buttons>
                <!--content-->
                <Segment :value="relationship8" @ionChange="onSegmentChange8" color="danger">
                    <SegmentButton value="friend1" @ionSelect="onSelectChangeFriend1">friend1</SegmentButton>
                    <SegmentButton value="friend2" @ionSelect="onSelectChangeFriend2">friend2</SegmentButton>
                </Segment>
            </Toolbar>

            <!--9-->
            <Toolbar>
                <!--content-->
                <Segment :value="relationship9" @ionChange="onSegmentChange9">
                    <SegmentButton value="friend1">friend1</SegmentButton>
                    <SegmentButton value="friend2">friend2</SegmentButton>
                    <SegmentButton value="friend3">friend2</SegmentButton>
                </Segment>
            </Toolbar>


            <!--10-->
            <Toolbar>
                <Searchbar :animated="true"
                           :debounce="1000"
                           mode="ios"
                           v-model="myInput"
                           :showCancelButton="true"
                           cancelButtonText="取消"
                           @ionInput="onInput"
                           @ionFocus="onFocus"
                           @ionBlur="onBlur"
                           @ionCancel="onCancel"
                           @ionClear="onClear"></Searchbar>
            </Toolbar>

            <!--11-->
            <Toolbar color="primary">
                <Searchbar :animated="true"
                           :debounce="1000"
                           v-model="myInput"
                           :showCancelButton="true"
                           cancelButtonText="取消"
                           @ionInput="onInput"
                           @ionFocus="onFocus"
                           @ionBlur="onBlur"
                           @ionCancel="onCancel"
                           @ionClear="onClear"></Searchbar>
            </Toolbar>
        </Content>
        <Footer>
            <Toolbar>
                <Searchbar :animated="true"
                           :debounce="1000"
                           v-model="myInput"
                           :showCancelButton="true"
                           cancelButtonText="取消"
                           @ionInput="onInput"
                           @ionFocus="onFocus"
                           @ionBlur="onBlur"
                           @ionCancel="onCancel"
                           @ionClear="onClear"></Searchbar>
            </Toolbar>
        </Footer>
    </Page>
</template>
<style lang="scss">
    .main {
        height: 100%;
    }
</style>
<script type="text/javascript">
  import { Segment, SegmentButton } from 'vimo/components/segment'
  import { Searchbar } from 'vimo/components/searchbar'
  export default{
    data () {
      return {
        relationship8: 'friend1',
        relationship9: 'friend2',
        myInput: ''
      }
    },
    methods: {

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
    },
    components: {
      Segment, SegmentButton, Searchbar
    }
  }
</script>
