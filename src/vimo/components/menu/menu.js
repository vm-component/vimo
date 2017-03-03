/**
 * Created by Hsiang on 2017/3/2.
 */
import Vue from 'vue';

if (!Vue.prototype.$menu) {
  // install
  Vue.prototype.$menu = {};
  Object.assign(Vue.prototype.$menu, {
    menuIns: {}, // menu实例对象
    currentMenuId: null, // 当前开启的menu
    open: open, // open函数
    close: close, // close函数
    toggle: toggle, // toggle函数
  });
}

/**
 * 记录实例
 * @param {object} instance - 记录的子实例
 * */
export function recordMenuInstance (instance) {
  Vue.prototype.$menu.menuIns[instance.id] = instance;
}

// --------  function  --------
/**
 * 开启
 * 如果在menu开启另一个menu, 则等到第一个的关闭promise之后再开启
 *
 * @param {string} menuId - 开启menu的id
 * @return {promise}
 *
 * */
function open (menuId) {
  let _menu = Vue.prototype.$menu;
  let _successCb;
  let _errorCb;

  if (!!_menu.currentMenuId) {
    _menu.close().then(function () {
      _openMenu(_menu, menuId)
    })
  } else {
    _openMenu(_menu, menuId)
  }

  function _openMenu ($menu, id) {
    if (!!$menu.menuIns[id]) {
      $menu.currentMenuId = id;
      $menu.menuIns[id].openMenu();
      !!_successCb && _successCb();
    } else {
      !!_errorCb && _errorCb();
    }
  }

  return new Promise((resolve, reject) => {
    _successCb = resolve;
    _errorCb = reject
  });
}

/**
 * 关闭当前开启的, 如果没有则不处理
 * @return {promise}
 * */
function close () {
  let _menu = Vue.prototype.$menu;
  let currentMenuId = _menu.currentMenuId;
  let _successCb;
  let _errorCb;

  if (!currentMenuId) {
    !!_errorCb && _errorCb();
  } else {
    _menu.currentMenuId = null;
    if (!!_menu.menuIns[currentMenuId]) {
      _menu.menuIns[currentMenuId].closeMenu().then(function () {
        !!_successCb && _successCb();
      });
    } else {
      !!_errorCb && _errorCb();
    }
  }

  return new Promise((resolve, reject) => {
    _successCb = resolve;
    _errorCb = reject
  });
}

/**
 * toggle指定的id
 * @param {string} menuId - 开启menu的id
 * */
function toggle (menuId) {
  let _menu = Vue.prototype.$menu;
  if (!!_menu.currentMenuId) {
    // open
    return _menu.close();
  } else {
    // close
    return _menu.open(menuId);
  }
}
