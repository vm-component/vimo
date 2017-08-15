/**
 * 说明:
 * platform.js中关于平台方法的复写
 * 当前处于平台初始化完毕阶段, window.AlipayJSBridge等私有变量存在且可用
 * */
export default function (plt) {
  // 设置网络类型
  // 网络环境发生变化，可调用getNetworkType接口获取详细信息
  window.AlipayJSBridge.call('getNetworkType', (result) => {
    /**
     * result 参数
     * @param {boolean} result.networkAvailable - true              | true              | false
     * @param {boolean} result.networkInfo      - WIFI              | 3G                | NOTREACHABLE
     * @param {boolean} result.err_msg          - network_type:wifi | network_type:wwan | network_type:fail
     * @param {boolean} result.networkType      - wifi              | wwan              | fail
     * */
    plt.setNetworkType(result.networkInfo.toString().toLowerCase())
  })

  // 注册平台退出方法 `exitApp`
  plt.exitApp = () => {
    window.AlipayJSBridge.call('exitApp')
  }

  // 注册平台 setTitle 方法, 参数在platform.js中
  plt.setTitle = (titleInfo) => {
    window.AlipayJSBridge.call('setTitle', titleInfo)
  }
}