<template>
    <Page>
        <Header>
            <Navbar>
                <Title>设备</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <NoticeBar v-if="!$platform.is('dingtalk')" slot="fixedTop">请在钉钉APP环境内使用此页面测试接口</NoticeBar>
            <h4>设备</h4>
            <section v-if="$platform.is('dtdream')">
                <strong>获取用户信息</strong>
                <Button block @click="getUserInfo()">GetUserInfo</Button>
                <strong>结果</strong>
                <p class="result">{{getUserInfoResult}}</p>
            </section>
            <section>
                <strong>获取通用唯一识别码(需要权限)</strong>
                <Button block @click="getUUID()">GetUUID</Button>
                <strong>结果</strong>
                <p class="result">{{getUUIDResult}}</p>
            </section>
            <section v-if="$platform.is('dingtalk')">
                <strong>获取热点接入信息(需要权限)</strong>
                <Button block @click="getInterface()">GetInterface</Button>
                <strong>结果</strong>
                <p class="result">{{getInterfaceResult}}</p>
            </section>
            <section>
                <strong>获取当前网络类型</strong>
                <Button block @click="getNetworkType()">GetNetworkType</Button>
                <strong>结果</strong>
                <p class="result">{{getNetworkTypeResult}}</p>
            </section>
            <section v-if="$platform.is('dingtalk')">
                <strong>读取NFC芯片内容(仅限安卓)</strong>
                <Button block @click="nfcRead()">NfcRead</Button>
                <strong>结果</strong>
                <p class="result">{{nfcReadResult}}</p>
            </section>
            <section v-if="$platform.is('dingtalk')">
                <strong>写NFC芯片(仅限安卓)</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">写入内容: </Label>
                    <Input placeholder="写入内容" type="text" v-model="content" clearInput></Input>
                </Item>
                <Button block @click="nfcWrite()">NfcWrite</Button>
                <strong>结果</strong>
                <p class="result">{{nfcWriteResult}}</p>
            </section>
            <section>
                <strong>摇一摇</strong>
                <Item no-lines class="item">
                    <Label>振动幅度: </Label>
                    <Input placeholder="振动幅度" type="number" v-model="sensitivity" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">采样间隔(ms): </Label>
                    <Input placeholder="采样间隔(毫秒)" type="number" v-model="frequency" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">等待时间(ms): </Label>
                    <Input placeholder="触发『摇一摇』后的等待时间(毫秒)" type="number" v-model="callbackDelay" clearInput></Input>
                </Item>

                <Button block @click="watchShake()">开启监听</Button>
                <Button block @click="clearShake()">清除监听</Button>
                <strong>结果</strong>
                <p class="result">{{shakeResult}}</p>
            </section>

            <section>
                <strong>拨打电话</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">用户列表: </Label>
                    <Input placeholder="多个用空格分割" type="text" v-model="users" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">企业ID: </Label>
                    <Input placeholder="企业ID" type="text" v-model="corpId" clearInput></Input>
                </Item>
                <Button block @click="call()">Call</Button>
                <strong>结果</strong>
                <p class="result">{{callResult}}</p>
            </section>
            <section v-if="$platform.is('dingtalk')">
                <strong>通用电话拨打接口</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">电话: </Label>
                    <Input placeholder="电话号码" type="tel" v-model="phoneNumber" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">国家代号: </Label>
                    <Input placeholder="中国是+86" type="text" v-model="code" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">是否显示钉钉电话</Label>
                    <Toggle slot="item-right" v-model="showDingCall"></Toggle>
                </Item>
                <Button block @click="showCallMenu()">ShowCallMenu</Button>
                <strong>结果</strong>
                <p class="result">{{showCallMenuResult}}</p>
            </section>

            <section v-if="$platform.is('dtdream')">
                <strong>发短信</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">电话: </Label>
                    <Input placeholder="电话号码" type="tel" v-model="smsPhoneNumber" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">内容: </Label>
                    <Input placeholder="..." type="text" v-model="smsContent" clearInput></Input>
                </Item>
                <Button block @click="sendSMS()">sendSMS</Button>
                <strong>结果</strong>
                <p class="result">{{sendSMSResult}}</p>
            </section>

            <section>
                <strong>扫码</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">Type: </Label>
                    <Input placeholder="..." type="text" v-model="scanType" clearInput></Input>
                </Item>
                <Button block @click="scan()">Scan</Button>
                <strong>结果</strong>
                <p class="result">{{scanResult}}</p>
            </section>

            <section>
                <strong>扫名片</strong>
                <Button block @click="scanCard()">ScanCard</Button>
                <strong>结果</strong>
                <p class="result">{{scanCardResult}}</p>
            </section>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'Container',
    data () {
      return {
        getUserInfoResult: '',

        getUUIDResult: '',
        getInterfaceResult: '',
        getNetworkTypeResult: '',
        nfcReadResult: '',
        nfcWriteResult: '',
        content: '',

        sensitivity: 20,
        frequency: 150,
        callbackDelay: 1000,
        shakeResult: '',

        callResult: '',
        users: '',
        corpId: '',

        phoneNumber: '',
        code: '',
        showDingCall: false,
        showCallMenuResult: '',

        smsPhoneNumber: '',
        smsContent: '短信内容',
        sendSMSResult: '',

        scanType: 'all',
        scanResult: '',

        scanCardResult: '',

        last: ''
      }
    },
    methods: {
      getUserInfo () {
        const _this = this
        window.dd && window.dd.biz.user.getUserInfo({
          onSuccess (data) {
            _this.getUserInfoResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.getUserInfoResult = `onFail: ${JSON.stringify(error)}`
          }
        })
      },
      getUUID () {
        const _this = this
        window.dd && window.dd.device.base.getUUID({
          onSuccess (result) {
            /*{uuid: '3udbhg98ddlljokkkl' }*/
            _this.getUUIDResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.getUUIDResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      getInterface () {
        const _this = this
        window.dd && window.dd.device.base.getInterface({
          onSuccess (result) {
            // {ssid: 'alibaba-inc',macIp: '3c:12:aa:09'}
            _this.getInterfaceResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.getInterfaceResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      getNetworkType () {
        const _this = this
        window.dd && window.dd.device.connection.getNetworkType({
          onSuccess (result) {
            // {result: 'wifi' // result值: wifi 2g 3g 4g unknown none   none表示离线}
            _this.getNetworkTypeResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.getNetworkTypeResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      nfcRead () {
        const _this = this
        window.dd && window.dd.device.nfc.nfcRead({
          onSuccess (result) {
            // {content: 'alibaba-inc',}
            _this.nfcReadResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.nfcReadResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      nfcWrite () {
        const _this = this
        window.dd && window.dd.device.nfc.nfcWrite({
          content: _this.content,
          onSuccess (result) {
            _this.nfcReadResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.nfcReadResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },

      watchShake () {
        const _this = this
        _this.shakeResult = `开启监听已设置, 摇一摇手机!`
        window.dd && window.dd.device.accelerometer.watchShake({
          sensitivity: _this.sensitivity,//振动幅度，Number类型，加速度变化超过这个值后触发shake
          frequency: _this.frequency,//采样间隔(毫秒)，Number类型，指每隔多长时间对加速度进行一次采样， 然后对比前后变化，判断是否触发shake
          callbackDelay: _this.callbackDelay,//触发『摇一摇』后的等待时间(毫秒)，Number类型，防止频繁调用
          onSuccess (result) {
            _this.shakeResult = `开启监听 onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.shakeResult = `开启监听 onFail: ${JSON.stringify(err)}`
          }
        })
      },
      clearShake () {
        const _this = this
        window.dd && window.dd.device.accelerometer.clearShake({
          onSuccess (result) {
            _this.shakeResult = `清除监听 onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.shakeResult = `清除监听 onFail: ${JSON.stringify(err)}`
          }
        })
      },
      call () {
        const _this = this
        window.dd && window.dd.biz.telephone.call({
          users: _this.users.split(' '), //用户列表，工号
          corpId: _this.corpId, //企业id
          onSuccess (result) {
            _this.callResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.callResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      showCallMenu () {
        const _this = this
        window.dd && window.dd.biz.telephone.showCallMenu({
          phoneNumber: _this.phoneNumber, // 期望拨打的电话号码
          code: _this.code, // 国家代号，中国是+86
          showDingCall: _this.showDingCall, // 是否显示钉钉电话
          onSuccess (result) {
            _this.showCallMenuResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.showCallMenuResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      sendSMS () {
        const _this = this
        window.dd && window.dd.biz.telephone.sms({
          phoneNumber: _this.smsPhoneNumber,
          text: _this.smsContent,
          onSuccess (result) {
            _this.sendSMSResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.sendSMSResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },

      scan () {
        const _this = this
        window.dd && window.dd.biz.util.scan({
          type: 'all', // type 为 all、qrCode、barCode，默认是all。
          onSuccess (data) {
            _this.scanResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.scanResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },

      scanCard () {
        const _this = this
        window.dd && window.dd.biz.util.scanCard({
          onSuccess (data) {
            _this.scanCardResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.scanCardResult = `onFail: ${JSON.stringify(err)}`
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
