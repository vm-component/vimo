/**
 * Created by Hsiang on 2017/2/7.
 * @typedef {object} PointerCoordinates - 类型如为: {x:number,y:number}
 * @typedef {object} Dimensions - 类型如为: {width: number, height: number, left: number, top: number}
 */

const win = window;
const doc = document.documentElement;
let dimensionCache = {}; // any
// RequestAnimationFrame的兼容腻子(Android 4.3 and below)
/*! @author Paul Irish */
/*! @source https://gist.github.com/paulirish/1579671 */
(function () {
  var rafLastTime = 0;
  if (!win.requestAnimationFrame) {
    win.requestAnimationFrame = function (callback) {
      var currTime = Date.now();
      var timeToCall = Math.max(0, 16 - (currTime - rafLastTime));

      var id = win.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);

      rafLastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!win.cancelAnimationFrame) {
    /**
     * @param {number} id
     * */
    win.cancelAnimationFrame = function (id) { clearTimeout(id); };
  }
})();

// requestAnimationFrame/cancelAnimationFrame包装
export const nativeRaf = win.requestAnimationFrame.bind(win);
export const cancelRaf = win.cancelAnimationFrame.bind(win);

// setTimeout/clearTimeout包装
export const nativeTimeout = win.setTimeout.bind(win);
export const clearNativeTimeout = win.clearTimeout.bind(win);

// /**
//  * Run a function in an animation frame after waiting `framesToWait` frames.
//  * 等待framesToWait个帧后执行动画函数
//  *
//  * @param framesToWait {number} how many frames to wait 等待数
//  * @param callback {Function} the function call to defer 执行的函数
//  * @return Function a function to call to cancel the wait 取消的函数
//  */
// export function rafFrames (framesToWait, callback) {
//   framesToWait = Math.ceil(framesToWait);
//   let rafId;
//   let timeoutId;
//
//   if (framesToWait === 0) {
//     callback();
//
//   } else if (framesToWait < 2) {
//     rafId = nativeRaf(callback);
//
//   } else {
//     timeoutId = nativeTimeout(() => {
//       rafId = nativeRaf(callback);
//     }, (framesToWait - 1) * 16.6667);
//   }
//
//   return function () {
//     clearNativeTimeout(timeoutId);
//     cancelRaf(nativeRaf);
//   };
// }


/**
 * 当前环境的可用CSS变量名称
 * 下方自动执行
 * @param {HTMLElement} docEle
 * */
export function getCss (docEle) {
  const css = {
    transform: null,
    transition: null,
    transitionDuration: null,
    transitionDelay: null,
    transitionTimingFn: null,
    transitionStart: null,
    transitionEnd: null,
    transformOrigin: null,
    animationDelay: null,
  };

  // transform
  var i;
  var keys = ['webkitTransform', '-webkit-transform', 'webkit-transform', 'transform'];

  for (i = 0; i < keys.length; i++) {
    if (docEle.style [keys[i]] !== undefined){
      css.transform = keys[i];
      break;
    }
  }

  // transition
  keys = ['webkitTransition', 'transition'];
  for (i = 0; i < keys.length; i++) {
    if (docEle.style[keys[i]] !== undefined){
      css.transition = keys[i];
      break;
    }
  }

  // The only prefix we care about is webkit for transitions.
  var isWebkit = css.transition.indexOf('webkit') > -1;

  // transition duration
  css.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration';

  // transition timing function
  css.transitionTimingFn = (isWebkit ? '-webkit-' : '') + 'transition-timing-function';

  // transition delay
  css.transitionDelay = (isWebkit ? '-webkit-' : '') + 'transition-delay';

  // To be sure transitionend works everywhere, include *both* the webkit and non-webkit events
  css.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend';

  // transform origin
  css.transformOrigin = (isWebkit ? '-webkit-' : '') + 'transform-origin';

  // animation delay
  css.animationDelay = (isWebkit ? 'webkitAnimationDelay' : 'animationDelay');

  return css;
}

