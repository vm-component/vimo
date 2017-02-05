/**
 * Created by Hsiang on 2017/2/4.
 *
 * 名称：
 * 基础组件方法提取，便于在业务中通过this直接使用
 *
 * 介绍：
 * 基础组件构建了页面的基础，当前的组件使用过install安装到全局，组件内部的方法和组件自身的的耦合是非常紧密的，
 * 这里使用注册配置，将基础组件中的方法提出到业务里面，通过this直接使用组件的方法，进而控制在外部控制组件。
 *
 * 全局组件：
 * ion-app/ion-content/ion-title/ion-menu
 *
 */
module.exports = {
  'ion-content': [
    'fixedContent',
    'scrollContent',
    'contentDimensions',
    'getContentDimensions',
    'getScrollDimensions',
    'resize',
    'scrollTo',
    'scrollToTop',
    'scrollToBottom',
    'keyBoardOpen',
    'keyBoardClose',
  ],
  'ion-title': [
    'setTitle',
    'getTitle',
  ],
};
