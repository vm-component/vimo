import urlChange from 'src/util/url-change'

export default class Menu {
  constructor () {
    this.currentMenuId = null // 当前打开的menuID
    this.menuIns = {}         // menu实例队列
    this._unReg = null        // for url change

    this.open = this.present
    this.close = this.dismiss
  }

  /**
   * Register a Menu component
   * @param {Object} instance
   * */
  register (instance) {
    this.menuIns[instance.id] = instance
  }

  /**
   * Open the specified Menu component
   * If you present another menu in 'This' menu, wait until the first closed
   * @param {String} id - Menu id
   * @return {Promise}
   *
   * */
  present (id) {
    let _successCb
    let _errorCb
    if (this.currentMenuId) {
      this.dismiss().then(() => {
        // debug: If you don't add nextTick, some mobile phone animations will go wrong
        window.setTimeout(() => {
          _openMenu(this, id)
        }, 16 * 10)
      })
    } else {
      _openMenu(this, id)
    }

    function _openMenu (_this, id) {
      if (_this.menuIns[id]) {
        _this.currentMenuId = id
        _this.menuIns[id].openMenu()
        _successCb && _successCb()
      } else {
        throw new Error('The opened Menu instance does not exist, please check the Menu markups!')
        _errorCb && _errorCb()
      }

      // for url change
      _this._unReg && _this._unReg()
      _this._unReg = urlChange(() => {
        _this.dismiss()
      })
    }

    return new Promise((resolve, reject) => {
      _successCb = resolve
      _errorCb = reject
    })
  }

  /**
   * Close the current open, if not do not handle
   * @return {Promise}
   * */
  dismiss () {
    let currentMenuId = this.currentMenuId
    let _successCb
    let _errorCb

    if (!currentMenuId) {
      _errorCb && _errorCb()
    } else {
      this.currentMenuId = null
      if (this.menuIns[currentMenuId]) {
        this.menuIns[currentMenuId].closeMenu().then(() => {
          _successCb && _successCb()
        })
      } else {
        _errorCb && _errorCb()
      }
    }

    return new Promise((resolve, reject) => {
      // for url change
      this._unReg && this._unReg()
      _successCb = resolve
      _errorCb = reject
    })
  }

  /**
   * Toggle with specified menu id
   * @param {string} id - menu id
   * */
  toggle (id) {
    if (this.currentMenuId) {
      return this.dismiss()
    } else {
      return this.present(id)
    }
  }
}
