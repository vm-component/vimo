/**
 * Created by Hsiang on 2017/3/2.
 * geolocatation配置信息
 *
 * @description
 *
 *
 */

export default GEOLOCATION_CONFIG = {
  isAuto: false,
  preferList: [
    {
      type: 'ali',
      app_key: 'yourkey',
      app_name: 'yourappname'
    },
    {
      type: 'qq',
      app_key: 'yourkey',
      app_name: 'yourappname'
    },
    {
      type: 'baidu',
      app_key: 'yourkey',
      app_name: 'yourappname'
    },
  ]
};