/**
 * transitionEnd事件注册，绑定的函数触发后会自动解绑
 * @param {HTMLElement} el 绑定的元素
 * @param {Function} callback 绑定的函数
 * @return {Function}  取消绑定的函数
 * */
export function transitionEnd (el, callback) {
  const unRegs= [];

  function unregister() {
    unRegs.forEach(unReg => {
      unReg();
    });
  }

  function onTransitionEnd(ev) {
    if (el === ev.target) {
      unregister();
      callback(ev);
    }
  }

  if (el) {
    this.registerListener(el, 'webkitTransitionEnd', onTransitionEnd, {}, unRegs);
    this.registerListener(el, 'transitionend', onTransitionEnd, {}, unRegs);
  }

  return unregister;
}


/**
 * @private
 *
 * 给addEventListener增加passive属性, 如果不支持将降级使用!!opts.capture
 *
 * @param {any} ele                                   - 监听的元素
 * @param {string} eventName                          - 监听的名称
 * @param {function} callback                         - 回调
 * @param {object} opts EventListenerOptions          - addEventListener的第三个参数
 * @param {Function[]=} unregisterListenersCollection - 如果提供Function[], 则unReg将压如这个列表中
 *
 * @return {Function} 返回removeEventListener的函数
 *
 */
export function registerListener (ele, eventName, callback, opts, unregisterListenersCollection) {
  // TODO: 这部分事件需要放到event.js中
  let _uiEvtOpts = _initEvent();
  // use event listener options when supported
  // otherwise it's just a boolean for the "capture" arg
  const listenerOpts = _uiEvtOpts ? {
      'capture': !!opts.capture,
      'passive': !!opts.passive,
    } : !!opts.capture;

  let unReg;

  // use the native addEventListener
  ele['addEventListener'](eventName, callback, listenerOpts);

  unReg = function unregisterListener () {
    ele['removeEventListener'](eventName, callback, listenerOpts);
  };

  if (unregisterListenersCollection && Array.isArray(unregisterListenersCollection)) {
    unregisterListenersCollection.push(unReg);
  }

  return unReg;
}

// TODO: 这部分事件需要放到event.js中
export function _initEvent () {
  let _uiEvtOpts = false;
  // Test via a getter in the options object to see if the passive property is accessed
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: () => {
        _uiEvtOpts = true;
      }
    });
    window.addEventListener('optsTest', null, opts);
  } catch (e) { }

  return _uiEvtOpts
}

/**
 * urlChange注册，绑定的函数触发后会自动解绑
 * @param {function} callback
 * @return {function}
 * */
export function urlChange (callback) {
  const URL_EVENT = ['hashchange', 'popstate'];
  URL_EVENT.forEach(eventName => {
    window.addEventListener(eventName, onEvent);
  });

  return unregister

  function unregister () {
    URL_EVENT.forEach(eventName => {
      window.removeEventListener(eventName, onEvent);
    });
  }

  /**
   * @param {UIEvent} ev
   * */
  function onEvent (ev) {
    // auto unregister
    unregister();
    callback(ev);
  }
}

/**
 * document的ready事件监听
 * @param {Function} callback - 回调函数
 * @return {Promise} 返回promise，completed后自动解绑
 * */
export function ready (callback) {
  let promise = null; //Promise;

  if (!callback) {
    // a callback wasn't provided, so let's return a promise instead
    promise = new Promise(resolve => { callback = resolve; });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    callback();

  } else {
    document.addEventListener('DOMContentLoaded', completed, false);
    win.addEventListener('load', completed, false);
  }

  return promise;

  function completed () {
    document.removeEventListener('DOMContentLoaded', completed, false);
    win.removeEventListener('load', completed, false);
    callback();
  }
}

