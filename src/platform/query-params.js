/**
 * Created by Hsiang on 2017/2/9.
 * 获取url参数的类
 *
 * @example
 *
 * import {setupQueryParams} from './platform/query-params'
 * let a = setupQueryParams(location.href).data
 * => Object {a: "1", b: "3"}
 */

export class QueryParams {
  data = {};// {[key: string]: any}

  /**
   * @param {string} url
   * */
  constructor (url) {
    if (url) {
      const startIndex = url.indexOf('?');
      if (startIndex > -1) {
        const queries = url.slice(startIndex + 1).split('&');
        for (var i = 0; i < queries.length; i++) {
          if (queries[i].indexOf('=') > 0) {
            var split = queries[i].split('=');
            if (split.length > 1) {
              this.data[split[0].toLowerCase()] = split[1].split('#')[0];
            }
          }
        }
      }
    }
  }

  /**
   * @param {string} key
   * */
  get (key) {
    return this.data[key.toLowerCase()];
  }

  /**
   * @param {string} url
   * */
  parseUrl(url){
    alert('query-aprams -> parseUrl')
    if (url) {
      const startIndex = url.indexOf('?');
      if (startIndex > -1) {
        const queries = url.slice(startIndex + 1).split('&');
        for (var i = 0; i < queries.length; i++) {
          if (queries[i].indexOf('=') > 0) {
            var split = queries[i].split('=');
            if (split.length > 1) {
              this.data[split[0].toLowerCase()] = split[1].split('#')[0];
            }
          }
        }
      }
    }
  }

}

/**
 * @private
 * @param {string} url
 * @return {QueryParams}
 */
export function setupQueryParams (url) {
  return new QueryParams(url);
}
