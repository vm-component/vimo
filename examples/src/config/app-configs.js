/**
 * Created by Hsiang on 2017/3/20.
 *
 * # 应用层级的配置
 *
 * 包括domain/url/AK/ssecretID等
 *
 */
export default {
  platforms: {
    ios: {
      pageTransition: 'fade-right-transition'  //
      // ios-transition/zoom-transition/fade-bottom-transition/fade-right-transition
      // pageTransition: ''  // ios-transition/zoom-transition/fade-bottom-transition/fade-right-transition
    },
    android: {
      pageTransition: 'zoom-transition' //
      // ios-transition/zoom-transition/fade-bottom-transition/fade-right-transition
      // pageTransition: '' // ios-transition/zoom-transition/fade-bottom-transition/fade-right-transition
    },
    alipay: {
      hideNavBar: true
    },
    dingtalk: {
      hideNavBar: true
    }
  },
  domain: '' // http://gamma-member.tesir.top
}
