import { isPassive } from 'components/util/util'

/**
 *
 * 给addEventListener增加passive属性, 如果不支持将降级使用!!opts.capture, 事件的关闭需要自己手动解除, 切记!!
 * @param {Element|Window} ele                               - 监听的元素
 * @param {string} eventName                      - 监听的名称
 * @param {function} callback                     - 回调
 * @param {object} [opts]                         - addEventListener的第三个参数 EventListenerOptions
 * @param {object} [opts.capture]                 - capture
 * @param {object} [opts.passive]                 - passive
 * @param {Array} [unregisterListenersCollection=[]] - 如果提供Function[], 则unReg将压如这个列表中
 * @return {Function}                             - 返回removeEventListener的函数
 */
export default function registerListener (ele,
                                  eventName,
                                  callback,
                                  opts = {},
                                  unregisterListenersCollection = []) {
  // use event listener options when supported
  // otherwise it's just a boolean for the "capture" arg
  const listenerOpts = isPassive()
    ? {
      capture: !!opts.capture,
      passive: !!opts.passive
    }
    : !!opts.capture

  // use the native addEventListener
  ele['addEventListener'](eventName, callback, listenerOpts)

  let unReg = function unregisterListener () {
    ele['removeEventListener'](eventName, callback, listenerOpts)
  }

  if (
    unregisterListenersCollection &&
    Array.isArray(unregisterListenersCollection)
  ) {
    unregisterListenersCollection.push(unReg)
  }

  return unReg
}
