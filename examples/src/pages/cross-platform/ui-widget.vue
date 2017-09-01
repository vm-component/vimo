<template>
    <Page>
        <Header>
            <Navbar>
                <Title>UI控件</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
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

        shareType: 0, // 分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
        shareUrl: 'https://cn.vuejs.org/',
        shareTitle: 'Vue你好',
        shareContent: '这里是分享内容, 分享除去的是Vue官网链接和Logo',
        shareImage: 'https://cn.vuejs.org/images/logo.png',
        shareResult: '',

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
        window.dd && window.dd.device.notification.alert({
          title: '温馨提示',
          message: '您的快递到了',
          buttonName: '确定',
          onSuccess (data) {
            _this.alertResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.alertResult = `onFail: ${JSON.stringify(error)}`
          }
        })
      },
      openConfirm () {
        const _this = this
        window.dd && window.dd.device.notification.confirm({
          title: '温馨提示',
          message: '您是否想查询快递单号：\n1234567890',
          buttonLabels: ['暂不需要', '马上查询'],
          onSuccess (data) {
            _this.confirmResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.confirmResult = `onFail: ${JSON.stringify(error)}`
          },
          onCancel (error) {
            _this.confirmResult = `onCancel: ${JSON.stringify(error)}`
          }
        })
      },
      openPrompt () {
        const _this = this
        window.dd && window.dd.device.notification.prompt({
          title: '登录iTunes Store',
          message: '请输入您Apple ID"apple@icloud.com"的密码',
          cancelButton: '取消',
          otherButton: '确定',
          onSuccess (data) {
            _this.promptResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.promptResult = `onFail: ${JSON.stringify(error)}`
          },
          onCancel (error) {
            _this.promptResult = `onCancel: ${JSON.stringify(error)}`
          }
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
        const _this = this
        window.dd && window.dd.device.notification.showPreloader({
          text: '正在加载',
          showIcon: true,
          onSuccess (data) {
            _this.loadingResult = `showPreloader onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.loadingResult = `showPreloader onFail: ${JSON.stringify(error)}`
          }
        })

        window.setTimeout(() => {
          window.dd && window.dd.device.notification.hidePreloader({
            onSuccess (data) {
              _this.loadingResult = `hidePreloader onSuccess: ${JSON.stringify(data)}`
            },
            onFail (error) {
              _this.loadingResult = `hidePreloader onFail: ${JSON.stringify(error)}`
            }
          })
        }, 1000)
      },
      openToast () {
        const _this = this

        if (_this.$platform.is('dingtalk')) {
          window.dd && window.dd.device.notification.toast({
            icon: 'success',
            text: '支付成功',
            duration: 3,
            delay: 0,
            onSuccess (data) {
              _this.toastResult = `onSuccess: ${JSON.stringify(data)}`
            },
            onFail (error) {
              _this.toastResult = `onFail: ${JSON.stringify(error)}`
            }
          })
        } else if (_this.$platform.is('dtdream')) {
          window.dd && window.dd.device.notification.toast({
            message: '支付成功',
            duration: 3,
            onSuccess (data) {
              _this.toastResult = `onSuccess: ${JSON.stringify(data)}`
            },
            onFail (error) {
              _this.toastResult = `onFail: ${JSON.stringify(error)}`
            }
          })
        } else {
          _this.toastResult = '未找到对应方法!'
        }
      },
      openActionSheet () {
        const _this = this
        window.dd && window.dd.device.notification.actionSheet({
          title: '谁是最棒哒？',
          cancelButton: '取消',
          otherButtons: ['孙悟空', '猪八戒', '唐僧', '沙和尚'],
          onSuccess (data) {
            _this.actionSheetResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.actionSheetResult = `onFail: ${JSON.stringify(error)}`
          },
          onCancel (error) {
            _this.actionSheetResult = `onCancel: ${JSON.stringify(error)}`
          }
        })
      },
      openModal () {
        const _this = this
        window.dd && window.dd.device.notification.modal({
          image: 'http://gw.alicdn.com/tps/i2/TB1SlYwGFXXXXXrXVXX9vKJ2XXX-2880-1560.jpg_200x200.jpg', // 标题图片地址
          title: '2.4版本更新', //标题
          content: '1.功能更新2.功能更新;', //文本内容
          buttonLabels: ['了解更多', '知道了'],// 最多两个按钮，至少有一个按钮。
          onSuccess (result) {
            _this.modalResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.modalResult = `onFail: ${JSON.stringify(err)}`
          }
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
      openShare () {
        const _this = this
        if (this.$platform.is('dingtalk')) {
          window.dd && window.dd.biz.util.share({
            type: _this.shareType, // 分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
            url: _this.shareUrl,
            title: _this.shareTitle,
            content: _this.shareContent,
            image: _this.shareImage,
            onSuccess () {
              _this.shareResult = `onSuccess: ${JSON.stringify(data)}`
            },
            onFail (err) {
              _this.shareResult = `onFail: ${JSON.stringify(err)}`
            }
          })
        } else if (this.$platform.is('dtdream')) {
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
        }
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
