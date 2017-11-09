/**
 * 根据当前组件的实例获取父组件的名称和传入name是否匹配
 * 函数用于内部组件嵌套验证
 *
 * @param {Object} vm - 组件实例对象
 * @param {String} name - 需要匹配的父组件名称
 * @return {Boolean}
 * */
export default function (vm, name) {
  let _componentTag = vm.$parent.$options._componentTag
  return _componentTag === name || _componentTag.toLowerCase() === name
}
