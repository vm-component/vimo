# 关于hybrid接入的设计

如果检测到时hybrid平台, 则根据统一的填入方式将方法挂在到window.VM下.

规则如下:

```
下面的大类将不随hybrid而变, 大类的规则将被component使用, 因为component会检测此类下是否有hybrid组件


notification -> alert/confirm/prompt/preloading/toast/actionsheet/vibrate/
map
launcher
connection
telephone
util
navigation
user
audio
```


平台等基础初始化完成后, 初始化component, 此时, 实例化组件通过, 如下:
```js

if(!!window.VM.notification){
  Vue.prototype.$notification = window.VM.notification;
}else{
  Vue.prototype.$notification.actionSheet = require(actionSheet);
}

```


