/**
 * 下载script脚本
 * @params {string} url - 脚本地址
 * @params {function} cb - 回调函数
 * */
export default function loadScript (url, cb) {
  let _head = document.getElementsByTagName('head')[0]
  let _script = document.createElement('script')
  _script.setAttribute('type', 'text/javascript')
  _script.setAttribute('src', url)
  _head.appendChild(_script)
  _script.onload = function () {
    /* istanbul ignore next */
    cb && cb()
  }
}
