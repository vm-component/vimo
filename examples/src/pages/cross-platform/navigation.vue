<template>
    <Page>
        <Header>
            <Navbar>
                <Title>导航栏</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h4>导航栏</h4>
            <section>
                <strong>设置导航栏颜色</strong>
                <small>设置颜色需要刷新页面</small>
                <Item no-lines class="item">
                    <Label slot="item-left">颜色: </Label>
                    <Input placeholder="AARRGGBB" type="text" v-model="navColor" clearInput></Input>
                </Item>
                <Button block @click="setNavBgColor()">SetNavBgColor</Button>
            </section>
            <section>
                <strong>设置导航栏标题</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">标题: </Label>
                    <Input placeholder="..." type="text" v-model="navTitle" clearInput></Input>
                </Item>
                <Button block @click="setNavTitle()">setNavTitle</Button>
                <strong>结果</strong>
                <p class="result">{{navTitleResult}}</p>
            </section>
            <section>
                <strong>标题栏添加Icon</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">ShowIcon: </Label>
                    <Toggle slot="item-right" v-model="showIcon"></Toggle>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">IconIndex: </Label>
                    <Input placeholder="..." type="number" v-model="iconIndex" clearInput></Input>
                </Item>
                <Button block @click="setNavIcon()">SetNavIcon</Button>
                <strong>结果</strong>
                <p class="result">{{setNavIconResult}}</p>
            </section>

            <section v-if="$platform.is('dtdream')">
                <strong>显示导航栏</strong>
                <Button block @click="showNav()">ShowNav</Button>
                <strong>结果</strong>
                <p class="result">{{showNavResult}}</p>
            </section>
            <section v-if="$platform.is('dtdream')">
                <strong>隐藏导航栏</strong>
                <Button block @click="hideNav()">HideNav</Button>
                <strong>结果</strong>
                <p class="result">{{hideNavResult}}</p>
            </section>
            <section>
                <strong>关闭当前页</strong>
                <Button block @click="closeNav()">CloseNav</Button>
                <strong>结果</strong>
                <p class="result">{{closeNavResult}}</p>
            </section>
            <section>
                <strong>返回上级页面</strong>
                <Button block @click="goBack()">GoBack</Button>
            </section>
            <section>
                <strong>设置左侧导航按钮</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">Show: </Label>
                    <Toggle slot="item-right" v-model="navLeftShow"></Toggle>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">Control: </Label>
                    <Toggle slot="item-right" v-model="navLeftControl"></Toggle>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">ShowIcon: </Label>
                    <Toggle slot="item-right" v-model="navLeftShowIcon"></Toggle>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">Text: </Label>
                    <Input placeholder="..." type="text" v-model="navLeftText" clearInput></Input>
                </Item>
                <Button block @click="setNavLeft()">SetNavLeft</Button>
                <strong>结果</strong>
                <p class="result">{{setNavLeftResult}}</p>
            </section>

            <section>
                <strong>设置导航栏右侧单个按钮</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">Show: </Label>
                    <Toggle slot="item-right" v-model="navRightShow"></Toggle>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">Control: </Label>
                    <Toggle slot="item-right" v-model="navRightControl"></Toggle>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">Text: </Label>
                    <Input placeholder="..." type="text" v-model="navRightText" clearInput></Input>
                </Item>
                <Button block @click="setNavRight()">SetNavRight</Button>
                <strong>结果</strong>
                <p class="result">{{setNavRightResult}}</p>
            </section>


            <section>
                <strong>设置导航栏右侧多个按钮</strong>
                <Button block @click="setNavRightMulti()">SetNavRightMulti</Button>
                <strong>结果</strong>
                <p class="result">{{setNavRightMultiResult}}</p>
            </section>

        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'Navigation',
    data () {
      return {
        navColor: 'FF5E97F6',
        navTitle: '新标题',
        navTitleResult: '',

        showIcon: true,
        iconIndex: 1,
        setNavIconResult: '',

        showNavResult: '',
        hideNavResult: '',
        closeNavResult: '',

        navLeftShow: true,
        navLeftControl: false,
        navLeftShowIcon: true,
        navLeftText: '退朝',
        setNavLeftResult: '',

        navRightShow: true,
        navRightControl: false,
        navRightText: '帮助?',
        setNavRightResult: '',

        setNavRightMultiResult: '',

        last: ''
      }
    },
    methods: {
      setNavBgColor () {
        window.location.search = `dd_nav_bgcolor=${this.navColor}`
      },
      setNavTitle () {
        const _this = this
        window.dd && window.dd.biz.navigation.setTitle({
          title: _this.navTitle,//控制标题文本，空字符串表示显示默认文本
          onSuccess (result) {
            _this.navTitleResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.navTitleResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      setNavIcon () {
        const _this = this
        window.dd && window.dd.biz.navigation.setIcon({
          showIcon: _this.showIcon, // 是否显示icon
          iconIndex: _this.iconIndex, // 显示的iconIndex,如上图
          onSuccess (result) {
            _this.setNavIconResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.setNavIconResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      showNav () {
        const _this = this
        window.dd && window.dd.biz.navigation.show({
          onSuccess (result) {
            _this.showNavResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.showNavResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      hideNav () {
        const _this = this
        window.dd && window.dd.biz.navigation.hide({
          onSuccess (result) {
            _this.hideNavResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.hideNavResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      closeNav () {
        const _this = this
        window.dd && window.dd.biz.navigation.close({
          onSuccess (result) {
            _this.closeNavResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.closeNavResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      setNavLeft () {
        const _this = this
        window.dd && window.dd.biz.navigation.setLeft({
          show: _this.navLeftShow,//控制按钮显示， true 显示， false 隐藏， 默认true
          control: _this.navLeftControl,//是否控制点击事件，true 控制，false 不控制， 默认false
          showIcon: _this.navLeftShowIcon,//是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
          text: _this.navLeftText,//控制显示文本，空字符串表示显示默认文本
          onSuccess (result) {
            _this.setNavLeftResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.setNavLeftResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      goBack () {
        const _this = this
        window.dd && window.dd.biz.navigation.goBack({
          onSuccess (result) {},
          onFail (err) {}
        })
      },
      setNavRight () {
        const _this = this
        if (_this.$platform.is('dingtalk')) {
          window.dd && window.dd.biz.navigation.setRight({
            show: _this.navRightShow,//控制按钮显示， true 显示， false 隐藏， 默认true
            control: _this.navRightControl,//是否控制点击事件，true 控制，false 不控制， 默认false
            text: _this.navRightText,//控制显示文本，空字符串表示显示默认文本
            onSuccess (result) {
              //如果control为true，则onSuccess将在发生按钮点击事件被回调
              _this.setNavRightResult = `onSuccess: ${JSON.stringify(result)}`
            },
            onFail (err) {
              _this.setNavRightResult = `onFail: ${JSON.stringify(err)}`
            }
          })
        } else if (_this.$platform.is('dtdream')) {
          window.dd && window.dd.biz.navigation.setRightBtn({
            show: _this.navRightShow,//控制按钮显示， true 显示， false 隐藏， 默认true
            control: _this.navRightControl,//是否控制点击事件，true 控制，false 不控制， 默认false
            text: _this.navRightText,//控制显示文本，空字符串表示显示默认文本
            onSuccess (result) {
              //如果control为true，则onSuccess将在发生按钮点击事件被回调
              _this.setNavRightResult = `onSuccess: ${JSON.stringify(result)}`
            },
            onFail (err) {
              _this.setNavRightResult = `onFail: ${JSON.stringify(err)}`
            }
          })
        } else {
          _this.setNavRightResult = `未找到可执行程序`
        }
      },
      setNavRightMulti () {
        const _this = this
        window.dd && window.dd.biz.navigation.setMenu({
          backgroundColor: '#ADD8E6',
          textColor: '#ADD8E611',
          items: [
            {
              'id': '1',//字符串
              'iconId': 'file',//字符串，图标命名
              'text': '帮助'
            },
            {
              'id': '2',
              'iconId': 'photo',
              'text': 'dierge'
            },
            {
              'id': '3',
              'iconId': 'setting',
              'text': 'disange'
            },
            {
              'id': '4',
              'iconId': 'time',
              'text': 'disige',
              'url': 'http://img.alicdn.com/tps/TB1XLjqNVXXXXc4XVXXXXXXXXXX-170-64.png'
            }
          ],
          onSuccess (data) {
            _this.setNavRightMultiResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.setNavRightMultiResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      }
    }
  }
</script>
<style scoped lang="less">
    .result {
        border: 1px dashed #333;
        min-height: 20px;
        border-radius: 3px;
        overflow-y: scroll;
        white-space: pre-line;
        margin: 0 0 20px;
    }

    .item {
        margin: 5px 0;
    }
</style>
