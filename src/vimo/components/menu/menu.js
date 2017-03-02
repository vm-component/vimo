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
 * @param {string} menuId - 开启menu的id
 * */
function open (menuId) {
  let _menu = Vue.prototype.$menu;
  _menu.currentMenuId = menuId;
  if (!!_menu.menuIns[menuId]) {
    return _menu.menuIns[menuId].openMenu()
  }
  return false
}

/**
 * 关闭当前开启的, 如果没有则不处理
 * */
function close () {
  let _menu = Vue.prototype.$menu;
  let currentMenuId = _menu.currentMenuId;
  _menu.currentMenuId = null;
  if (!!_menu.menuIns[currentMenuId]) {
    return _menu.menuIns[currentMenuId].closeMenu();
  }
  return false;
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
