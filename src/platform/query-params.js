/**
 * Created by Hsiang on 2017/2/9.
 * 获取url参数的类
 *
 * @example
 *
 * import {QueryParams} from './platform/query-params'
 * let a = (new QueryParams()).queryParams(location.href)
 * console.log(a.data);
 * => Object {a: "1", b: "3"}
 */

export class QueryParams {
  data = {};// {[key: string]: any}

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
    return this.data
  }
}
