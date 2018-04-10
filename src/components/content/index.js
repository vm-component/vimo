export { default } from './content.vue';
/**
 * @component Content
 * @description
 *
 * ## 基础组件 / Content组件
 *
 * Vimo框架的页面基础布局分为Header/Content/Footer三个部分, 也就是"上中下三明治"结构布局, Content组件则是中间业务内容的位置.
 *
 * Content组件中书写的代码可以是滚动的内容, 也可以是固定在一面不随滚动的内容, 比如说当页的广告/刷新按钮/歌词等. 这个特性的的开启需要特殊命名slot才能激活.
 *
 * 此外需要注意的是, 一个页面(Page组件)中只能有一个Content组件, 这个是Vimo使用的规则!
 *
 * Content组件中也可以加入下拉刷新和上拉加载的功能, 具体请参考示例.
 *
 * ## 不需要引入
 *
 * 是的, 基础组件是安装vimo后自动全局注册的.
 *
 * @demo #/content
 *
 * @slot 空                slot为空则将内容插入到scroll中
 * @slot [fixed-top]       固定到顶部
 * @slot [fixed-bottom]    固定到底部
 * @slot [refresher]      refresher组件的位置
 *
 * @fires component:Content#onScrollStart
 * @fires component:Content#onScroll
 * @fires component:Content#onScrollEnd
 *
 * @usage
 * <template>
 *  <Page>
 *    <Header>
 *      <Navbar>
 *        <Title>Demo</Title>
 *      <Navbar>
 *    </Header>
 *    <Content record-position>
 *      <h1>这里是内容</h1>
 *      <p>滚动位置将会被记录</p>
 *    </Content>
 *  </Page>
 * </template>
 *
 * */


/**
 * @typedef {Object} ContentDimension   - Content组件的维度尺寸信息
 * @property {number} contentHeight     - content offsetHeight,           content自身高度
 * @property {number} contentTop        - content offsetTop,               content到窗体顶部的距离
 * @property {number} contentBottom     - content offsetTop+offsetHeight,  content底部到窗体顶部的的距离
 * @property {number} contentWidth      - content offsetWidth
 * @property {number} contentLeft       - content contentLeft
 * @property {number} contentRight      - content offsetLeft + offsetWidth
 * @property {number} scrollHeight      - scroll scrollHeight
 * @property {number} scrollTop         - scroll scrollTop
 * @property {number} scrollBottom      - scroll scrollTop + scrollHeight
 * @property {number} scrollWidth       - scroll scrollWidth
 * @property {number} scrollLeft        - scroll scrollLeft
 * @property {number} scrollRight       - scroll scrollLeft + scrollWidth
 * */

/**
 * @typedef {Object} ScrollEvent            - 滚动事件返回的滚动对象
 * @property {number} timeStamp             - 滚动事件
 * @property {number} scrollTop             -
 * @property {number} scrollLeft            -
 * @property {number} scrollHeight          -
 * @property {number} scrollWidth           -
 * @property {number} contentHeight         -
 * @property {number} contentWidth          -
 * @property {number} contentTop            -
 * @property {number} contentBottom         -
 * @property {number} startY                -
 * @property {number} startX                -
 * @property {number} deltaY                -
 * @property {number} deltaX                -
 * @property {number} velocityY             -
 * @property {number} velocityX             -
 * @property {number} directionY            -
 * @property {number} directionX            -
 * */
