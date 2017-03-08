
!function (win, bridge) {
  if ("function" == typeof define && (define.amd || define.cmd)) {
    define(function () {
      return bridge(win)
    })
  } else {
    bridge(win, true)
  }

}(this, function (window, noDefine) {

    /**
     * 真正执行JSAPI方法的地方
     * @name invokeMethod
     *
     * @param {string} methodName - 方法名
     * @param {object} opt - 必须的属性
     * @param {object} fullOptions - 外部传入的全部参数
     * */
    function invokeMethod (methodName, opt, fullOptions) {
      if (window.WeixinJSBridge) {
        WeixinJSBridge.invoke(methodName, addVerifyInfo(opt), function (res) {
          invokeResultHandler(methodName, res, fullOptions)
        })
      } else {
        printErrorLogInDebugMode(methodName, fullOptions)
      }
    }

    /**
     * 点击才会触发的动作, 比如分享需要点击
     * invokeEventMethod
     * @param {string} methodName - 方法名称
     * @param {object} defaultOptions
     * @param {object=} customerOptions
     * */
    function invokeEventMethod (methodName, defaultOptions, customerOptions) {
      if (window.WeixinJSBridge) {
        WeixinJSBridge.on(methodName, function (res) {
          customerOptions && customerOptions.trigger && customerOptions.trigger(res);
          invokeResultHandler(methodName, res, defaultOptions);
        })
      } else if (customerOptions) {
        printErrorLogInDebugMode(methodName, customerOptions)
      } else {
        printErrorLogInDebugMode(methodName, defaultOptions)
      }
    }

    // 给传参的对象增加验证信息 addVerifyInfo
    function addVerifyInfo (opt) {
      opt = opt || {}
      opt.appId = configOptions.appId;
      opt.verifyAppId = configOptions.appId
      opt.verifySignType = "sha1"
      opt.verifyTimestamp = configOptions.timestamp + ""
      opt.verifyNonceStr = configOptions.nonceStr
      opt.verifySignature = configOptions.signature
      return opt
    }

    /**
     * 获取支付的签名参数
     * @param {object} options - 用户传入的参数
     * */
    function getWxPayConfig (options) {
      return {
        timeStamp: options.timestamp + "",
        nonceStr: options.nonceStr,
        "package": options.package,
        paySign: options.paySign,
        signType: options.signType || "SHA1"
      }
    }

    /**
     * WeixinJSBridge返回的result处理
     * @param {string} methodName - 方法名称
     * @param {object} res - invoke返回的结果
     * @param {object=} customerOptions
     * */
    function invokeResultHandler (methodName, res, customerOptions) {
      var errMsg, flag, status;
      delete res.err_code;
      delete res.err_desc;
      delete res.err_detail;
      errMsg = res.errMsg;
      if (!errMsg) {
        errMsg = res.err_msg;
        delete res.err_msg;
        errMsg = errHandler(methodName, errMsg);
        res.errMsg = errMsg
      }
      customerOptions = customerOptions || {};
      customerOptions._complete && (customerOptions._complete(res), delete customerOptions._complete);
      errMsg = res.errMsg || "";
      configOptions.debug && !customerOptions.isInnerInvoke && alert(JSON.stringify(res));
      flag = errMsg.indexOf(":");
      status = errMsg.substring(flag + 1);
      switch (status) {
        case"ok":
          customerOptions.success && customerOptions.success(res);
          break;
        case"cancel":
          customerOptions.cancel && customerOptions.cancel(res);
          break;
        default:
          customerOptions.fail && customerOptions.fail(res)
      }
      customerOptions.complete && customerOptions.complete(res)
    }

    /**
     * 错误处理
     * */
    function errHandler (a, b) {
      var e, f, c = a, d = preVerifyOptionsReverse[c];
      return d && (c = d), e = "ok", b && (f = b.indexOf(":"), e = b.substring(f + 1), "confirm" == e && (e = "ok"), "failed" == e && (e = "fail"), -1 != e.indexOf("failed_") && (e = e.substring(7)), -1 != e.indexOf("fail_") && (e = e.substring(5)), e = e.replace(/_/g, " "), e = e.toLowerCase(), ("access denied" == e || "no permission to execute" == e) && (e = "permission denied"), "config" == c && "function not exist" == e && (e = "ok"), "" == e && (e = "fail")), b = c + ":" + e
    }

    /**
     * 重新整理apiList
     * 对内对外的名称不一致, 这里进行处理
     * @param {} a - jsapiList 需要使用的api名字列表
     * */
    function refreshApiList (jsApiList) {
      var i, len, name, e;
      if (jsApiList) {
        for (i = 0, len = jsApiList.length; len > i; ++i) {
          name = jsApiList[i];
          e = preVerifyOptions[name];
          e && (jsApiList[i] = e);
        }
        return jsApiList
      }
    }

    /**
     * 如果是debug模式则打印错误日志
     * printErrorLogInDebugMode
     * j(methodName, customerOptions)
     * */
    function printErrorLogInDebugMode (methodName, customerOptions) {
      if (!(!configOptions.debug || customerOptions && customerOptions.isInnerInvoke)) {
        var name = preVerifyOptionsReverse[methodName];
        name && (methodName = name);
        customerOptions && customerOptions._complete && delete customerOptions._complete;
        console.log('"' + methodName + '",', customerOptions || "")
      }
    }

    /**
     * 发送jssdk使用记录
     * sendJsSDKReport
     * */
    function sendJsSDKReport () {
      if (0 != jsSdkReportInfo.preVerifyState) {
        // preVerifyState成功状态
        if (!isPC && !isWxDebugger && !configOptions.debug && "6.0.2" < clientVersion && jsSdkReportInfo.systemType > 0 && !isReportSended) {
          // 真实可用的环境
          isReportSended = true;
          jsSdkReportInfo.appId = configOptions.appId;
          // initTime
          jsSdkReportInfo.initTime = initTimeRecord.initEndTime - initTimeRecord.initStartTime;
          jsSdkReportInfo.preVerifyTime = initTimeRecord.preVerifyEndTime - initTimeRecord.preVerifyStartTime;
          jsApiList.getNetworkType({
            isInnerInvoke: true,
            success: function (res) {
              // var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
              var src, img;
              jsSdkReportInfo.networkType = res.networkType;
              src = "http://open.weixin.qq.com/sdk/report?v=" + jsSdkReportInfo.version + "&o=" + jsSdkReportInfo.preVerifyState + "&s=" + jsSdkReportInfo.systemType + "&c=" + jsSdkReportInfo.clientVersion + "&a=" + jsSdkReportInfo.appId + "&n=" + jsSdkReportInfo.networkType + "&i=" + jsSdkReportInfo.initTime + "&p=" + jsSdkReportInfo.preVerifyTime + "&u=" + jsSdkReportInfo.url;
              img = new Image;
              img.src = src;
            }
          })
        }
      }
    }

    /**
     * 获取时间戳
     * return {timestamp}
     * */
    function getTime () {
      return (new Date).getTime()
    }

    /**
     * 平台初始化监听
     * @param {function} handler - bridge加载完毕后触发的回调
     * */
    function bridgeReady (handler) {
      if (isWechat) {
        if (window.WeixinJSBridge) {
          handler()
        } else {
          doc.addEventListener && doc.addEventListener("WeixinJSBridgeReady", handler, false)
        }
      }
    }

    // 在_wx中添加invoke方法
    function addBridgeMethods () {
      if (!jsApiList.invoke) {
        jsApiList.invoke = function (b, c, d) {
          window.WeixinJSBridge && WeixinJSBridge.invoke(b, addVerifyInfo(c), d)
        };
        jsApiList.on = function (b, c) {
          window.WeixinJSBridge && WeixinJSBridge.on(b, c)
        }
      }
    }

    var preVerifyOptions, preVerifyOptionsReverse, doc, docTitle, userAgent, platform, isPC, isWxDebugger, isWechat, isAndroid, isIos, clientVersion, isReportSended, isErrorBefore, initTimeRecord, jsSdkReportInfo, configOptions, preVerifyJSAPIConfig, initResult, jsApiList;
    if (!window.jWeixin) {
      // 面相用户和app之间命名冲突的部分
      preVerifyOptions = {
        config: "preVerifyJSAPI",
        onMenuShareTimeline: "menu:share:timeline",
        onMenuShareAppMessage: "menu:share:appmessage",
        onMenuShareQQ: "menu:share:qq",
        onMenuShareWeibo: "menu:share:weiboApp",
        onMenuShareQZone: "menu:share:QZone",
        previewImage: "imagePreview",
        getLocation: "geoLocation",
        openProductSpecificView: "openProductViewWithPid",
        addCard: "batchAddCard",
        openCard: "batchViewCard",
        chooseWXPay: "getBrandWCPayRequest"
      }
      return preVerifyOptions
    }

    // preVerifyOptions的key-value翻转
    preVerifyOptionsReverse = function () {
      var key, result = {};
      for (key in preVerifyOptions) {
        result[preVerifyOptions[key]] = key
      }
      return result
    }();

    doc = window.document;
    docTitle = doc.title;
    userAgent = navigator.userAgent.toLowerCase();
    platform = navigator.platform.toLowerCase();
    isPC = !(!platform.match("mac") && !platform.match("win"));
    isWxDebugger = -1 != userAgent.indexOf("wxdebugger");
    isWechat = -1 != userAgent.indexOf("micromessenger");
    isAndroid = -1 != userAgent.indexOf("android");
    isIos = -1 != userAgent.indexOf("iphone") || -1 != userAgent.indexOf("ipad");
    clientVersion = function () {
      var ver = userAgent.match(/micromessenger\/(\d+\.\d+\.\d+)/) || userAgent.match(/micromessenger\/(\d+\.\d+)/);
      return ver ? ver[1] : ""
    }();
    isReportSended = false;
    isErrorBefore = false;
    // 初始化时的时间记录
    initTimeRecord = {
      initStartTime: getTime(),
      initEndTime: 0,
      preVerifyStartTime: 0,
      preVerifyEndTime: 0
    };
    // 初始化时的环境信息记录
    jsSdkReportInfo = {
      version: 1,
      appId: "",
      initTime: 0,
      preVerifyTime: 0,
      networkType: "",
      preVerifyState: 1, // success->0
      systemType: isIos ? 1 : isAndroid ? 2 : -1, // ios->1; isAndroid->2; other->-1
      clientVersion: clientVersion,
      url: encodeURIComponent(location.href)
    };
    configOptions = {};
    // preVerifyJSAPIConfig
    preVerifyJSAPIConfig = {_completes: []};
    initResult = {
      state: 0,
      data: {}
    };
    bridgeReady(function () {
      initTimeRecord.initEndTime = getTime()
    });
    // 所有JS接口列表
    jsApiList = {
      config: function (options) {
        configOptions = options;
        printErrorLogInDebugMode("config", options);
        var isCheck = !!configOptions.check;
        bridgeReady(function () {
          var completes, i, len;
          if (isCheck) {
            invokeMethod(preVerifyOptions.config, {
              verifyJsApiList: refreshApiList(configOptions.jsApiList)
            }, function () {
              preVerifyJSAPIConfig._complete = function (res) {
                initTimeRecord.preVerifyEndTime = getTime();
                initResult.state = 1, initResult.data = res
              };
              preVerifyJSAPIConfig.success = function () {
                jsSdkReportInfo.preVerifyState = 0
              };
              preVerifyJSAPIConfig.fail = function (res) {
                preVerifyJSAPIConfig._fail ? preVerifyJSAPIConfig._fail(res) : initResult.state = -1
              };
              var completes = preVerifyJSAPIConfig._completes;
              completes.push(function () {sendJsSDKReport()});
              preVerifyJSAPIConfig.complete = function () {
                for (var i = 0, len = completes.length; len > i; ++i) {
                  completes[i]()
                }
                preVerifyJSAPIConfig._completes = []
              }
              return preVerifyJSAPIConfig
            }());
            initTimeRecord.preVerifyStartTime = getTime();
          } else {
            initResult.state = 1;
            completes = preVerifyJSAPIConfig._completes;
            for (i = 0, len = completes.length; len > i; ++i) {
              completes[i]()
            }
            preVerifyJSAPIConfig._completes = []
          }
        });
        // 测试版则在wx上方注入方法
        configOptions.beta && addBridgeMethods()
      },
      ready: function (callback) {
        if (0 != initResult.state) {
          callback()
        } else {
          preVerifyJSAPIConfig._completes.push(callback);
          !isWechat && configOptions.debug && callback()
        }
      },
      error: function (errCallback) {
        if("6.0.2" < clientVersion && !isErrorBefore){
          isErrorBefore = true;
          -1 == initResult.state ? errCallback(initResult.data) : preVerifyJSAPIConfig._fail = errCallback
        }
      },
      checkJsApi: function (a) {
        var b = function (a) {
          var c, d, b = a.checkResult;
          for (c in b)d = preVerifyOptionsReverse[c], d && (b[d] = b[c], delete b[c]);
          return a
        };
        invokeMethod("checkJsApi", {jsApiList: refreshApiList(a.jsApiList)}, function () {
          return a._complete = function (a) {
            if (isAndroid) {
              var c = a.checkResult;
              c && (a.checkResult = JSON.parse(c))
            }
            a = b(a)
          }, a
        }())
      },
      onMenuShareTimeline: function (a) {
        invokeEventMethod(preVerifyOptions.onMenuShareTimeline, {
          complete: function () {
            invokeMethod("shareTimeline", {
              title: a.title || docTitle,
              desc: a.title || docTitle,
              img_url: a.imgUrl || "",
              link: a.link || location.href,
              type: a.type || "link",
              data_url: a.dataUrl || ""
            }, a)
          }
        }, a)
      },
      onMenuShareAppMessage: function (a) {
        invokeEventMethod(preVerifyOptions.onMenuShareAppMessage, {
          complete: function () {
            invokeMethod("sendAppMessage", {
              title: a.title || docTitle,
              desc: a.desc || "",
              link: a.link || location.href,
              img_url: a.imgUrl || "",
              type: a.type || "link",
              data_url: a.dataUrl || ""
            }, a)
          }
        }, a)
      },
      onMenuShareQQ: function (a) {
        invokeEventMethod(preVerifyOptions.onMenuShareQQ, {
          complete: function () {
            invokeMethod("shareQQ", {
              title: a.title || docTitle,
              desc: a.desc || "",
              img_url: a.imgUrl || "",
              link: a.link || location.href
            }, a)
          }
        }, a)
      },
      onMenuShareWeibo: function (a) {
        invokeEventMethod(preVerifyOptions.onMenuShareWeibo, {
          complete: function () {
            invokeMethod("shareWeiboApp", {
              title: a.title || docTitle,
              desc: a.desc || "",
              img_url: a.imgUrl || "",
              link: a.link || location.href
            }, a)
          }
        }, a)
      },
      onMenuShareQZone: function (a) {
        invokeEventMethod(preVerifyOptions.onMenuShareQZone, {
          complete: function () {
            invokeMethod("shareQZone", {
              title: a.title || docTitle,
              desc: a.desc || "",
              img_url: a.imgUrl || "",
              link: a.link || location.href
            }, a)
          }
        }, a)
      },
      startRecord: function (a) {invokeMethod("startRecord", {}, a)},
      stopRecord: function (a) {invokeMethod("stopRecord", {}, a)},
      onVoiceRecordEnd: function (a) {invokeEventMethod("onVoiceRecordEnd", a)},
      playVoice: function (a) {invokeMethod("playVoice", {localId: a.localId}, a)},
      pauseVoice: function (a) {invokeMethod("pauseVoice", {localId: a.localId}, a)},
      stopVoice: function (a) {invokeMethod("stopVoice", {localId: a.localId}, a)},
      onVoicePlayEnd: function (a) {invokeMethod("onVoicePlayEnd", a)},
      uploadVoice: function (a) {
        invokeMethod("uploadVoice", {
          localId: a.localId,
          isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
        }, a)
      },
      downloadVoice: function (a) {
        invokeMethod("downloadVoice", {
          serverId: a.serverId,
          isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
        }, a)
      },
      translateVoice: function (a) {
        invokeMethod("translateVoice", {
          localId: a.localId,
          isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
        }, a)
      },
      chooseImage: function (a) {
        invokeMethod("chooseImage", {
          scene: "1|2",
          count: a.count || 9,
          sizeType: a.sizeType || ["original", "compressed"],
          sourceType: a.sourceType || ["album", "camera"]
        }, function () {
          return a._complete = function (a) {
            if (isAndroid) {
              var b = a.localIds;
              b && (a.localIds = JSON.parse(b))
            }
          }, a
        }())
      },
      previewImage: function (a) {invokeMethod(preVerifyOptions.previewImage, {current: a.current, urls: a.urls}, a)},
      uploadImage: function (a) {
        invokeMethod("uploadImage", {
          localId: a.localId,
          isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
        }, a)
      },
      downloadImage: function (a) {
        invokeMethod("downloadImage", {
          serverId: a.serverId,
          isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
        }, a)
      },
      getNetworkType: function (a) {
        var b = function (a) {
          var c, d, e, b = a.errMsg;
          if (a.errMsg = "getNetworkType:ok", c = a.subtype, delete a.subtype, c) a.networkType = c; else switch (d = b.indexOf(":"), e = b.substring(d + 1)) {
            case"wifi":
            case"edge":
            case"wwan":
              a.networkType = e;
              break;
            default:
              a.errMsg = "getNetworkType:fail"
          }
          return a
        };
        invokeMethod("getNetworkType", {}, function () {return a._complete = function (a) {a = b(a)}, a}())
      },
      openLocation: function (a) {
        invokeMethod("openLocation", {
          latitude: a.latitude,
          longitude: a.longitude,
          name: a.name || "",
          address: a.address || "",
          scale: a.scale || 28,
          infoUrl: a.infoUrl || ""
        }, a)
      },
      getLocation: function (a) {a = a || {}, invokeMethod(preVerifyOptions.getLocation, {type: a.type || "wgs84"}, function () {return a._complete = function (a) {delete a.type}, a}())},
      hideOptionMenu: function (a) {invokeMethod("hideOptionMenu", {}, a)},
      showOptionMenu: function (a) {invokeMethod("showOptionMenu", {}, a)},
      closeWindow: function (a) {a = a || {}, invokeMethod("closeWindow", {}, a)},
      hideMenuItems: function (a) {invokeMethod("hideMenuItems", {menuList: a.menuList}, a)},
      showMenuItems: function (a) {invokeMethod("showMenuItems", {menuList: a.menuList}, a)},
      hideAllNonBaseMenuItem: function (a) {invokeMethod("hideAllNonBaseMenuItem", {}, a)},
      showAllNonBaseMenuItem: function (a) {invokeMethod("showAllNonBaseMenuItem", {}, a)},
      scanQRCode: function (a) {
        a = a || {}, invokeMethod("scanQRCode", {
          needResult: a.needResult || 0,
          scanType: a.scanType || ["qrCode", "barCode"]
        }, function () {
          return a._complete = function (a) {
            var b, c;
            isIos && (b = a.resultStr, b && (c = JSON.parse(b), a.resultStr = c && c.scan_code && c.scan_code.scan_result))
          }, a
        }())
      },
      openProductSpecificView: function (a) {
        invokeMethod(preVerifyOptions.openProductSpecificView, {
          pid: a.productId,
          view_type: a.viewType || 0,
          ext_info: a.extInfo
        }, a)
      },
      addCard: function (a) {
        var e, f, g, h, b = a.cardList, d = [];
        for (e = 0, f = b.length; f > e; ++e)g = b[e], h = {card_id: g.cardId, card_ext: g.cardExt}, d.push(h);
        invokeMethod(preVerifyOptions.addCard, {card_list: d}, function () {
          return a._complete = function (a) {
            var c, d, e, b = a.card_list;
            if (b) {
              for (b = JSON.parse(b), c = 0, d = b.length; d > c; ++c)e = b[c], e.cardId = e.card_id, e.cardExt = e.card_ext, e.isSuccess = e.is_succ ? !0 : false, delete e.card_id, delete e.card_ext, delete e.is_succ;
              a.cardList = b, delete a.card_list
            }
          }, a
        }())
      },
      chooseCard: function (options) {
        invokeMethod("chooseCard", {
          app_id: configOptions.appId,
          location_id: options.shopId || "",
          sign_type: options.signType || "SHA1",
          card_id: options.cardId || "",
          card_type: options.cardType || "",
          card_sign: options.cardSign,
          time_stamp: options.timestamp + "",
          nonce_str: options.nonceStr
        }, function () {
          options._complete = function (options) {
            options.cardList = options.choose_card_info;
            delete options.choose_card_info
          };
          return options
        }())
      },
      openCard: function (options) {
        var i, len, card, tmp, cardList = options.cardList, tmpArr = [];
        for (i = 0, len = cardList.length; len > i; ++i) {
          card = cardList[i];
          tmp = {card_id: card.cardId, code: card.code};
          tmpArr.push(tmp);
        }
        invokeMethod(preVerifyOptions.openCard, {card_list: tmpArr}, options)
      },
      chooseWXPay: function (options) {
        c(preVerifyOptions.chooseWXPay, getWxPayConfig(options), options)
      }
    };
    noDefine && (window.wx = window.jWeixin = jsApiList);
    return jsApiList
  }
);
