/**
 * Created by Hsiang on 2017/1/28.
 */
module.exports = {
  // 样式模式
  mode: 'ios',
  // 键盘高度
  keyboardHeight: 350,
  // 最上面的status bar的高度
  statusBarHeight: 20,
  // scroll的动画事件
  scrollTransitionTime: 300,
  // menu展现的类型："overlay", "reveal".
  menuType: 'reveal',
  // 默认的header高度，如果header的height读取不出来的时候备用,单位px
  headerHeight:{
    ios:44
  },
  footerHeight:{
    ios:44
  }
}
