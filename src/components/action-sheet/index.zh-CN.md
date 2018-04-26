---
category: Components
type: ComponentType
title: ActionSheet
demo: #/action-sheet
---

# 弹出层 / ActionSheet确认单组件

## 简介

 ActionSheet是一个从底部弹出的按钮表单，一般都是由很多Button组成。当用户点击确认完毕后关闭. 可以把它当做**确认单组件**, 或者**单选组件**, 但是按钮建议不超过6个, 如果超过了组件也能正确处理,
   比如滚动选择.

## 关于buttons属性
 - role属性: 可以是cancel(关闭)/destructive(警告/删除)/null, destructive在IOS下有用, 样式为红色字体
 - icon属性: 具体参考Icon组件的写法

## 注意点

 - 组件挂载点在App组件中定义, 是在业务页面之上, 且开启loading/toast都不会遮盖他.
 - 弹出层默认都是根据路由相应的, 当路由切换则弹层自动关闭, 这部分可用`dismissOnPageChange`修改.
 - 可以点击背景关闭组件, 这个在`enableBackdropDismiss`中定义.
 - 建议在关闭动画Promise之后处理请他业务, 这样动画会顺滑一些, 这里监听动画的关闭不是使用setTimeout, 而是监听transitionEnd事件, 因此更可靠.


## Methods

### actionSheet.present(opts)




## Events

## Demo

```js
 import { ActionSheet } from 'vimo'

 ActionSheet.present({
  title: '请选择操作',
  subTitle: '注意，选择后不能撤销！',
  cssClass: 'ActionSheetCssClass1 ActionSheetCssClass2',
  enableBackdropDismiss: true,
  buttons: [
    {
      text: '删除',
      role: 'destructive',
      icon: 'trash',
      cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
      handler: () => {
        console.log('Destructive clicked');
      }
    },
    {
      text: '分享',
      icon: 'share',
      handler: () => {
        console.log('Archive1 clicked');
      }
    },
    {
      text: '播放',
      icon: 'play',
      handler: () => {
        console.log('Archive4 clicked');
      }
    },
    {
      text: '取消',
      role: 'cancel',
      icon: 'close',
      handler: () => {
        ActionSheet.dismiss().then((data) => {
          console.debug('promise的退出方式')
        });
      }
    }
  ]
 })
```
