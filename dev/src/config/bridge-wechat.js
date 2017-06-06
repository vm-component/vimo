/**
 * Created by Hsiang on 2017/6/6.
 */
export function wechatBridge (plt) {
  // this.$platform.do('chooseImage',function(result){})
  plt.registerMethod('chooseImage', function (callback) {
    window.wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // alert('res')
        // alert(JSON.stringify(res))
        var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        callback && callback(localIds)
      }
    })
  })

  // this.$platform.do('scanCode',function(result){})
  plt.registerMethod('scanCode', function (callback) {
    window.wx.scanQRCode({
      needResult: 1, // 扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['barCode', 'qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        callback && callback(res.resultStr.toString())
      }
    })
  })

}
