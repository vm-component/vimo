import registerListener from './register-listener'

/**
 * urlChange(popstate)注册，绑定的函数触发后会自动解绑
 * @param {function} callback - 回调函数
 * @return {function} - 解绑函数
 * */
export function urlChange (callback) {
  let unReg = function () /* istanbul ignore next */ {}

  const onStateChange = ev => {
    /* istanbul ignore next */
    unReg && unReg()
    /* istanbul ignore next */
    callback(ev)
  }
  unReg = registerListener(window, 'popstate', onStateChange, {})
  return unReg
}
