'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [geo Object will be exported]
 * @type {Object}
 */
var geo = {
  register: register,
  getCurrentPosition: getCurrentPosition
};

var DEFAULT_APP_NAME = 'yourappname' + +new Date();
var DEFAULT_APP_KEY = 'yourkey';

var MAP_TYPES = {
  HTML5: {
    type: 'h5',
    map_js_url: '',
    app_key: DEFAULT_APP_KEY,
    app_name: DEFAULT_APP_NAME
  },
  QQMAP: {
    type: 'qq',
    app_key: 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77', // official example app key, please use geo.register() to replace it to your key.
    app_name: DEFAULT_APP_NAME
  },
  BMAP: {
    type: 'baidu',
    app_key: DEFAULT_APP_KEY,
    app_name: DEFAULT_APP_NAME
  },
  AMAP: {
    type: 'ali',
    app_key: DEFAULT_APP_KEY,
    app_name: DEFAULT_APP_NAME
  },
  GMAP: {
    type: 'google',
    app_key: DEFAULT_APP_KEY,
    app_name: DEFAULT_APP_NAME
  }
};

var ERROR_TYPE = {
  1: 'PERMISSION_DENIED',
  2: 'POSITION_UNAVAILABLE',
  3: 'TIMEOUT'
};

var util = {
  isHttps: window.location.protocol === 'https:',
  isSupportGeo: !!window.navigator.geolocation,
  isObject: function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },
  isFunction: function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }
};
/**
 * [cacheURL cache for maps js url]
 * @type {Array}
 */
var cacheURL = [];
/**
 * [register appkey and appname for a Map Applicaiton]
 * @param  {[Object]} appInfo [description]
 * @return {[type]}         [description]
 */
function register() {  //注册，其实就是选中设置的固定地图类型，拿到其详细信息，目的就是填充
  var appInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MAP_TYPES.QQMAP;

  var mapKeys = Object.keys(MAP_TYPES);
  var targetMap = mapKeys.filter(function (item, index) {
    return MAP_TYPES[item].type === appInfo.type;
  })[0];

  MAP_TYPES[targetMap] = {
    type: appInfo.type,
    app_key: appInfo.app_key,
    app_name: appInfo.app_name
  };
}
/**
 * [getCurrentPosition description]
 * @param  {[String]} mapType    [valid value: 'qq'、'baidu'、'ali'、'h5']
 * @param  {Object} posOptions [depends on which map you choose]
 * @return {[type]}            [description]
 */
function getCurrentPosition() {
  var mapType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MAP_TYPES.QQMAP.type;
  var posOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (util.isObject(mapType)) {
    // only 1 Object-type param passed in
    posOptions = mapType;
    mapType = MAP_TYPES.QQMAP.type;
  }
  return new _bluebird2.default(function (resolve, reject) {
    if (util.isSupportGeo) {
      if (util.isHttps || mapType === MAP_TYPES.HTML5.type) {
        _H5Location(successFn, errorFn, posOptions);
      } else {
        _useMapLocation(successFn, errorFn, posOptions, mapType);
      }
    } else {
      _useMapLocation(successFn, errorFn, posOptions, mapType);
    }

    function successFn(pos) {
      var position = {};
      if (pos.coords) {
        position = { lat: pos.coords.latitude, lng: pos.coords.longitude, maptype: MAP_TYPES.HTML5.type };
      } else if (pos.point) {
        position = { lat: pos.point.lat, lng: pos.point.lng, maptype: MAP_TYPES.BMAP.type };
      } else if (pos.position) {
        position = { lat: pos.position.lat, lng: pos.position.lng, maptype: MAP_TYPES.AMAP.type };
      } else {
        position = { lat: pos.lat, lng: pos.lng, maptype: MAP_TYPES.QQMAP.type };
      }
      resolve(position);
    }

    function errorFn(err) {
      if (err && err.code) {
        // html5 PositionError
        console.error('Error: Failed when call navigator.geolocation.getCurrentPosition() . (ERROR_CODE:' + err.code + ', ERROR_TYPE:' + ERROR_TYPE[err.code] + ', ERROR_MESSAGE:' + err.message + ')');
      }
      reject(err);
    }
  });
}
/**
 * [_useMapLocation description]
 * @param  {[Function]} successFn  [success callback function]
 * @param  {[Function]} errorFn    [error callback function]
 * @param  {[Object]} posOptions [depends on which map you choose]
 * @param  {[String]} mapType    [valid value: 'qq'、'baidu'、'ali'、'h5']
 * @return {[type]}            [description]
 */
