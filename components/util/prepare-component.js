/**
 * 组件准备, 支持异步获取
 * @param {Object|Function|Promise} component - 组件
 * @return {Promise}
 * */
export default function prepareComponent (component) {
  return new Promise((resolve, reject) => {
    let getType = (val) => Object.prototype.toString.call(val).match(/^(\[object )(\w+)\]$/i)[2].toLowerCase()
    let type = getType(component)
    if (type === 'object') {
      resolve(component)
    } else if (type === 'function') {
      component((component) => {
        resolve(component)
      })
    } else if (type === 'promise') {
      component.then((component) => {
        resolve(component)
      })
    } else {
      reject(new Error('need a component'))
    }
  })
}
