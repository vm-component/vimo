/**
 * @private
 */
export default function getInsertPosition (position) {
  return (
    document.getElementById(position) ||
    document.getElementById('app') ||
    document.body
  )
}
