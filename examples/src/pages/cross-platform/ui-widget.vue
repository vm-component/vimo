<template>
    <Page>
        <Header>
            <Navbar>
                <Title>UI 控件</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <NoticeBar v-if="!$platform.is('dingtalk')" slot="fixedTop">请在钉钉APP环境内使用此页面测试接口</NoticeBar>
            <h4>UI控件</h4>

            <section>
                <!--提示框 Alert-->
                <strong>提示框 Alert</strong>
                <Button block @click="openAlert()">Alert</Button>
                <strong>结果</strong>
                <p class="result">{{alertResult}}</p>
            </section>
            <section>
                <!--确认框 Confirm-->
                <strong>确认框 Confirm</strong>
                <Button block @click="openConfirm">Confirm</Button>
                <strong>结果</strong>
                <p class="result">{{confirmResult}}</p>
            </section>
            <section>
                <!--输入框 Prompt-->
                <strong>输入框 Prompt</strong>
                <Button block @click="openPrompt">Prompt</Button>
                <strong>结果</strong>
                <p class="result">{{promptResult}}</p>
            </section>
            <section v-if="$platform.is('android')">
                <!--震动 Vibrate-->
                <strong>震动 Vibrate(Android Only)</strong>
                <Button block @click="vibrate">Vibrate</Button>
                <strong>结果</strong>
                <p class="result">{{vibrateResult}}</p>
            </section>
            <section>
                <!--等待 Loading-->
                <strong>等待 Loading</strong>
                <Button block @click="openLoading">Loading</Button>
                <strong>结果</strong>
                <p class="result">{{loadingResult}}</p>
            </section>
            <section>
                <!--弱提示 Toast-->
                <strong>弱提示 Toast</strong>
                <Button block @click="openToast">Toast</Button>
                <strong>结果</strong>
                <p class="result">{{toastResult}}</p>
            </section>
            <section>
                <!--选择器 ActionSheet-->
                <strong>选择器 ActionSheet</strong>
                <Button block @click="openActionSheet">ActionSheet</Button>
                <strong>结果</strong>
                <p class="result">{{actionSheetResult}}</p>
            </section>
            <section>
                <strong>带图片的Alert</strong>
                <Button block @click="openModal">带图片的Alert</Button>
                <strong>结果</strong>
                <p class="result">{{modalResult}}</p>
            </section>

            <section>
                <strong>打开应用内页面</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">页面名称: </Label>
                    <Input placeholder="页面名称" type="text" v-model="openInnerAppName" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">传参: </Label>
                    <Input placeholder="传参" type="text" v-model="openInnerAppParams" clearInput></Input>
                </Item>
                <Button block @click="openInnerApp">OpenInnerApp</Button>
                <strong>结果</strong>
                <p class="result">{{openInnerAppResult}}</p>
            </section>

            <section>
                <strong>分享</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">分享类型: </Label>
                    <Input placeholder="分享类型" type="number" v-model="shareType" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">url地址: </Label>
                    <Input placeholder="url地址" type="url" v-model="shareUrl" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">标题: </Label>
                    <Input placeholder="标题" type="text" v-model="shareTitle" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">内容: </Label>
                    <Input placeholder="内容" type="text" v-model="shareContent" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">图片: </Label>
                    <Input placeholder="图片" type="text" v-model="shareImage" clearInput></Input>
                </Item>

                <Button block @click="openShare">OpenShare</Button>
                <strong>结果</strong>
                <p class="result">{{shareResult}}</p>
            </section>

            <section>
                <strong>图片浏览器</strong>
                <Button block @click="previewImage">PreviewImage</Button>
                <strong>结果</strong>
                <p class="result">{{previewImageResult}}</p>
            </section>

            <section>
                <strong>日期选择器</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">格式: </Label>
                    <Input placeholder="格式" type="text" v-model="datepickerFormat" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">默认值: </Label>
                    <Input placeholder="默认值" type="text" v-model="datepickerValue" clearInput></Input>
                </Item>
                <Button block @click="datepicker">DatePicker</Button>
                <strong>结果</strong>
                <p class="result">{{datepickerResult}}</p>
            </section>

            <section>
                <strong>时间选择器</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">格式: </Label>
                    <Input placeholder="格式" type="text" v-model="timepickerFormat" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">默认值: </Label>
                    <Input placeholder="默认值" type="text" v-model="timepickerValue" clearInput></Input>
                </Item>
                <Button block @click="timepicker">TimePicker</Button>
                <strong>结果</strong>
                <p class="result">{{timepickerResult}}</p>
            </section>

            <section>
                <strong>单列Picker</strong>
                <Button block @click="picker">Picker</Button>
                <strong>结果</strong>
                <p class="result">{{pickerResult}}</p>
            </section>

            <section>
                <strong>复制到粘贴版</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">复制内容: </Label>
                    <Input placeholder="..." type="text" v-model="clipboardDataText" clearInput></Input>
                </Item>
                <Button block @click="clipboardData">ClipboardData</Button>
                <Item no-lines class="item">
                    <Textarea placeholder="可以在此粘贴内容"></Textarea>
                </Item>
                <strong>结果</strong>
                <p class="result">{{clipboardDataResult}}</p>
            </section>

            <section>
                <strong>输入框</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">占位符: </Label>
                    <Input placeholder="Placeholder" type="text" v-model="openInputPlainPlaceholder"
                           clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">文本: </Label>
                    <Input placeholder="默认填充文本" type="text" v-model="openInputPlainText" clearInput></Input>
                </Item>
                <Button block @click="openInputPlain()">OpenInputPlain</Button>
                <strong>结果</strong>
                <p class="result">{{openInputPlainResult}}</p>
            </section>

            <section>
                <strong>设置顶部进度条颜色(?)</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">颜色: </Label>
                    <Input placeholder="最多支持4个颜色, 多个颜色用空格分割" type="text" v-model="progressBarColors"
                           clearInput></Input>
                </Item>
                <Button block @click="setProgressBarColors()">SetProgressBarColors</Button>
                <strong>结果</strong>
                <p class="result">{{setProgressBarColorsResult}}</p>
            </section>

            <section>
                <strong>启用下拉刷新</strong>
                <Button block @click="pullToRefreshEnable()">PullToRefreshEnable</Button>
                <Button block @click="pullToRefreshStop()">PullToRefreshStop</Button>
                <Button block @click="pullToRefreshDisable()">PullToRefreshDisable</Button>
                <strong>结果</strong>
                <p class="result">{{pullToRefreshEnableResult}}</p>
            </section>
            <section>
                <strong>Bounce</strong>
                <div>
                    <small>Disable状态无法使用下拉刷新</small>
                </div>
                <Button block @click="webViewBounceEnable()">webViewBounceEnable</Button>
                <Button block @click="webViewBounceDisable()">webViewBounceDisable</Button>
            </section>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'UiWidget',
    data () {
      return {
        alertResult: '',
        confirmResult: '',
        promptResult: '',
        vibrateResult: '',
        loadingResult: '',
        toastResult: '',
        actionSheetResult: '',
        modalResult: '',

        openInputPlainResult: '',
        openInputPlainPlaceholder: '说点什么吧',
        openInputPlainText: '',

        setProgressBarColorsResult: '',
        progressBarColors: '',

        pullToRefreshEnableResult: '',

        openInnerAppResult: '',
        openInnerAppName: '',
        openInnerAppParams: '',

        shareType: 0, // 分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
        shareUrl: 'https://cn.vuejs.org/',
        shareTitle: 'Vue你好',
        shareContent: '这里是分享内容, 分享除去的是Vue官网链接和Logo',
        shareImage: 'https://cn.vuejs.org/images/logo.png',
        shareResult: '',

        previewImageResult: '',

        datepickerResult: '',
        datepickerFormat: 'yyyy-MM-dd',
        datepickerValue: '2015-04-17',

        timepickerResult: '',
        timepickerFormat: 'HH:mm',
        timepickerValue: '14:00',

        pickerResult: '',

        clipboardDataResult: '',
        clipboardDataText: 'Hello Vimo!',
        last: ''
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      openAlert () {
        const _this = this
        this.$alert.present({
          title: '温馨提示',
          message: '您的快递到了！',
          buttons: [
            {
              text: '确定',
              handler: () => {
                _this.alertResult = '确定 clicked'
              }
            }
          ]
        })
      },
      openConfirm () {
        const _this = this
        this.$alert.present({
          title: '温馨提示',
          message: '您是否想查询快递单号：\n1234567890',
          buttons: [
            {
              text: '暂不需要',
              role: 'cancel',
              handler: () => {
                _this.confirmResult = '暂不需要 click'
              }
            },
            {
              text: '马上查询',
              handler: () => {
                _this.confirmResult = '马上查询 click'
              }
            }
          ]
        })
      },
      openPrompt () {
        const _this = this
        this.$alert.present({
          title: '登录iTunes Store',
          message: '请输入您Apple ID"apple@icloud.com"的密码',
          enableBackdropDismiss: true,
          inputs: [
            {
              type: 'password',
              name: 'password',
              placeholder: '密码',
              value: ''
            }
          ],
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                _this.promptResult = '取消 clicked'
              }
            },
            {
              text: '确定',
              handler: (value) => {
                _this.promptResult = `确定 ${JSON.stringify(value)}`
              }
            }
          ]
        }).then(() => {
          console.log('Input present!')
        })
      },
      vibrate () {
        const _this = this
        window.dd && window.dd.device.notification.vibrate({
          duration: 300,
          onSuccess (data) {
            _this.vibrateResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.vibrateResult = `onFail: ${JSON.stringify(error)}`
          }
        })
      },
      openLoading () {
        this.$loading.present({
          content: '正在加载'
        }).then(() => {
          this.loadingResult = `Loading打开成功, 3000ms后关闭`
        })
        window.setTimeout(() => {
          this.$loading.dismiss('loading.dismiss').then(() => {
            this.loadingResult = `Loading关闭成功`
          })
        }, 3000)
      },
      openToast () {
        const _this = this
        _this.toastResult = 'Toast 开启, 3000ms后关闭'
        this.$toast({
          type: 'success',
          message: '支付成功',
          duration: 3000,
          onDismiss () {
            _this.toastResult = 'Toast 关闭'
          }
        })
      },
      openActionSheet () {
        const _this = this
        this.$actionSheet.present({
          title: '请选择操作',
          buttons: [
            {
              text: '警告',
              role: 'destructive',
              handler: () => {
                _this.actionSheetResult = '警告 clicked'
              }
            },
            {
              text: '翻转',
              handler: () => {
                _this.actionSheetResult = '翻转 clicked'
              }
            },
            {
              text: '增加',
              handler: () => {
                _this.actionSheetResult = '增加 clicked'
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                _this.actionSheetResult = '取消 clicked'
              }
            }
          ]
        }).then(function () {
          _this.actionSheetResult = 'ActionSheet 开启 clicked'
        })
      },
      openModal () {
        const _this = this
        this.$alert.present({
          image: 'http://gw.alicdn.com/tps/i2/TB1SlYwGFXXXXXrXVXX9vKJ2XXX-2880-1560.jpg_200x200.jpg',
          title: '5.5版本更新',
          message: '1.功能更新 2.功能更新;',
          cssClass: 'alertCssOuterMain',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: '知道了',
              role: 'cancel',
              icon: 'icon-Destructive',
              handler: () => {
                _this.modalResult = '知道了 clicked'
              }
            },
            {
              text: '了解更多',
              role: '',
              handler: () => {
                _this.modalResult = '了解更多 clicked'
              }
            }
          ]
        })
      },

      openInputPlain () {
        const _this = this
        window.dd && window.dd.ui.input.plain({
          placeholder: _this.openInputPlainPlaceholder, //占位符
          text: _this.openInputPlainText, //默认填充文本
          onSuccess (result) {
            //onSuccess将在点击发送之后调用
            /*{ text: String }*/
            _this.openInputPlainResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.openInputPlainResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      setProgressBarColors () {
        const _this = this
        window.dd && window.dd.ui.progressBar.setColors({
          colors: _this.progressBarColors.split(' '), //array[number] 进度条变化颜色，最多支持4个颜色
          onSuccess (result) {
            /* true:成功  false:失败 */
            _this.setProgressBarColorsResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.setProgressBarColorsResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      pullToRefreshEnable () {
        const _this = this
        window.dd && window.dd.ui.pullToRefresh.enable({
          onSuccess (result) {
            _this.pullToRefreshEnableResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.pullToRefreshEnableResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      pullToRefreshStop () {
        window.dd && window.dd.ui.pullToRefresh.stop()
      },
      pullToRefreshDisable () {
        window.dd && window.dd.ui.pullToRefresh.disable()
      },
      webViewBounceEnable () {
        window.dd && window.dd.ui.webViewBounce.enable()
      },
      webViewBounceDisable () {
        window.dd && window.dd.ui.webViewBounce.disable()
      },

      openInnerApp () {
        const _this = this
        window.dd && window.dd.biz.util.open({
          name: _this.openInnerAppName, // 页面名称
          params: _this.openInnerAppParams, // 传参
          onSuccess (data) {
            _this.openInnerAppResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.openInnerAppResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },

      openShare () {
        const _this = this
        if (_this.$platform.is('dingtalk')) {
          window.dd && window.dd.biz.util.share({
            type: _this.shareType, // 分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
            url: _this.shareUrl,
            title: _this.shareTitle,
            content: _this.shareContent,
            image: _this.shareImage,
            onSuccess (data) {
              _this.shareResult = `onSuccess: ${JSON.stringify(data)}`
            },
            onFail (err) {
              _this.shareResult = `onFail: ${JSON.stringify(err)}`
            }
          })
        } else if (_this.$platform.is('dtdream')) {
          window.dd && window.dd.biz.util.share({
            arg: {
              titleStr: _this.shareTitle,
              contentStr: _this.shareContent,
              imageStr: _this.shareImage,
              shareUrlStr: _this.shareUrl
            },
            onSuccess (data) {
              _this.shareResult = `onSuccess: ${JSON.stringify(data)}`
            },
            onFail (err) {
              _this.shareResult = `onFail: ${JSON.stringify(err)}`
            }
          })
        } else {
          _this.shareResult = '未找到对应执行方法'
        }
      },
      previewImage () {
        const _this = this
        window.dd && window.dd.biz.util.previewImage({
          urls: [
            'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
          ],//图片地址列表
          current: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',//当前显示的图片链接
          onSuccess (result) {
            _this.previewImageResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.previewImageResult = `onSuccess: ${JSON.stringify(err)}`
          }
        })
      },

      datepicker () {
        const _this = this
        window.dd && window.dd.biz.util.datepicker({
          format: _this.datepickerFormat,
          value: _this.datepickerValue, //默认显示日期
          onSuccess (result) {
            _this.datepickerResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.datepickerResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },

      timepicker () {
        const _this = this
        window.dd && window.dd.biz.util.timepicker({
          format: _this.timepickerFormat,
          value: _this.timepickerValue, //默认显示日期
          onSuccess (result) {
            _this.timepickerResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.timepickerResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },

      picker () {
        const _this = this
        window.dd && window.dd.biz.util.chosen({
          source: [{
            key: '选项1', //显示文本
            value: '123' //值，
          }, {
            key: '选项2',
            value: '234'
          }],
          selectedKey: '选项2', // 默认选中的key
          onSuccess (result) {
            _this.pickerResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.pickerResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },

      clipboardData () {
        const _this = this
        window.dd && window.dd.biz.clipboardData.setData({
          text: _this.clipboardDataText, //要复制粘贴板的内容
          onSuccess (result) {
            _this.clipboardDataResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.clipboardDataResult = `onFail: ${JSON.stringify(err)}`
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
