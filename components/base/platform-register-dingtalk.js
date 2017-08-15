/**
 * 说明:
 * platform.js中关于平台方法的复写
 * 当前处于平台初始化完毕阶段, window.AlipayJSBridge等私有变量存在且可用
 * */
export default function (plt) {
  // 注册平台 setTitle 方法, 参数在platform.js中
  plt.setTitle = (titleInfo) => {
    window.dd.biz.navigation.setTitle({
      title: titleInfo.title || '' // 控制标题文本，空字符串表示显示默认文本
    })
  }
}