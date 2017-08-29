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
            <section>
                <strong>获取通用唯一识别码(需要权限)</strong>
                <Button block @click="getUUID()">GetUUID</Button>
                <strong>结果</strong>
                <p class="result">{{getUUIDResult}}</p>
            </section>
            <section>
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
            <section>
                <strong>读取NFC芯片内容(仅限安卓)</strong>
                <Button block @click="nfcRead()">NfcRead</Button>
                <strong>结果</strong>
                <p class="result">{{nfcReadResult}}</p>
            </section>
            <section>
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
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'Container',
    data () {
      return {
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
        last: ''
      }
    },
    methods: {
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
