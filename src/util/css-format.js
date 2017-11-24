/**
 * 添加px后缀
 * @param {String|Number} val
 * @return {string}
 * @example
 * 10 -> 10px
 * @private
 * */
export default function cssFormat (val) {
  return (val > 0 ? val + 'px' : '')
}
