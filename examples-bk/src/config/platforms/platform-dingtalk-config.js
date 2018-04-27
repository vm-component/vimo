/**
 * 平台配置信息
 * 1. 通过userAgent匹配当前平台
 * 2. 加载平台的 JSSDK 脚本
 * 3. 加载完毕执行 bridgeReady 钩子
 * 4. 执行平台相关的驱动, 比如UI组件/导航条/页面切换等可用前端实现的通用部分(如果没有则不执行)
 * 5. 执行完毕触发 $platform.ready(), 平台就绪
 * */
import { docReady } from '../../util/util'
import { PLATFORM_INIT_TIMEOUT } from './variable'
import platformDingTalkDrive from './platform-dingtalk-drive'
import axios from 'axios'
import loadScript from '../../util/load-script'
import checkProtocol from '../../util/check-protocol'

export default {
  initialize (plt) {
    const _this = this
    let jsSDKUrl = checkProtocol(this.settings['jsSDKUrl'])

    /**
     * 在ready之前进行处理
     * */
    plt.beforeReady = () => {
      'use strict'
      loadScript(jsSDKUrl, () => {
        docReady(() => {
          // 接口签名
          _this.beforeBridgeReady(plt)

          window.dd.ready(() => {
            plt.triggerReady('Dingtalk Init Success!')
            plt.timer && window.clearTimeout(plt.timer)
          })

          window.dd.error((err) => {
            plt.triggerFail(`Dingtalk Init ERROR: ${JSON.stringify(err)}`)
            plt.timer && window.clearTimeout(plt.timer)
          })

          // 平台通用非签名接口的方法注册
          platformDingTalkDrive(plt)
        })
      })

      plt.timer = window.setTimeout(() => {
        plt.triggerFail('Dingtalk Init Timeout!')
      }, PLATFORM_INIT_TIMEOUT)
    }

    /**
     * 钉钉的userAgent中包含了网络类型和当前语言
     * AlipayDefined(nt:WIFI,ws:320|548|2.0)
     * Language/zh-Hans
     * */
    let val = plt.userAgent().match(/language\/(.+)/i)
    if (!!val && val.length > 0 && !!val[1]) {
      plt.setLang(val[1].toString().toLowerCase(), true)
    }
  },
  // 由业务完成部分
  // bridge 下载完毕，执行注册操作
  beforeBridgeReady () {
    /**
     * 完成config操作, 配置完成后将自动执行
     * window.dd.ready
     * window.dd.error
     * 两个方法
     * */
    var agentId = 121772783
    let corpId = 'dingc3a80d1c9bdbfc77'
    let corpSecret = '2OG_3jxS3cWBEqab0OwOh17x7w7Q4NSsWlHDLs9nm5HJkkdw0pLYef0wja8ozM_2'
    var url = encodeURI(document.location.href.split('#')[0])
    axios.get(`http://139.196.101.144/api/getDingTalkSignature?corpid=${corpId}&corpsecret=${corpSecret}&url=${url}`)
    .then((response) => {
      let result = response.data
      window.dd.config({
        agentId: agentId, // 必填，微应用ID
        corpId: result.corpId, // 必填，企业ID
        timeStamp: result.timeStamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名
        type: 0,   // 选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList: [
          'device.geolocation.get',  // 需要 获取地理位置信息
          'device.base.getUUID', // 需要 获取uuid
          'device.base.getInterface', // 需要 获取当前连接wifi
          'device.launcher.checkInstalledApps', // 需要 检查一个app是否在手机上安装
          'device.launcher.launchApp', // 需要 打开一个app
          'biz.util.open', // 需要 打开一些业务逻辑
          'biz.contact.choose', // 需要 选人
          'biz.user.get', // 需要 获取用户信息
          'biz.util.uploadImage', // 需要 上传图片
          'biz.ding.post', // 需要 发ding消息
          'biz.telephone.call', // 需要 拨打钉钉电话
          'biz.telephone.showCallMenu', // 需要 拨打普通电话
          'biz.chat.chooseConversation', // 需要 选择会话
          'biz.contact.createGroup', // 需要 创建群聊
          'biz.map.locate', // 需要 定位到地图页面
          'biz.map.search', // 需要 地图页面支持搜索
          'biz.map.view', // 需要 地图预览
          'device.geolocation.openGps', // 需要 打开GPS
          'biz.util.uploadImageFromCamera', // 需要 拍照上传附件
          'biz.customContact.multipleChoose', // 需要 多选自定义选人
          'biz.customContact.choose', // 需要 单选自定义选人
          'biz.contact.complexPicker', // 需要 选人选部门
          'biz.contact.departmentsPicker', // 需要 选部门
          'biz.contact.setRule', // 需要 设置选人规则
          'biz.contact.externalComplexPicker', // 需要 选取外部联系人
          'biz.contact.externalEditForm', // 需要 编辑外部联系人
          'biz.chat.pickConversation', // 需要 获取会话信息
          'biz.chat.chooseConversationByCorpId', // 需要 通过corpid选取会话
          'biz.chat.openSingleChat', // 需要 打开单聊会话
          'biz.chat.toConversation', // 需要 根据chatid跳转到对应会话
          'biz.cspace.saveFile', // 需要 保存钉盘文件
          'biz.cspace.preview', // 需要 预览钉盘文件
          'biz.cspace.chooseSpaceDir', // 需要 选取钉盘目录
          'biz.util.uploadAttachment', // 需要 上传钉盘文件
          'biz.clipboardData.setData', // 需要 复制到粘贴板
          'biz.intent.fetchData', // 需要 获取多选的数据
          'biz.chat.locationChatMessage', // 需要 打开聊天详情到某条消息
          'device.audio.startRecord', // 需要 开始录音
          'device.audio.stopRecord', // 需要 结束录音
          'device.audio.onRecordEnd', // 需要 录音结束
          'device.audio.download', // 需要 下载录音
          'device.audio.play', // 需要 播放录音
          'device.audio.pause', // 需要 录音播放暂停
          'device.audio.resume', // 需要 录音播放恢复
          'device.audio.stop', // 需要 录音播放停止
          'device.audio.onPlayEnd', // 需要 录音播放停止
          'device.audio.translateVoice', // 需要 语音转文字
          'biz.util.fetchImageData', // 需要 获取文件base64数据
          'biz.alipay.auth', // 需要 支付接口授权
          'biz.alipay.pay', // 需要 支付接口支付
          'device.nfc.nfcWrite', // 需要 NFC数据写入
          'biz.util.encrypt', // 需要 数据加密
          'biz.util.decrypt', // 需要 数据揭秘
          'runtime.permission.requestOperateAuthCode', // 需要 获取发送响应式消息Code
          'biz.util.scanCard', // 需要 扫名片
          'util.domainStorage.getItem', // 需要 获取存储信息
          'util.domainStorage.setItem', // 需要 设置存储信息
          'util.domainStorage.removeItem' // 需要 删除存储信息
        ] // 必填，需要使用的jsapi列表，注意：不要带dd。
      })
    })
  },
  settings: {
    usePushWindow: false, // 方法开启新页面
    jsSDKUrl: '//g.alicdn.com/dingding/open-develop/1.6.9/dingtalk.js',
    hideNavBar: true
  },
  isMatch (plt) {
    return plt.isPlatformMatch('dingtalk')
  },
  versionParser (plt) {
    return plt.matchUserAgentVersion(/dingtalk\/(\d+).(\d+).(\d+)?/i)
  }
}