/**
 * 根据click或者touch的事件对象, 获取event事件对象中的点击位置(坐标xy值)
 * @param {any} ev - 事件对象
 * @return  {PointerCoordinates} - 坐标
 * */
export function pointerCoord (ev) {
  if (ev) {
    var changedTouches = ev.changedTouches;
    if (changedTouches && changedTouches.length > 0) {
      var touch = changedTouches[0];
      return {x: touch.clientX, y: touch.clientY};
    }
    var pageX = ev.pageX;
    if (pageX !== undefined) {
      return {x: pageX, y: ev.pageY};
    }
  }
  return {x: 0, y: 0};
}

/**
 * 判断是否移动
 * @param {number} threshold - 阈值
 * @param {PointerCoordinates} startCoord - 开始坐标
 * @param {PointerCoordinates} endCoord - 结束坐标
 * */
export function hasPointerMoved (threshold, startCoord, endCoord) {
  if (startCoord && endCoord) {
    const deltaX = (startCoord.x - endCoord.x);
    const deltaY = (startCoord.y - endCoord.y);
    const distance = deltaX * deltaX + deltaY * deltaY;
    return distance > (threshold * threshold);
  }
  return false;
}

/**
 * 判断元素是否在激活状态, 比如input
 * @param {HTMLElement} ele - 元素
 * @return {boolean}
 * */
export function isActive (ele) {
  return !!(ele && (document.activeElement === ele));
}

/**
 * 判断元素是否在focus状态, 比如input
 * @param {HTMLElement} ele - 元素
 * @return {boolean}
 * */
export function hasFocus (ele) {
  return isActive(ele) && (ele.parentElement.querySelector(':focus') === ele);
}

/**
 * 判断TEXTAREA或者INPUT是否可输入
 * @param {HTMLElement} ele - 元素
 * @return {boolean}
 * */
export function isTextInput (ele) {
  return !!ele &&
    (ele.tagName === 'TEXTAREA' ||
    ele.contentEditable === 'true' ||
    (ele.tagName === 'INPUT' && !(NON_TEXT_INPUT_REGEX.test(ele.type))));
}

export const NON_TEXT_INPUT_REGEX = /^(radio|checkbox|range|file|submit|reset|color|image|button)$/i;

/**
 * 判断TEXTAREA或者INPUT是否在focus状态
 * @return {boolean}
 * */
export function hasFocusedTextInput () {
  const ele = document.activeElement; // <HTMLElement>
  if (isTextInput(ele)) {
    return (ele.parentElement.querySelector(':focus') === ele);
  }
  return false;
}

/**
 * blur out TEXTAREA或者INPUT的状态
 * @return {boolean}
 * */
export function focusOutActiveElement () {
  const activeElement = document.activeElement; //  <HTMLElement>
  activeElement && activeElement.blur && activeElement.blur();
}

const skipInputAttrsReg = /^(value|checked|disabled|type|class|style|id|autofocus|autocomplete|autocorrect)$/i;

// /**
//  * 拷贝input的属性, 好像用不到?
//  * @param {HTMLElement} srcElement -
//  * @param {HTMLElement} destElement -
//  * */
// export function copyInputAttributes (srcElement, destElement) {
//   // copy attributes from one element to another
//   // however, skip over a few of them as they're already
//   // handled in the angular world
//   var attrs = srcElement.attributes;
//   for (var i = 0; i < attrs.length; i++) {
//     var attr = attrs[i];
//     if (!skipInputAttrsReg.test(attr.name)) {
//       destElement.setAttribute(attr.name, attr.value);
//     }
//   }
// }

/**
 * Get the element offsetWidth and offsetHeight. Values are cached
 * to reduce DOM reads. Cache is cleared on a window resize.
 * 获取元素的尺寸信息, 需要给出当前元素的标识id, 此信息会缓存
 * @param {HTMLElement} ele
 * @param {string} id
 * @return {Dimensions}
 */
