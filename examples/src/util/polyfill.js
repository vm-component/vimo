/**
 * Created by Hsiang on 2017/4/24.
 * The polyfill for vimo running on more mobiles
 * @private
 */

// fixed Object #<HTMLDivElement> has no method 'remove'
if (!('remove' in window.Element.prototype)) {
  window.Element.prototype.remove = function () {
    // BugFixed: Cannot read property 'removeChild' of null
    this && this.parentNode && this.parentNode.removeChild && this.parentNode.removeChild(this)
  }
}

// RequestAnimationFrame的兼容腻子(Android 4.3 and below)
/*! @author Paul Irish */
/*! @source https://gist.github.com/paulirish/1579671 */
(function () {
  var rafLastTime = 0
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (cbs) {
      var currTime = Date.now()
      var timeToCall = Math.max(0, 16 - (currTime - rafLastTime))
      var id = window.setTimeout(function () {
        cbs && cbs(currTime + timeToCall)
      }, timeToCall)

      rafLastTime = currTime + timeToCall
      return id
    }
  }

  if (!window.cancelAnimationFrame) {
    /**
     * @param {number} id
     * */
    window.cancelAnimationFrame = function (id) { clearTimeout(id) }
  }
})()
