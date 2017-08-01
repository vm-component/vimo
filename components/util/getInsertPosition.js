/**
 * @private
 */
export function getInsertPosition (position) {
  return document.getElementById(position) || document.getElementById('app') || document.body
}