export function getDimensions (ele, id) {
  let dimensions = dimensionCache[id];
  if (!dimensions) {
    // make sure we got good values before caching
    if (ele.offsetWidth && ele.offsetHeight) {
      dimensions = dimensionCache[id] = {
        width: ele.offsetWidth,
        height: ele.offsetHeight,
        left: ele.offsetLeft,
        top: ele.offsetTop
      };

    } else {
      // do not cache bad values
      return {width: 0, height: 0, left: 0, top: 0};
    }
  }

  return dimensions;
}

/**
 * 清除缓存的dimension信息
 * @param {string} id
 * @return {Dimensions}
 */
export function clearDimensions (id) {
  delete dimensionCache[id];
}

/**
 * 获取window的dimension信息
 * @return {Dimensions}
 */
export function windowDimensions () {
  if (!dimensionCache.win) {
    // make sure we got good values before caching
    if (win.innerWidth && win.innerHeight) {
      dimensionCache.win = {
        width: win.innerWidth,
        height: win.innerHeight
      };
    } else {
      // do not cache bad values
      return {width: 0, height: 0};
    }
  }
  return dimensionCache.win;
}

/**
 * 清空dimensionCache缓存
 * */
export function flushDimensionCache () {
  dimensionCache = {};
}

/**
 * 元素的class操作
 * @param {HTMLElement} ele - 添加、删除class的元素
 * @param {string} className
 * @param {boolean} add - 是添加还是删除
 * */
export function setElementClass (ele, className, add) {
  if (add) {
    _addClass(ele, className)
  } else {
    _removeClass(ele, className)
  }

  /**
   * 元素的class操作
   * */
  function _hasClass (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }

  function _addClass (obj, cls) {
    if (!_hasClass(obj, cls)) {
      obj.className += " " + cls;
    }
  }

  function _removeClass (obj, cls) {
    if (_hasClass(obj, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      obj.className = obj.className.replace(reg, ' ').trim();
    }
  }

}



export function getStyle (element, styleName) {
  if (!element || !styleName) return null;
  styleName = _camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    const computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
function _camelCase (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}


//这个函数是用来将form表单里的所有数据打包成data
export  function getFormJsonData(config) {
    var _config = {
      container: undefined, // 在指定容器中寻找表单元素
      empty: true      // value为空的值是否获取
    }
    $.extend(_config, config);

    var $targets = $('input, select, textarea');
    if(_config.container) {
      $targets = $(_config.container).find('input, select, textarea');
    }

    var result = {};
    $targets.each(function() {
      var k = $(this).attr('name');
      var v = $(this).val();
      var type = $(this).attr('type');
      if(typeof k === 'undefined') return;
      if(!_config.empty && v === '') return;
      if(type === 'radio') {
        if($(this).is(':checked')) {
          result[k] = v;
        }
      } else if(type === 'checkbox') {
        if($(this).is(':checked')) {
          if(result[k] instanceof Array) {
            result[k].push(v);
          } else {
            result[k] = [v];
          }
        }
      } else {
        result[k] = v;
      }
    });
    return JSON.stringify(result);
}


 /**
 * @param context Object {name:key,name:key....}
 */
export function setFormJsonData(context, config) {
    var _config = {
      container: undefined // 在指定容器中寻找表单元素
    }
    $.extend(_config, config);

    for(var k in context) {
      var $target = $('[name="'+k+'"]');
      if(_config.container) {
        $target = $(_config.container).find('[name="'+k+'"]');
      }
      $target.val(context[k]);
    }
  }

/*
 *@param el  scirpt dom
 * @param callback 回掉函数
**/
export function loadScript(el,callback){  //script加载完成后的监听
  el.onload = el.onreadystatechange = function () {
    if (!this.readyState || /^(loaded|complete)$/.test(this.readyState)) {
      el.onload = el.onreadystatechange = null;
      callback();
    }
  };
  el.onerror = function (err) {
    console.error(err);
    el.onerror = null;
  };
}
