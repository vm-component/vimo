/**


 A util used to deal with link deep, in this order:

 1. Deep Link
 2. Open the app in app store (iOS) OR Open the app in android market
 3. Open the original URL

 **/

(function() {
  'use strict';
  var delay = 1200;
  var OSs = {
    android: {
      prefix:"market://details?id=",
      test: /Android/i
    },
    iOS: {
      prefix: 'https://itunes.apple.com/en/app/id',
      test: /iPhone|iPad|iPod/i
    }
  };

  var getUserAgent = function() {
    var k;
    for(k in OSs) {
      if(navigator.userAgent.match(OSs[k].test)) return k;
    }
    return '';
  };

  var getTime = function() {
    return new Date().getTime();
  };

  var open = function(url) {
    window.location.href = url;
  };

  // 处理每个链接节点
  var parseElement = function(el) {
    var clicked, timeout,
      OS = getUserAgent(),
      href = el.getAttribute('href'),
      app = el.getAttribute('data-app'),
      store = el.getAttribute('data-store-'+OS.toLowerCase());

    if(!app) return;
    if(!href) el.setAttribute('href', app);

    if(OS && app) {
      //劫持链接点击事件
      el.onclick = function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var start = getTime();
        clicked = true;

        timeout = setTimeout(function() {
          if(!clicked || !timeout) return;

          var now = getTime();

          clicked = false;
          timeout = null;

          //判断用户已经离开了浏览器
          if(now - start >= delay * 2) return;

          if(store){
            open(OSs[OS].prefix + store);
          }
          else if(href){
            open(href);
          }
        }, delay);

        //微信和QQ浏览器
        if(OS.toLowerCase() == "android" && (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger" || navigator.userAgent.toLowerCase().match(/QQ/i) == "qq")){
          open("http://a.app.qq.com/o/simple.jsp?pkgname="+store);
        }else{
          open(app);
        }

      };
    } else if(!href || href === '#') {
      // 无效的链接
      el.style.display = 'none';
    }

    //参考https://github.com/addyosmani/visibly.js
    visibly.onHidden(function() {
      if(!clicked || !timeout) return;
      timeout = clearInterval(timeout);
      clicked = false;
    });
  };


  // 解析所有的链接
  var elements = document.getElementsByTagName('a'),
    i = elements.length;

  while(i--) parseElement(elements[i]);
})();