function _useMapLocation(successFn, errorFn, posOptions, mapType) {
  switch (mapType) {
    case MAP_TYPES.AMAP.type:
      _AMapLocation(successFn, errorFn, posOptions);
      break;
    case MAP_TYPES.BMAP.type:
      _BMapLocation(successFn, errorFn, posOptions);
      break;
    case MAP_TYPES.QQMAP.type:
      _QQMapLocation(successFn, errorFn, posOptions);
      break;
  }
}
/**
 * [_H5Location description]
 * @param  {[Function]} successFn  [description]
 * @param  {[Function]} errorFn    [description]
 * @param  {[Object]} posOptions [description]
 * @return {[type]}            [description]
 */
function _H5Location(successFn, errorFn, posOptions) {
  window.navigator.geolocation.getCurrentPosition(successFn, errorFn, posOptions);
}
/**
 * [_AMapLocation description]
 * @param  {[Function]} successFn  [description]
 * @param  {[Function]} errorFn    [description]
 * @param  {[Object]} posOptions [description]
 * @return {[type]}            [description]
 */
function _AMapLocation(successFn, errorFn, posOptions) {
  // http://lbs.amap.com/api/javascript-api/reference/location/
  _getScript('//webapi.amap.com/maps?v=1.3&key=' + MAP_TYPES.AMAP.app_key).then(function () {
    var aMapWrapId = 'geo-everywhere-amap';
    var map = void 0,
        geolocation = void 0;

    createAMap(function () {
      // instantiate a AMap instance
      map = new window.AMap.Map(aMapWrapId);

      map.plugin('AMap.Geolocation', function () {
        geolocation = new window.AMap.Geolocation({});
        geolocation.getCurrentPosition(onComplete);
      });
      // callback of getCurrentPosition
      function onComplete(status, result) {
        if (status === 'complete') {
          successFn(result);
        } else {
          errorFn(status);
        }
      }
    });
    // Amap need a real map DOM to use AMap.Geolocation plugin
    function createAMap(next) {
      var container = document.createElement('div');
      container.id = aMapWrapId;
      container.style.display = 'none';

      document.body.appendChild(container);

      util.isFunction(next) && next();
    }
  });
}
/**
 * [_BMapLocation description]
 * @param  {[Function]} successFn  [description]
 * @param  {[Function]} errorFn    [description]
 * @param  {[Object]} posOptions [description]
 * @return {[type]}            [description]
 */
function _BMapLocation(successFn, errorFn, posOptions) {
  // http://developer.baidu.com/map/reference/index.php?title=Class:%E6%9C%8D%E5%8A%A1%E7%B1%BB/Geolocation
  _getScript('//api.map.baidu.com/getscript?v=2.0&ak=' + MAP_TYPES.BMAP.app_key + '&services=&t=' + +new Date()).then(function () {
    var geolocation = new window.BMap.Geolocation();

    geolocation.getCurrentPosition(function (pos) {
      if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
        successFn(pos);
      } else {
        errorFn(this.getStatus());
      }
    }, posOptions);
  });
}
/**
 * [_QQMapLocation description]
 * @param  {[Function]} successFn  [description]
 * @param  {[Function]} errorFn    [description]
 * @param  {[Object]} posOptions [description]
 * @return {[type]}            [description]
 */
function _QQMapLocation(successFn, errorFn, posOptions) {
  // http://lbs.qq.com/tool/component-geolocation.html
  _getScript('//3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js').then(function () {
    var geolocation = new window.qq.maps.Geolocation(MAP_TYPES.QQMAP.app_key, MAP_TYPES.QQMAP.app_name);
    geolocation.getLocation(successFn, errorFn, posOptions);
  });
}
/**
 * [_getScript description]
 * @param  {[String]} mapJsUrl [map js url]
 * @return {[type]}          [description]
 */
function _getScript(mapJsUrl) {  //将地图放在页面上。
  return new _bluebird2.default(function (resolve, reject) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = cacheURL[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var url = _step.value;
        // if has cache url, resolve directly
        if (url === mapJsUrl) {
          resolve();
          return false;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var sc = document.createElement('script');
    sc.type = 'text/javascript';
    sc.src = mapJsUrl;

    sc.onload = sc.onreadystatechange = function () {
      if (!this.readyState || /^(loaded|complete)$/.test(this.readyState)) {
        resolve();
        sc.onload = sc.onreadystatechange = null;
        cacheURL.push(mapJsUrl);
        console.log(MAP_TYPES);
      }
    };
    sc.onerror = function (err) {
      reject(err);
      sc.onerror = null;
    };

    document.body.appendChild(sc);
  });
}

exports.default = geo;

module.exports = geo;