/**
 * 移除array中的某个item
 * @param {any} array
 * @param {any} item
 * @private
 */
export default function removeArrayItem (array, item) {
  const index = array.indexOf(item)
  // ~index => index*(-1)-1
  // ~-1 => 0
  return ~index && array.splice(index, 1)
}
