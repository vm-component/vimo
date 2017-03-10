import geo from './geo'
import reg from './geolocation-registry'

class geolocation{
  constructor(){
    this.geo = geo;
  }

  getCurrentPosition(type){
    let keys = Object.keys(reg);
    var targetType = keys.filter(function (item, index) {
      return reg[item].type === type;
    })[0];  //返回类型
    geo.register(reg[targetType]);
    return geo.getCurrentPosition(reg[targetType].type);
  }
}


// 避免重复 install，设立 flag
geolocation.installed = false
geolocation.install = function (externalVue) {
  if (geolocation.installed) {
    return
  }
  var Vue = externalVue;
  // 保持单例
  if(!Vue.prototype.$geolocation) Vue.prototype.$geolocation = new geolocation();

  // install 完毕
  geolocation.installed = true
}

//Vue 作为全局变量时自动 install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(geolocation)
}

module.exports = geolocation;