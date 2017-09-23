/**
 * @component Icon
 * @description
 *
 * ## 其他 / Icon组件
 *
 *
 * ### 感谢IONIC
 *
 * 因为Vimo是对Ionic的移植, 故Icon组件也是使用ionicons图标, ionicons地址[点这里](http://ionicons.com/), ionicon根据ios和Android提供了两种同类型不同风格的图标.
 *
 * 另外,ionicon的图标不多, 但是包含了大多数移动端使用场景的icon, 故这部分没有用font-awesome替换.
 *
 * ### 支持自定义
 *
 * 如果有需要其他类型的图片可以使用自定义图标. 这里, icon可以支持ionicons/自定义imgClass:
 *
 * ##### 1 .默认情况下使用ionicons图标
 *
 *   在name中传入ionicons的name即可(去除ion/mode信息)
 *
 * ```
 *  <Icon name="star"></Icon>                     --  根据平台选择, ios:ion-ios-star, md:ion-md-star
 *  <Icon name="ios-star"></Icon>                 --  在全平台都使用ion-ios-star图标
 *  <Icon name="star"></Icon>                     --  根据平台mode  ->  ion-ios-star/ion-android-star
 *  <Icon ios="ios-home" md="md-home"></Icon>     --  单独设定: ios平台使用ios-home, md平台使用md-home
 * ```
 *
 * ##### 2. 如果是自定义的图标icon
 *
 *    命名需要规范下, 用于区分ionicons.
 *
 * ```
 *  <Icon name="icon-star"></Icon>                --  icon-star
 * ```
 *
 * ##### 3. 自定义激活的类 activeName
 * ```
 *  <Icon name="home" activeName="star"></Icon>  --  设定激活的class图标
 * ```
 *
 * ### 可使用的Class
 * [small] - 小一版的icon
 *
 * ### 如何引入
 * ```
 * // 引入
 * import Icon from 'vimo/lib/icon'
 * // 安装
 * Vue.component(Icon.name, Icon)
 * // 或者
 * export default{
   *   components: {
   *    Icon
   *  }
   * }
 * ```
 *
 * @props {String} [mode='ios'] - 模式
 * @props {String} [color] - 颜色
 * @props {String|Boolean} [name] - icon的名称, 如果传入false, 则影藏图标
 * @props {String} [activeName] - Icon激活状态的Icon名称(默认只有ios有, 会在name后面加后缀: `${this.name}-outline`, 其他平台的需要自己传入值)
 * @props {Boolean} [isActive=true] - 表示是否未激活状态, 默认是激活状态
 * @props {String} [ios] - 强制使用ios的Icon
 * @props {String} [md] - 强制使用md的Icon
 *
 * @demo #/icon
 *
 * */
export { default } from './icon.vue'
