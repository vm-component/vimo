
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

function getCurrentPosition() {
  var mapType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MAP_TYPES.QQMAP.type;
  var posOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (util.isObject(mapType)) {
    // only 1 Object-type param passed in
    posOptions = mapType;
    mapType = MAP_TYPES.QQMAP.type;
  }
  return new Promise(function (resolve, reject) {
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