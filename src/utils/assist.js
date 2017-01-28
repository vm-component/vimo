/**
 * Created by Hsiang on 2017/1/13.
 * 工具函数
 */

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
let cached;

// watch DOM change
const _MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || false;


module.exports = {
  getScrollBarSize: _getScrollBarSize,
  scrollTop: _scrollTop,
  deepCopy: _deepCopy,
  typeOf: _typeOf,
  warnProp: _warnProp,
  firstUpperCase: _firstUpperCase,
  getStyle: _getStyle,
  camelCase: _camelCase,
  oneOf: _oneOf,
  camelcaseToHyphen: _camelcaseToHyphen,
  MutationObserver: _MutationObserver,
};


// ------------- function -------------

/**
 * 滚动到头部
 * */
function _scrollTop (el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll (start, end, step) {
    if (start === end) return;

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
}

// deepCopy
function _deepCopy (data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

function _typeOf (obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

// Warn
function _warnProp (component, prop, correctType, wrongType) {
  correctType = firstUpperCase(correctType);
  wrongType = firstUpperCase(wrongType);
  console.error(`[iView warn]: Invalid prop: type check failed for prop ${prop}. Expected ${correctType}, got ${wrongType}. (found in component: ${component})`);    // eslint-disable-line
}

// firstUpperCase
function _firstUpperCase (str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
}

// getStyle
function _getStyle (element, styleName) {
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

function _camelCase (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}

// 判断参数是否是其中之一
function _oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

function _camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// For Modal scrollBar hidden
function _getScrollBarSize (fresh) {
  if (fresh || cached === undefined) {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    const outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = 0;
    outerStyle.left = 0;
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }
  return cached;
}
