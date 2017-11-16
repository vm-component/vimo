/**
 * 获取弹出层组件插入位置
 * @param {String} position - 元素ID
 * @return {Element}
 * @private
 */
export default function getInsertPosition (position) {
  return (
    document.getElementById(position) ||
    document.body
  )
}
