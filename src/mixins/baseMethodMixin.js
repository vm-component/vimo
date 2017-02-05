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
 * 此配置只适用于将页面组件提取到业务代码中！！！
 *
 * 全局组件：
 * ion-app/ion-content/ion-title/ion-menu
 *
 */

import config from './methodMixinConfig'
let _componentTag;
let _confArr;
let _componentShortName;
let PREFIX = 'ion-';


module.exports = {
  mounted:_doRegister,
  activated:_doRegister,
};
/**
 * 执行注册
 * */
function _doRegister () {
  // console.log('-----------doRegister-----------')
  // console.debug(this)
  _getChildMethods(this, this);
  _activeComponentMethods(this);
  // console.log('----------------------')
}

/**
 * 方法获取
 * @param {VueComponent} parentComponent 方法挂在的组件位置，一般是页面的this
 * @param {VueComponent} childComponent 自组件的this
 * */

function _getChildMethods (parentComponent, childComponent) {
  // 方法挂在及注册
  _componentTag = childComponent.$options._componentTag;
  if (!!_componentTag && !!config[_componentTag.toLowerCase()] && config[_componentTag.toLowerCase()].length > 0) {
    _componentTag = _componentTag.toLowerCase();
    _confArr = config[_componentTag];

    // 注册instance  eg: app -> $app
    _componentShortName = _componentTag.substring(PREFIX.length);
    if (!parentComponent['$' + _componentShortName]) {
      // console.debug('register component: ' + _componentShortName);
      parentComponent['$' + _componentShortName] = childComponent;

      // 注册method eg: setTitle -> $setTitle
      _confArr.forEach(function (methodName) {
        if (!parentComponent['$' + methodName]) {
          // console.debug('register method: ' + methodName);
          parentComponent['$' + methodName] = childComponent[methodName];
        }
      });

    } else {
      // console.debug('has registered component: ' + _componentShortName);
      return
    }
  }

  if (childComponent.$children.length > 0) {
    childComponent.$children.forEach(function (item) {
      _getChildMethods(parentComponent, item);
    })
  }
}

/**
 * 激活组件中的方法，在keep-alive模式下，组件状态是被保存的，这里需要手动再激活
 * @param {VueComponent} parentComponent 方法挂在的组件位置，一般是页面的this
 * */
function _activeComponentMethods (parentComponent) {
  // title组件，当页面切换时，需要设置title，keep-alive时，组件时就被冻结了，这里需要手动在设置
  parentComponent.$setTitle(parentComponent.$getTitle());

}
