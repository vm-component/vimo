/**
 * 给url添加符合当前 Protocol 的前缀, https协议下使用https下载链接
 * @params {string} url - 脚本地址
 * */
export default function checkProtocol (url) {
  let splitArr = url.split('//')
  /* istanbul ignore if  */
  if (window.location.protocol.toLowerCase().indexOf('https') > -1) {
    splitArr[0] = 'https:'
  } else {
    splitArr[0] = 'http:'
  }
  return splitArr.join('//')
}
