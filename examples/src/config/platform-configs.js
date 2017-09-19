/**
 * Created by Hsiang on 2017/3/22.
 *
 * 用户自定义平台配置
 */
import platformWeChatConfig from './platforms/platform-wechat-config'
import platformAliPayConfig from './platforms/platform-alipay-config'
import platformDingTalkConfig from './platforms/platform-dingtalk-config'

export default {
  wechat: platformWeChatConfig,
  alipay: platformAliPayConfig,
  dingtalk: platformDingTalkConfig
}
