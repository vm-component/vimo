/**
 * Created by Hsiang on 2017/4/9.
 * @private
 */
export function getInsertPosition (position) {
  return document.getElementById(position) || document.getElementById('app') || document.body
}
