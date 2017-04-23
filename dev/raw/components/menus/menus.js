/**
 * Created by Hsiang on 2017/3/2.
 *
 * 记录实例
 * @param {object} instance - 记录的子实例
 * */
import { urlChange } from '../../util/util'
export function recordMenuInstance (instance) {
  // 如果没安装
  let proto = Reflect.getPrototypeOf(Reflect.getPrototypeOf(instance))
  if (!proto.$menus) {
    proto.$menus = new Menus()
  }
  proto.$menus.record(instance)
}

class Menus {
  constructor () {
    this.currentMenuId = null
    this.menuIns = {}
    this._unReg = null // for url change
  }

  /**
   * record
   * @param {object} instance
   * */
  record (instance) {
    this.menuIns[instance.id] = instance
  }

  /**
   * 开启
   * 如果在menu开启另一个menu, 则等到第一个的关闭promise之后再开启
   *
   * @param {string} menuId - 开启menu的id
   * @return {promise}
   *
   * */
  open (id) {
    let _successCb
    let _errorCb

    if (this.currentMenuId) {
      this.close().then(() => {
          // debug: 如果不加nextTick, 部分手机连续动画会出错
          window.setTimeout(() => {
            _openMenu(this, id)
          }, 16 * 10)
        }
      )
    } else {
      _openMenu(this, id)
    }

    function _openMenu (_this, id) {
      if (_this.menuIns[id]) {
        _this.currentMenuId = id
        _this.menuIns[id].openMenu()
        !!_successCb && _successCb()
      } else {
        !!_errorCb && _errorCb()
      }

      // for url change
      _this._unReg && _this._unReg()
      _this._unReg = urlChange(() => {
        _this.close()
      })
    }

    return new Promise((resolve, reject) => {
      _successCb = resolve
      _errorCb = reject
    })
  }

  /**
   * 关闭当前开启的, 如果没有则不处理
   * @return {promise}
   * */
  close () {
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
   * toggle指定的id
   * @param {string} menuId - 开启menu的id
   * */
  toggle (id) {
    if (this.currentMenuId) {
      // open
      return this.close()
    } else {
      // close
      return this.open(id)
    }
  }
}

