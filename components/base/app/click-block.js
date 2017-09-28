/**
 * 定义clickBlock处理类
 * 执行activate后,设置页面可点击状态
 * @private
 */
import { setElementClass } from '../../util/util'

const CLICK_BLOCK_POSITION = '.ion-app > .click-block'

export default class ClickBlock {
  constructor () {
    // setTimeout record
    this._tmr = 0
    // _showing
    this._showing = false
    this.clickBlockElement = this._getClickBlockElement()
  }

  /**
   * @param {boolean} shouldShow
   * @param {number} expire
   * @return {Promise}
   * @private
   * */
  activate (shouldShow, expire = 100) {
    return new Promise((resolve) => {
      if (!this.clickBlockElement) {
        this.clickBlockElement = this._getClickBlockElement()
      }

      window.clearTimeout(this._tmr)
      if (shouldShow) {
        this._activate(true)
      }
      this._tmr = window.setTimeout(() => {
        this._activate(false)
        resolve()
      }, expire)
    })
  }

  /**
   * @internal
   * @param {boolean} shouldShow
   * @private
   * */
  _activate (shouldShow) {
    if (this._showing !== shouldShow) {
      this._setElementClass('click-block-active', shouldShow)
      this._showing = shouldShow
    }
  }

  /**
   * @private
   * */
  _getClickBlockElement () {
    let _clickBlockElement = document.querySelectorAll(CLICK_BLOCK_POSITION)
    if (!_clickBlockElement || _clickBlockElement.length === 0) {
      return null
    } else {
      return _clickBlockElement[0]
    }
  }

  /**
   * @param {string} className
   * @param {boolean} add
   * @private
   * */
  _setElementClass (className, add) {
    this.clickBlockElement && setElementClass(this.clickBlockElement, className, add)
  }
}
