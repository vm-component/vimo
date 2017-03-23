/**
 * Created by Hsiang on 2017/2/9.
 * 定义clickBlock处理类
 * 执行activate后,设置页面可点击状态
 */

import { clearNativeTimeout, nativeTimeout, setElementClass } from './dom';

const CLICK_BLOCK_POSITION = '.ion-app > .click-block';

export class ClickBlock {

  constructor () {
    /**@param {number} _tmr - setTimeout record*/
    this._tmr = 0;
    /**@param {boolean} _showing - */
    this._showing = false;
    this.clickBlockElement = this._getClickBlockElement();
  }

  /**
   * @param {boolean} shouldShow
   * @param {number} expire
   * */
  activate (shouldShow, expire = 100) {
    if (!this.clickBlockElement) {
      this.clickBlockElement = this._getClickBlockElement();
    }

    clearNativeTimeout(this._tmr);
    if (shouldShow) {
      this._activate(true);
    }
    this._tmr = nativeTimeout(this._activate.bind(this, false), expire);
  }

  /**
   * @internal
   * @param {boolean} shouldShow
   * */
  _activate (shouldShow) {
    if (this._showing !== shouldShow) {
      this._setElementClass('click-block-active', shouldShow);
      this._showing = shouldShow;
    }
  }

  _getClickBlockElement () {
    let _clickBlockElement = document.querySelectorAll(CLICK_BLOCK_POSITION);
    if (!_clickBlockElement || _clickBlockElement.length === 0) {
      return null
    } else {
      return _clickBlockElement[0]
    }
  }

  /**
   * @param {string} className
   * @param {boolean} add
   * */
  _setElementClass (className, add) {
    !!this.clickBlockElement && setElementClass(this.clickBlockElement, className, add);
  }
}
