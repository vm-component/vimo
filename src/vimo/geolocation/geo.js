import reg from './geolocation-registry'

/**
 * [geo 是作为到处项而存在的]
 * @type {Object}
 */
var geo = {
  getCurrentPosition: getCurrentPosition
};

var count = 0;

/**
 * [cacheURL cache for maps js url]
 * @type {Array}
 */
var cacheURL = [];

/*
* 工具
**/
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

var ERROR_TYPE = {
  1: 'PERMISSION_DENIED',
  2: 'POSITION_UNAVAILABLE',
  3: 'TIMEOUT'
};


/*
  @param type 类型  
  @param posOptions 设置获取参数
**/
function getCurrentPosition() {
  var type = arguments[0];
  var posOptions = arguments[1];

  return new Promise(function (resolve, reject) {
      switch(reg[type].type){
          case "ali":
          _AMapLocation(successFn, errorFn, posOptions);
          break;
        case "baidu":
          _BMapLocation(successFn, errorFn, posOptions);
          break;
        case "qq":
          _QQMapLocation(successFn, errorFn, posOptions);
          break;
        default:
          try{
            (isHttps)_H5Location(successFn,errorFn,posOptions);
          }catch(err){
            console.error("h5位置获取必须是https协议模式");
          }
      }
    
    function successFn(pos) {
      var position = {};
      if (pos.coords) {
        position = { lat: pos.coords.latitude, lng: pos.coords.longitude, maptype: reg[type].type };
      } else if (pos.point) {
        position = { lat: pos.point.lat, lng: pos.point.lng, maptype: reg[type].type };
      } else if (pos.position) {
        position = { lat: pos.position.lat, lng: pos.position.lng, maptype: reg[type].type };
      } else {
        position = { lat: pos.lat, lng: pos.lng, maptype: reg[type].type };
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
  var src = '//webapi.amap.com/maps?v=1.3&key=' + reg.AMAP.app_key;
  if (hasScript(src)&&count>0) runAmap();
  else
  _getScript(src).then(function () {
    runAmap();
  });
    function runAmap(){
      count++;
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
    }
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
  _getScript('//api.map.baidu.com/getscript?v=2.0&ak=' + reg.BMAP.app_key + '&services=&t=' + +new Date()).then(function () {
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
    var geolocation = new window.qq.maps.Geolocation(reg.QQMAP.app_key, reg.QQMAP.app_name);
    geolocation.getLocation(successFn, errorFn, posOptions);
  });
}
/**
 * [_getScript description]
 * 生成script
 * @param  {[String]} mapJsUrl [map js url]
 * @return {[type]}          [description]
 */
function _getScript(mapJsUrl) {  //将地图放在页面上。
  return new Promise(function (resolve, reject) {
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
      }
    };
    sc.onerror = function (err) {
      reject(err);
      sc.onerror = null;
    };

    document.body.appendChild(sc);
  });
}


function hasScript(src){
  var res = false;
  var dom = document.getElementsByTagName("script");
  try{
    Array.prototype.forEach.call(dom,function(e,i){
      e.src===src&&(res=true)
    })
  }catch(err){
    return res;
  }
  
}

exports.default = geo;

module.exports = geo;