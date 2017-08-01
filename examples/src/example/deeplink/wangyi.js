(function () {
  'use strict'
  !function (e, t) {
    var n = function (e) {return new n.Class(e)}
    n.config = {appID: '/touch/com.163.3g', displayInterval: 0, displayMaxCount: 1 / 0, show: function () {}}
    var a = window.navigator.userAgent,
      l = /applewebkit\/\d+(\.\d+)*\d+\s*\(KHTML,\s*like\s*Gecko\)\s*version\/\d+(\.\d+)*\.\d+\s*mobile\/\d+\w\d+\s*safari\/\d+(\.\d+)*\.\d+$/i,
      i = window.hasOwnProperty('isLBBrowser')
    n.defaultLocalValue = {
      lastDisplayTime: 0,
      lastDisplayCount: 0,
      added: !1
    }, n.isIOSDevice = /iphone|ipod|ipad/i.test(a), n.isAndroidChrome = a.indexOf('Android') > -1 && /Chrome\/[.0-9]*/.test(a), n.isMobileSafari = n.isIOSDevice && a.indexOf('CriOS') < 0 && l.test(a) && !i, n.isStandalone = window.navigator.standalone || n.isAndroidChrome && screen.height - document.documentElement.clientHeight < 40, n.isCompatible = n.isMobileSafari || n.isAndroidChrome, n.Class = function (e) {
      var a = !0
      this.config = t.extend(!1, {}, n.config), t.extend(!1, this.config, e), /\?cleartohome/.test(location.search) && this.clearLocal(), n.isCompatible || (a = !1)
      try {this.localValue = localStorage.getItem(this.config.appID), this.localValue = this.localValue ? JSON.parse(this.localValue) : void 0, this.localValue = this.localValue || n.defaultLocalValue, localStorage.setItem(this.config.appID, JSON.stringify(this.localValue)), n.hasLocalStorage = !0} catch (l) {n.hasLocalStorage = !1, this.localValue = n.defaultLocalValue}
      n.hasLocalStorage || (a = !1), this.localValue.added && (a = !1), n.isStandalone && (a = !1, this.localValue.added = !0, this.updateLocal()), a || (this.config.show = null)
    }, n.Class.prototype = {
      constructor: n.Class,
      show: function () {
        var e = Date.now(), t = this.localValue.lastDisplayTime, a = this.localValue.lastDisplayCount,
          l = this.config.displayInterval
        if (isNaN(l) || !(e - t < l)) {
          var i = this.config.displayMaxCount
          if ((isNaN(i) || !(a >= i)) && (this.localValue.lastDisplayTime = e, this.localValue.lastDisplayCount++, this.updateLocal(), 'function' == typeof this.config.show)) {
            var s = ''
            n.isMobileSafari ? s = 'MobileSafari' : n.isAndroidChrome && (s = 'AndroidChrome'), this.config.show(s)
          }
        }
      },
      updateLocal: function () {n.hasLocalStorage && localStorage.setItem(this.config.appID, JSON.stringify(this.localValue))},
      clearLocal: function () {this.localValue = n.defaultLocalValue, this.updateLocal()}
    }, void 0 === e.addToHomeScreen && (e.addToHomeScreen = n)
  }(this.NEWAP, this.Zepto)
}).call(window), function () {
  var e = Handlebars.template, t = Handlebars.templates = Handlebars.templates || {}
  t.attitude_board_tpl = e({
    1: function (e, t, n, a, l) {return 'processing'},
    3: function (e, t, n, a, l) {return 'target="_blank" '},
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {},
        c = '<section class="attitude_board ' + (null != (i = n['if'].call(r, null != t ? t.processing : t, {
            name: 'if',
            hash: {},
            fn: e.program(1, l, 0),
            inverse: e.noop,
            data: l
          })) ? i : '') + '">\r\n    <a title="\u6709\u6001\u5ea6\u76db\u5178\u6392\u884c\u699c" '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : n.helperMissing, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(3, l, 0),
        inverse: e.noop,
        data: l
      }, i = 'function' == typeof s ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (c += i), c + ' href="http://3g.163.com/ntes/special/00341GKK/idol_attitude_rank.html?from=index">\r\n        <img src="http://img2.cache.netease.com/f2e/wap/touch_index_2016/trunk/images/attitude_board_end.jpg" class="attitude_board_img"></img>\r\n    </a>\r\n</section>'
    },
    useData: !0
  }), t.channel_entry_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {return '<section class="m_article list-item list-article channel_entry clearfix">\r\n    <div class="entry_unit" data-channel="photo">\r\n        <div class="unit_icon">\r\n            <img src="http://img2.cache.netease.com/f2e/wap/touch_index_2016/trunk/images/channel_entry_icon_photo.png" alt="">\r\n        </div>\r\n        <p class="unit_text">\u70ed\u56fe</p>\r\n    </div>\r\n    <div class="entry_unit" data-channel="liveshow">\r\n        <div class="unit_icon">\r\n            <img src="http://img2.cache.netease.com/f2e/wap/touch_index_2016/trunk/images/channel_entry_icon_live.png" alt="">\r\n        </div>\r\n        <p class="unit_text">\u76f4\u64ad</p>\r\n    </div>\r\n    <div class="entry_unit" data-channel="war">\r\n        <div class="unit_icon">\r\n            <img src="http://img2.cache.netease.com/f2e/wap/touch_index_2016/trunk/images/channel_entry_icon_war.png" alt="">\r\n        </div>\r\n        <p class="unit_text">\u519b\u4e8b</p>\r\n    </div>\r\n    <div class="entry_unit" data-channel="idol">\r\n        <div class="unit_icon">\r\n            <img src="http://cms-bucket.nosdn.127.net/3f1829bdf5484f0dbe1d240bf69b86bf20161025190654.png" alt="">\r\n        </div>\r\n        <p class="unit_text">\u661f\u95fb</p>\r\n    </div>\r\n    <div class="entry_unit" data-channel="local">\r\n        <div class="unit_icon">\r\n            <img src="http://img2.cache.netease.com/f2e/wap/touch_index_2016/trunk/images/channel_entry_icon_local.png" alt="">\r\n        </div>\r\n        <p class="unit_text">\u672c\u5730</p>\r\n    </div>\r\n</section>'},
    useData: !0
  }), t.doc_yunread_tpl = e({
    1: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression,
        u = '<section class="m_article list-item clearfix cloudread" id="' + d((s = null != (s = n.docid || (null != t ? t.docid : t)) ? s : c, typeof s === h ? s.call(r, {
            name: 'docid',
            hash: {},
            data: l
          }) : s)) + '">\r\n    <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(2, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="' + d((s = null != (s = n.link || (null != t ? t.link : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'link',
        hash: {},
        data: l
      }) : s)) + '">\r\n        <div class="m_article_img">\r\n' + (null != (i = n['if'].call(r, null != t ? t.tag : t, {
        name: 'if',
        hash: {},
        fn: e.program(4, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + '            <img src="' + d((n.getone || t && t.getone || c).call(r, null != t ? t.pic_info : t, 0, 'url', {
        name: 'getone',
        hash: {},
        data: l
      })) + '">\r\n        </div>\r\n        <div class="m_article_info">\r\n            <div class="m_article_title">\r\n                <span>' + (null != (s = null != (s = n.title || (null != t ? t.title : t)) ? s : c, i = typeof s === h ? s.call(r, {
        name: 'title',
        hash: {},
        data: l
      }) : s) ? i : '') + '</span>\r\n            </div>\r\n            <div class="m_article_desc clearfix">\r\n                <div class="m_article_desc_l">\r\n' + (null != (i = n['if'].call(r, null != t ? t.category : t, {
        name: 'if',
        hash: {},
        fn: e.program(6, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + '\r\n                    <span class="m_article_time">3\u5206\u949f\u524d</span>\r\n                </div>\r\n' + (null != (i = (n.nozero || t && t.nozero || c).call(r, null != t ? t.tcount : t, {
        name: 'nozero',
        hash: {},
        fn: e.program(8, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + '            </div>\r\n        </div>\r\n    </a>\r\n</section>\r\n'
    },
    2: function (e, t, n, a, l) {return 'target="_blank" '},
    4: function (e, t, n, a, l) {
      var i
      return '            <div class="m_article_mark mark_new">' + e.escapeExpression((i = null != (i = n.tag || (null != t ? t.tag : t)) ? i : n.helperMissing, 'function' == typeof i ? i.call(null != t ? t : {}, {
          name: 'tag',
          hash: {},
          data: l
        }) : i)) + '</div>\r\n'
    },
    6: function (e, t, n, a, l) {
      var i
      return '                    <span class="m_article_channel">' + e.escapeExpression((i = null != (i = n.category || (null != t ? t.category : t)) ? i : n.helperMissing, 'function' == typeof i ? i.call(null != t ? t : {}, {
          name: 'category',
          hash: {},
          data: l
        }) : i)) + '</span> '
    },
    8: function (e, t, n, a, l) {
      return '                <div class="m_article_desc_r">\r\n                    <div class="left_hands_desc">\r\n                        <span class="iconfont">&#xe606;</span>' + e.escapeExpression((n.tcounthandle || t && t.tcounthandle || n.helperMissing).call(null != t ? t : {}, null != t ? t.tcount : t, 9999, {
          name: 'tcounthandle',
          hash: {},
          data: l
        })) + '\r\n                    </div>\r\n                </div>\r\n'
    },
    10: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression,
        u = '<section class="m_article m_article_m0 list-item clearfix cloudread" id="' + d((s = null != (s = n.docid || (null != t ? t.docid : t)) ? s : c, typeof s === h ? s.call(r, {
            name: 'docid',
            hash: {},
            data: l
          }) : s)) + '">\r\n    <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(2, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="' + d((s = null != (s = n.link || (null != t ? t.link : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'link',
        hash: {},
        data: l
      }) : s)) + '">\r\n        <div class="m_article_info">\r\n            <div class="m_article_title">\r\n                ' + (null != (s = null != (s = n.title || (null != t ? t.title : t)) ? s : c, i = typeof s === h ? s.call(r, {
        name: 'title',
        hash: {},
        data: l
      }) : s) ? i : '') + '\r\n            </div>\r\n            <div class="m_article_desc clearfix">\r\n                <div class="m_article_desc_l">\r\n' + (null != (i = n['if'].call(r, null != t ? t.category : t, {
        name: 'if',
        hash: {},
        fn: e.program(6, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + '\r\n                    <span class="m_article_time">3\u5206\u949f\u524d</span>\r\n                </div>\r\n' + (null != (i = (n.nozero || t && t.nozero || c).call(r, null != t ? t.tcount : t, {
        name: 'nozero',
        hash: {},
        fn: e.program(8, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + '            </div>\r\n        </div>\r\n    </a>\r\n</section>\r\n'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i
      return null != (i = (n.hasimg || t && t.hasimg || n.helperMissing).call(null != t ? t : {}, null != t ? t.pic_info : t, {
        name: 'hasimg',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.program(10, l, 0),
        data: l
      })) ? i : ''
    },
    useData: !0
  }), t.joke_doc_tpl = e({
    1: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression,
        u = '<section class="m_article_joke list-item clearfix" id="' + d((s = null != (s = n.docid || (null != t ? t.docid : t)) ? s : c, typeof s === h ? s.call(r, {
            name: 'docid',
            hash: {},
            data: l
          }) : s)) + '">\r\n    <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(2, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="' + d((s = null != (s = n.link || (null != t ? t.link : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'link',
        hash: {},
        data: l
      }) : s)) + '" >\r\n        <div class="m_article_info">\r\n' + (null != (i = n['if'].call(r, null != t ? t.digest : t, {
        name: 'if',
        hash: {},
        fn: e.program(4, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + (null != (i = (n.isGif || t && t.isGif || c).call(r, null != t ? t.pic_info : t, 0, {
        name: 'isGif',
        hash: {},
        fn: e.program(6, l, 0),
        inverse: e.program(8, l, 0),
        data: l
      })) ? i : '') + '        </div>\r\n    </a>\r\n    <div class="m_article_desc clearfix">\r\n        <div class="m_article_desc_l">\r\n            <span class="m_article_time">' + d((n.getDvalueDay || t && t.getDvalueDay || c).call(r, null != t ? t.ptime : t, {
        name: 'getDvalueDay',
        hash: {},
        data: l
      })) + '</span>\r\n        </div>\r\n        <div class="m_article_desc_r">\r\n            <span class="iconfont share-joke" data-title="' + d((s = null != (s = n.title || (null != t ? t.title : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'title',
        hash: {},
        data: l
      }) : s)) + '" data-link="' + d((s = null != (s = n.link || (null != t ? t.link : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'link',
        hash: {},
        data: l
      }) : s)) + '" data-img="' + d((n.getone || t && t.getone || c).call(r, null != t ? t.pic_info : t, 0, 'url', {
        name: 'getone',
        hash: {},
        data: l
      })) + '" data-digest="' + d((s = null != (s = n.digest || (null != t ? t.digest : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'digest',
        hash: {},
        data: l
      }) : s)) + '">&#xe619;</span>\r\n        </div>\r\n    </div>\r\n</section>\r\n'
    },
    2: function (e, t, n, a, l) {return 'target="_blank"'},
    4: function (e, t, n, a, l) {
      var i
      return '            <div class="m_article_digest">\r\n                <span>' + e.escapeExpression((i = null != (i = n.digest || (null != t ? t.digest : t)) ? i : n.helperMissing, 'function' == typeof i ? i.call(null != t ? t : {}, {
          name: 'digest',
          hash: {},
          data: l
        }) : i)) + '</span>\r\n            </div>\r\n'
    },
    6: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}, o = n.helperMissing, r = e.escapeExpression
      return '                <div class="m_article_img">\r\n                    <div class="gif_wrap">\r\n                        <div class="play-btn-joke"></div>\r\n                    </div>\r\n                    <img class="js-imghook" src="' + r((n.getone || t && t.getone || o).call(s, null != t ? t.pic_info : t, 0, 'url', {
          name: 'getone',
          hash: {},
          data: l
        })) + '" data-ourl="' + r((n.getone || t && t.getone || o).call(s, null != t ? t.pic_info : t, 0, 'o_url', {
          name: 'getone',
          hash: {},
          data: l
        })) + '">\r\n                    <div class="m_article_title">\r\n                        <span>' + r((i = null != (i = n.title || (null != t ? t.title : t)) ? i : o, 'function' == typeof i ? i.call(s, {
          name: 'title',
          hash: {},
          data: l
        }) : i)) + '</span>\r\n                    </div>\r\n                </div>\r\n'
    },
    8: function (e, t, n, a, l) {
      var i, s, o = null != t ? t : {}, r = n.helperMissing, c = e.escapeExpression
      return '                <div class="m_article_img">\r\n                    <img class="js-imghook" src="' + c((n.getone || t && t.getone || r).call(o, null != t ? t.pic_info : t, 0, 'url', {
          name: 'getone',
          hash: {},
          data: l
        })) + '" data-ourl="' + c((n.getone || t && t.getone || r).call(o, null != t ? t.pic_info : t, 0, 'o_url', {
          name: 'getone',
          hash: {},
          data: l
        })) + '">\r\n                    <div class="m_article_title">\r\n                        <span>' + c((s = null != (s = n.title || (null != t ? t.title : t)) ? s : r, 'function' == typeof s ? s.call(o, {
          name: 'title',
          hash: {},
          data: l
        }) : s)) + '</span>\r\n                    </div>\r\n                </div>\r\n' + (null != (i = (n.isExtraHigh || t && t.isExtraHigh || r).call(o, null != t ? t.pic_info : t, 0, {
          name: 'isExtraHigh',
          hash: {},
          fn: e.program(9, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '')
    },
    9: function (e, t, n, a, l) {return '                    <div class="more">\u70b9\u51fb\u5c55\u5f00<span class="iconfont">&#xe60e;</span></div>\r\n'},
    11: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression,
        u = '<section class="m_article_joke list-item clearfix" id="' + d((s = null != (s = n.docid || (null != t ? t.docid : t)) ? s : c, typeof s === h ? s.call(r, {
            name: 'docid',
            hash: {},
            data: l
          }) : s)) + '">\r\n    <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(2, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="' + d((s = null != (s = n.link || (null != t ? t.link : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'link',
        hash: {},
        data: l
      }) : s)) + '" >\r\n        <div class="m_article_info">\r\n' + (null != (i = n['if'].call(r, null != t ? t.digest : t, {
        name: 'if',
        hash: {},
        fn: e.program(4, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + '        </div>\r\n    </a>\r\n    <div class="m_article_desc clearfix">\r\n        <div class="m_article_desc_l">\r\n            <span class="m_article_time">' + d((n.getDvalueDay || t && t.getDvalueDay || c).call(r, null != t ? t.ptime : t, {
        name: 'getDvalueDay',
        hash: {},
        data: l
      })) + '</span>\r\n        </div>\r\n        <div class="m_article_desc_r">\r\n            <span class="iconfont share-joke" data-title="' + d((s = null != (s = n.title || (null != t ? t.title : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'title',
        hash: {},
        data: l
      }) : s)) + '" data-link="' + d((s = null != (s = n.link || (null != t ? t.link : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'link',
        hash: {},
        data: l
      }) : s)) + '" data-img="http://img2.cache.netease.com/f2e/wap/common/images/weixinfixed.png" data-digest="' + d((s = null != (s = n.digest || (null != t ? t.digest : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'digest',
        hash: {},
        data: l
      }) : s)) + '">&#xe619;</span>\r\n        </div>\r\n    </div>\r\n</section>\r\n'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i
      return null != (i = (n.hasimg || t && t.hasimg || n.helperMissing).call(null != t ? t : {}, null != t ? t.pic_info : t, {
        name: 'hasimg',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.program(11, l, 0),
        data: l
      })) ? i : ''
    },
    useData: !0
  }), t.module_ui_all_scrollnews_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {return '<div class="module_ui rotating-news">\r\n    <div class="scroll-item rotating flip up">\r\n        <a href="#" class="rotating-link">\r\n            <div class="rotatitem">\r\n                <span class="rotating-tips"></span>\r\n                <span class="rotating-content"></span>\r\n            </div>\r\n        </a>\r\n    </div>\r\n</div>'},
    useData: !0
  }), t.module_ui_art_link_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {return '<section class="module_ui list-item link_art">\r\n    <ul class="link_list_art">\r\n        <li class="listinart">\r\n            <a href="http://3g.163.com/all/special/S1483595763399.html#clickfrom=3gwap">\r\n                <div class="artlive"></div>\r\n                <div class="info">\r\n                    <span>\u827a\u672f\u76f4\u64ad</span>\r\n                    <span class="info_en">Art&nbsp;Live</span>\r\n                </div>\r\n            </a>\r\n        </li>\r\n        <li class="listinart">\r\n            <a href="http://3g.163.com/all/special/S1483597195009.html#clickfrom=3gwap">\r\n                <div class="artworld"></div>\r\n                <div class="info">\r\n                    <span>\u827a\u4e16\u754c</span>\r\n                    <span class="info_en">Art&nbsp;World</span>\r\n                </div>\r\n            </a>\r\n        </li>\r\n    </ul>\r\n</section>'},
    useData: !0
  }), t.module_ui_auto_link_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {return '<section class="module_ui list-item link_auto">\r\n    <ul class="link_list_auto">\r\n        <li class="listinauto">\r\n            <a href="http://auto.3g.163.com/?from=3gwap">\r\n                <div class="wholeauto"></div>\r\n                <div class="info">\u6c7d\u8f66\u5927\u5168</div>\r\n            </a>\r\n        </li>\r\n        <li class="listinauto">\r\n            <a href="http://auto.3g.163.com/bestsales/?from=3gwap#3g001">\r\n                <div class="buyauto"></div>\r\n                <div class="info">\u5e95\u4ef7\u4e70\u8f66</div>\r\n            </a>\r\n        </li>\r\n        <li class="listinauto">\r\n            <a href="https://c.m.163.com/news/s/S1481872847862.html?from=3gwap">\r\n                <div class="liveauto"></div>\r\n                <div class="info">\u6c7d\u8f66\u76f4\u64ad</div>\r\n            </a>\r\n        </li>\r\n    </ul>\r\n</section>'},
    useData: !0
  }), t.module_ui_idol_banner_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {return '<a href="http://3g.163.com/touch/idol/star16?clickfrom=index.ent.list" class="">\r\n    <img src="http://img2.cache.netease.com/f2e/wap/touch_index_2016/trunk/images/143764691.png" alt="\u5cf0\u5cf0\u751f\u65e5\u5feb\u4e50" style="width:6.9rem;height:2.74rem;padding: 0.3rem 0.3rem 0 0.3rem;">\r\n</a>'},
    useData: !0
  }), t.module_ui_isscoe_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s, o = null != t ? t : {}, r = n.helperMissing, c = 'function'
      return '<div class="isscoe_board">\r\n    <table>\r\n        <tbody>\r\n            <tr>\r\n                <td>\r\n                    <a target="_blank" href="' + (null != (s = null != (s = n.url1 || (null != t ? t.url1 : t)) ? s : r, i = typeof s === c ? s.call(o, {
          name: 'url1',
          hash: {},
          data: l
        }) : s) ? i : '') + '">\r\n                        <div class="isscoe_board_unit_wrap">\r\n                            <div class="isscoe_board_icon"></div>\r\n                            <div class="isscoe_board_text">\u8d5b\u7a0b</div>\r\n                        </div>\r\n                    </a>\r\n                </td>\r\n                <td>\r\n                    <a target="_blank" href="' + (null != (s = null != (s = n.url2 || (null != t ? t.url2 : t)) ? s : r, i = typeof s === c ? s.call(o, {
          name: 'url2',
          hash: {},
          data: l
        }) : s) ? i : '') + '">\r\n                        <div class="isscoe_board_unit_wrap">\r\n                            <div class="isscoe_board_icon icon_score"></div>\r\n                            <div class="isscoe_board_text">\u79ef\u5206\u699c</div>\r\n                        </div>\r\n                    </a>\r\n                </td>\r\n                <td>\r\n                    <a target="_blank" href="' + (null != (s = null != (s = n.url3 || (null != t ? t.url3 : t)) ? s : r, i = typeof s === c ? s.call(o, {
          name: 'url3',
          hash: {},
          data: l
        }) : s) ? i : '') + '">\r\n                        <div class="isscoe_board_unit_wrap">\r\n                            <div class="isscoe_board_icon icon_analysis"></div>\r\n                            <div class="isscoe_board_text">\u6280\u672f\u5206\u6790</div>\r\n                        </div>\r\n                    </a>\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>\r\n'
    },
    useData: !0
  }), t.module_ui_jiankang_link_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {return '<section class="module_ui list-item link_jiankang">\r\n    <ul class="link_list_jiankang">\r\n        <li class="listinjiankang">\r\n            <a href="http://jiankang.163.com/special/gongkaike_3g/?from=3gwap">\r\n                <div class="opencourse"></div>\r\n                <div class="info">\u516c\u5f00\u8bfe</div>\r\n            </a>\r\n        </li>\r\n        <li class="listinjiankang">\r\n            <a href="http://3g.163.com/all/special/S1470816399948.html#clickfrom=3gwap">\r\n                <div class="liveshow"></div>\r\n                <div class="info">\u5065\u5eb7\u76f4\u64ad</div>\r\n            </a>\r\n        </li>\r\n    </ul>\r\n</section>'},
    useData: !0
  }), t.module_ui_live_future_classify_tpl = e({
    compiler: [7, '>= 4.0.0'], main: function (e, t, n, a, l) {
      var i
      return '<div class="live_future_time">\r\n    <span class="ico"></span>\r\n    <span class="text">' + e.escapeExpression((i = null != (i = n.data || (null != t ? t.data : t)) ? i : n.helperMissing, 'function' == typeof i ? i.call(null != t ? t : {}, {
          name: 'data',
          hash: {},
          data: l
        }) : i)) + '</span>\r\n</div>'
    }, useData: !0
  }), t.module_ui_live_future_tpl = e({
    1: function (e, t, n, a, l) {
      var i
      return '    <div class="live_future_head">\r\n        <div class="ico"></div>\r\n        <div class="num">' + e.escapeExpression(e.lambda(null != (i = null != t ? t.data : t) ? i.length : i, t)) + '\u573a</div>\r\n    </div>\r\n    <div class="live_future_content" id="live_future_content">\r\n        <ul class="live_future_list" data-tcn="live">\r\n' + (null != (i = n.each.call(null != t ? t : {}, null != t ? t.data : t, {
          name: 'each',
          hash: {},
          fn: e.program(2, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + '        </ul>\r\n    </div>\r\n'
    }, 2: function (e, t, n, a, l) {
      var i, s, o = null != t ? t : {}, r = n.helperMissing, c = e.escapeExpression
      return '                <li class="live_future_item" data-id="' + c((s = null != (s = n.index || l && l.index) ? s : r, 'function' == typeof s ? s.call(o, {
          name: 'index',
          hash: {},
          data: l
        }) : s)) + '">\r\n                    <span class="time">' + c((n.futureHourTime || t && t.futureHourTime || r).call(o, null != t ? t.startTime : t, {
          name: 'futureHourTime',
          hash: {},
          data: l
        })) + '</span> | <span class="title">' + (null != (i = e.lambda(null != t ? t.roomName : t, t)) ? i : '') + '</span>\r\n                </li>\r\n'
    }, compiler: [7, '>= 4.0.0'], main: function (e, t, n, a, l) {
      var i
      return null != (i = (n.arrLengthNot || t && t.arrLengthNot || n.helperMissing).call(null != t ? t : {}, null != t ? t.data : t, 0, {
        name: 'arrLengthNot',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : ''
    }, useData: !0
  }), t.module_ui_live_list_tpl = e({
    1: function (e, t, n, a, l) {return 'target="_blank"'},
    3: function (e, t, n, a, l) {
      return '            <div class="live_list_status0">\r\n                <div class="status_ico"></div>\r\n                <div class="status_text">' + e.escapeExpression((n.futureHourTime || t && t.futureHourTime || n.helperMissing).call(null != t ? t : {}, null != t ? t.startTime : t, {
          name: 'futureHourTime',
          hash: {},
          data: l
        })) + '</div>\r\n            </div>\r\n'
    },
    5: function (e, t, n, a, l) {return '            <div class="live_list_status1">\r\n                <div class="status_ico"></div>\r\n                <div class="status_text">\u6b63\u5728\u76f4\u64ad</div>\r\n            </div>\r\n'},
    7: function (e, t, n, a, l) {return '            <div class="live_list_status2">\r\n                <div class="status_ico"></div>\r\n                <div class="status_text">\u56de\u987e</div>\r\n            </div>\r\n'},
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression,
        u = '<div class="live_d_line"></div>\r\n<section class="live_item">\r\n    <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="' + d((s = null != (s = n.link || (null != t ? t.link : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'link',
        hash: {},
        data: l
      }) : s)) + '">\r\n        <div class="live_poster">\r\n            <div class="user_count' + d((n.liveStatusClass || t && t.liveStatusClass || c).call(r, null != t ? t.liveStatus : t, null != t ? t.startTime : t, null != t ? t.endTime : t, {
        name: 'liveStatusClass',
        hash: {},
        data: l
      })) + '">\r\n                <span class="user_ico"></span>\r\n                <span class="count">' + d((n.tcounthandle || t && t.tcounthandle || c).call(r, null != t ? t.userCount : t, 9999, 1, {
        name: 'tcounthandle',
        hash: {},
        data: l
      })) + '\u53c2\u4e0e</span>\r\n            </div>\r\n            <img src="' + d((s = null != (s = n.imgage_s || (null != t ? t.imgage_s : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'imgage_s',
        hash: {},
        data: l
      }) : s)) + '">\r\n        </div>\r\n        <div class="live_title">\r\n            <span>' + (null != (s = null != (s = n.roomName || (null != t ? t.roomName : t)) ? s : c, i = typeof s === h ? s.call(r, {
        name: 'roomName',
        hash: {},
        data: l
      }) : s) ? i : '') + '</span>\r\n        </div>\r\n        <div class="live_source">\r\n            <span>' + (null != (s = null != (s = n.source || (null != t ? t.source : t)) ? s : c, i = typeof s === h ? s.call(r, {
        name: 'source',
        hash: {},
        data: l
      }) : s) ? i : '') + '</span>\r\n        </div>\r\n' + (null != (i = (n.liveStatusCompare || t && t.liveStatusCompare || c).call(r, null != t ? t.liveStatus : t, null != t ? t.startTime : t, null != t ? t.endTime : t, '==', 0, {
        name: 'liveStatusCompare',
        hash: {},
        fn: e.program(3, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + (null != (i = (n.liveStatusCompare || t && t.liveStatusCompare || c).call(r, null != t ? t.liveStatus : t, null != t ? t.startTime : t, null != t ? t.endTime : t, '==', 1, {
        name: 'liveStatusCompare',
        hash: {},
        fn: e.program(5, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + (null != (i = (n.liveStatusCompare || t && t.liveStatusCompare || c).call(r, null != t ? t.liveStatus : t, null != t ? t.startTime : t, null != t ? t.endTime : t, '==', 2, {
        name: 'liveStatusCompare',
        hash: {},
        fn: e.program(7, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + '    </a>\r\n</section>'
    },
    useData: !0
  }), t.module_ui_live_nav_tpl = e({
    1: function (e, t, n, a, l) {
      var i
      return '    <ul class="live_nav_list">\r\n' + (null != (i = n.each.call(null != t ? t : {}, null != t ? t.data : t, {
          name: 'each',
          hash: {},
          fn: e.program(2, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + '    </ul>\r\n    <div class="live_d_line"></div>\r\n'
    }, 2: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}, o = n.helperMissing, r = e.escapeExpression
      return '            <li class="live_nav_item' + r((n.bothEnClass || t && t.bothEnClass || o).call(s, 6, l && l.index, {
          name: 'bothEnClass',
          hash: {},
          data: l
        })) + ' childchannel_' + r((n.liveSubNavTail || t && t.liveSubNavTail || o).call(s, null != t ? t.id : t, {
          name: 'liveSubNavTail',
          hash: {},
          data: l
        })) + '" id="child_' + r((n.liveSubNavTail || t && t.liveSubNavTail || o).call(s, null != t ? t.id : t, {
          name: 'liveSubNavTail',
          hash: {},
          data: l
        })) + '" data-scn="' + r((n.liveSubNavTail || t && t.liveSubNavTail || o).call(s, null != t ? t.id : t, {
          name: 'liveSubNavTail',
          hash: {},
          data: l
        })) + '">\r\n                <span class="live_nav_item_text">' + (null != (i = e.lambda(null != t ? t.name : t, t)) ? i : '') + '</span>\r\n            </li>\r\n'
    }, compiler: [7, '>= 4.0.0'], main: function (e, t, n, a, l) {
      var i
      return null != (i = (n.arrLengthNot || t && t.arrLengthNot || n.helperMissing).call(null != t ? t : {}, null != t ? t.data : t, 0, {
        name: 'arrLengthNot',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : ''
    }, useData: !0
  }), t.module_ui_live_top_tpl = e({
    1: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}
      return '    <ul class="slides">\r\n' + (null != (i = n.each.call(s, null != t ? t.data : t, {
          name: 'each',
          hash: {},
          fn: e.program(2, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + '    </ul>\r\n' + (null != (i = (n.arrLengthNot || t && t.arrLengthNot || n.helperMissing).call(s, null != t ? t.data : t, 1, {
          name: 'arrLengthNot',
          hash: {},
          fn: e.program(7, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '')
    },
    2: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression,
        u = '            <li class="page" data-id="' + d((s = null != (s = n.index || l && l.index) ? s : c, typeof s === h ? s.call(r, {
            name: 'index',
            hash: {},
            data: l
          }) : s)) + '">\r\n                <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(3, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' class="news-pic" href="' + d((s = null != (s = n.link || (null != t ? t.link : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'link',
        hash: {},
        data: l
      }) : s)) + '">\r\n                    <img src="' + d((s = null != (s = n.imgage_s || (null != t ? t.imgage_s : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'imgage_s',
        hash: {},
        data: l
      }) : s)) + '" alt="' + (null != (s = null != (s = n.roomName || (null != t ? t.roomName : t)) ? s : c, i = typeof s === h ? s.call(r, {
        name: 'roomName',
        hash: {},
        data: l
      }) : s) ? i : '') + '">\r\n' + (null != (i = (n.liveStatusCompare || t && t.liveStatusCompare || c).call(r, null != t ? t.liveStatus : t, null != t ? t.startTime : t, null != t ? t.endTime : t, '==', 1, {
        name: 'liveStatusCompare',
        hash: {},
        fn: e.program(5, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + '                    <span class="title">' + (null != (s = null != (s = n.roomName || (null != t ? t.roomName : t)) ? s : c, i = typeof s === h ? s.call(r, {
        name: 'roomName',
        hash: {},
        data: l
      }) : s) ? i : '') + '</span>\r\n                </a>\r\n            </li>\r\n'
    },
    3: function (e, t, n, a, l) {return 'target="_blank"'},
    5: function (e, t, n, a, l) {return '                    <div class="live_status_1">\r\n                        <div class="status_ico"></div>\r\n                        <span class="status_text">\u6b63\u5728\u76f4\u64ad</span>\r\n                    </div>\r\n'},
    7: function (e, t, n, a, l) {return '        <ul class="ctrls">\r\n\r\n        </ul>\r\n'},
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i
      return null != (i = (n.arrLengthNot || t && t.arrLengthNot || n.helperMissing).call(null != t ? t : {}, null != t ? t.data : t, 0, {
        name: 'arrLengthNot',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : ''
    },
    useData: !0
  }), t.module_ui_local_flag_tpl = e({
    compiler: [7, '>= 4.0.0'], main: function (e, t, n, a, l) {
      var i
      return '<a href="' + e.escapeExpression((i = null != (i = n.href || (null != t ? t.href : t)) ? i : n.helperMissing, 'function' == typeof i ? i.call(null != t ? t : {}, {
          name: 'href',
          hash: {},
          data: l
        }) : i)) + '" class=\'change_position\'><div class="change-position"><span></span></div></a>'
    }, useData: !0
  }), t.module_ui_nav_v2_tpl = e({
    1: function (e, t, n, a, l) {
      var i
      return ' ' + (null != (i = n['if'].call(null != t ? t : {}, null != t ? t.display : t, {
          name: 'if',
          hash: {},
          fn: e.program(2, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + ' '
    },
    2: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}, o = n.helperMissing, r = e.escapeExpression, c = e.lambda
      return '\r\n\t\t\t\t\t\t<div class="topnav_item ' + r((n.getNavDisplaySet || t && t.getNavDisplaySet || o).call(s, null != t ? t.display : t, {
          name: 'getNavDisplaySet',
          hash: {},
          data: l
        })) + '" id="topchild_' + r(c(null != t ? t.term : t, t)) + '" data-tcn="' + r(c(null != t ? t.term : t, t)) + '" data-scn="' + r((n.getChildName || t && t.getChildName || o).call(s, null != t ? t.childroute : t, {
          name: 'getChildName',
          hash: {},
          data: l
        })) + '">\r\n\t\t\t\t\t\t\t<div class="topnav_item_box">\r\n\t\t\t\t\t\t\t\t<span class="topnav_item_text">' + (null != (i = c(null != t ? t.name : t, t)) ? i : '') + '</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t'
    },
    4: function (e, t, n, a, l, i, s) {
      var o, r = e.lambda, c = e.escapeExpression
      return '\t\t\t\t<div class="subnav_contain" id="subchild_' + c(r(null != t ? t.term : t, t)) + '">\r\n\t\t\t\t\t<ul class="subnav_list" data-tcn="' + c(r(null != t ? t.term : t, t)) + '">\r\n' + (null != (o = n.each.call(null != t ? t : {}, null != t ? t.childroute : t, {
          name: 'each',
          hash: {},
          fn: e.program(5, l, 0, i, s),
          inverse: e.noop,
          data: l
        })) ? o : '') + '\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n'
    },
    5: function (e, t, n, a, l, i, s) {
      var o, r = e.lambda, c = e.escapeExpression
      return '\t\t\t\t\t\t<li class="subnav_item" id="subchild_' + c(r(null != s[1] ? s[1].term : s[1], t)) + '_' + c(r(null != t ? t.term : t, t)) + '" data-scn="' + c(r(null != t ? t.term : t, t)) + '">\r\n\t\t\t\t\t\t\t<span class="subnav_item_text">' + (null != (o = r(null != t ? t.name : t, t)) ? o : '') + '</span>\r\n\t\t\t\t\t\t</li>\r\n'
    },
    7: function (e, t, n, a, l) {
      var i
      return ' ' + (null != (i = n['if'].call(null != t ? t : {}, null != t ? t.display : t, {
          name: 'if',
          hash: {},
          fn: e.program(8, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + ' '
    },
    8: function (e, t, n, a, l) {
      var i
      return ' ' + (null != (i = (n.getExpandLine || t && t.getExpandLine || n.helperMissing).call(null != t ? t : {}, null != t ? t.term : t, {
          name: 'getExpandLine',
          hash: {},
          fn: e.program(9, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + ' '
    },
    9: function (e, t, n, a, l) {
      var i, s = e.lambda
      return '\r\n\t\t\t\t<li class="pannel_item channel_text_item" data-tcn="' + e.escapeExpression(s(null != t ? t.term : t, t)) + '">' + (null != (i = s(null != t ? t.name : t, t)) ? i : '') + '</li>\r\n\t\t\t\t'
    },
    11: function (e, t, n, a, l) {
      var i = e.escapeExpression, s = e.lambda
      return '\t\t\t\t<li class="pannel_item channel_icon_item" data-tcn="' + i((n.getTopChannelName || t && t.getTopChannelName || n.helperMissing).call(null != t ? t : {}, t, {
          name: 'getTopChannelName',
          hash: {},
          data: l
        })) + '" data-scn="' + i(s(null != t ? t.term : t, t)) + '" data-exsaber="' + i(s(null != t ? t.extension : t, t)) + '">\r\n\t\t\t\t\t<div class="icon_item_img">\r\n\t\t\t\t\t\t<img src="' + i(s(null != t ? t.pic : t, t)) + '" alt=""></div>\r\n\t\t\t\t\t<div class="icon_item_text">' + i(s(null != t ? t.name : t, t)) + '</div>\r\n\t\t\t\t</li>\r\n'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l, i, s) {
      var o, r = null != t ? t : {}
      return '<nav class="main_nav">\r\n\t<div class="main_nav_bar">\r\n\t\t<div class="main_nav_wrap main_nav_topnav_wrap">\r\n\t\t\t<div class="topnav_list_contain">\r\n\t\t\t\t<div class="topnav_list_scroll_wrap">\r\n\t\t\t\t\t<div class="topnav_list">\r\n\t\t\t\t\t\t' + (null != (o = n.each.call(r, null != t ? t.route : t, {
          name: 'each',
          hash: {},
          fn: e.program(1, l, 0, i, s),
          inverse: e.noop,
          data: l
        })) ? o : '') + '\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="topnav_expand_btn"></div>\r\n\t\t</div>\r\n\t\t<div class="subnav_wrap">\r\n\t\t\t<div class="main_nav_wrap">\r\n' + (null != (o = n.each.call(r, null != t ? t.route : t, {
          name: 'each',
          hash: {},
          fn: e.program(4, l, 0, i, s),
          inverse: e.noop,
          data: l
        })) ? o : '') + '\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="nav_expand_panel">\r\n\t\t\t<ul class="expand_panel_channel with_line">\r\n\t\t\t\t' + (null != (o = n.each.call(r, null != t ? t.route : t, {
          name: 'each',
          hash: {},
          fn: e.program(7, l, 0, i, s),
          inverse: e.noop,
          data: l
        })) ? o : '') + '\r\n\t\t\t</ul>\r\n\t\t\t<ul class="expand_panel_channel">\r\n' + (null != (o = n.each.call(r, null != t ? t.expand : t, {
          name: 'each',
          hash: {},
          fn: e.program(11, l, 0, i, s),
          inverse: e.noop,
          data: l
        })) ? o : '') + '\t\t\t</ul>\r\n\t\t</div>\r\n\r\n\t</div>\r\n</nav>\r\n<div class="scroll-news"></div>'
    },
    useData: !0,
    useDepths: !0
  }), t.module_ui_oly_board_tpl = e({
    1: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}, o = n.helperMissing, r = 'function', c = e.escapeExpression
      return '                <li>\r\n                    <a class="oly_schedule_carousel_link" href="' + c((i = null != (i = n.link || (null != t ? t.link : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'link',
          hash: {},
          data: l
        }) : i)) + '">\r\n                        <div class="schedule_text clearfix">\r\n                            <p class="schedule_text_title">' + c((i = null != (i = n.title || (null != t ? t.title : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'title',
          hash: {},
          data: l
        }) : i)) + '</p>\r\n                        </div>\r\n                    </a>\r\n                </li>\r\n'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}, o = n.helperMissing, r = e.escapeExpression, c = e.lambda
      return '<div class="oly_info ' + r((n.isInMatch || t && t.isInMatch || o).call(s, '2016-08-06 00:00:00', {
          name: 'isInMatch',
          hash: {},
          data: l
        })) + '">\r\n    <div class="oly_board clearfix">\r\n        <div class="oly_day_info">\r\n            <p class="oly_day_info_title"></p>\r\n            <div class="oly_day_info_main clearfix">\r\n                <div class="oly_day_info_main_prefix">\u7b2c</div>\r\n                <div class="oly_day_info_main_number">\r\n                    <div class="oly_day_info_main_number_wrap">\r\n                        <span class="number number' + r((n.remainTime || t && t.remainTime || o).call(s, '2016-08-06 00:00:00', 0, {
          name: 'remainTime',
          hash: {},
          data: l
        })) + '"></span><span class="number number' + r((n.remainTime || t && t.remainTime || o).call(s, '2016-08-06 00:00:00', 1, {
          name: 'remainTime',
          hash: {},
          data: l
        })) + '"></span>\r\n                        <span class="middle_line"></span>\r\n                    </div>\r\n                    <div class="oly_day_info_main_footer"></div>\r\n                </div>\r\n                <div class="oly_day_info_main_suffix">\u5929</div>\r\n            </div>\r\n        </div>\r\n        <div class="oly_schedule_title">\r\n            <p class="schedule_text_info medal">\u5965\u8fd0\u70ed\u8baf</p>\r\n            <p class="oly_schedule_title_border"></p>\r\n        </div>\r\n        <div class="oly_schedule_carousel">\r\n            <ul class="carousel_wrap">\r\n' + (null != (i = n.each.call(s, null != (i = null != t ? t.data : t) ? i.matchNews : i, {
          name: 'each',
          hash: {},
          fn: e.program(1, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + '            </ul>\r\n        </div>\r\n    </div>\r\n    <div class="oly_bar">\r\n        <div class="oly_bar_game_entrance">\r\n            <div class="oly_link_area">\r\n                <a class="link" href="' + r(c(null != (i = null != (i = null != t ? t.data : t) ? i.matchGame : i) ? i.iosGameUrl : i, t)) + '"><span class="link_text">' + r(c(null != (i = null != (i = null != t ? t.data : t) ? i.matchGame : i) ? i.title : i, t)) + '</span></a>\r\n                <span class="slash"></span>\r\n                <a class="link" href="' + r(c(null != (i = null != (i = null != t ? t.data : t) ? i.matchSubtitles : i) ? i.link : i, t)) + '"><span class="link_text">' + r(c(null != (i = null != (i = null != t ? t.data : t) ? i.matchSubtitles : i) ? i.title : i, t)) + '</span></a>\r\n            </div>\r\n        </div>\r\n        <div class="oly_bar_medals">\r\n            <a class="oly_bar_medals_link" href="http://3g.163.com/ntes/special/003424KQ/olymedalrank2016.html?from=index">\r\n                <div class="logo_area">\r\n                    <img src="http://img2.cache.netease.com/f2e/wap/touch_index_2016/trunk/images/yili_logo.png" alt="">\r\n                    <span class="slash"></span>\r\n                </div>\r\n                <div class="main_area">\r\n                    <p class="china_rank">' + r(c(null != (i = null != (i = null != t ? t.data : t) ? i.medalRank : i) ? i.chinaRank : i, t)) + '</p>\r\n                    <div class="medal_count">\r\n                        <span class="gold">' + r(c(null != (i = null != (i = null != t ? t.data : t) ? i.medalRank : i) ? i.gold : i, t)) + '</span>\r\n                        <span class="silver">' + r(c(null != (i = null != (i = null != t ? t.data : t) ? i.medalRank : i) ? i.silver : i, t)) + '</span>\r\n                        <span class="copper">' + r(c(null != (i = null != (i = null != t ? t.data : t) ? i.medalRank : i) ? i.bronze : i, t)) + '</span>\r\n                    </div>\r\n                </div>\r\n            </a>\r\n        </div>\r\n    </div>\r\n</div>'
    },
    useData: !0
  }), t.module_ui_slidedown_refresh_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {return '<section class="slidedown_tip">\r\n\t<div class="slidedown_tip_icon">\r\n\t\t<svg id="slide_icon_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px"\r\n\t\t\ty="0px" viewBox="-0.125 -0.083 47.5 43.875" enable-background="new -0.125 -0.083 47.5 43.875" xml:space="preserve">\r\n\t\t\t<g id="SVG_rect">\r\n\t\t\t\t<rect x="8.688" y="6.459" fill="#CCCCCC" width="21.5" height="10.833" />\r\n\t\t\t\t<path fill="#888888" d="M30.188,18.042h-21.5c-0.414,0-0.75-0.336-0.75-0.75V6.459c0-0.414,0.336-0.75,0.75-0.75h21.5   c0.414,0,0.75,0.336,0.75,0.75v10.833C30.938,17.706,30.601,18.042,30.188,18.042z M9.438,16.542h20V7.209h-20V16.542z"\r\n\t\t\t\t/>\r\n\t\t\t</g>\r\n\t\t\t<path id="SVG_path" fill="none" stroke="#888888" stroke-width="1.5" stroke-miterlimit="10" d="M36.813,43.041V0.792H0.688v42.25h37.5  c0,0,8.625-0.124,8.625-7v-22.75h-10"\r\n\t\t\t/>\r\n\t\t\t<line id="SVG_line1" fill="none" stroke="#888888" stroke-width="1.5" stroke-miterlimit="10" x1="7.938" y1="23.125" x2="30.938"\r\n\t\t\t\ty2="23.125" />\r\n\t\t\t<line id="SVG_line2" fill="none" stroke="#888888" stroke-width="1.5" stroke-miterlimit="10" x1="7.938" y1="29.208" x2="30.938"\r\n\t\t\t\ty2="29.208" />\r\n\t\t\t<line id="SVG_line3" fill="none" stroke="#888888" stroke-width="1.5" stroke-miterlimit="10" x1="7.938" y1="35.292" x2="23.75"\r\n\t\t\t\ty2="35.292" />\r\n\t\t</svg>\r\n\t</div>\r\n\t<div class="slidedown_tip_text">\u4e0b\u62c9\u66f4\u65b0</div>\r\n</section>'},
    useData: !0
  }), t.module_ui_sport_live_tpl = e({
    1: function (e, t, n, a, l) {return 'target="_blank"'},
    3: function (e, t, n, a, l) {return '<div class="hot"></div>'},
    5: function (e, t, n, a, l) {
      var i
      return null != (i = (n.iswatching || t && t.iswatching || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, null != t ? t.date : t, {
        name: 'iswatching',
        hash: {},
        fn: e.program(6, l, 0),
        inverse: e.program(8, l, 0),
        data: l
      })) ? i : ''
    },
    6: function (e, t, n, a, l) {return '                <span class="watch">&nbsp;|&nbsp;<span class="watchcount"></span>\u4eba\u5728\u770b</span>\r\n'},
    8: function (e, t, n, a, l) {return '                <span class="watch">&nbsp;|&nbsp;<span class="watchcount"></span>\u4eba\u5df2\u770b</span>\r\n'},
    10: function (e, t, n, a, l) {
      var i
      return null != (i = (n.isbeforeLive || t && t.isbeforeLive || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, null != t ? t.date : t, {
        name: 'isbeforeLive',
        hash: {},
        fn: e.program(11, l, 0),
        inverse: e.program(16, l, 0),
        data: l
      })) ? i : ''
    },
    11: function (e, t, n, a, l) {
      var i
      return null != (i = (n.islive || t && t.islive || n.helperMissing).call(null != t ? t : {}, null != t ? t.live : t, {
        name: 'islive',
        hash: {},
        fn: e.program(12, l, 0),
        inverse: e.program(14, l, 0),
        data: l
      })) ? i : ''
    },
    12: function (e, t, n, a, l) {
      var i = null != t ? t : {}, s = n.helperMissing, o = e.escapeExpression
      return '                    <span class="date">' + o((n.getliveday || t && t.getliveday || s).call(i, null != t ? t.liveday : t, {
          name: 'getliveday',
          hash: {},
          data: l
        })) + '&nbsp;' + o((n.sliceTime || t && t.sliceTime || s).call(i, null != t ? t.date : t, {
          name: 'sliceTime',
          hash: {},
          data: l
        })) + '</span>\r\n                    <span class="live before_live">\u56fe\u6587\u76f4\u64ad</span>\r\n'
    },
    14: function (e, t, n, a, l) {
      var i = null != t ? t : {}, s = n.helperMissing, o = e.escapeExpression
      return '                    <span class="date">' + o((n.getliveday || t && t.getliveday || s).call(i, null != t ? t.liveday : t, {
          name: 'getliveday',
          hash: {},
          data: l
        })) + '&nbsp;' + o((n.sliceTime || t && t.sliceTime || s).call(i, null != t ? t.date : t, {
          name: 'sliceTime',
          hash: {},
          data: l
        })) + '</span>\r\n                    <span class="live before_live">\u6570\u636e\u76f4\u64ad</span>\r\n'
    },
    16: function (e, t, n, a, l) {
      var i
      return null != (i = (n.islive || t && t.islive || n.helperMissing).call(null != t ? t : {}, null != t ? t.live : t, {
        name: 'islive',
        hash: {},
        fn: e.program(17, l, 0),
        inverse: e.program(20, l, 0),
        data: l
      })) ? i : ''
    },
    17: function (e, t, n, a, l) {
      var i
      return '                    <div class="living">\r\n                        <span class="live">\u56fe\u6587\u76f4\u64ad</span>\r\n                    </div>\r\n' + (null != (i = n['if'].call(null != t ? t : {}, null != t ? t.status : t, {
          name: 'if',
          hash: {},
          fn: e.program(18, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '')
    },
    18: function (e, t, n, a, l) {
      var i
      return '                    <span class="section">\u7b2c' + e.escapeExpression((i = null != (i = n.round || (null != t ? t.round : t)) ? i : n.helperMissing, 'function' == typeof i ? i.call(null != t ? t : {}, {
          name: 'round',
          hash: {},
          data: l
        }) : i)) + '\u8282</span>\r\n'
    },
    20: function (e, t, n, a, l) {
      var i
      return '                    <div class="living">\r\n                        <span class="live">\u6570\u636e\u76f4\u64ad</span>\r\n                    </div>\r\n' + (null != (i = n['if'].call(null != t ? t : {}, null != t ? t.status : t, {
          name: 'if',
          hash: {},
          fn: e.program(18, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '')
    },
    22: function (e, t, n, a, l) {
      var i = null != t ? t : {}, s = n.helperMissing, o = e.escapeExpression
      return '                <div class="living after_live">\r\n                    <span class="live">\u56fe\u6587\u6218\u62a5</span>\r\n                </div>\r\n            <span class="section">' + o((n.getliveday || t && t.getliveday || s).call(i, null != t ? t.liveday : t, {
          name: 'getliveday',
          hash: {},
          data: l
        })) + '&nbsp;' + o((n.sliceTime || t && t.sliceTime || s).call(i, null != t ? t.date : t, {
          name: 'sliceTime',
          hash: {},
          data: l
        })) + '</span>\r\n'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression,
        u = n.blockHelperMissing,
        m = '<section class="match live' + d((s = null != (s = n.live || (null != t ? t.live : t)) ? s : c, typeof s === h ? s.call(r, {
            name: 'live',
            hash: {},
            data: l
          }) : s)) + ' status' + d((s = null != (s = n.status || (null != t ? t.status : t)) ? s : c, typeof s === h ? s.call(r, {
            name: 'status',
            hash: {},
            data: l
          }) : s)) + '" data-roomid="' + d((s = null != (s = n.roomId || (null != t ? t.roomId : t)) ? s : c, typeof s === h ? s.call(r, {
            name: 'roomId',
            hash: {},
            data: l
          }) : s)) + '">\r\n    <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = u.call(t, i, o)), null != i && (m += i), m += ' href="' + d((n.getSportLiveURL || t && t.getSportLiveURL || c).call(r, null != t ? t.roomId : t, null != t ? t.mid : t, {
          name: 'getSportLiveURL',
          hash: {},
          data: l
        })) + '">\r\n    <!-- ', s = null != (s = n.ishot || (null != t ? t.ishot : t)) ? s : c, o = {
        name: 'ishot',
        hash: {},
        fn: e.program(3, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.ishot || (i = u.call(t, i, o)), null != i && (m += i), m + ' -->\r\n    <div class="match_head">\r\n        <span class="type">NBA' + d((s = null != (s = n.type || (null != t ? t.type : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'type',
        hash: {},
        data: l
      }) : s)) + '</span>\r\n' + (null != (i = (n.isShowCount || t && t.isShowCount || c).call(r, null != t ? t.status : t, null != t ? t.live : t, null != t ? t.date : t, {
        name: 'isShowCount',
        hash: {},
        fn: e.program(5, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + '    </div>\r\n    <div class="match_body clearfix">\r\n        <div class="match_team clearfix">\r\n            <div class="home clearfix">\r\n                <img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + d((s = null != (s = n.homeId || (null != t ? t.homeId : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'homeId',
        hash: {},
        data: l
      }) : s)) + '.png" alt="' + d((s = null != (s = n.homeCn || (null != t ? t.homeCn : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'homeCn',
        hash: {},
        data: l
      }) : s)) + '">\r\n                <span class="name">' + d((s = null != (s = n.homeCn || (null != t ? t.homeCn : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'homeCn',
        hash: {},
        data: l
      }) : s)) + '</span>\r\n                <span class="score">' + d((s = null != (s = n.homeScoreTotal || (null != t ? t.homeScoreTotal : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'homeScoreTotal',
        hash: {},
        data: l
      }) : s)) + '</span>\r\n            </div>\r\n            <div class="away clearfix">\r\n                <img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + d((s = null != (s = n.awayId || (null != t ? t.awayId : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'awayId',
        hash: {},
        data: l
      }) : s)) + '.png" alt="' + d((s = null != (s = n.awayCn || (null != t ? t.awayCn : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'awayCn',
        hash: {},
        data: l
      }) : s)) + '">\r\n                <span class="name">' + d((s = null != (s = n.awayCn || (null != t ? t.awayCn : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'awayCn',
        hash: {},
        data: l
      }) : s)) + '</span>\r\n                <span class="score">' + d((s = null != (s = n.awayScoreTotal || (null != t ? t.awayScoreTotal : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'awayScoreTotal',
        hash: {},
        data: l
      }) : s)) + '</span>\r\n            </div>\r\n        </div>\r\n        <div class="match_live">\r\n' + (null != (i = (n.isliving || t && t.isliving || c).call(r, null != t ? t.status : t, {
        name: 'isliving',
        hash: {},
        fn: e.program(10, l, 0),
        inverse: e.program(22, l, 0),
        data: l
      })) ? i : '') + '        </div>\r\n    </div>\r\n    </a>\r\n</section>'
    },
    useData: !0
  }), t.module_ui_sport_live_ue_tpl = e({
    1: function (e, t, n, a, l) {return 'target="_blank"'},
    3: function (e, t, n, a, l) {return '<div class="hot"></div>'},
    5: function (e, t, n, a, l) {
      var i = null != t ? t : {}, s = n.helperMissing, o = e.escapeExpression
      return '            <div class="living after_live">\r\n                <span class="live">\u56fe\u6587\u6218\u62a5</span>\r\n            </div>\r\n            <span class="section">' + o((n.getUEliveday || t && t.getUEliveday || s).call(i, null != t ? t.date : t, {
          name: 'getUEliveday',
          hash: {},
          data: l
        })) + '&nbsp;' + o((n.sliceTime || t && t.sliceTime || s).call(i, null != t ? t.date : t, {
          name: 'sliceTime',
          hash: {},
          data: l
        })) + '</span>\r\n'
    },
    7: function (e, t, n, a, l) {
      var i
      return null != (i = (n.isUEBeforeLive || t && t.isUEBeforeLive || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, null != t ? t.date : t, {
        name: 'isUEBeforeLive',
        hash: {},
        fn: e.program(8, l, 0),
        inverse: e.program(10, l, 0),
        data: l
      })) ? i : ''
    },
    8: function (e, t, n, a, l) {
      var i = null != t ? t : {}, s = n.helperMissing, o = e.escapeExpression
      return '                <span class="date">' + o((n.getUEliveday || t && t.getUEliveday || s).call(i, null != t ? t.date : t, {
          name: 'getUEliveday',
          hash: {},
          data: l
        })) + '&nbsp;' + o((n.sliceTime || t && t.sliceTime || s).call(i, null != t ? t.date : t, {
          name: 'sliceTime',
          hash: {},
          data: l
        })) + '</span>\r\n                <span class="live before_live">\u56fe\u6587\u76f4\u64ad</span>\r\n'
    },
    10: function (e, t, n, a, l) {
      return '                <div class="living">\r\n                    <span class="live">\u56fe\u6587\u76f4\u64ad</span>\r\n                </div>\r\n                <span class="section">' + e.escapeExpression((n.getUEMatchStatus || t && t.getUEMatchStatus || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, {
          name: 'getUEMatchStatus',
          hash: {},
          data: l
        })) + '</span>\r\n'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression,
        u = n.blockHelperMissing,
        m = '<section class="match status' + d((s = null != (s = n.status || (null != t ? t.status : t)) ? s : c, typeof s === h ? s.call(r, {
            name: 'status',
            hash: {},
            data: l
          }) : s)) + '" data-roomid="' + d((s = null != (s = n.roomId || (null != t ? t.roomId : t)) ? s : c, typeof s === h ? s.call(r, {
            name: 'roomId',
            hash: {},
            data: l
          }) : s)) + '">\r\n    <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = u.call(t, i, o)), null != i && (m += i), m += ' href="' + d((n.getUESportLiveURL || t && t.getUESportLiveURL || c).call(r, null != t ? t.mid : t, null != t ? t.cid : t, null != t ? t.roomId : t, {
          name: 'getUESportLiveURL',
          hash: {},
          data: l
        })) + '">\r\n    <!-- ', s = null != (s = n.ishot || (null != t ? t.ishot : t)) ? s : c, o = {
        name: 'ishot',
        hash: {},
        fn: e.program(3, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.ishot || (i = u.call(t, i, o)), null != i && (m += i), m + ' -->\r\n    <div class="match_head ue_head">\r\n        <span class="type">\u6b27\u6d32\u676f' + d((s = null != (s = n.roundType || (null != t ? t.roundType : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'roundType',
        hash: {},
        data: l
      }) : s)) + '</span>\r\n    </div>\r\n    <div class="match_body clearfix">\r\n        <div class="match_team clearfix">\r\n            <div class="home clearfix">\r\n                <img src="http://img2.cache.netease.com/f2e/wap/touch_live_euro/images/flag/' + d((s = null != (s = n.homeId || (null != t ? t.homeId : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'homeId',
        hash: {},
        data: l
      }) : s)) + '.jpg" alt="' + d((s = null != (s = n.home || (null != t ? t.home : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'home',
        hash: {},
        data: l
      }) : s)) + '">\r\n                <span class="name">' + d((s = null != (s = n.home || (null != t ? t.home : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'home',
        hash: {},
        data: l
      }) : s)) + '</span>\r\n                <span class="score">' + d((s = null != (s = n.homeScore || (null != t ? t.homeScore : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'homeScore',
        hash: {},
        data: l
      }) : s)) + '</span>\r\n            </div>\r\n            <div class="away clearfix">\r\n                <img src="http://img2.cache.netease.com/f2e/wap/touch_live_euro/images/flag/' + d((s = null != (s = n.awayId || (null != t ? t.awayId : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'awayId',
        hash: {},
        data: l
      }) : s)) + '.jpg" alt="' + d((s = null != (s = n.away || (null != t ? t.away : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'away',
        hash: {},
        data: l
      }) : s)) + '">\r\n                <span class="name">' + d((s = null != (s = n.away || (null != t ? t.away : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'away',
        hash: {},
        data: l
      }) : s)) + '</span>\r\n                <span class="score">' + d((s = null != (s = n.awayScore || (null != t ? t.awayScore : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'awayScore',
        hash: {},
        data: l
      }) : s)) + '</span>\r\n            </div>\r\n        </div>\r\n        <div class="match_live">\r\n' + (null != (i = (n.isUEMatchEnd || t && t.isUEMatchEnd || c).call(r, null != t ? t.status : t, {
        name: 'isUEMatchEnd',
        hash: {},
        fn: e.program(5, l, 0),
        inverse: e.program(7, l, 0),
        data: l
      })) ? i : '') + '        </div>\r\n    </div>\r\n    </a>\r\n</section>'
    },
    useData: !0
  }), t.module_ui_sport_score_box1_tpl = e({
    1: function (e, t, n, a, l) {
      var i
      return ' ' + (null != (i = n['if'].call(null != t ? t : {}, null != t ? t.live : t, {
          name: 'if',
          hash: {},
          fn: e.program(2, l, 0),
          inverse: e.program(6, l, 0),
          data: l
        })) ? i : '') + ' '
    },
    2: function (e, t, n, a, l) {
      var i
      return ' ' + (null != (i = (n.isliving || t && t.isliving || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, {
          name: 'isliving',
          hash: {},
          fn: e.program(3, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + ' '
    },
    3: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = e.escapeExpression, d = e.lambda, u = '\r\n\t<a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(4, l, 0),
        inverse: e.noop,
        data: l
      }, i = 'function' == typeof s ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="' + h((n.getSportLiveURL || t && t.getSportLiveURL || c).call(r, null != t ? t.roomId : t, null != t ? t.mid : t, {
        name: 'getSportLiveURL',
        hash: {},
        data: l
      })) + '">\r\n\t\t<div class="match_item">\r\n\t\t\t<div class="status"><span>' + h((n.getMatchStatus || t && t.getMatchStatus || c).call(r, null != t ? t.status : t, null != t ? t.date : t, {
        name: 'getMatchStatus',
        hash: {},
        data: l
      })) + '</span></div>\r\n\t\t\t<div class="team clearfix home">\r\n\t\t\t\t<div class="logo"><img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + h(d(null != t ? t.homeId : t, t)) + '.png" alt=""></div>\r\n\t\t\t\t<div class="info">\r\n\t\t\t\t\t<div class="name">' + h(d(null != t ? t.homeCn : t, t)) + '</div>\r\n\t\t\t\t\t<div class="score">' + h(d(null != t ? t.homeScoreTotal : t, t)) + '</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="team clearfix away">\r\n\t\t\t\t<div class="logo"><img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + h(d(null != t ? t.awayId : t, t)) + '.png" alt=""></div>\r\n\t\t\t\t<div class="info">\r\n\t\t\t\t\t<div class="name">' + h(d(null != t ? t.awayCn : t, t)) + '</div>\r\n\t\t\t\t\t<div class="score">' + h(d(null != t ? t.awayScoreTotal : t, t)) + '</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</a>\r\n\t'
    },
    4: function (e, t, n, a, l) {return 'target="_blank" '},
    6: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = e.escapeExpression, d = e.lambda, u = '\r\n\t<a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(4, l, 0),
        inverse: e.noop,
        data: l
      }, i = 'function' == typeof s ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="' + h((n.getAllSportLiveURL || t && t.getAllSportLiveURL || c).call(r, null != t ? t.projectId : t, null != t ? t.matchId : t, null != t ? t.competitionId : t, null != t ? t.liveRoomID : t, {
        name: 'getAllSportLiveURL',
        hash: {},
        data: l
      })) + '">\r\n\t\t<div class="match_item">\r\n\t\t\t<div class="status"><span>' + h(d(null != t ? t.status : t, t)) + '</span></div>\r\n\t\t\t<div class="team clearfix home">\r\n\t\t\t\t<div class="logo ue_logo"><img src="http://imgsize.ph.126.net/?imgurl=' + h(d(null != t ? t.battle1ImgLink : t, t)) + '_60x60x1.jpg" alt=""></div>\r\n\t\t\t\t<div class="info">\r\n\t\t\t\t\t<div class="name">' + h(d(null != t ? t.battle1 : t, t)) + '</div>\r\n\t\t\t\t\t<div class="score">' + h(d(null != t ? t.battle1Score : t, t)) + '</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="team clearfix away">\r\n\t\t\t\t<div class="logo ue_logo"><img src="http://imgsize.ph.126.net/?imgurl=' + h(d(null != t ? t.battle2ImgLink : t, t)) + '_60x60x1.jpg" alt=""></div>\r\n\t\t\t\t<div class="info">\r\n\t\t\t\t\t<div class="name">' + h(d(null != t ? t.battle2 : t, t)) + '</div>\r\n\t\t\t\t\t<div class="score">' + h(d(null != t ? t.battle2Score : t, t)) + '</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</a>\r\n\t'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i
      return '<div class="nba_fastview_container clearfix">\r\n\t' + (null != (i = n.each.call(null != t ? t : {}, null != t ? t.data : t, {
          name: 'each',
          hash: {},
          fn: e.program(1, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + '\r\n</div>'
    },
    useData: !0
  }), t.module_ui_sport_score_box2_tpl = e({
    1: function (e, t, n, a, l) {
      var i
      return ' ' + (null != (i = n['if'].call(null != t ? t : {}, null != t ? t.location : t, {
          name: 'if',
          hash: {},
          fn: e.program(2, l, 0),
          inverse: e.program(12, l, 0),
          data: l
        })) ? i : '') + ' '
    },
    2: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = e.escapeExpression, d = e.lambda, u = '\r\n\t<a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(3, l, 0),
        inverse: e.noop,
        data: l
      }, i = 'function' == typeof s ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="' + h((n.getSportLiveURL || t && t.getSportLiveURL || c).call(r, null != t ? t.roomId : t, null != t ? t.mid : t, {
        name: 'getSportLiveURL',
        hash: {},
        data: l
      })) + '">\r\n\t\t<div class="match_item clearfix">\r\n\t\t\t<div class="team clearfix home">\r\n\t\t\t\t<div class="logo">\r\n\t\t\t\t\t<img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + h(d(null != t ? t.homeId : t, t)) + '.png" alt="">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="name">' + h(d(null != t ? t.homeCn : t, t)) + '</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="info">\r\n\t\t\t\t<div class="type">' + h(d(null != t ? t.type : t, t)) + '</div>\r\n\t\t\t\t' + (null != (i = (n.isliving || t && t.isliving || c).call(r, null != t ? t.status : t, {
        name: 'isliving',
        hash: {},
        fn: e.program(5, l, 0),
        inverse: e.program(10, l, 0),
        data: l
      })) ? i : '') + '\t\t\t</div>\r\n\t\t\t<div class="team clearfix away">\r\n\t\t\t\t<div class="logo">\r\n\t\t\t\t\t<img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + h(d(null != t ? t.awayId : t, t)) + '.png" alt="">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="name">' + h(d(null != t ? t.awayCn : t, t)) + '</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</a>\r\n'
    },
    3: function (e, t, n, a, l) {return 'target="_blank" '},
    5: function (e, t, n, a, l) {
      var i
      return ' ' + (null != (i = (n.isbeforeLive || t && t.isbeforeLive || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, null != t ? t.date : t, {
          name: 'isbeforeLive',
          hash: {},
          fn: e.program(6, l, 0),
          inverse: e.program(8, l, 0),
          data: l
        })) ? i : '') + ' '
    },
    6: function (e, t, n, a, l) {
      var i = null != t ? t : {}, s = n.helperMissing, o = e.escapeExpression
      return '\r\n\t\t\t\t<div class="score">' + o((n.getliveday || t && t.getliveday || s).call(i, null != t ? t.liveday : t, {
          name: 'getliveday',
          hash: {},
          data: l
        })) + '&nbsp;' + o((n.sliceTime || t && t.sliceTime || s).call(i, null != t ? t.date : t, {
          name: 'sliceTime',
          hash: {},
          data: l
        })) + '</div>\r\n\t\t\t\t<div class="status_beforematch"><span>' + o((n.getMatchStatus || t && t.getMatchStatus || s).call(i, null != t ? t.status : t, null != t ? t.date : t, {
          name: 'getMatchStatus',
          hash: {},
          data: l
        })) + '</span></div>\r\n'
    },
    8: function (e, t, n, a, l) {
      var i = e.lambda, s = e.escapeExpression
      return '\t\t\t\t<div class="score">' + s(i(null != t ? t.homeScoreTotal : t, t)) + '<span>vs</span>' + s(i(null != t ? t.awayScoreTotal : t, t)) + '</div>\r\n\t\t\t\t<div class="status_matching"><span>\u7b2c' + s(i(null != t ? t.round : t, t)) + '\u8282</span></div>\r\n\t\t\t\t'
    },
    10: function (e, t, n, a, l) {
      var i = e.lambda, s = e.escapeExpression
      return '\r\n\t\t\t\t<div class="score">' + s(i(null != t ? t.homeScoreTotal : t, t)) + '<span>vs</span>' + s(i(null != t ? t.awayScoreTotal : t, t)) + '</div>\r\n\t\t\t\t<div class="status_matching"><span>' + s((n.getMatchStatus || t && t.getMatchStatus || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, null != t ? t.date : t, {
          name: 'getMatchStatus',
          hash: {},
          data: l
        })) + '</span></div>\r\n'
    },
    12: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = e.escapeExpression, d = e.lambda, u = '\t<a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(3, l, 0),
        inverse: e.noop,
        data: l
      }, i = 'function' == typeof s ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="' + h((n.getAllSportLiveURL || t && t.getAllSportLiveURL || c).call(r, null != t ? t.projectId : t, null != t ? t.matchId : t, null != t ? t.competitionId : t, null != t ? t.liveRoomID : t, {
        name: 'getAllSportLiveURL',
        hash: {},
        data: l
      })) + '">\r\n\t\t<div class="match_item clearfix">\r\n\t\t\t<div class="team clearfix home">\r\n\t\t\t\t<div class="logo ue_logo">\r\n\t\t\t\t\t<img src="http://imgsize.ph.126.net/?imgurl=' + h(d(null != t ? t.battle1ImgLink : t, t)) + '_60x60x1.jpg" alt="">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="name">' + h(d(null != t ? t.battle1 : t, t)) + '</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="info">\r\n\t\t\t\t<div class="type" style="display:none;">' + h(d(null != t ? t.status : t, t)) + '</div>\r\n' + (null != (i = (n.isMatchEnd || t && t.isMatchEnd || c).call(r, null != t ? t.status : t, {
        name: 'isMatchEnd',
        hash: {},
        fn: e.program(13, l, 0),
        inverse: e.program(15, l, 0),
        data: l
      })) ? i : '') + '\r\n\t\t\t</div>\r\n\t\t\t<div class="team clearfix away">\r\n\t\t\t\t<div class="logo ue_logo">\r\n\t\t\t\t\t<img src="http://imgsize.ph.126.net/?imgurl=' + h(d(null != t ? t.battle2ImgLink : t, t)) + '_60x60x1.jpg" alt="">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="name">' + h(d(null != t ? t.battle2 : t, t)) + '</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</a>\r\n\t'
    },
    13: function (e, t, n, a, l) {
      var i = e.lambda, s = e.escapeExpression
      return '\t\t\t\t<div class="score">' + s(i(null != t ? t.battle1Score : t, t)) + '<span>vs</span>' + s(i(null != t ? t.battle2Score : t, t)) + '</div>\r\n\t\t\t\t<div class="status_matching"><span>' + s(i(null != t ? t.status : t, t)) + '</span></div>\r\n\t\t\t\t'
    },
    15: function (e, t, n, a, l) {
      var i
      return ' ' + (null != (i = (n.isBeforeLive || t && t.isBeforeLive || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, {
          name: 'isBeforeLive',
          hash: {},
          fn: e.program(16, l, 0),
          inverse: e.program(13, l, 0),
          data: l
        })) ? i : '') + ' '
    },
    16: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}, o = n.helperMissing, r = 'function', c = e.escapeExpression
      return '\r\n\t\t\t\t<div class="score">' + c((i = null != (i = n.date || (null != t ? t.date : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'date',
          hash: {},
          data: l
        }) : i)) + '&nbsp;' + c((i = null != (i = n.time || (null != t ? t.time : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'time',
          hash: {},
          data: l
        }) : i)) + '</div>\r\n\t\t\t\t<div class="status_beforematch"><span>' + c(e.lambda(null != t ? t.status : t, t)) + '</span></div>\r\n'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i
      return '<div class="nba_fastview_container_pen clearfix">\r\n\t' + (null != (i = n.each.call(null != t ? t : {}, null != t ? t.data : t, {
          name: 'each',
          hash: {},
          fn: e.program(1, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + '\r\n</div>'
    },
    useData: !0
  }), t.module_ui_sport_score_box3_tpl = e({
    1: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = e.escapeExpression, d = e.lambda, u = '\t<a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(2, l, 0),
        inverse: e.noop,
        data: l
      }, i = 'function' == typeof s ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="' + h((n.getAllSportLiveURL || t && t.getAllSportLiveURL || c).call(r, null != t ? t.projectId : t, null != t ? t.matchId : t, null != t ? t.competitionId : t, null != t ? t.liveRoomID : t, {
        name: 'getAllSportLiveURL',
        hash: {},
        data: l
      })) + '">\n\t\t<div class="match_item clearfix">\n\t\t\t<div class="team clearfix home">\n\t\t\t\t<div class="logo">\n\t\t\t\t\t<img src="http://imgsize.ph.126.net/?imgurl=' + h(d(null != t ? t.battle1ImgLink : t, t)) + '_60x60x1.jpg" alt="">\n\t\t\t\t</div>\n\t\t\t\t<div class="name">' + h(d(null != t ? t.battle1 : t, t)) + '</div>\n\t\t\t</div>\n\t\t\t<div class="info">\n\t\t\t\t<div class="type" style="display:none;">' + h(d(null != t ? t.type : t, t)) + '</div>\n' + (null != (i = (n.isMatchEnd || t && t.isMatchEnd || c).call(r, null != t ? t.status : t, {
        name: 'isMatchEnd',
        hash: {},
        fn: e.program(4, l, 0),
        inverse: e.program(6, l, 0),
        data: l
      })) ? i : '') + '\n\t\t\t</div>\n\t\t\t<div class="team clearfix away">\n\t\t\t\t<div class="logo">\n\t\t\t\t\t<img src="http://imgsize.ph.126.net/?imgurl=' + h(d(null != t ? t.battle2ImgLink : t, t)) + '_60x60x1.jpg" alt="">\n\t\t\t\t</div>\n\t\t\t\t<div class="name">' + h(d(null != t ? t.battle2 : t, t)) + '</div>\n\t\t\t</div>\n\t\t</div>\n\t</a>\n'
    },
    2: function (e, t, n, a, l) {return 'target="_blank" '},
    4: function (e, t, n, a, l) {
      var i = e.lambda, s = e.escapeExpression
      return '\t\t\t\t<div class="score">' + s(i(null != t ? t.battle1Score : t, t)) + '<span>vs</span>' + s(i(null != t ? t.battle2Score : t, t)) + '</div>\n\t\t\t\t<div class="status_matching"><span>' + s(i(null != t ? t.status : t, t)) + '</span></div>\n\t\t\t\t'
    },
    6: function (e, t, n, a, l) {
      var i
      return ' ' + (null != (i = (n.isBeforeLive || t && t.isBeforeLive || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, {
          name: 'isBeforeLive',
          hash: {},
          fn: e.program(7, l, 0),
          inverse: e.program(9, l, 0),
          data: l
        })) ? i : '') + ' '
    },
    7: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}, o = n.helperMissing, r = 'function', c = e.escapeExpression
      return '\n\t\t\t\t<div class="score">' + c((i = null != (i = n.date || (null != t ? t.date : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'date',
          hash: {},
          data: l
        }) : i)) + '&nbsp;' + c((i = null != (i = n.time || (null != t ? t.time : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'time',
          hash: {},
          data: l
        }) : i)) + '</div>\n\t\t\t\t<div class="status_beforematch"><span>' + c(e.lambda(null != t ? t.status : t, t)) + '</span></div>\n'
    },
    9: function (e, t, n, a, l) {
      var i = e.lambda, s = e.escapeExpression
      return '\t\t\t\t<div class="score">' + s(i(null != t ? t.battle1Score : t, t)) + '<span>vs</span>' + s(i(null != t ? t.battle2Score : t, t)) + '</div>\n\t\t\t\t<div class="status_matching" style="display:none;"><span>\u7b2c' + s(i(null != t ? t.round : t, t)) + '\u8282</span></div>\n\t\t\t\t'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i
      return '<div class="nba_fastview_container_pen nba_single clearfix">\n' + (null != (i = n.each.call(null != t ? t : {}, null != t ? t.data : t, {
          name: 'each', hash: {}, fn: e.program(1, l, 0), inverse: e.noop, data: l
        })) ? i : '') + '</div>'
    },
    useData: !0
  }), t.module_ui_sport_separate_over_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {return '<div class="over">\r\n\t<span>\u5df2\u7ed3\u675f</span>\r\n</div>'},
    useData: !0
  }), t.module_ui_stars_rank_tpl = e({
    1: function (e, t, n, a, l) {return 'target="_blank" '},
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression, u = e.lambda,
        m = '<section class="stars_rank module_ui mocule-item">\r\n    <div class="title_wrap">\r\n        <div class="title">\u5de8\u661f\u52bf\u529b\u699c</div>\r\n        <div class="digest">\u5feb\u6765\u7ed9\u4f60\u7684\u5076\u50cf\u9001\u82b1\u5427</div>\r\n    </div>\r\n    <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (m += i), m + ' href="' + d((s = null != (s = n.rankPageLink || (null != t ? t.rankPageLink : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'rankPageLink',
        hash: {},
        data: l
      }) : s)) + '">\r\n        <div class="rank">\r\n            <div class="rank_1 rank_item">\r\n                <div class="head"><img src="' + d(u(null != (i = null != t ? t.rank_1 : t) ? i.icon : i, t)) + '" alt="' + d(u(null != (i = null != t ? t.rank_1 : t) ? i.name : i, t)) + '"></div>\r\n                <div class="name"><i>' + d(u(null != (i = null != t ? t.rank_1 : t) ? i.name : i, t)) + '</i></div>\r\n                <div class="support"><i>' + d(u(null != (i = null != t ? t.rank_1 : t) ? i.voteCount : i, t)) + '</i><span>\u6735</span></div>\r\n            </div>\r\n            <div class="rank_0 rank_item">\r\n                <div class="head"><img src="' + d(u(null != (i = null != t ? t.rank_0 : t) ? i.icon : i, t)) + '" alt="' + d(u(null != (i = null != t ? t.rank_0 : t) ? i.name : i, t)) + '"></div>\r\n                <div class="name"><i>' + d(u(null != (i = null != t ? t.rank_0 : t) ? i.name : i, t)) + '</i></div>\r\n                <div class="support"><i>' + d(u(null != (i = null != t ? t.rank_0 : t) ? i.voteCount : i, t)) + '</i><span>\u6735</span></div>\r\n            </div>\r\n            <div class="rank_2 rank_item">\r\n                <div class="head"><img src="' + d(u(null != (i = null != t ? t.rank_2 : t) ? i.icon : i, t)) + '" alt="' + d(u(null != (i = null != t ? t.rank_2 : t) ? i.name : i, t)) + '"></div>\r\n                <div class="name"><i>' + d(u(null != (i = null != t ? t.rank_2 : t) ? i.name : i, t)) + '</i></div>\r\n                <div class="support"><i>' + d(u(null != (i = null != t ? t.rank_2 : t) ? i.voteCount : i, t)) + '</i><span>\u6735</span></div>\r\n            </div>\r\n        </div>\r\n    </a>\r\n</section>'
    },
    useData: !0
  }), t.module_ui_subnav_tpl = e({
    1: function (e, t, n, a, l) {return 'target="_blank" '},
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = n.blockHelperMissing,
        u = '<div class="sports_subnav">\r\n    <ul class="sports_subnav_list">\r\n        <li>\r\n            <a href="http://3g.163.com/touch/football_schedule.html?cid=schedule" '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = d.call(t, i, o)), null != i && (u += i), u += '>\r\n                <p class="unit_icon match_event"></p>\r\n                <p class="unit_name">\u8d5b\u4e8b</p>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="http://3g.163.com/touch/sport_sub.html?cid=nba" ', s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = d.call(t, i, o)), null != i && (u += i), u += '>\r\n                <p class="unit_icon nba"></p>\r\n                <p class="unit_name">NBA</p>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="http://3g.163.com/touch/sport_sub.html?cid=isocce" ', s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = d.call(t, i, o)), null != i && (u += i), u += '>\r\n                <p class="unit_icon international_football"></p>\r\n                <p class="unit_name">\u56fd\u9645\u8db3\u7403</p>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="http://3g.163.com/touch/sport_sub.html?cid=csl" ', s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = d.call(t, i, o)), null != i && (u += i), u += '>\r\n                <p class="unit_icon csl"></p>\r\n                <p class="unit_name">\u4e2d\u8d85</p>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="http://3g.163.com/touch/sport_sub.html?cid=cba" ', s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = d.call(t, i, o)), null != i && (u += i), u += '>\r\n                <p class="unit_icon cba"></p>\r\n                <p class="unit_name">CBA</p>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="http://3g.163.com/touch/sport_sub.html?cid=yc" ', s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = d.call(t, i, o)), null != i && (u += i), u += '>\r\n                <p class="unit_icon epl"></p>\r\n                <p class="unit_name">\u82f1\u8d85</p>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="http://3g.163.com/touch/sport_sub.html?cid=xj" ', s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = d.call(t, i, o)), null != i && (u += i), u += '>\r\n                <p class="unit_icon lfp"></p>\r\n                <p class="unit_name">\u897f\u7532</p>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="http://3g.163.com/touch/sport_sub.html?cid=og" ', s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = d.call(t, i, o)), null != i && (u += i), u += '>\r\n                <p class="unit_icon uefa"></p>\r\n                <p class="unit_name">\u6b27\u51a0</p>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="http://3g.163.com/touch/sport_sub.html?cid=dj" ', s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = d.call(t, i, o)), null != i && (u += i), u += '>\r\n                <p class="unit_icon bundesliga"></p>\r\n                <p class="unit_name">\u5fb7\u7532</p>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="http://3g.163.com/touch/sport_sub.html?cid=yj" ', s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = d.call(t, i, o)), null != i && (u += i), u += '>\r\n                <p class="unit_icon serie_a"></p>\r\n                <p class="unit_name">\u610f\u7532</p>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="http://3g.163.com/touch/sport_sub.html?cid=synthesis" ', s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = d.call(t, i, o)), null != i && (u += i), u + '>\r\n                <p class="unit_icon comprehensive"></p>\r\n                <p class="unit_name">\u7efc\u5408</p>\r\n            </a>\r\n        </li>\r\n    </ul>\r\n</div>'
    },
    useData: !0
  }), t.module_ui_tie_focus_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}, o = n.helperMissing, r = 'function', c = e.escapeExpression
      return '<li class="page">\r\n\t<a href="' + c((i = null != (i = n.url || (null != t ? t.url : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'url',
          hash: {},
          data: l
        }) : i)) + '">\r\n\t\t<img class="news-pic" src="' + c((i = null != (i = n.imgsrc || (null != t ? t.imgsrc : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'imgsrc',
          hash: {},
          data: l
        }) : i)) + '" alt="">\r\n\t\t<span class="title">' + c((i = null != (i = n.title || (null != t ? t.title : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'title',
          hash: {},
          data: l
        }) : i)) + '</span>\r\n\t</a>\r\n</li>'
    },
    useData: !0
  }), t.module_ui_tie_frame_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}, o = n.helperMissing, r = 'function', c = e.escapeExpression
      return '<div class="tie-container">\r\n\t<section class="tieslide">\r\n\t\t<ul class="slides">\r\n\t\t\t\r\n\t\t</ul>\r\n\t\t<ul class="ctrls">\r\n\t\t\t<li class="on"></li>\r\n\t\t\t<li></li>\r\n\t\t\t<li></li>\r\n\t\t\t<li></li>\r\n\t\t</ul>\r\n\t</section>\r\n\t<section class="tie-special clearfix">\r\n\t\t<a class="spec scheme" href="' + c((i = null != (i = n.schemeURL || (null != t ? t.schemeURL : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'schemeURL',
          hash: {},
          data: l
        }) : i)) + '">\r\n\t\t\t<div class="icon"></div>\r\n\t\t\t<div class="title">\u8ddf\u8d34\u7b56\u5212</div>\r\n\t\t</a>\r\n\t\t<a class="spec rank" href="' + c((i = null != (i = n.rankURL || (null != t ? t.rankURL : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'rankURL',
          hash: {},
          data: l
        }) : i)) + '">\r\n\t\t\t<div class="icon"></div>\r\n\t\t\t<div class="title">\u4eca\u65e5\u6392\u884c</div>\r\n\t\t</a>\r\n\t</section>\r\n\t<section class="tie-infoflow">\r\n\t\t\r\n\t</section>\r\n</div>'
    },
    useData: !0
  }), t.module_ui_tie_fullfloor_tpl = e({
    compiler: [7, '>= 4.0.0'], main: function (e, t, n, a, l) {
      var i
      return null != (i = e.invokePartial(a.tie_floor, t, {
        name: 'tie_floor',
        hash: {floor: null != t ? t.floor : t},
        data: l,
        helpers: n,
        partials: a,
        decorators: e.decorators
      })) ? i : ''
    }, usePartial: !0, useData: !0
  }), t.module_ui_tie_list_item_tpl = e({
    1: function (e, t, n, a, l) {
      var i
      return '<div class="commentList">' + (null != (i = e.invokePartial(a.tie_floor, t, {
          name: 'tie_floor',
          hash: {floor: null != t ? t.floors : t},
          data: l,
          helpers: n,
          partials: a,
          decorators: e.decorators
        })) ? i : '') + '</div>'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s, o = null != t ? t : {}, r = n.helperMissing, c = 'function', h = e.escapeExpression
      return '<div class="tie-item">\r\n\t<div class="item-wrap" data-href="http://3g.163.com/touch/comment.html?docid=' + h((s = null != (s = n.originDocId || (null != t ? t.originDocId : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'originDocId',
          hash: {},
          data: l
        }) : s)) + '&board=' + h((s = null != (s = n.board || (null != t ? t.board : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'board',
          hash: {},
          data: l
        }) : s)) + '&title=' + h((n.encodeURI || t && t.encodeURI || r).call(o, null != t ? t.originTitle : t, {
          name: 'encodeURI',
          hash: {},
          data: l
        })) + '&from=channel_tie&commentId=' + h((s = null != (s = n.commentId || (null != t ? t.commentId : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'commentId',
          hash: {},
          data: l
        }) : s)) + '">\r\n\t\t<div class="share" data-title="' + h((s = null != (s = n.originTitle || (null != t ? t.originTitle : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'originTitle',
          hash: {},
          data: l
        }) : s)) + '" data-summary="' + h((s = null != (s = n.content || (null != t ? t.content : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'content',
          hash: {},
          data: l
        }) : s)) + '" data-url="http://3g.163.com/touch/comment.html?docid=' + h((s = null != (s = n.originDocId || (null != t ? t.originDocId : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'originDocId',
          hash: {},
          data: l
        }) : s)) + '&board=' + h((s = null != (s = n.board || (null != t ? t.board : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'board',
          hash: {},
          data: l
        }) : s)) + '&title=' + h((n.encodeURI || t && t.encodeURI || r).call(o, null != t ? t.originTitle : t, {
          name: 'encodeURI',
          hash: {},
          data: l
        })) + '&from=channel_tie"></div>\r\n\t\t<div class="origin-title">\r\n\t\t\t<a class="title" href="' + h((n.tieUrl || t && t.tieUrl || r).call(o, null != t ? t.originDocId : t, null != t ? t.originUrl : t, {
          name: 'tieUrl',
          hash: {},
          data: l
        })) + '">' + h((s = null != (s = n.originTitle || (null != t ? t.originTitle : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'originTitle',
          hash: {},
          data: l
        }) : s)) + '</a>\r\n\t\t</div>\r\n\t\t<div class="user">\r\n\t\t\t<span class="nickname">' + h((s = null != (s = n.nickname || (null != t ? t.nickname : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'nickname',
          hash: {},
          data: l
        }) : s)) + '</span>\r\n\t\t\t<span class="location">[\u7f51\u6613' + h((s = null != (s = n.location || (null != t ? t.location : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'location',
          hash: {},
          data: l
        }) : s)) + '\u624b\u673a\u7f51\u53cb]</span>\r\n\t\t</div>\r\n\t\t' + (null != (i = n['if'].call(o, null != t ? t.floors : t, {
          name: 'if',
          hash: {},
          fn: e.program(1, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + '\r\n\t\t<div class="tie">' + (null != (s = null != (s = n.content || (null != t ? t.content : t)) ? s : r, i = typeof s === c ? s.call(o, {
          name: 'content',
          hash: {},
          data: l
        }) : s) ? i : '') + '</div>\r\n\t\t<div class="share-icon"></div>\r\n\t</div>\r\n</div>\r\n'
    },
    usePartial: !0,
    useData: !0
  }), t.openList_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}, o = n.helperMissing, r = 'function', c = e.escapeExpression
      return '<section class="o_article js-shareinfo">\r\n    <a href="' + c((i = null != (i = n.link || (null != t ? t.link : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'link',
          hash: {},
          data: l
        }) : i)) + '?plid=' + c((i = null != (i = n.plid || (null != t ? t.plid : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'plid',
          hash: {},
          data: l
        }) : i)) + '&rid=' + c((i = null != (i = n.rid || (null != t ? t.rid : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'rid',
          hash: {},
          data: l
        }) : i)) + '">\r\n        <div class="o_article_img">\r\n            <img src="' + c((i = null != (i = n.picUrl || (null != t ? t.picUrl : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'picUrl',
          hash: {},
          data: l
        }) : i)) + '" alt="" />\r\n            <div class="o_article_length">\r\n                <span class="o_article_length_icon"></span>\r\n                <span class="o_article_length_value">' + c((i = null != (i = n.quantity || (null != t ? t.quantity : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'quantity',
          hash: {},
          data: l
        }) : i)) + '</span>\r\n            </div>\r\n        </div>\r\n    </a>\r\n    <div class="o_article_info">\r\n        <div class="o_article_infot">\r\n            <span class="o_article_tag" style="background:' + c((i = null != (i = n.tagBgColor || (null != t ? t.tagBgColor : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'tagBgColor',
          hash: {},
          data: l
        }) : i)) + '">' + c((i = null != (i = n.courseType || (null != t ? t.courseType : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'courseType',
          hash: {},
          data: l
        }) : i)) + '</span>\r\n            <span class="o_article_time">' + c((n.date_format || t && t.date_format || o).call(s, null != t ? t.dbCreateTime : t, {
          name: 'date_format',
          hash: {},
          data: l
        })) + '</span>\r\n        </div>\r\n        <a href="' + c((i = null != (i = n.link || (null != t ? t.link : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'link',
          hash: {},
          data: l
        }) : i)) + '?plid=' + c((i = null != (i = n.plid || (null != t ? t.plid : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'plid',
          hash: {},
          data: l
        }) : i)) + '&rid=' + c((i = null != (i = n.rid || (null != t ? t.rid : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'rid',
          hash: {},
          data: l
        }) : i)) + '">\r\n            <div class="o_article_title">\r\n                <span>' + c((i = null != (i = n.title || (null != t ? t.title : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'title',
          hash: {},
          data: l
        }) : i)) + '</span>\r\n            </div>\r\n            <div class="o_article_desc">\r\n                <span>' + c((i = null != (i = n.description || (null != t ? t.description : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'description',
          hash: {},
          data: l
        }) : i)) + '</span>\r\n            </div>\r\n        </a>\r\n        <div class="o_article_infob clearfix">\r\n            <span class="o_article_playtimes">' + c((n.fixThousands || t && t.fixThousands || o).call(s, null != t ? t.viewcount : t, {
          name: 'fixThousands',
          hash: {},
          data: l
        })) + '</span>\u4eba\u89c2\u770b\r\n            <span class="o_share_btn js-sharebtn" data-title=' + c((i = null != (i = n.title || (null != t ? t.title : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'title',
          hash: {},
          data: l
        }) : i)) + ' data-digest=' + c((i = null != (i = n.description || (null != t ? t.description : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'description',
          hash: {},
          data: l
        }) : i)) + ' data-img=' + c((i = null != (i = n.picUrl || (null != t ? t.picUrl : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'picUrl',
          hash: {},
          data: l
        }) : i)) + ' data-link=' + c((i = null != (i = n.link || (null != t ? t.link : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'link',
          hash: {},
          data: l
        }) : i)) + '?plid=' + c((i = null != (i = n.plid || (null != t ? t.plid : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'plid',
          hash: {},
          data: l
        }) : i)) + '&rid=' + c((i = null != (i = n.rid || (null != t ? t.rid : t)) ? i : o, typeof i === r ? i.call(s, {
          name: 'rid',
          hash: {},
          data: l
        }) : i)) + '></span>\r\n        </div>\r\n    </div>\r\n</section>'
    },
    useData: !0
  }), t.red_packet_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {return '<div class="red_packet">\r\n\r\n</div>'},
    useData: !0
  }), t.single_text_tpl = e({
    1: function (e, t, n, a, l) {return 'target="_blank"'},
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression,
        u = '<section class="single_text_wrap">\r\n    <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="' + d((s = null != (s = n.link || (null != t ? t.link : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'link',
        hash: {},
        data: l
      }) : s)) + '"><p class="single_text">' + d((s = null != (s = n.title || (null != t ? t.title : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'title',
        hash: {},
        data: l
      }) : s)) + '</p></a>\r\n</section>'
    },
    useData: !0
  }), t.video_all_doc_tpl = e({
    1: function (e, t, n, a, l) {return 'target="_blank" '},
    3: function (e, t, n, a, l) {
      var i
      return '<span class="v-tie">' + e.escapeExpression(e.lambda(null != (i = null != t ? t.comment : t) ? i.rcount : i, t)) + '</span>'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression,
        u = '<section class="video-item">\r\n    <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="http://3g.163.com/v/video/' + d((s = null != (s = n.vid || (null != t ? t.vid : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'vid',
        hash: {},
        data: l
      }) : s)) + '.html">\r\n        <div class="v-poster">\r\n            <img src="' + d((s = null != (s = n.img || (null != t ? t.img : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'img',
        hash: {},
        data: l
      }) : s)) + '">\r\n        </div>\r\n        <div class="v-mask">\r\n            <div class="v-head">\r\n                <div class="v-play"></div>\r\n                <div class="v-title">' + (null != (s = null != (s = n.title || (null != t ? t.title : t)) ? s : c, i = typeof s === h ? s.call(r, {
        name: 'title',
        hash: {},
        data: l
      }) : s) ? i : '') + '</div>\r\n            </div>\r\n            <div class="v-detail">\r\n                <span class="v-source">' + d((s = null != (s = n.sname || (null != t ? t.sname : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'sname',
        hash: {},
        data: l
      }) : s)) + '</span> ' + (null != (i = n['if'].call(r, null != (i = null != t ? t.comment : t) ? i.rcount : i, {
        name: 'if',
        hash: {},
        fn: e.program(3, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + '\r\n                <span class="v-time">' + d((n.videoLength || t && t.videoLength || c).call(r, null != t ? t.playlength : t, {
        name: 'videoLength',
        hash: {},
        data: l
      })) + '</span>\r\n            </div>\r\n        </div>\r\n    </a>\r\n</section>'
    },
    useData: !0
  }), t.video_doc_tpl = e({
    1: function (e, t, n, a, l) {return 'target="_blank" '},
    3: function (e, t, n, a, l) {
      var i
      return '<span class="v-tie">' + e.escapeExpression((i = null != (i = n.replyCount || (null != t ? t.replyCount : t)) ? i : n.helperMissing, 'function' == typeof i ? i.call(null != t ? t : {}, {
          name: 'replyCount',
          hash: {},
          data: l
        }) : i)) + '</span>'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i, s, o, r = null != t ? t : {}, c = n.helperMissing, h = 'function', d = e.escapeExpression,
        u = '<section class="video-item">\r\n    <a '
      return s = null != (s = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? s : c, o = {
        name: 'notIosSafari',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      }, i = typeof s === h ? s.call(r, o) : s, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, o)), null != i && (u += i), u + ' href="http://3g.163.com/v/video/' + d((s = null != (s = n.vid || (null != t ? t.vid : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'vid',
        hash: {},
        data: l
      }) : s)) + '.html">\r\n        <div class="v-poster">\r\n            <img src="' + d((s = null != (s = n.cover || (null != t ? t.cover : t)) ? s : c, typeof s === h ? s.call(r, {
        name: 'cover',
        hash: {},
        data: l
      }) : s)) + '">\r\n        </div>\r\n        <div class="v-mask">\r\n            <div class="v-head">\r\n                <div class="v-play"></div>\r\n                <div class="v-title">' + (null != (s = null != (s = n.title || (null != t ? t.title : t)) ? s : c, i = typeof s === h ? s.call(r, {
        name: 'title',
        hash: {},
        data: l
      }) : s) ? i : '') + '</div>\r\n            </div>\r\n            <div class="v-detail">\r\n                <span class="v-source">' + d(e.lambda(null != (i = null != t ? t.videoTopic : t) ? i.tname : i, t)) + '</span>\r\n                ' + (null != (i = n['if'].call(r, null != t ? t.replyCount : t, {
        name: 'if',
        hash: {},
        fn: e.program(3, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : '') + '\r\n                <span class="v-time">' + d((n.videoLength || t && t.videoLength || c).call(r, null != t ? t.length : t, {
        name: 'videoLength',
        hash: {},
        data: l
      })) + '</span>\r\n            </div>\r\n        </div>\r\n    </a>\r\n</section>'
    },
    useData: !0
  }), t.weixinshare_tpl = e({
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {return '<div class="weixin_share_show"></div>'},
    useData: !0
  })
}(), function () {
  var e = Handlebars.template
  Handlebars.templates = Handlebars.templates || {}
  Handlebars.partials.tie_floor = e({
    1: function (e, t, n, a, l) {
      var i, s = null != t ? t : {}
      return '<div class="floor">\r\n\t' + (null != (i = n['if'].call(s, null != (i = null != t ? t.floor : t) ? i.next : i, {
          name: 'if',
          hash: {},
          fn: e.program(2, l, 0),
          inverse: e.noop,
          data: l
        })) ? i : '') + '\r\n' + (null != (i = n['if'].call(s, null != (i = null != t ? t.floor : t) ? i.foldControl : i, {
          name: 'if',
          hash: {},
          fn: e.program(4, l, 0),
          inverse: e.program(6, l, 0),
          data: l
        })) ? i : '') + '</div>\r\n'
    },
    2: function (e, t, n, a, l) {
      var i
      return ' ' + (null != (i = e.invokePartial(a.tie_floor, t, {
          name: 'tie_floor',
          hash: {floor: null != (i = null != t ? t.floor : t) ? i.next : i},
          data: l,
          helpers: n,
          partials: a,
          decorators: e.decorators
        })) ? i : '') + ' '
    },
    4: function (e, t, n, a, l) {
      var i, s = e.lambda, o = e.escapeExpression
      return '\t<span class="unfold" data-commentid="' + o(s(null != (i = null != t ? t.floor : t) ? i.commentId : i, t)) + '" data-docid="' + o(s(null != (i = null != t ? t.floor : t) ? i.docId : i, t)) + '">\u70b9\u51fb\u663e\u793a\u9690\u85cf\u697c\u5c42</span>\r\n'
    },
    6: function (e, t, n, a, l) {
      var i, s, o = null != t ? t : {}, r = n.helperMissing, c = 'function', h = e.escapeExpression, d = e.lambda
      return '\t<span class="fl-l floor-num" data-firstFloor="' + h((s = null != (s = n.firstFloor || (null != t ? t.firstFloor : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'firstFloor',
          hash: {},
          data: l
        }) : s)) + '">' + h(d(null != (i = null != t ? t.floor : t) ? i.floorNum : i, t)) + '</span>\r\n\t<section class="inner-wrap">\r\n\t\t<p class="tie-head clearfix" data-commentid="' + h((s = null != (s = n.commentId || (null != t ? t.commentId : t)) ? s : r, typeof s === c ? s.call(o, {
          name: 'commentId',
          hash: {},
          data: l
        }) : s)) + '">\r\n\t\t\t<span class="fl-l author97 author">\u7f51\u6613' + h(d(null != (i = null != (i = null != t ? t.floor : t) ? i.user : i) ? i.location : i, t)) + '\u7f51\u53cb ' + h(d(null != (i = null != (i = null != t ? t.floor : t) ? i.user : i) ? i.nickname : i, t)) + '</span>\r\n\t\t\t<span class="fl-r vote">' + h(d(null != (i = null != t ? t.floor : t) ? i.vote : i, t)) + '</span>\r\n\t\t</p>\r\n\t\t<p class="content">' + h(d(null != (i = null != t ? t.floor : t) ? i.content : i, t)) + '</p>\r\n\t</section>\r\n'
    },
    compiler: [7, '>= 4.0.0'],
    main: function (e, t, n, a, l) {
      var i
      return null != (i = n['if'].call(null != t ? t : {}, null != t ? t.floor : t, {
        name: 'if',
        hash: {},
        fn: e.program(1, l, 0),
        inverse: e.noop,
        data: l
      })) ? i : ''
    },
    usePartial: !0,
    useData: !0
  })
}(), function (e, t) {
  function n (e) {
    for (var n = e || i, a = 0; a < n.length; a++) {
      var s = n[a], o = {}
      if ('local' === s.term && l.spLocalStorage()) {
        var r = JSON.parse(l.storageLocalVal({key: 'local_info'}))
        s.name = r ? r.selectCity ? r.selectCity.gcity : r.lastCity ? r.lastCity.cityPname ? r.lastCity.cityPname : '\u672c\u5730' : s.name : s.name
      }
      if (o.channelId = s.data.channelId, o.haschild = !1, o.ADpath = s.path, d.state(s.route, h), s.childroute.length > 0) {
        o.haschild = !0
        for (var c = 0; c < s.childroute.length; c++)d.state(s.childroute[c].route, h)
      }
      t.DP.routereg(s), t.channelName[s.route] = o, t.channelPath[s.route] = s.path
    }
    t.channelMap = n
  }

  var a = t.tools, l = (t.Nav, t.indexTools), i = [{
    route: ':firstname(' + t.routename + 'all)',
    term: 'all',
    name: '\u63a8\u8350',
    path: 'https://3g.163.com/wap/special/0040ad/wap_papa_sy.js',
    display: -1,
    data: {
      channelId: 'tuijian',
      channel: 'tuijian',
      name: '\u63a8\u8350',
      articleList: {topicid: 'BA8J7DG9wangning', topdataPriority: 100}
    },
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'news)',
    term: 'news',
    name: '\u65b0\u95fb',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_news.js',
    display: -1,
    data: {channelId: '0001'},
    childroute: [{
      route: ':firstname(' + t.routename + 'news)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_news.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'news)/subchannel/:secondname(society)',
      name: '\u793e\u4f1a',
      path: '',
      term: 'society'
    }, {
      route: ':firstname(' + t.routename + 'news)/subchannel/:secondname(domestic)',
      name: '\u56fd\u5185',
      path: '',
      term: 'domestic'
    }, {
      route: ':firstname(' + t.routename + 'news)/subchannel/:secondname(international)',
      name: '\u56fd\u9645',
      path: '',
      term: 'international'
    }, {
      route: ':firstname(' + t.routename + 'news)/subchannel/:secondname(history)',
      name: '\u5386\u53f2',
      path: '',
      term: 'history'
    }]
  }, {
    route: ':firstname(' + t.routename + 'ent)',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_ent.js',
    display: -1,
    term: 'ent',
    name: '\u5a31\u4e50',
    data: {channelId: '0003'},
    childroute: [{
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_ent.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(television)',
      name: '\u7535\u89c6',
      path: '',
      term: 'television'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(movie)',
      name: '\u7535\u5f71',
      path: '',
      term: 'movie'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(star)',
      name: '\u660e\u661f',
      path: '',
      term: 'star'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(music)',
      name: '\u97f3\u4e50',
      path: '',
      term: 'music'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(entevent)',
      name: '\u5f71\u89c6\u6b4c',
      path: '',
      term: 'entevent'
    }]
  }, {
    route: ':firstname(' + t.routename + 'sports)',
    term: 'sports',
    name: '\u4f53\u80b2',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_sports.js',
    display: -1,
    data: {channelId: '0005'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'photo)',
    term: 'photo',
    name: '\u56fe\u7247',
    path: '',
    display: -1,
    data: {channelId: '0030'},
    childroute: [{
      route: ':firstname(' + t.routename + 'photo)/subchannel/:secondname(all)',
      name: '\u70ed\u70b9',
      path: '',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'photo)/subchannel/:secondname(news)',
      name: '\u65b0\u95fb',
      path: '',
      term: 'news'
    }, {
      route: ':firstname(' + t.routename + 'photo)/subchannel/:secondname(star)',
      name: '\u660e\u661f',
      path: '',
      term: 'star'
    }, {
      route: ':firstname(' + t.routename + 'photo)/subchannel/:secondname(sports)',
      name: '\u4f53\u575b',
      path: '',
      term: 'sports'
    }, {
      route: ':firstname(' + t.routename + 'photo)/subchannel/:secondname(beauty)',
      name: '\u7f8e\u56fe',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tupian.js',
      term: 'beauty'
    }]
  }, {
    route: ':firstname(' + t.routename + 'money)',
    term: 'money',
    name: '\u8d22\u7ecf',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_money.js',
    display: -1,
    data: {channelId: '0025'},
    childroute: [{
      route: ':firstname(' + t.routename + 'money)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_money.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'money)/subchannel/:secondname(shares)',
      name: '\u80a1\u7968',
      path: '',
      term: 'shares'
    }, {
      route: ':firstname(' + t.routename + 'money)/subchannel/:secondname(fund)',
      name: '\u57fa\u91d1',
      path: '',
      term: 'fund'
    }, {
      route: ':firstname(' + t.routename + 'money)/subchannel/:secondname(commercial)',
      name: '\u5546\u4e1a',
      path: '',
      term: 'commercial'
    }]
  }, {
    route: ':firstname(' + t.routename + 'auto)',
    term: 'auto',
    name: '\u6c7d\u8f66',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_auto.js',
    display: -1,
    data: {channelId: '0008'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'war)',
    name: '\u519b\u4e8b',
    term: 'war',
    path: '',
    display: -1,
    data: {channelId: 'war'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'liveshow)',
    term: 'liveshow',
    name: '\u76f4\u64ad',
    path: '',
    display: -1,
    data: {channelId: 'liveshow'},
    childroute: [{
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(all)',
      name: '\u76f4\u64ad',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_live.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(future)',
      name: '\u9884\u544a',
      path: '',
      term: 'future'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(3sc)',
      name: 'TOP100',
      path: '',
      term: '3sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(4sc)',
      name: '\u5927\u76f4\u64ad',
      path: '',
      term: '4sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(5sc)',
      name: '\u5728\u73b0\u573a',
      path: '',
      term: '5sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(6sc)',
      name: '\u661f\u5728\u7ebf',
      path: '',
      term: '6sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(7sc)',
      name: '\u7eb5\u6a2a\u8c08',
      path: '',
      term: '7sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(8sc)',
      name: '\u8d44\u8baf',
      path: '',
      term: '8sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(9sc)',
      name: '\u5a31\u4e50',
      path: '',
      term: '9sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(10sc)',
      name: '\u672c\u5730',
      path: '',
      term: '10sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(11sc)',
      name: '\u4f53\u80b2',
      path: '',
      term: '11sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(12sc)',
      name: '\u65f6\u5c1a',
      path: '',
      term: '12sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(13sc)',
      name: '\u6c7d\u8f66',
      path: '',
      term: '13sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(14sc)',
      name: '\u79d1\u6280',
      path: '',
      term: '14sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(15sc)',
      name: '\u8d22\u7ecf',
      path: '',
      term: '15sc'
    }, {
      route: ':firstname(' + t.routename + 'liveshow)/subchannel/:secondname(16sc)',
      name: '\u751f\u6d3b',
      path: '',
      term: '16sc'
    }]
  }, {
    route: ':firstname(' + t.routename + 'video)',
    term: 'video',
    name: '\u89c6\u9891',
    path: '',
    display: -1,
    data: {channelId: '0025'},
    childroute: [{
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(all)',
      name: '\u63a8\u8350',
      path: '',
      term: 'all',
      data: {channelId: 'VATL2LQO4'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(amuse)',
      name: '\u641e\u7b11',
      path: '',
      term: 'amuse',
      data: {channelId: 'VAP4BFE3U'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(beauty)',
      name: '\u7f8e\u5973',
      path: '',
      term: 'beauty',
      data: {channelId: 'VAP4BG6DL'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(newscene)',
      name: '\u65b0\u95fb\u73b0\u573a',
      path: '',
      term: 'newscene',
      data: {channelId: 'VAV3H6JSN'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(BoBo)',
      name: 'BoBo',
      path: '',
      term: 'BoBo',
      data: {channelId: 'VBK3JKUIF'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(moe)',
      name: '\u840c\u7269',
      path: '',
      term: 'moe',
      data: {channelId: 'VAP4BFR16'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(goosip)',
      name: '\u516b\u5366',
      path: '',
      term: 'goosip',
      data: {channelId: 'VBF8EUDUS'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(novelty)',
      name: '\u730e\u5947',
      path: '',
      term: 'novelty',
      data: {channelId: 'VBF8ET3S2'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(sports)',
      name: '\u4f53\u80b2',
      path: '',
      term: 'sports',
      data: {channelId: 'VBF8F2E94'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(blacktech)',
      name: '\u9ed1\u79d1\u6280',
      path: '',
      term: 'blacktech',
      data: {channelId: 'VBF8F2PKF'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(knowladge)',
      name: '\u6da8\u59ff\u52bf',
      path: '',
      term: 'knowladge',
      data: {channelId: 'VBF8F3SGL'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(acgn)',
      name: '\u4e8c\u6b21\u5143',
      path: '',
      term: 'acgn',
      data: {channelId: 'VBF8F1PSA'}
    }, {
      route: ':firstname(' + t.routename + 'video)/subchannel/:secondname(equip)',
      name: '\u519b\u6b66',
      path: '',
      term: 'equip',
      data: {channelId: 'VBF8F3301'}
    }]
  }, {
    route: ':firstname(' + t.routename + 'joke)',
    name: '\u6bb5\u5b50',
    term: 'joke',
    path: '',
    display: -1,
    data: {channelId: 'joke'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'lady)',
    term: 'lady',
    name: '\u65f6\u5c1a',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_lady.js',
    display: -1,
    data: {channelId: '0026'},
    childroute: [{
      route: ':firstname(' + t.routename + 'lady)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_lady.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'lady)/subchannel/:secondname(love)',
      name: '\u60c5\u7231',
      path: '',
      term: 'love'
    }]
  }, {
    route: ':firstname(' + t.routename + 'local)',
    term: 'local',
    name: '\u672c\u5730',
    path: '',
    display: -1,
    data: {channelId: 'local'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'dy)',
    term: 'dy',
    display: -1,
    name: '\u7f51\u6613\u53f7',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_ydingyue.js',
    data: {channelId: 'dy'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'mobile)',
    term: 'mobile',
    name: '\u624b\u673a',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tech.js',
    display: -1,
    data: {channelId: '0011'},
    childroute: [{
      route: ':firstname(' + t.routename + 'mobile)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tech.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'mobile)/subchannel/:secondname(android)',
      name: '\u5b89\u5353',
      path: '',
      term: 'android'
    }, {
      route: ':firstname(' + t.routename + 'mobile)/subchannel/:secondname(ios)',
      name: '\u82f9\u679c',
      path: '',
      term: 'ios'
    }, {
      route: ':firstname(' + t.routename + 'mobile)/subchannel/:secondname(buy)',
      name: '\u8d2d\u673a',
      path: '',
      term: 'buy'
    }]
  }, {
    route: ':firstname(' + t.routename + 'open)',
    term: 'open',
    name: '\u516c\u5f00\u8bfe',
    path: '',
    display: -1,
    data: {channelId: 'open'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'tech)',
    term: 'tech',
    name: '\u79d1\u6280',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tech.js',
    display: -1,
    data: {channelId: '0009'},
    childroute: [{
      route: ':firstname(' + t.routename + 'tech)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tech.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'tech)/subchannel/:secondname(vr)',
      name: 'VR\u8fdb\u5316\u8bba',
      path: '',
      term: 'vr'
    }, {
      route: ':firstname(' + t.routename + 'tech)/subchannel/:secondname(nejudge)',
      name: '\u6613\u8bc4',
      path: '',
      term: 'nejudge'
    }]
  }, {
    route: ':firstname(' + t.routename + 'tie)',
    term: 'tie',
    name: '\u8ddf\u8d34',
    path: '',
    display: -1,
    data: {channelId: 'tie'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'game)',
    term: 'game',
    name: '\u6e38\u620f',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_game.js',
    display: -1,
    data: {channelId: '0031'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'digi)',
    term: 'digi',
    name: '\u6570\u7801',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tech.js',
    display: -1,
    data: {channelId: '0016'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'edu)',
    term: 'edu',
    name: '\u6559\u80b2',
    path: '',
    display: -1,
    data: {channelId: '0029'},
    childroute: [{
      route: ':firstname(' + t.routename + 'edu)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: '',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'edu)/subchannel/:secondname(aboard)',
      name: '\u7559\u5b66',
      path: '',
      term: 'aboard'
    }, {
      route: ':firstname(' + t.routename + 'edu)/subchannel/:secondname(migrant)',
      name: '\u79fb\u6c11',
      path: '',
      term: 'migrant'
    }, {
      route: ':firstname(' + t.routename + 'edu)/subchannel/:secondname(foreign)',
      name: '\u5916\u8bed',
      path: '',
      term: 'foreign'
    }]
  }, {
    route: ':firstname(' + t.routename + 'jiankang)',
    term: 'jiankang',
    name: '\u5065\u5eb7',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_jiankang.js',
    display: -1,
    data: {channelId: '0038'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'exclusive)',
    term: 'exclusive',
    name: '\u72ec\u5bb6',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_yuanchuang.js',
    display: -1,
    data: {channelId: '0004'},
    childroute: [{
      route: ':firstname(' + t.routename + 'exclusive)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_yuanchuang.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'exclusive)/subchannel/:secondname(qsyk)',
      name: '\u8f7b\u677e\u4e00\u523b',
      path: '',
      term: 'qsyk'
    }, {
      route: ':firstname(' + t.routename + 'exclusive)/subchannel/:secondname(cz)',
      name: '\u69fd\u503c',
      path: '',
      term: 'cz'
    }, {
      route: ':firstname(' + t.routename + 'exclusive)/subchannel/:secondname(zj)',
      name: '\u6742\u5bb6',
      path: '',
      term: 'zj'
    }, {
      route: ':firstname(' + t.routename + 'exclusive)/subchannel/:secondname(ssyg)',
      name: '\u4e09\u4e09\u6709\u6897',
      path: '',
      term: 'ssyg'
    }, {
      route: ':firstname(' + t.routename + 'exclusive)/subchannel/:secondname(lc)',
      name: '\u6d6a\u6f6e',
      path: '',
      term: 'lc'
    }, {
      route: ':firstname(' + t.routename + 'exclusive)/subchannel/:secondname(rj)',
      name: '\u4eba\u95f4',
      path: '',
      term: 'rj'
    }, {
      route: ':firstname(' + t.routename + 'exclusive)/subchannel/:secondname(dgxm)',
      name: '\u5927\u56fd\u5c0f\u6c11',
      path: '',
      term: 'dgxm'
    }, {
      route: ':firstname(' + t.routename + 'exclusive)/subchannel/:secondname(todayvoice)',
      name: '\u4eca\u65e5\u4e4b\u58f0',
      path: '',
      term: 'todayvoice'
    }, {
      route: ':firstname(' + t.routename + 'exclusive)/subchannel/:secondname(dada)',
      name: '\u54d2\u54d2',
      path: '',
      term: 'dada'
    }]
  }, {
    route: ':firstname(' + t.routename + 'air)',
    term: 'air',
    name: '\u822a\u7a7a',
    path: '',
    display: -1,
    data: {channelId: 'air'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'travel)',
    term: 'travel',
    name: '\u65c5\u6e38',
    path: '',
    display: -1,
    data: {channelId: '0006'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'baby)',
    term: 'baby',
    name: '\u4eb2\u5b50',
    path: '',
    display: -1,
    data: {channelId: '0036'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'art)',
    term: 'art',
    name: '\u827a\u672f',
    path: '',
    display: -1,
    data: {channelId: 'art'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'blog)',
    term: 'blog',
    name: '\u535a\u5ba2',
    path: '',
    display: -1,
    data: {channelId: 'blog'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'jiu)',
    term: 'jiu',
    name: '\u9152\u9999',
    path: '',
    display: -1,
    data: {channelId: '0082'},
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'caipiao)',
    term: 'caipiao',
    name: '\u5f69\u7968',
    path: '',
    display: -1,
    data: {channelId: 'caipiao'},
    childroute: [{
      route: ':firstname(' + t.routename + 'caipiao)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: '',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'caipiao)/subchannel/:secondname(news)',
      name: '\u5f69\u5e02\u65b0\u95fb',
      path: '',
      term: 'news'
    }, {
      route: ':firstname(' + t.routename + 'caipiao)/subchannel/:secondname(ssq)',
      name: '\u53cc\u8272\u7403',
      path: '',
      term: 'ssq'
    }, {
      route: ':firstname(' + t.routename + 'caipiao)/subchannel/:secondname(dlt)',
      name: '\u5927\u4e50\u900f',
      path: '',
      term: 'dlt'
    }, {
      route: ':firstname(' + t.routename + 'caipiao)/subchannel/:secondname(jczq)',
      name: '\u8db3\u5f69',
      path: '',
      term: 'jczq'
    }]
  }, {
    route: 'http://3g.163.com/touch/idol?from=index3g',
    path: '',
    term: 'link_idol',
    name: '\u661f\u95fb',
    display: -1,
    data: {channelId: 'lovelive'},
    childroute: []
  }, {
    route: 'http://house.3g.163.com',
    term: 'link_house',
    name: '\u623f\u4ea7',
    path: '',
    display: -1,
    data: {channelId: ''},
    childroute: []
  }, {
    route: 'http://home.3g.163.com',
    term: 'link_home',
    name: '\u5bb6\u5c45',
    path: '',
    display: -1,
    data: {channelId: ''},
    childroute: []
  }, {
    route: 'http://yuedu.3g.163.com/?_tdchannel=6Xtomdolp&_tdcid=qtiomfvgx',
    term: 'link_yuedu',
    name: '\u5c0f\u8bf4',
    path: '',
    display: -1,
    data: {channelId: ''},
    childroute: []
  }, {
    route: 'http://manhua.3g.163.com',
    term: 'link_comic',
    name: '\u6f2b\u753b',
    path: '',
    display: -1,
    data: {channelId: ''},
    childroute: []
  }, {
    route: 'http://m.bobo.com/?m=h5_wy01&from=3gwap',
    term: 'link_bobo',
    name: 'BoBo',
    path: '',
    display: -1,
    data: {channelId: ''},
    childroute: []
  }, {
    route: 'http://3g.163.com/touch/navigation/',
    term: 'link_navall',
    name: '\u66f4\u591a',
    display: 0,
    path: '',
    data: {},
    childroute: []
  }], s = [{
    route: ':firstname(' + t.routename + 'all)',
    term: 'all',
    name: '\u63a8\u8350',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_sy.js',
    display: -1,
    data: {
      channelId: 'tuijian',
      channel: 'tuijian',
      name: '\u63a8\u8350',
      articleList: {topicid: 'BA8J7DG9wangning', topdataPriority: 100}
    },
    childroute: []
  }, {
    route: ':firstname(' + t.routename + 'news)',
    term: 'news',
    name: '\u65b0\u95fb',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_news.js',
    display: -1,
    data: {channelId: '0001'},
    childroute: [{
      route: ':firstname(' + t.routename + 'news)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_news.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'news)/subchannel/:secondname(discovery)',
      name: '\u63a2\u7d22',
      path: '',
      term: 'discovery'
    }, {
      route: ':firstname(' + t.routename + 'news)/subchannel/:secondname(society)',
      name: '\u793e\u4f1a',
      path: '',
      term: 'society'
    }, {
      route: ':firstname(' + t.routename + 'news)/subchannel/:secondname(domestic)',
      name: '\u56fd\u5185',
      path: '',
      term: 'domestic'
    }, {
      route: ':firstname(' + t.routename + 'news)/subchannel/:secondname(international)',
      name: '\u56fd\u9645',
      path: '',
      term: 'international'
    }]
  }, {
    route: ':firstname(' + t.routename + 'ent)',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_ent.js',
    term: 'ent',
    name: '\u5a31\u4e50',
    display: -1,
    data: {channelId: '0003'},
    childroute: [{
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_ent.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(television)',
      name: '\u7535\u89c6',
      path: '',
      term: 'television'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(movie)',
      name: '\u7535\u5f71',
      path: '',
      term: 'movie'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(star)',
      name: '\u660e\u661f',
      path: '',
      term: 'star'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(music)',
      name: '\u97f3\u4e50',
      path: '',
      term: 'music'
    }]
  }, {
    route: ':firstname(' + t.routename + 'sports)',
    term: 'sports',
    name: '\u4f53\u80b2',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_sports.js',
    display: -1,
    data: {channelId: '0005'},
    childroute: [{
      route: ':firstname(' + t.routename + 'sports)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_sports.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'sports)/subchannel/:secondname(live)',
      name: '\u8d5b\u4e8b',
      path: '',
      term: 'live'
    }, {
      route: ':firstname(' + t.routename + 'sports)/subchannel/:secondname(nba)',
      name: 'NBA',
      path: '',
      term: 'nba'
    }, {
      route: ':firstname(' + t.routename + 'sports)/subchannel/:secondname(cba)',
      name: 'CBA',
      path: '',
      term: 'cba'
    }, {
      route: ':firstname(' + t.routename + 'sports)/subchannel/:secondname(csl)',
      name: '\u4e2d\u8d85',
      path: '',
      term: 'csl'
    }, {
      route: ':firstname(' + t.routename + 'sports)/subchannel/:secondname(isocce)',
      name: '\u56fd\u9645\u8db3\u7403',
      path: '',
      term: 'isocce'
    }, {
      route: ':firstname(' + t.routename + 'sports)/subchannel/:secondname(synthesis)',
      name: '\u7efc\u5408',
      path: '',
      term: 'synthesis'
    }]
  }, {
    route: ':firstname(' + t.routename + 'money)',
    term: 'money',
    name: '\u8d22\u7ecf',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_money.js',
    display: -1,
    data: {channelId: '0025'},
    childroute: [{
      route: ':firstname(' + t.routename + 'money)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_money.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'money)/subchannel/:secondname(shares)',
      name: '\u80a1\u7968',
      path: '',
      term: 'shares'
    }, {
      route: ':firstname(' + t.routename + 'money)/subchannel/:secondname(fund)',
      name: '\u57fa\u91d1',
      path: '',
      term: 'fund'
    }, {
      route: ':firstname(' + t.routename + 'money)/subchannel/:secondname(commercial)',
      name: '\u5546\u4e1a',
      path: '',
      term: 'commercial'
    }]
  }, {
    route: ':firstname(' + t.routename + 'photo)',
    term: 'photo',
    name: '\u56fe\u7247',
    display: -1,
    path: '',
    data: {channelId: '0030'},
    childroute: [{
      route: ':firstname(' + t.routename + 'photo)/subchannel/:secondname(beauty)',
      name: '\u7f8e\u56fe',
      path: '',
      term: 'beauty'
    }, {
      route: ':firstname(' + t.routename + 'photo)/subchannel/:secondname(news)',
      name: '\u65b0\u95fb',
      path: '',
      term: 'news'
    }, {
      route: ':firstname(' + t.routename + 'photo)/subchannel/:secondname(star)',
      name: '\u660e\u661f',
      path: '',
      term: 'star'
    }, {
      route: ':firstname(' + t.routename + 'photo)/subchannel/:secondname(sports)',
      name: '\u4f53\u575b',
      path: '',
      term: 'sports'
    }, {
      route: ':firstname(' + t.routename + 'photo)/subchannel/:secondname(all)',
      name: '\u70ed\u70b9',
      path: '',
      term: 'all'
    }]
  }, {
    route: ':firstname(' + t.routename + 'tech)',
    term: 'tech',
    name: '\u79d1\u6280',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tech.js',
    display: -1,
    data: {channelId: '0009'},
    childroute: [{
      route: ':firstname(' + t.routename + 'tech)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tech.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'tech)/subchannel/:secondname(intelligent)',
      name: '\u667a\u80fd\u786c\u4ef6',
      path: '',
      term: 'intelligent'
    }, {
      route: ':firstname(' + t.routename + 'tech)/subchannel/:secondname(nejudge)',
      name: '\u6613\u8bc4',
      path: '',
      term: 'nejudge'
    }]
  }], o = [{
    route: ':firstname(' + t.routename + 'ent)',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_ent.js',
    term: 'ent',
    name: '\u5a31\u4e50',
    display: -1,
    data: {channelId: '0003'},
    childroute: [{
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_ent.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(television)',
      name: '\u7535\u89c6',
      path: '',
      term: 'television'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(movie)',
      name: '\u7535\u5f71',
      path: '',
      term: 'movie'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(star)',
      name: '\u660e\u661f',
      path: '',
      term: 'star'
    }, {
      route: ':firstname(' + t.routename + 'ent)/subchannel/:secondname(music)',
      name: '\u97f3\u4e50',
      path: '',
      term: 'music'
    }]
  }], r = [{
    route: ':firstname(' + t.routename + 'tech)',
    term: 'tech',
    name: '\u79d1\u6280',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tech.js',
    display: -1,
    data: {channelId: '0009'},
    childroute: [{
      route: ':firstname(' + t.routename + 'tech)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tech.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'tech)/subchannel/:secondname(intelligent)',
      name: '\u667a\u80fd\u786c\u4ef6',
      path: '',
      term: 'intelligent'
    }, {
      route: ':firstname(' + t.routename + 'tech)/subchannel/:secondname(nejudge)',
      name: '\u6613\u8bc4',
      path: '',
      term: 'nejudge'
    }]
  }], c = [{
    route: ':firstname(' + t.routename + 'digi)',
    term: 'digi',
    name: '\u6570\u7801',
    path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tech.js',
    display: -1,
    data: {channelId: '0016'},
    childroute: [{
      route: ':firstname(' + t.routename + 'digi)/subchannel/:secondname(all)',
      name: '\u9996\u9875',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_tech.js',
      term: 'all'
    }, {
      route: ':firstname(' + t.routename + 'digi)/subchannel/:secondname(hea)',
      name: '\u5bb6\u7535',
      path: '',
      term: 'hea'
    }]
  }], h = {
    enter: function (n) {
      var a = ':firstname(' + n.param.firstname + ')'
      if (n.param.firstname && !n.param.secondname && t.channelName[a].haschild)return n.stop(), d.go(a + '/subchannel/:secondname(all)', {
        param: {
          firstname: n.param.firstname,
          secondname: 'all'
        }, replace: !0
      })
      var l = n.param.firstname
      window.now_cnn = l.replace('channel=', ''), e(window).trigger('enterChannel', n.param)
    }, leave: function (t) {e(window).trigger('leaveChannel', t.previous)}
  }
  t.channelName = {}, t.channelPath = {}, t.channelMap = []
  var d = window.stateman = new window.StateMan, u = a.publicMethod.localParam(), m = u.search
  'qd' in m && '' != m.qd ? 'gdwf_top' == m.qd ? n(s) : 'wo' == m.qd ? 'wo_tech' == m.category ? n(r) : 'wo_ent' == m.category ? n(o) : 'wo_digi' == m.category ? n(c) : n() : n() : n(), d.on('notfound', function (e) {
    this.go(':firstname(' + t.routename + 'all)', {
      param: {firstname: t.routename + 'all'},
      replace: !0
    })
  })
}(Zepto, window.NEWAP = window.NEWAP || {}), function (e, t) {
  function n () {
    this.config = {
      tnListContain: '.topnav_list_contain',
      tnList: '.topnav_list',
      tnItems: '.topnav_item',
      navexpandPanel: '.nav_expand_panel',
      navexpandBtn: '.topnav_expand_btn',
      snList: '.subnav_contain',
      snItems: '.subnav_item',
      pannelItems: '.pannel_item',
      contents: '.contents'
    }, this.hasSpecificStyle = {}, this.noBottomLine = {}, this.otherChannelConfig = {}, this.qd = a.publicMethod.getQD()
  }

  var a = (e(window), t.tools), l = window.expand_channel || []
  n.prototype = {
    init: function () {
      Handlebars.registerHelper('getNavDisplaySet', function (e) {return 1 == e ? 'first_char' : 2 == e ? 'last_char' : ''}), Handlebars.registerHelper('getExpandLine', function (e, t) {return l.filter(function (t) {return (!t.parent_term || '' === t.parent_term) && t.term === e}).length > 0 ? t.inverse(this) : t.fn(this)}), Handlebars.registerHelper('getChildName', function (e) {return e && e[0] ? e[0].term : 'all'}), Handlebars.registerHelper('getTopChannelName', function (e) {return e.parent_term ? e.parent_term : e.term})
      var n = Handlebars.templates.module_ui_nav_v2_tpl({route: t.channelMap, expand: l})
      e('.bar_wrap').html(n), this.clickEvent(), this.scrollEvent()
    },
    clickEvent: function () {
      var n = e(this.config.tnItems), a = e(this.config.snItems), l = e(this.config.navexpandPanel),
        i = e(this.config.navexpandBtn), s = e(this.config.pannelItems), o = this
      n.on('click', function () {
        var n, a = (e(this), e(this).data('tcn')), s = e(this).data('scn')
        n = o.clickChannel(a, s), 'function' == typeof neteaseTracker && o.qd && neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#parentNav2ChannelClick_' + n.route.first + o.qd, '\u65b0\u7248\u4e00\u7ea7\u5bfc\u822a\u6e20\u9053\u70b9\u51fb\u91cf', 'clickp')
        try {neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#parentNav2ChannelClick_' + n.route.first, '\u65b0\u7248\u4e00\u7ea7\u5bfc\u822a\u603b\u70b9\u51fb\u91cf', 'clickp')} catch (r) {}
        if (n.route.second || n.route.isLink) {
          if (n.route.second) stateman.go(':firstname(' + t.routename + n.route.first + ')/subchannel/:secondname(' + n.route.second + ')', {
            param: {
              firstname: t.routename + n.route.first,
              secondname: n.route.second
            }
          }) else if (n.route.isLink)try {window.open(n.route.link)} catch (r) {window.location.href = n.route.link}
        } else stateman.go(':firstname(' + t.routename + n.route.first + ')', {param: {firstname: t.routename + n.route.first}})
        i.removeClass('expanded'), l.removeClass('show')
      }), a.on('click', function () {
        var n, a = (e(this), e(this).parent().data('tcn')), l = e(this).data('scn')
        n = o.clickChannel(a, l), 'function' == typeof neteaseTracker && o.qd && neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#parentNav2ChannelClick_' + n.route.first + '_' + n.route.second + o.qd, '\u65b0\u7248\u4e8c\u7ea7\u5bfc\u822a\u6e20\u9053\u70b9\u51fb\u91cf', 'clickp')
        try {neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#parentNav2ChannelClick_' + n.route.first + '_' + n.route.second, '\u65b0\u7248\u4e8c\u7ea7\u5bfc\u822a\u603b\u70b9\u51fb\u91cf', 'clickp')} catch (i) {}
        if (n.route.second && !n.route.isLink) stateman.go(':firstname(' + t.routename + n.route.first + ')/subchannel/:secondname(' + n.route.second + ')', {
          param: {
            firstname: t.routename + n.route.first,
            secondname: n.route.second
          }
        }) else if (n.route.isLink)try {window.open(n.route.link)} catch (i) {window.location.href = n.route.link}
      }), s.on('click', function () {
        var n, a = e(this).data('tcn'), s = e(this).data('scn')
        n = a === s && t.infoFlow.channelChildMap[a] ? o.clickChannel(a, t.infoFlow.channelChildMap[a]) : o.clickChannel(a, s), 'function' == typeof neteaseTracker && o.qd && (n.route.second ? neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#panelNav2ChannelEXClick_' + n.route.first + '_' + n.route.second + o.qd, '\u65b0\u7248\u5c55\u5f00\u5bfc\u822a\u6e20\u9053\u70b9\u51fb\u91cf', 'clickp') : neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#panelNav2ChannelEXClick_' + n.route.first + o.qd, '\u65b0\u7248\u5c55\u5f00\u5bfc\u822a\u6e20\u9053\u70b9\u51fb\u91cf', 'clickp'))
        try {n.route.second ? neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#panelNav2ChannelEXClick_' + n.route.first + '_' + n.route.second, '\u65b0\u7248\u5c55\u5f00\u5bfc\u822a\u603b\u70b9\u51fb\u91cf', 'clickp') : neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#panelNav2ChannelEXClick_' + n.route.first, '\u65b0\u7248\u5c55\u5f00\u5bfc\u822a\u603b\u70b9\u51fb\u91cf', 'clickp')} catch (r) {}
        if (a.match(/^link_\w+/)) {
          var c = e(this).data('exsaber')
          try {window.open(c)} catch (r) {window.location.href = c}
        } else if (n.route.second || n.route.isLink) {
          if (n.route.second) stateman.go(':firstname(' + t.routename + n.route.first + ')/subchannel/:secondname(' + n.route.second + ')', {
            param: {
              firstname: t.routename + n.route.first,
              secondname: n.route.second
            }
          }), l.toggleClass('show'), i.toggleClass('expanded') else if (n.route.isLink)try {window.open(n.route.link)} catch (r) {window.location.href = n.route.link}
        } else stateman.go(':firstname(' + t.routename + n.route.first + ')', {param: {firstname: t.routename + n.route.first}}), l.toggleClass('show'), i.toggleClass('expanded')
      }), i.on('click', function () {e(this).toggleClass('expanded'), l.toggleClass('show'), l.hasClass('show') ? (l.css('height', '12.5rem'), 'function' == typeof neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/#index_show_nav', '\u5bfc\u822a\u5c55\u5f00\u91cf', 'wapclick')) : (l.css('height', '0rem'), 'function' == typeof neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/#index_hide_nav', '\u5bfc\u822a\u6536\u8d77\u91cf', 'wapclick'))}), l.on('touchmove', function (e) {e.preventDefault()})
    },
    scrollEvent: function () {
      var t = e(this.config.tnList), n = e(this.config.tnListContain)
      t.on('scroll touchmove', function () {0 === this.scrollLeft && n.hasClass('onscroll') ? n.removeClass('onscroll') : n.hasClass('onscroll') || 0 === this.scrollLeft || n.addClass('onscroll')})
    },
    smoothTo: function (e, n) {
      var a, l = 0
      try {l = e[0].offsetLeft - 75} catch (i) {}
      l = l < 0 ? 0 : l > n[0].scrollWidth - n[0].clientWidth ? n[0].scrollWidth - n[0].clientWidth : l, a && a.stop(), a = t.tools.publicMethod.simpleTransition(n[0].scrollLeft, l, .25, function (e) {n.scrollLeft(e)})
    },
    toChannel: function (n, a) {
      var l = n.replace('channel=', ''), i = a || '', s = this, o = [], r = e(this.config.tnItems),
        c = e('#topchild_' + l), h = e(this.config.tnList), d = e(this.config.contents), u = e(this.config.snList),
        m = !1, p = !1
      if (c.hasClass('current') || (r.removeClass('current'), c.addClass('current'), s.smoothTo(c, h)), o = t.channelMap.filter(function (e) {return e.term === l}), p = !!o[0] && o[0].childroute.length > 0, m = !('' == i || !p) && o[0].childroute.filter(function (e) {return e.term === i}), '' != i && p && m)if (l in this.otherChannelConfig) e(this.otherChannelConfig[l].child).removeClass('current'), e(this.otherChannelConfig[l].childbar).find('.childchannel_' + i).addClass('current'), d.css({
        transform: 'translateY(0px)',
        '-webkit-transform': 'translateY(0px)'
      }) else {
        u.removeClass('show'), e('#subchild_' + l).addClass('show'), e('#subchild_' + l).find('.subnav_item').removeClass('current'), e('#subchild_' + l + '_' + i).addClass('current'), e('#topchild_' + l).data('scn', i)
        var f = getComputedStyle(e('#subchild_' + l)[0]), v = f ? f.height : 0
        d.css({
          transform: 'translateY(' + v + ')',
          '-webkit-transform': 'translateY(' + v + ')'
        }), s.smoothTo(e('#subchild_' + l + '_' + i), e('#subchild_' + l).children('ul'))
      } else d.css({transform: 'translateY(0px)', '-webkit-transform': 'translateY(0px)'})
      !o || !p || o[0].term in s.noBottomLine ? e('.main_nav_bar').removeClass(' has_subnav') : e('.main_nav_bar').addClass(' has_subnav')
    },
    clickChannel: function (e, n) {
      var a = {route: {first: e, isLink: !1}}, l = [], i = !1, s = !1
      if (l = t.channelMap.filter(function (t) {return t.term === e}), a.config = l[0], n && !/link_/.test(n)) {
        i = !!l[0] && l[0].childroute.length > 0
        var o = l[0].childroute.filter(function (e) {return e.term === n})
        s = !!i && o.length > 0, s ? (a.route.second = n, n.match(/^link_\w+/) && (a.route.isLink = !0, a.route.link = o[0].route)) : l[0] && l[0].childroute.length > 0 && (a.route.second = l[0].childroute[0].term)
      }
      return l[0] && l[0].term.match(/^link_\w+/) && (a.route.isLink = !0, a.route.link = a.config.route), a
    },
    photoChildBind: function () {
      var n = this
      e('#channel_photo').on('click', '.childchannel-photoset .item_cell', function (a) {
        var l = n.clickChannel('photo', e(this).data('scn'))
        l.route.second && stateman.go(':firstname(' + t.routename + l.route.first + ')/subchannel/:secondname(' + l.route.second + ')', {
          param: {
            firstname: t.routename + l.route.first,
            secondname: l.route.second
          }
        })
      })
    },
    idolChildBind: function () {
      var n = this
      e('#subchild_idol').on('click', '.subnav_item', function (a) {
        var l = n.clickChannel('idol', e(this).data('cnn'))
        l.route.second && stateman.go(':firstname(' + t.routename + l.route.first + ')/subchannel/:secondname(' + l.route.second + ')', {
          param: {
            firstname: t.routename + l.route.first,
            secondname: l.route.second
          }
        })
      })
    },
    liveChildBind: function () {
      var n = this
      e('.live-nav').on('click', '.live_nav_item', function (a) {
        var l = n.clickChannel('liveshow', e(this).data('scn'))
        l.route.second && stateman.go(':firstname(' + t.routename + l.route.first + ')/subchannel/:secondname(' + l.route.second + ')', {
          param: {
            firstname: t.routename + l.route.first,
            secondname: l.route.second
          }
        })
      })
    }
  }
  t.Nav = new n
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function () {
  function e (e) {e = e || {}, this.storage = window.localStorage, this.period = e.period || 168, this.once = e.once || !1, this.key = e.key || 'NEWAP_RedPacket_app', this.toBeGrace = this.isLocalStorageSupported(), this.style = e.styleName || '', this.statistics = e.statistics || 'noaddress', this.open = e.open || function () {location.href = 'http://m.163.com/newsapp/applinks.html?s=news_wap_hongbao'}, this.rpBoxSmall = null, this.rpBoxLarge = null, this._hide_ = e.hide || !1, this.isShow = !1, this.created = !1, this.count = 1, this.once && this.toBeGrace && this.init()}

  e.prototype = {
    init: function () {
      var e = (new Date).getTime(), t = JSON.parse(this.storage.getItem(this.key)) || {closed: !1, stamp: 0}, n = 0
      t.stamp && (n = e - t.stamp), t.closed && n > 3600 * this.period * 1e3 ? this.createEl() : 0 != t.stamp || t.closed ? t.closed || this.createEl() : (this.createEl(), this.storage.setItem(this.key, JSON.stringify({
        stamp: e,
        closed: !1
      }))), !this._hide_ && this.show()
    },
    createEl: function () {
      var e = document.createElement('div'), t = document.createElement('div'), n = document.createElement('style'),
        a = document.querySelectorAll('body')[0], l = document.querySelectorAll('head')[0]
      e.className = 'ne_rps' + (this.style ? ' ' + this.style : ''), t.className = 'ne_rpl', t.style.display = 'none', e.style.display = 'none', e.innerHTML = '<div class="close"></div>', t.innerHTML = '<div class="redpacket_large_wrap"><div class="close"></div><div class="open"></div></div>', n.innerHTML = '.ne_rps{width:1.6rem;height:1.84rem;position:fixed;right:.15rem;bottom:3.3rem;background:url("http://cms-bucket.nosdn.127.net/313cec478aca45a1b97893688b2f502620170410103427.png") no-repeat;background-size:contain;z-index:9999;}.ne_rps .close{width:.6rem;height:.6rem;position:absolute;right:0;top:0;}.ne_rpl .close{width:1rem;height:1rem;position:absolute;left:0;top:0;}.ne_rpl .open{width:2rem;height:2rem;position:absolute;left:50%;bottom:1.6rem;transform:translate(-50%,0);-webkit-transform:translate(-50%,0);}.ne_rpl {width:100%;height:100%;position:fixed;left:0;top:0;z-index:9999;background:rgba(0,0,0,0.6);}.ne_rpl .redpacket_large_wrap{width:6.5rem;height:8.68rem;position:absolute;background:url("http://cms-bucket.nosdn.127.net/12654d32f21b44eb95815a7de57ef64220170410103404.png") no-repeat;background-size:contain;left:50%;top:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);}', l.appendChild(n), a.appendChild(e), a.appendChild(t), this.rpBoxSmall = e, this.rpBoxLarge = t, this.created = !0, this.destoried = !1, this.bind()
    },
    isSearchEngine: function () {
      var e = document.referrer
      return /^http(?:s)?:\/\/(?:[^\/]*\.)?(baidu.com|sogou.com)\/.*$/gi.test(e)
    },
    show: function () {!this.isShow && this.created && !this.destoried && (this.rpBoxSmall.style.display = 'block', this.count && this.doStatistics('show/' + this.statistics, 'app\u7ea2\u5305\u7ec4\u4ef6\u9732\u51fa:' + this.statistics), this.count = 0, this.isShow = !0)},
    hide: function () {this.isShow && this.created && !this.destoried && (this.rpBoxSmall.style.display = 'none', this.isShow = !1)},
    destory: function (e) {this.rpBoxLarge.parentNode.removeChild(this.rpBoxLarge), this.rpBoxSmall.parentNode.removeChild(this.rpBoxSmall), this.destoried = !0},
    close: function () {
      var e = (new Date).getTime()
      this.storage.setItem(this.key, JSON.stringify({
        stamp: e,
        closed: !0
      })), this.destory(), this.doStatistics('close/' + this.statistics, 'app\u7ea2\u5305\u7ec4\u4ef6\u5173\u95ed:' + this.statistics)
    },
    bind: function (e) {
      var t = this
      this.rpBoxSmall.querySelectorAll('.close')[0].addEventListener('click', function (e) {e.stopPropagation(), t.close(), e.target.parentNode.style.display = 'none'}), this.rpBoxSmall.addEventListener('click', function (e) {e.target.style.display = 'none', t.rpBoxLarge.style.display = 'block', t.doStatistics('scale/' + t.statistics, 'app\u6253\u5f00\u7ea2\u5305(\u653e\u5927):' + t.statistics)}), this.rpBoxLarge.addEventListener('touchmove', function (e) {e.preventDefault()}), this.rpBoxLarge.querySelectorAll('.open')[0].addEventListener('click', function (e) {e.stopPropagation(), t.doStatistics('open/' + t.statistics, 'app\u6253\u5f00\u7ea2\u5305(\u6309\u94ae):' + t.statistics), t.open()}), this.rpBoxLarge.querySelectorAll('.close')[0].addEventListener('click', function (e) {e.stopPropagation(), e.target.parentNode.parentNode.style.display = 'none', t.rpBoxSmall.style.display = 'block', t.doStatistics('toggle/' + t.statistics, 'app\u7ea2\u5305\u7ec4\u4ef6\u6536\u8d77:' + t.statistics)})
    },
    isLocalStorageSupported: function () {
      var e = 'test', t = window.localStorage
      try {t.setItem(e, 'testValue')} catch (n) {return console.log('localStorage.setItem\u4e0d\u53ef\u4ee5\u6267\u884c'), !1}
      try {return 'testValue' == t.getItem(e) && (t.removeItem(e), !0)} catch (n) {return console.log('localStorage.getItem\u4e0d\u53ef\u4ee5\u6267\u884c'), !1}
    },
    doStatistics: function (e, t) {try {neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/app/statistics/hongbao/' + e, t, 'wapclick')} catch (n) {console.log(n)}}
  }, 'undefined' != typeof module && 'object' == typeof exports && define.cmd ? module.exports = e : 'function' == typeof define && define.amd ? define(function () {return e}) : window.RedPacket = e
}(), function (e) {
  var t = NEWAP.tools, n = (t.publicMethod.cookie, NEWAP.wapLogin), a = function () {
    var a = e('#login_panel'), l = e('.login_mask'), i = (e('.weixin_fixed'), e('.login_versions')),
      s = e('.login_app'), o = e('.icon_personal'), r = e('.icon_email .mails_count'),
      c = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      h = /@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/,
      d = /@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      u = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+/, m = this,
      p = ['@163.com', '@126.com', '@yeah.net', '@vip.163.com', '@vip.126.com', '@popo.163.com', '@188.com', '@vip.188.com', '@qq.com', '@sina.com']
    this.conf = {}, this.showLoginPanel = function () {a.addClass('show'), l.addClass('show'), e(window).trigger('loginPanel:show')}, this.hideLoginPanel = function () {l.removeClass('show'), a.removeClass('show'), e(window).trigger('loginPanel:hide')}
    var f = function () {
      var t = m, l = n.getUserInfo()
      if (l.logined) {
        e('.login_head').show()
        var i = l.mail.match(d) ? l.mail.match(d)[0] : '@163.com'
        e('#h_email').attr('href', v(i)), a.find('#my_email').attr('href', v(i))
        try {neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#loginSuccessCount_' + this.getQD(), '\u767b\u5f55\u6210\u529f\u7684\u6b21\u6570', 'clickp')} catch (s) {}
        l.thirdLogin ? (t.getThirdInfo(function (t) {e('.login_head .avatar img').attr('src', t.photoUrl || 'http://img2.cache.netease.com/f2e/wap/touch_index_2016/trunk/images/not_logined.png'), e('.login_head .nickname').text(t.nickName)}), a.find('.unread').hide()) : (t.getCommentInfo(function (t) {e('.login_head .avatar img').attr('src', t.avatar || 'http://img2.cache.netease.com/f2e/wap/touch_index_2016/trunk/images/not_logined.png'), e('.login_head .nickname').text(t.nickname)}), t.getMailInfo(l.mail, function (e) {r.find('span').text(e), r.show(), a.find('.unread').text(e), e <= 0 && (r.hide(), a.find('.unread').hide())})), e('.logined').show(), e('.not_logined').hide(), e('#email').val(''), e('#password').val(''), e('.third_login').hide()
      } else e('.login_head').hide(), e('.logined').hide(), r.hide(), e('.not_logined').show(), e('.third_login').show()
    }, v = function (e) {
      var t = {
        '@163.com': {
          read: 1,
          name: '163',
          url: 'http://entry.mail.163.com/coremail/fcg/ntesdoor2?verifycookie=1&lightweight=1&style=11&df=3g_163'
        },
        '@126.com': {
          read: 1,
          name: '126',
          url: 'http://entry.mail.126.com/cgi/ntesdoor?verifycookie=1&lightweight=1&style=11&df=3g_163'
        },
        '@yeah.net': {
          read: 1,
          name: 'yeah',
          url: 'http://entry.yeah.net/cgi/ntesdoor?verifycookie=1&lightweight=1&style=11&df=3g_163'
        },
        '@188.com': {read: 0, name: '188', url: 'http://reg.mail.188.com/servlet/enter'},
        '@vip.126.com': {read: 0, name: 'vip', url: 'http://reg.vip.126.com/enterMail.m'},
        '@vip.163.com': {read: 0, name: 'vip', url: 'http://reg.vip.163.com/enterMail.m?enterVip=true'},
        'default': {read: 0, name: 'gmail', url: 'http://mail.163.com?s=wap'}
      }
      return t[e] ? t[e].url : t['default'].url
    }
    this.init = function (t) {
      var n = this
      e.extend(!0, this.conf, t), NEWAP.wapLogin.init({
        form: e('#login-form'),
        loginButton: e('#dologin'),
        logoutButton: e('.item-cancel'),
        formAttr: {target: 'submitFrame'},
        formHiddenInput: [{
          type: 'hidden',
          id: 'url',
          name: 'url',
          value: 'http://3g.163.com/touch/login_frame.html'
        }, {
          type: 'hidden',
          id: 'url2',
          name: 'url2',
          value: 'http://3g.163.com/touch/login_frame.html'
        }, {type: 'hidden', id: 'noRedirect', name: 'noRedirect', value: '1'}],
        iframeAttr: {
          id: 'submitFrame', name: 'submitFrame', src: 'http://3g.163.com/touch/login_frame.html'
        },
        beforeSubmit: function () {
          return n.validateForm(e('#login-form'), {
            rules: {
              '#email': {
                required: !0,
                isEmail: !0
              }, '#password': {required: !0}
            },
            errorHandle: {
              '#email': {
                required: function () {n.showTip('\u8bf7\u8f93\u5165\u90ae\u7bb1'), e('#email').focus()},
                isEmail: function () {n.showTip('\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7bb1'), e('#email').focus()}
              },
              '#password': {required: function () {n.showTip('\u8bf7\u8f93\u5165\u5bc6\u7801'), e('#password').focus()}}
            }
          })
        },
        callback: f,
        loginFail: function (e) {n.showTip(e)}
      }), this.emailTip()
      var a = location.search.match(/version=(v_.+?)($|#|\/|&)/)[1]
      i.find('[data-version=' + a + ']').addClass('version_active')
    }, this.initLogin = function (t) {
      var n = this, a = window.screenWidth_, l = a > 1080 ? 144 : a / 7.5
      l = l > 32 ? l : 32, initLogin({
        fontSize: l,
        initDelay: t,
        logincb: function () {e('#login_module').children('iframe').attr('src', e('#login_module').children('iframe').attr('src') + '&_=' + (new Date).getTime()), f.call(n)},
        initReady: function () {e('#loading_box').hide(), e('#login_module').show()}
      })
    }, this.showTip = function (e, t) {
      var n = a.find('.login_warning')
      n.show().text(e)
      setTimeout(function () {n.hide().text('')}, t || 1500)
    }, this.getCommentInfo = function (e) {
      t.publicMethod.fetch({
        url: 'http://comment.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/users/myInfo',
        notformat: !0,
        dataType: 'jsonp',
        useflag: !1,
        jsonpCallback: 'commentInfo',
        success: function (t) {e && e(t)}
      })
    }, this.getThirdInfo = function (e) {
      t.publicMethod.fetch({
        url: 'http://3g.163.com/touch/jsonp/oauth/info.html',
        notformat: !0,
        dataType: 'jsonp',
        useflag: !1,
        jsonpCallback: 'oauth_info',
        success: function (t) {e && e(t)}
      })
    }, this.getMailInfo = function (e, n) {
      t.publicMethod.fetch({
        url: 'http://msg.mail.163.com/cgi/mc?funcid=getusrnewmsgcnt&fid=0&template=newmsgres_setcookie.htm&username=' + e,
        notformat: !0,
        dataType: 'jsonp',
        useflag: !1,
        jsonpCallback: 'mailInfo',
        success: function (e) {n && n(e)}
      })
    }, this.emailTip = function () {
      var t = e('.emailTipList'), n = e('#email'), l = this
      n.on('input', function () {
        if (a.hasClass('show')) {
          var n = e(this).val()
          l.renderEmailTip(t, n)
        }
      }).on('blur', function () {setTimeout(function () {l.renderEmailTip(t, ''), t.hide()}, 0)}), t.on('click', 'li', function () {n.val(e(this).text()), t.hide()})
    }, this.renderEmailTip = function (t, n) {
      var a = '', l = n.match(c), i = n.match(u), s = n.match(d), o = n.match(h)
      n ? (i && !l ? o ? e.each(p, function (e, t) {t.indexOf(o) > -1 && (a += '<li>' + i + t + '</li>')}) : e.each(p, function (e, t) {a += '<li>' + i + t + '</li>'}) : l && e.each(p, function (e, t) {t.indexOf(s) > -1 && (a += '<li>' + i + t + '</li>')}), t.html(a), a ? t.show() : t.hide()) : t.hide()
    }, this.validateForm = function (t, n) {
      var a = {
        required: function (e, t) {return !!e == t},
        isEmail: function (e) {return c.test(e)}
      }, l = !0
      return e.each(n.rules, function (i, s) {
        var o = t.find(i), r = o.val()
        if (e.each(s, function (e, t) {if (a[e] && !a[e](r, t))return n.errorHandle[i][e] && n.errorHandle[i][e](), l = !1, !1}), !l)return !1
      }), l
    }, this.run = function () {
      l.on('touchstart', function (e) {e.preventDefault(), m.hideLoginPanel()}), i.on('click', '.version', function (t) {
        var n = e(this).data('version')
        try {m.conf.funcObj.versionClick(n)} catch (t) {}
      }), s.on('click', function (t) {
        var n = e(this).data('version')
        try {m.conf.funcObj.versionClick(n)} catch (t) {}
      }), a.on('touchmove', function (e) {return e.preventDefault(), !1}), o.on('click', function () {m.showLoginPanel(), 'function' == typeof neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/#index_loginpanel', '\u767b\u5f55\u754c\u9762\u70b9\u51fb\u91cf', 'wapclick')}), e(window).on('loginPanel:show', function () {m.initLogin(500)})
    }
  }
  NEWAP.LoginPanel = a
}(window.Zepto), function (e, t) {
  function n (t, n) {
    this.tabEle = t, this.AJAX = {}, this.channelChildMap = {}, this.offset = {}, this.bottomLock = {}, this.channel = '', this.channelId = '', this.child = '', this.channelHandle = o, this._runflag = !1, this.channelSwiper = null, this.channelData = n.channelData, this.simple = !1, this.bottomStrategy = {
      'default': function (e, t) {return e.docHeight - e.winHeight <= e.scrollTop + 80 && this.bottomLock[t] === !1},
      photo: function (t, n) {
        var a = Math.abs(e('.content-list-east').height() - e('.content-list-west').height())
        return t.docHeight - t.winHeight - a - 300 <= t.scrollTop && this.bottomLock[n] === !1
      }
    }
  }

  var a = t.tools, l = t.ad, i = t.Nav, s = t.indexTools, o = {
    'default': {
      getFrameConfig: function () {
        return [{tag: 'div', attr: {'class': 'headslide'}}, {
          tag: 'div',
          attr: {'class': 'swipe-content content-list'}
        }, {tag: 'div', attr: {'class': 'list-more'}, template: Handlebars.templates.listmore_tpl}]
      },
      init: function (t, n, i) {
        var s = this
        if (s.setOffsetNum(t, function () {return 0}), i) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
        s.createFrame('#channel_' + t, s.callHandle(t, n, 'getFrameConfig')), e('#channel_' + t + ' .list-more').show(), a.publicMethod.fetch({
          DPData: {
            channel: s.channelId,
            child: n
          },
          useflag: !1,
          success: function (a) {s.simple && e.each(a.listdata.data, function (e, t) {t.type = 'doc_simple'}), s.processOtherinfo(a, s.offset[t]), l.getChannelAllAD(l.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})},
          error: function (e) {console.log(e)}
        })
      },
      bottom: function () {
        var t = this, n = t.channel
        e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10}), t.setBottomLock(n, !0), a.publicMethod.fetch({
          DPData: {
            offset: t.offset[n],
            channel: t.channelId,
            child: t.child
          },
          useflag: !1,
          success: function (i) {
            t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + '_' + t.child + 'listinfo/#bottom' + t.offset[n] / 10, n + '_' + t.child + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick')), t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide(), t.simple && e.each(i.listdata.data, function (e, t) {t.type = 'doc_simple'}), t.processOtherinfo(i, t.offset[n])
            var s = l.getADDetailData(n, t.child)
            a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), i.listdata.data, s, 'after'), l.replaceListAD(e('#channel_' + n + ' .content-list section'), s)
          },
          error: function (e) {t.setBottomLock(n, !1)}
        })
      },
      ADListSucc: function (t, n, l) {a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata, t), a.publicMethod.generateHtml(e('#channel_' + l + ' .content-list'), n.listdata.data, t)},
      noAD: function (n, l) {
        a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata), a.publicMethod.generateHtml(e('#channel_' + l + ' .content-list'), n.listdata.data), 0 != e('#channel_' + l + ' .headslide li').length && t.makeScroll({
          id: '#channel_' + l,
          autoSlider: !1,
          autoTime: 2e3,
          openSlider: !0
        })
      },
      ADSucc: function (n, a) {
        l.replaceFocusAD(e('#channel_' + a + ' .headslide li'), n), 0 != e('#channel_' + a + ' .headslide li').length && t.makeScroll({
          id: '#channel_' + a,
          autoSlider: !1,
          autoTime: 2e3,
          openSlider: !0
        }), l.replaceListAD(e('#channel_' + a + ' .content-list section'), n)
      }
    }
  }
  n.prototype = {
    init: function (e) {
      var t = this.channelSlide()
      this.channelSwiper = new t({channeldata: this.channelData, channel: 'channel_all'})
      var n = this
      n.simple = e && e.simple || !1, this.handleEvent(), this.setOffsetNum(function () {return 0}), this.setBottomLock(!1), s.isBottom({condition: function (e) {return n.bottomStrategy[n.channel] ? n.bottomStrategy[n.channel].call(n, e, n.channel) : n.bottomStrategy['default'].call(n, e, n.channel)}}, function () {n.callHandle(n.channel, n.child, 'bottom')})
    },
    handleEvent: function () {
      var n = this, a = /^channel_(\w+)$/
      this.tabEle.on('swipeEnd', function (l, s) {
        var o = s.match(a)[1], r = e.grep(t.channelMap, function (e, t) {return e.term == o})[0],
          c = r.childroute[0] ? r.childroute[0].term : '', h = n.channelChildMap[o] ? n.channelChildMap[o] : c
        'channel_' + n.channel == s ? n.channelSwiper.toChannel(s) : (i.toChannel(t.routename + o), 0 == r.childroute.length ? stateman.go(':firstname(' + t.routename + o + ')', {param: {firstname: t.routename + o}}) : stateman.go(':firstname(' + t.routename + o + ')/subchannel/:secondname(' + h + ')', {
          param: {
            firstname: t.routename + o,
            secondname: h
          }
        }))
      })
    },
    channelSlide: function () {
      function t (t) {t = t || {}, this.listWrap = t.listWrap || e('.contents-tablist'), this.listEles = t.listEles ? t.listEles : '.contents-tablist-wrap', this.throughEdge = t.throughEdge || .3, this.speedEdge = t.speedEdge || .6, this.duration = t.duration || .5, this._init(t)}

      var n, l, s, o, r, c, h, d, u, m, p = e(window).width(), f = e(window).height(),
        v = a.publicMethod.getDirection()
      return t.prototype = {
        _init: function (e) {this._createPage(e.channeldata), this._setPage(e.channel), this._bindEvent()},
        _createPage: function (t) {
          var n = '', a = /^link_\w+$/
          e.each(t, function (e, t) {a.test(t.term) || (n += Handlebars.templates.contentList_tpl(t))}), this.listWrap.html(n), this.listEles = this.listWrap.find(this.listEles), i.photoChildBind()
        },
        _setPage: function (e) {
          var t = this.listEles, n = this.listWrap
          r = e, n.css('width', t.length * p), t.css({width: p, height: f, 'min-height': f}), this.toChannel(r, !1)
        },
        _bindEvent: function () {
          var t = this
          this.listEles.on('touchstart', '.swipe-content', function (e) {m = void 0, v.start(e), t._touchstart.call(t, e)}), this.listEles.on('touchmove', '.swipe-content', function (e) {m || (m = v.move(e)), 'left' != m && 'right' != m || (e.preventDefault(), t._touchmove.call(t, e))}), e(document).on('touchend', function (e) {'left' != m && 'right' != m || t._touchend.call(t, e), m = void 0})
        },
        _touchstart: function (e) {
          this.listWrap.css({
            'transition-duration': '0s',
            '-webkit-transition-duration': '0s'
          }), s = e.timeStamp, n = e.touches[0].clientX, d = this._getPoint(r)
        },
        _touchmove: function (e) {
          var t = e.changedTouches[0].clientX, a = t - n
          this.listWrap.css({
            '-webkit-transform': 'translate3d(' + (d + a) + 'px,0,0)',
            transform: 'translate3d(' + (d + a) + 'px,0,0)'
          })
        },
        _touchend: function (e) {
          var t, a, i
          this.listEles.length - 1
          o = e.timeStamp, l = e.changedTouches[0].clientX, a = o - s, t = l - n, i = Math.abs(t) / a, t > 0 ? (Math.abs(t) > p * this.throughEdge || i > this.speedEdge) && c ? this.listWrap.trigger('swipeEnd', c) : this.listWrap.trigger('swipeEnd', r) : (Math.abs(t) > p * this.throughEdge || i > this.speedEdge) && h ? this.listWrap.trigger('swipeEnd', h) : this.listWrap.trigger('swipeEnd', r)
        },
        _getPoint: function (t) {
          var n = this.listEles.index(e('#' + t))
          return 0 == n ? 0 : n * -p
        },
        toChannel: function (t, n) {
          r = t, c = e('#' + r).prev().attr('id'), h = e('#' + r).next().attr('id'), n = void 0 === n || n, n ? this.listWrap.css({
            'transition-duration': this.duration + 's',
            '-webkit-transition-duration': this.duration + 's'
          }) : this.listWrap.css({
            'transition-duration': '0s',
            '-webkit-transition-duration': '0s'
          }), this.listWrap.css({
            '-webkit-transform': 'translate3d(' + this._getPoint(r) + 'px,0,0)',
            transform: 'translate3d(' + this._getPoint(r) + 'px,0,0)'
          }), e('#' + u).removeClass('active').css('height', f), e('#' + r).addClass('active').css('height', 'auto'), u = t
        }
      }, t
    },
    callHandle: function (e, t, n) {
      var a = Array.prototype.slice.call(arguments, 3)
      return this.channelHandle[e] ? this.channelHandle[e][t] ? this.channelHandle[e][t][n] && this.channelHandle[e][t][n].apply(this, a) : this.channelHandle[e]['default'][n] && this.channelHandle[e]['default'][n].apply(this, a) : this.channelHandle['default'][n] && this.channelHandle['default'][n].apply(this, a)
    },
    setOffsetNum: function (t, n) {
      var a = this, l = this.offset[t]
      1 == arguments.length && 'function' == e.type(t) && (n = t, t = void 0), t ? this.offset[t] = n(l) : e.each(this.channelData, function (e, t) {a.offset[t.term] = n()})
    },
    setBottomLock: function (t, n) {
      var a = this
      1 == arguments.length && 'string' !== e.type(t) && (n = t, t = void 0), n = 'function' === e.type(n) ? n() : n, t ? this.bottomLock[t] = n : e.each(this.channelData, function (e, t) {a.bottomLock[t.term] = n})
    },
    createFrame: function (t, n) {
      'string' == e.type(t) && (t = e(t)), e.each(n, function (n, a) {
        var l = a.tag
        if (e.each(a.attr, function (e, t) {
            switch (e) {
              case'id':
                l += '#' + t
                break
              case'class':
                l += '.' + t
            }
          }), t.find(l).length > 0)return !1
        if (a.template) t.append(a.template()) else {
          var i = document.createElement(a.tag), s = e(i)
          s.attr(a.attr), t.append(s)
        }
      })
    },
    processOtherinfo: function (e, t) {
      var n = e.otherinfo, a = e.listdata.data, l = e.topdata.data
      n.appointArticle && (n.appointArticle.focus && n.appointArticle.focus.length > 0 && this.replaceData(n.appointArticle.focus, l, t || 0), n.appointArticle.list && n.appointArticle.list.length > 0 && this.replaceData(n.appointArticle.list, a, t || 0))
    },
    replaceData: function (t, n, a) {e.each(t, function (e, t) {t.adposition > 0 && (n[t.adposition - a] = t.data)})}
  }
  t.infoFlow = new n(e('.contents-tablist'), {channelData: t.channelMap})
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {
    e('#docid-docAppClient').on('touchstart', function (e) {
      e.preventDefault()
      try {
        openNewsapp.open({
          param: 'startup',
          channel: 'news_wap_indexlist'
        })
      } catch (t) {location.href = 'http://m.163.com/newsapp/applinks.html?s=news_wap_indexlist'}
    })
  }

  function a (t) {
    var n = t.ele, a = t.data || [], l = t.append || 'after', i = t.noadTpl || '', s = '', o = []
    if ('object' == e.type(a)) {
      e.each(a.focus, function (e, t) {t.type && t.pic_info && t.pic_info.length > 0 && o.push(t)})
      try {s = Handlebars.templates.headslide_tpl({data: o})} catch (r) {console.trace(r)}
    } else e.each(a, function (e, t) {if (t.type)if ('photoset' == t.type)try {s += t.pic_info.length < 3 ? Handlebars.templates.doc_tpl(t) : Handlebars.templates.photoset_tpl(t)} catch (n) {console.log(n)} else try {s += Handlebars.templates[t.type + '_tpl'](t)} catch (n) {console.trace(n)} else if (void 0 !== t.adposition || t.addata && t.addata.adposition)try {s += Handlebars.templates[i || 'noAD_tpl']({})} catch (n) {console.log(n)}})
    'before' === l ? n.prepend(s) : 'after' === l ? n.append(s) : n.html(s)
  }

  function l (t, n) {
    function a (n) {
      var a = []
      return e.each(t, function (t, n) {
        n && n.addata && a.push(c.publicMethod.fetch({
          dataType: 'jsonp',
          useflag: !1,
          notformat: !0,
          jsonpCallback: 'ad_info_' + n.addata.cbnum,
          url: n.addata.url,
          success: function (e) {},
          error: function (e) {}
        }).then(function (t) {e.extend(n, t, !0)}))
      }), a
    }

    e.when.apply(this, a(t)).always(function () {n && n()})
  }

  function i () {this.id = '', this.getId()}

  function s () {this.hasSlide = !1, this.listData = [], this.slidedownADObj = {}, this.timer = null, this.timer2 = null, this.slidesuccTimes = 0}

  function o () {this.template = Handlebars.templates.module_ui_all_scrollnews_tpl, this.ele = void 0, this.timerid = void 0, this.hideTimeid = void 0, this._data = null, this._index = 0}

  var r, c = t.tools, h = t.ad, d = (t.Nav, t.indexTools), u = t.infoFlow, m = {}, p = {}, f = {A: '0-90', B: '91-100'},
    v = t.tools.publicMethod.localParam() || {}, g = v.search || {}
  'true' !== g.debug || 'A' !== g.dataversion && 'B' !== g.dataversion ? (r = t.Static.versionModel.run(f, 'NEWAP_AB_version_branch', 'wap3gindex'), t.Static.versionModel.changeSearch(r, 'dataversion')) : r = g.dataversion
  var _, w = location.href
  /http:\/\/dev\.f2e\.163\.com/.test(w), _ = 'http://3g.163.com', i.prototype = {
    update: function (e) {
      var t = {
        str: e || '',
        type: 'yunread',
        key: ''
      }
      d.storageLocalVal(t)
    }, getId: function () {return this.id = d.storageLocalVal({type: 'yunread', key: ''}), this.id}
  }
  var b = new i
  s.prototype = {
    mixSlidedownData: function (t, n) {
      for (var a, l = [], i = 0, s = 0, o = JSON.parse(JSON.stringify(n)); i < t.length;)a = i + 1 + s, o.hasOwnProperty(a) ? (l.push(e.extend(o[a], {addata: o[a]})), delete o[a], s += 1) : (l.push(t[i]), i += 1);
      return l
    },
    hideEmptyListAD: function () {e('#channel_all .content-list section.m_papa_no').hide()},
    showRefreshTip: function (t, n) {
      var a = e('.refresh_tip')
      a.show().removeClass('hide').addClass('show').text(t), a.off('click'), n && a.on('click', n)
    },
    hideRefreshTip: function () {
      var t = e('.refresh_tip')
      t.removeClass('show').addClass('hide')
    },
    autoRefreshTip: function (e) {
      var t = this
      this.showRefreshTip(e), setTimeout(function () {t.hideRefreshTip()}, 2e3)
    },
    resetSvg: function (t) {
      e.each(t, function (e, t) {
        t.length ? t.elem.css({
          'stroke-dasharray': t.length + '',
          'stroke-dashoffset': t.length + '',
          transition: 'all .5s',
          '-webkit-transition': 'all .5s'
        }) : t.elem.css({opacity: 0, '-webkit-transition': 'all .5s', transition: 'all .5s'})
      })
    },
    slideAnimate: function (t, n) {
      var a = (100 - n) / 100
      e.each(t, function (e, t) {
        t.length ? t.elem.css({
          'stroke-dashoffset': t.length * a + '',
          transition: 'none',
          '-webkit-transition': 'none'
        }) : t.elem.css({opacity: n / 100, transition: 'none', '-webkit-transition': 'none'})
      })
    },
    cycleSlideAnimate: function (e) {
      var t = this, n = 0
      this.timer = setInterval(function () {n <= 100 ? n += 1 : n = 0, t.slideAnimate(e, n)}, 17)
    },
    stopAnimate: function () {clearInterval(this.timer)},
    refreshData: function (n) {
      clearTimeout(this.timer2)
      var l
      l = 'A' === r ? _ + '/touch/jsonp/sy/recommend/0-9.html' : _ + '/touch/jsonp/sy/v2/recommend/0-9.html', c.publicMethod.fetch({
        url: l,
        DPData: n.DPData,
        dataType: 'jsonp',
        cache: !0,
        success: function (l) {
          if (!l.list)return y.autoRefreshTip('\u8bf7\u7a0d\u540e\u518d\u8bd5'), n.fail(), !1
          var i,
            s = e.grep(l.list, function (e, t) {return u.simple && (e.addata || 'docStarAttitude' === e.type || 'attitude_board' === e.type || (e.type = 'doc_simple')), !e.addata}),
            o = [p]
          y.hasSlide = !0, m = l.other, y.listData = s.concat(y.listData), o = o.concat(y.listData), l.reverse ? h.getDetailADData({list: l.reverse}, 'ad_info', function (n) {
            t.ad.setADDetailData(t.channelMap, 'all', '', n), y.slidedownADObj = c.publicMethod.arrToObj(l.reverse, 'adposition'), i = y.mixSlidedownData(o, y.slidedownADObj), a({
              ele: e('#channel_all .content-list'),
              data: i,
              append: 'all'
            }), y.hideEmptyListAD()
          }) : (i = y.mixSlidedownData(o, y.slidedownADObj), a({
            ele: e('#channel_all .content-list'),
            data: i,
            append: 'all'
          }), y.hideEmptyListAD()), n.success && n.success(), y.autoRefreshTip('\u5df2\u4e3a\u60a8\u63a8\u8350' + s.length + '\u6761\u65b0\u95fb')
        },
        error: function (e) {n.fail && n.fail(), '400' == e ? y.autoRefreshTip('\u6682\u65e0\u66f4\u65b0,\u8bf7\u7a0d\u540e\u518d\u8bd5') : y.autoRefreshTip('\u8bf7\u7a0d\u540e\u518d\u8bd5')}
      })
    },
    initRefreshTip: function (e) {
      var t = this
      this.timer2 = setTimeout(function () {t.showRefreshTip('\u70b9\u51fb\u67e5\u770b9\u6761\u66f4\u65b0', function () {t.hideRefreshTip(), e && e()})}, 3e4)
    },
    clickRefresh: function (t) {
      e.extend(t.DPData, m), y.slidesuccTimes += 1, e('#channel_all').css('transform', 'translateY(50px)'), e('#channel_all').css('-webkit-transform', 'translateY(50px)'), e('.slidedown_tip_text').text('\u66f4\u65b0\u4e2d...'), y.slideAnimate([{elem: e('#SVG_rect')}, {
        elem: e('#SVG_path'),
        length: e('#SVG_path')[0].getTotalLength()
      }, {elem: e('#SVG_line1'), length: 23}, {elem: e('#SVG_line2'), length: 23}, {
        elem: e('#SVG_line3'),
        length: 16
      }], 100), y.cycleSlideAnimate([{elem: e('#SVG_line1'), length: 23}, {
        elem: e('#SVG_line2'),
        length: 23
      }, {elem: e('#SVG_line3'), length: 16}]), y.refreshData({
        DPData: t.DPData,
        success: function () {
          neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/tjlistinfo/#sliderefresh' + y.slidesuccTimes, '\u63a8\u8350\u9891\u9053\u4e0b\u62c9\u66f4\u65b0-' + y.slidesuccTimes, 'wapclick'), neteaseTracker && neteaseTracker(), y.resetSvg([{elem: e('#SVG_rect')}, {
            elem: e('#SVG_path'),
            length: e('#SVG_path')[0].getTotalLength()
          }, {elem: e('#SVG_line1'), length: 23}, {elem: e('#SVG_line2'), length: 23}, {
            elem: e('#SVG_line3'),
            length: 16
          }]), y.stopAnimate(), e('#channel_all').css('transform', 'translateY(0)'), e('#channel_all').css('-webkit-transform', 'translateY(0)')
        },
        fail: function () {
          y.resetSvg([{elem: e('#SVG_rect')}, {
            elem: e('#SVG_path'),
            length: e('#SVG_path')[0].getTotalLength()
          }, {elem: e('#SVG_line1'), length: 23}, {elem: e('#SVG_line2'), length: 23}, {
            elem: e('#SVG_line3'),
            length: 16
          }]), y.stopAnimate(), e('#channel_all').css('transform', 'translateY(0)'), e('#channel_all').css('-webkit-transform', 'translateY(0)')
        }
      })
    }
  }
  var y = new s
  o.prototype.init = function (e, t) {this.ele = e, this.generateHtml(), this._data = this.contactNews(t.news, t.live), this.start(this._data)}, o.prototype.start = function (t) {
    var n = e('.rotating-news')
    this.ele.show()
    var a = this
    this.changeNews(this._data[this._index], n), this.timerid = setInterval(function () {a._index >= a._data.length - 1 ? a._index = 0 : a._index += 1, a.changeNews(a._data[a._index], n)}, 3e4)
  }, o.prototype.stop = function () {clearInterval(this.timerid), clearTimeout(this.hideTimeid), this.ele.hide()}, o.prototype.generateHtml = function (e) {
    var t = this.template(e)
    this.ele.html(t)
  }, o.prototype.getType = function (e) {
    switch (e) {
      case'red':
        return '\u5feb\u8baf'
      case'blue':
        return '\u76f4\u64ad'
    }
  }, o.prototype.changeNews = function (e, t) {
    var n = this
    this.ele.removeClass('hide').addClass('show')
    var a = this.getType(e.type)
    t.find('.rotating-tips').removeClass('rotating_red'), t.find('.rotating-tips').removeClass('rotating_blue'), t.find('.rotating-tips').addClass('rotating_' + e.type), t.find('.rotating-tips').text(a), t.find('.rotating-content').text(e.title), t.find('.rotating-link').attr('href', e.link + '&from=indexScroll_news'), this.hideTimeid = setTimeout(function () {n.ele.removeClass('show').addClass('hide')}, 5e3)
  }, o.prototype.contactNews = function (t, n) {
    var a = []
    return n = n.slice(0, 10), t.length >= n.length ? t.forEach(function (t, l) {e.extend(t, {type: 'red'}), a.push(t), n[l] && (e.extend(n[l], {type: 'blue'}), a.push(n[l]))}) : n.forEach(function (n, l) {e.extend(n, {type: 'blue'}), a.push(n), t[l] && (e.extend(t[l], {type: 'red'}), a.push(t[l]))}), a
  }
  var k = new o
  e.extend(t.infoFlow.channelHandle, {
    all: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'section',
            attr: {'class': 'slidedown_tip'},
            template: Handlebars.templates.module_ui_slidedown_refresh_tpl
          }, {tag: 'div', attr: {'class': 'headslide'}}, {tag: 'div', attr: {'class': 'refresh_tip'}}, {
            tag: 'div',
            attr: {'class': 'swipe-content content-list'}
          }, {tag: 'div', attr: {'class': 'list-more'}, template: Handlebars.templates.listmore_tpl}]
        },
        init: function (n, i, s) {
          var o = this, h = {hasad: 1, loc: ''}
          if (o.setOffsetNum(n, function () {return 0}), e('.back_to_top').addClass('recommend').find('.refresh').addClass('has_num'), e('.refresh').on('click', function () {y.clickRefresh({DPData: h}), e(this).removeClass('has_num')}), s) {if (0 != e('#channel_' + n + ' .content-list section').length)return k.timerid && k.start(k._data), !1} else e('#channel_' + n).html('')
          o.createFrame('#channel_' + n, o.callHandle(n, i, 'getFrameConfig')), e('#channel_' + n + ' .list-more').show(), e('#channel_all .content-list').on('click', '.entry_unit', function (n) {
            var a = e(n.currentTarget).data('channel')
            'idol' === a ? (neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/tjlistinfo/#channel_entry_' + a, '\u4fe1\u606f\u6d41\u9891\u9053\u5165\u53e3-' + a, 'wapclick'), window.open('http://3g.163.com/touch/idol', '_blank')) : (stateman.go(':firstname(' + t.routename + a + ')', {param: {firstname: t.routename + a}}), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/tjlistinfo/#channel_entry_' + a, '\u4fe1\u606f\u6d41\u9891\u9053\u5165\u53e3-' + a, 'wapclick'))
          })
          var u = e('#SVG_rect'), f = e('#SVG_path'), v = e('#SVG_line1'), g = e('#SVG_line2'), w = e('#SVG_line3'),
            b = Math.ceil(f[0].getTotalLength()), S = 23, D = 23, x = 16
          f.css({'stroke-dasharray': b + '', 'stroke-dashoffset': b + ''}), v.css({
            'stroke-dasharray': S + '',
            'stroke-dashoffset': S + ''
          }), g.css({'stroke-dasharray': D + '', 'stroke-dashoffset': D + ''}), w.css({
            'stroke-dasharray': x + '',
            'stroke-dashoffset': x + ''
          }), d.slidedownRefresh({ele: e('#channel_all')}), e(window).on('slidestart', function () {e('.slidedown_tip_text').text('\u4e0b\u62c9\u66f4\u65b0')}), e(window).on('slidefail', function () {
            e('.slidedown_tip').css({
              transform: 'translateY(0)',
              '-webkit-transform': 'translateY(0)',
              transition: 'all .5s',
              '-webkit-transition': 'all .5s'
            }), y.resetSvg([{elem: u}, {elem: f, length: b}, {elem: v, length: S}, {elem: g, length: D}, {
              elem: w,
              length: x
            }])
          }), e(window).on('slidemoving', function (e, t, n) {
            n > 100 ? n = 100 : y < 0 && (n = 0), y.slideAnimate([{elem: u}, {
              elem: f,
              length: b
            }, {elem: v, length: S}, {elem: g, length: D}, {elem: w, length: x}], n)
          }), e(window).on('slideenough', function () {e('.slidedown_tip_text').text('\u677e\u5f00\u66f4\u65b0')}), e(window).on('slideunenough', function () {e('.slidedown_tip_text').text('\u4e0b\u62c9\u66f4\u65b0')}), e(window).on('slidesucc', function (t, n, a) {
            y.slidesuccTimes += 1
            var l = {miss: m.miss, refresh: m.refresh}
            e.extend(h, l), e('.slidedown_tip_text').text('\u66f4\u65b0\u4e2d...'), y.cycleSlideAnimate([{
              elem: v,
              length: S
            }, {elem: g, length: D}, {elem: w, length: x}]), y.refreshData({
              DPData: h,
              success: function () {
                neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/tjlistinfo/#sliderefresh' + y.slidesuccTimes, '\u63a8\u8350\u9891\u9053\u4e0b\u62c9\u66f4\u65b0-' + y.slidesuccTimes, 'wapclick'), neteaseTracker && neteaseTracker(), e('.refresh').removeClass('has_num'), y.resetSvg([{elem: u}, {
                  elem: f,
                  length: b
                }, {elem: v, length: S}, {elem: g, length: D}, {elem: w, length: x}]), y.stopAnimate(), a()
              },
              fail: function () {
                y.resetSvg([{elem: u}, {elem: f, length: b}, {elem: v, length: S}, {
                  elem: g,
                  length: D
                }, {elem: w, length: x}]), y.stopAnimate(), a()
              }
            })
          })
          var T
          T = 'A' === r ? _ + '/touch/jsonp/sy/recommend/0-10.html' : _ + '/touch/jsonp/sy/v2/recommend/0-10.html', c.publicMethod.fetch({
            url: T,
            DPData: {hasad: 1},
            dataType: 'jsonp',
            cache: !0,
            success: function (s) {
              m = s.other, neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/tjlistinfo/#bottom00', '\u63a8\u8350\u9891\u9053\u4e0b\u62c9\u9875\u7801-00', 'wapclick'), y.initRefreshTip(function () {window.scrollTo(0, 0), e('.refresh').removeClass('has_num'), y.clickRefresh({DPData: h})})
              var r = s.focus.concat(s.list).concat(s.bottom).concat(s.banner),
                c = e.grep(s.list, function (e, t) {return o.simple && (e.addata || 'docStarAttitude' === e.type || 'attitude_board' === e.type || (e.type = 'doc_simple')), !e.addata})
              p = c.shift(), p.type = 'single_text', y.listData = y.listData.concat(c), l(r, function () {
                o.simple && e.each(r, function (e, t) {t.addata || 'docStarAttitude' === t.type || 'attitude_board' === t.type || (t.type = 'doc_simple')}), e('#channel_' + n + ' .list-more').hide(), e(window).trigger('getADSucc', [s, n, i]), s.focus = s.focus.slice(0, 8), a({
                  ele: e('#channel_' + n + ' .headslide'),
                  data: s
                }), 0 != e('#channel_' + n + ' .headslide li').length && t.makeScroll({
                  id: '#channel_' + n,
                  autoSlider: !1,
                  autoTime: 5e3,
                  openSlider: !0
                }), a({ele: e('#channel_' + n + ' .content-list'), data: s.list}), y.hideEmptyListAD()
              }), k.init(e('.scroll-news'), s)
            }
          })
        },
        bottom: function () {
          var i = this, s = i.channel, o = {hasad: 1}, d = !1, u = function () {
            var t, u, p
            p = 'A' === r ? _ + '/touch/jsonp/sy/recommend/' + i.offset[s] + '-10.html' : _ + '/touch/jsonp/sy/v2/recommend/' + i.offset[s] + '-10.html', c.publicMethod.fetch({
              url: p,
              DPData: o,
              dataType: 'jsonp',
              cache: !0,
              success: function (o) {
                i.offset[s] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/tjlistinfo/#bottom' + i.offset[s] / 10, '\u63a8\u8350\u9891\u9053\u4e0b\u62c9pv-' + i.offset[s] / 10, 'wapclick')), m = o.other, i.setBottomLock(s, !1), e('#channel_' + s + ' .list-more').hide(), u = e.grep(o.list, function (e, t) {
                  if (i.simple && (e.addata || 'docStarAttitude' === e.type || 'attitude_board' === e.type || (e.type = 'doc_simple')), 'docAppClient' == e.type && (d = !0), 'docYunRead' == e.type) {
                    var n = b.id || '', a = 0, l = 0
                    o.other.dataYunRead.forEach(function (e, t) {e.docid == n && (a = t)}), l = a < o.other.dataYunRead.length - 1 ? a + 1 : 0, b.update(o.other.dataYunRead[l].docid)
                    var s = o.other.dataYunRead[a]
                    e.type = 'doc_yunread', e.category = s.category, e.digest = s.digest, e.docid = s.docid, e.imgsrc3gtype = s.imgsrc3gtype, e.link = s.link, e.picInfo = s.picInfo, e.pic_info = s.picInfo, e.ptime = s.ptime, e.source = s.source, e.tag = s.tag, e.tcount = s.tcount, e.title = s.title
                  }
                  return !e.addata
                }), y.listData = y.listData.concat(u), y.hasSlide ? (o.list = e.grep(o.list, function (e, t) {return i.simple && (e.addata || 'docStarAttitude' === e.type || 'attitude_board' === e.type || (e.type = 'doc_simple')), !e.addata}), t = h.getADDetailData(s, i.child), c.publicMethod.generateHtml(e('#channel_' + s + ' .content-list'), o.list, t, 'after'), h.replaceListAD(e('#channel_' + s + ' .content-list section'), t), d && n()) : l(o.list, function () {
                  i.simple && e.each(o.list, function (e, t) {t.addata || 'docStarAttitude' === t.type || 'attitude_board' === t.type || (t.type = 'doc_simple')}), a({
                    ele: e('#channel_' + s + ' .content-list'),
                    data: o.list,
                    append: 'after'
                  }), y.hideEmptyListAD(), d && n()
                })
              },
              error: function () {e('#channel_' + s + ' .list-more .loading').hide(), e('#channel_' + s + ' .list-more .loadtext').text('\u6682\u65f6\u6ca1\u6709\u66f4\u591a\u65b0\u95fb')}
            })
          }, p = {miss: m.miss, refresh: m.refresh}
          e.extend(o, p), e('#channel_' + s + ' .list-more').show(), i.setOffsetNum(s, function (e) {return e += 10}), i.setBottomLock(s, !0), t.DP.loc.result.province || t.DP.loc.result.city ? (20 == i.offset.all && (o.loc = t.DP.loc.result.province + '_' + t.DP.loc.result.city), u()) : t.DP.loc.update().done(function () {20 == i.offset.all && (o.loc = t.DP.loc.result.province + '_' + t.DP.loc.result.city), u()})
        },
        ADListSucc: function (e, t, n) {},
        noAD: function (e, t) {},
        ADSucc: function (e, t) {},
        left: function () {e('.refresh_tip').removeClass('show'), e('.back_to_top').removeClass('recommend'), clearTimeout(y.timer2), k.stop()}
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {}

  var a = t.tools, l = t.ad, i = (t.indexTools, t.Nav)
  e.extend(!0, i.hasSpecificStyle, {photo: ''}), e.extend(!0, i.noBottomLine, {photo: ''}), e.extend(!0, i.otherChannelConfig, {
    photo: {
      childbar: '.childchannel-photoset',
      child: '.childchannel-photoset .item_cell'
    }
  }), n.prototype.generatePhotoChannelHtml = function (t, n, l, i) {
    var s = [], o = [], r = t.find('.content-list-east'), c = t.find('.content-list-west'), h = {list: []},
      d = {list: []}
    e.each(l && l.list || [], function (e, t) {e % 2 === 0 ? h.list.push(t) : d.list.push(t)}), e.each(n, function (e, t) {t.type = 'photoset_square', e % 2 == 0 && s.length < .4 * n.length ? s.push(t) : o.push(t)}), r.height() > c.height() ? (a.publicMethod.generateHtml(r, s, h, i, 'waterfallsNoAD_tpl'), a.publicMethod.generateHtml(c, o, d, i, 'waterfallsNoAD_tpl')) : (a.publicMethod.generateHtml(c, s, d, i, 'waterfallsNoAD_tpl'), a.publicMethod.generateHtml(r, o, h, i, 'waterfallsNoAD_tpl'))
  }, n.prototype.replacePhotoChannelListAD = function (e, t) {l.replaceListAD(e.find('.content-list-east section'), t), l.replaceListAD(e.find('.content-list-west section'), t)}
  var s = new n
  e.extend(t.infoFlow.channelHandle, {
    photo: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'headslide'}
          }, {
            tag: 'div',
            attr: {'class': 'swipe-content childchannel-photoset'},
            template: Handlebars.templates.photosetchild_tpl
          }, {
            tag: 'div',
            attr: {'class': 'swipe-content content-list'},
            template: Handlebars.templates.photosetlist_tpl
          }, {tag: 'div', attr: {'class': 'list-more'}, template: Handlebars.templates.listmore_tpl}]
        },
        init: function (t, n, i) {
          var s = this
          if (s.setOffsetNum(t, function () {return 0}), i) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t + ' .content-list div').html('')
          s.createFrame('#channel_' + t, s.callHandle(t, n, 'getFrameConfig')), e('#channel_' + t + ' .list-more').show(), a.publicMethod.fetch({
            DPData: {
              offset: s.offset[t],
              size: 20,
              channel: s.channelId,
              child: n
            },
            useflag: !1,
            url: 'newap_photo_list',
            success: function (a) {l.getChannelAllAD(l.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})}
          })
        },
        bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 20}), t.setBottomLock(n, !0), a.publicMethod.fetch({
            DPData: {
              offset: t.offset[n],
              size: 20,
              channel: t.channelId,
              child: t.child
            },
            useflag: !1,
            url: 'newap_photo_list',
            success: function (a) {
              t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + '_' + t.child + 'listinfo/#bottom' + t.offset[n] / 20, n + '_' + t.child + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 20, 'wapclick')), t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide()
              var i = l.getADDetailData(n, t.child)
              s.generatePhotoChannelHtml(e('#channel_' + n + ' .content-list'), a.listdata.data, i, 'after'), s.replacePhotoChannelListAD(e('#channel_' + n + ' .content-list'), i)
            },
            error: function (e) {t.setBottomLock(n, !1)}
          })
        },
        ADListSucc: function (t, n, l) {a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata, t), s.generatePhotoChannelHtml(e('#channel_' + l + ' .content-list'), n.listdata.data, t)},
        noAD: function (n, l) {
          0 == e('#channel_' + l + ' .headslide li').length && (a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata), 0 != e('#channel_' + l + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + l,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          })), s.generatePhotoChannelHtml(e('#channel_' + l + ' .content-list'), n.listdata.data)
        },
        ADSucc: function (n, a) {
          l.replaceFocusAD(e('#channel_' + a + ' .headslide li'), n), 0 != e('#channel_' + a + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + a,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          }), s.replacePhotoChannelListAD(e('#channel_' + a + ' .content-list'), n)
        }
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {this.share = null}

  var a = t.tools, l = t.ad, i = (t.indexTools, t.Static || {})
  n.prototype.generateJokeHtml = function (t, n, l, i) {e.each(n, function (e, t) {t.type = 'joke_doc'}), a.publicMethod.generateHtml(t, n, l, i)}, n.prototype.handleClick = function () {
    e('#channel_joke').on('click', '.gif_wrap', function (t) {
      t.preventDefault()
      var n = new Image, a = e(this).parent().children('img'), l = a.data('ourl'), i = this
      n.onload = function () {e(i).parent().addClass('collapse'), e(i).remove(), a.attr('src', l)}, n.src = l, e(this).children().removeClass('play-btn-joke').addClass('loading-btn-joke')
    })
  }, n.prototype.handleGifFail = function () {e('.js-imghook').on('error', function (t) {e(this).removeClass('js-imghook'), e(this).attr('src', 'http://img2.cache.netease.com/f2e/wap/touch_index_2016/trunk/images/joke_gif.png')})}, n.prototype.toggleLongImg = function () {e('#channel_joke').on('click', '.more', function (t) {t.preventDefault(), e(this).parent().children('.m_article_img').addClass('collapse'), e(this).hide()})}, n.prototype.handleShare = function () {
    var t = this
    e('#channel_joke').on('click', '.share-joke', function (n) {
      var a = {
        shareSummary: e(this).data('digest'),
        shareTitle: e(this).data('title'),
        shareImg: e(this).data('img'),
        shareLink: e(this).data('link')
      }
      if (t.share) t.share.changeShareConfig(a) else {
        var l = new i.Share('.js-share-mask', a, {})
        l.render(), t.share = l
      }
      e(window).trigger('Share:show')
    })
  }
  var s = new n
  e.extend(t.infoFlow.channelHandle, {
    joke: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'swipe-content content-list'}
          }, {tag: 'div', attr: {'class': 'list-more'}, template: Handlebars.templates.listmore_tpl}]
        },
        init: function (t, n, i) {
          var o = this
          if (o.setOffsetNum(t, function () {return 0}), i) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
          o.createFrame('#channel_' + t, o.callHandle(t, n, 'getFrameConfig')), s.handleClick(), s.toggleLongImg(), s.handleShare(), e('#channel_' + t + ' .list-more').show(), a.publicMethod.fetch({
            DPData: {
              offset: o.offset[t],
              channel: o.channelId
            },
            useflag: !1,
            url: 'newap_joke_list',
            success: function (a) {l.getChannelAllAD(l.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})}
          })
        },
        bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10}), t.setBottomLock(n, !0), a.publicMethod.fetch({
            DPData: {
              offset: t.offset[n],
              channel: t.channelId
            },
            url: 'newap_joke_list',
            useflag: !1,
            success: function (a) {t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + 'listinfo/#bottom' + t.offset[n] / 10, n + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick')), t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide(), s.generateJokeHtml(e('#channel_' + n + ' .content-list'), a.listdata.data, 'after'), s.handleGifFail()},
            error: function () {t.setBottomLock(n, !1)}
          })
        },
        ADListSucc: function (e, t, n) {},
        noAD: function (t, n) {s.generateJokeHtml(e('#channel_' + n + ' .content-list'), t.listdata.data), s.handleGifFail()},
        ADSucc: function (e, t) {}
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {this.currentCity = {}, this.popup = null}

  var a = t.tools, l = t.ad, i = t.indexTools
  n.prototype = {
    getLocalType: function (e) {
      var t = JSON.parse(i.storageLocalVal({key: 'local_info'})) || {}, n = this
      n.updateLocalCityInfo(function (a) {t.selectCity ? (n.currentCity = t.selectCity, e && e(a, t.selectCity)) : t.lastCity && a.city != t.lastCity.city ? n.selectTip('\u7cfb\u7edf\u68c0\u6d4b\u5230\u60a8\u73b0\u5728\u5728' + a.city + ',\u662f\u5426\u5207\u6362\u5230' + a.city + '?').then(function () {n.currentCity = a, e && e(a)}, function () {n.currentCity = t.lastCity, e && e(a, t.lastCity)}) : (n.currentCity = a, e && e(a))}, function () {
        t.selectCity ? (n.currentCity = t.selectCity, e && e(void 0, t.selectCity)) : t.lastCity ? (n.currentCity = t.lastCity, e && e(void 0, t.lastCity)) : (n.currentCity = {
          province: '\u5317\u4eac\u5e02',
          city: '\u5317\u4eac\u5e02',
          gcity: '\u5317\u4eac',
          sname: ''
        }, e && e(void 0, n.currentCity))
      })
    },
    selectTip: function (t) {
      var n = e.Deferred(), a = this.getPopup(function () {a.hide(), n.resolve()}, function () {a.hide(), n.reject()})
      return a.find('.warning_content h1').text('\u63d0\u793a'), a.find('.warning_content p').text(t), a.find('.warning_cancel').text('\u53d6\u6d88'), a.find('.warning_enter').text('\u5207\u6362'), a.show(), n.promise()
    },
    getPopup: function (t, n) {
      var a = Handlebars.templates.warning_box_tpl()
      return this.popup || (this.popup = e('.js-warning-mask').append(a), this.popup.find('.warning_cancel').click(n), this.popup.find('.warning_enter').click(t), this.popup.on('touchmove touchstart', function (e) {e.preventDefault()})), this.popup
    },
    updateLocalCityInfo: function (e, n) {t.DP.loc.result ? e && e(t.DP.loc.result) : t.DP.loc.update().then(function (t) {e && e(t.result)}, function () {n && n()})},
    setLastCity: function (e) {
      var t = JSON.parse(i.storageLocalVal({key: 'local_info'})) || {}
      t.lastCity = {province: e.province, city: e.city}
      var n = JSON.stringify(t)
      i.storageLocalVal({key: 'local_info', str: n})
    },
    addCitySwitch: function (e) {
      var t
      t = location.href.indexOf('dev.f2e') > -1 ? '/wap/touch_special_local/city_list/index.html' : 'http://3g.163.com/wap/special/city_list/'
      var n = Handlebars.templates.module_ui_local_flag_tpl({href: t})
      0 != e.find('.change_position').length && e.find('.change_position').remove(), e.append(n)
    }
  }
  var s = new n
  e.extend(t.infoFlow.channelHandle, {
    local: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'headslide'}
          }, {tag: 'div', attr: {'class': 'swipe-content content-list'}}, {
            tag: 'div',
            attr: {'class': 'list-more'},
            template: Handlebars.templates.listmore_tpl
          }]
        },
        init: function (t, n, i) {
          var o = this
          if (o.setOffsetNum(t, function () {return 0}), i) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
          o.createFrame('#channel_' + t, o.callHandle(t, n, 'getFrameConfig')), e('#channel_' + t + ' .list-more').show(), s.getLocalType(function (i, r) {
            i && s.setLastCity(i)
            var c = {offset: o.offset[t], channel: o.channelId}
            r && e.extend(c, {city: (r.province || '') + '_' + (r.gcity || r.city || '')}), s.addCitySwitch(e('#channel_' + t + ' .headslide')), a.publicMethod.fetch({
              DPData: c,
              useflag: !1,
              cache: !0,
              url: 'newap_article_list',
              success: function (a) {r ? document.title = r.gcity + '-\u624b\u673a\u7f51\u6613\u7f51' : (document.title = a.otherinfo.city + '-\u624b\u673a\u7f51\u6613\u7f51', e('.nav_local span').text(a.otherinfo.city), e('#topchild_local .topnav_item_text').text(a.otherinfo.city)), l.getChannelAllAD(l.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})}
            })
          })
        },
        bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10}), t.setBottomLock(n, !0)
          var l = {offset: t.offset[n], channel: t.channelId, city: s.currentCity.province + '_' + s.currentCity.city}
          a.publicMethod.fetch({
            useflag: !1,
            DPData: l,
            cache: !0,
            url: 'newap_article_list',
            success: function (l) {t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + 'listinfo/#bottom' + t.offset[n] / 10, n + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick')), t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide(), a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), l.listdata.data, 'after')},
            error: function (e) {t.setBottomLock(n, !1)}
          })
        },
        left: function () {},
        ADListSucc: function (e, t, n) {},
        noAD: function (t, n) {a.publicMethod.generateHtml(e('#channel_' + n + ' .headslide'), t.topdata, 'after'), 0 == e('#channel_local .headslide .slides').length && e('#channel_' + n + ' .headslide').find('.change_position').addClass('column'), a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), t.listdata.data)},
        ADSucc: function (e, t) {}
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {this.template = Handlebars.templates.module_ui_auto_link_tpl, this.ele = void 0}

  var a = t.tools, l = t.ad
  t.Nav, t.indexTools
  n.prototype.init = function (e) {this.ele = e, this.generateHtml()}, n.prototype.generateHtml = function (e) {
    var t = this.template(e)
    this.ele.html(t)
  }
  var i = new n
  e.extend(t.infoFlow.channelHandle, {
    auto: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'headslide'}
          }, {tag: 'div', attr: {'class': 'swipe-content link-auto'}}, {
            tag: 'div',
            attr: {'class': 'swipe-content content-list'}
          }, {tag: 'div', attr: {'class': 'list-more'}, template: Handlebars.templates.listmore_tpl}]
        },
        init: function (t, n, s) {
          var o = this
          if (o.setOffsetNum(t, function () {return 0}), s) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
          o.createFrame('#channel_' + t, o.callHandle(t, n, 'getFrameConfig')), e('#channel_' + t + ' .list-more').show(), i.init(e('#channel_' + t + ' .link-auto')), a.publicMethod.fetch({
            DPData: {
              channel: o.channelId,
              child: n
            },
            useflag: !1,
            success: function (a) {o.simple && e.each(a.listdata.data, function (e, t) {t.type = 'doc_simple'}), l.getChannelAllAD(l.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})},
            error: function (e) {console.log(e)}
          })
        },
        bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10}), t.setBottomLock(n, !0), a.publicMethod.fetch({
            DPData: {
              offset: t.offset[n],
              channel: t.channelId,
              child: t.child
            },
            useflag: !1,
            success: function (i) {
              t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + 'listinfo/#bottom' + t.offset[n] / 10, n + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick')), t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide(), t.simple && e.each(i.listdata.data, function (e, t) {t.type = 'doc_simple'})
              var s = l.getADDetailData(n, t.child)
              a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), i.listdata.data, s, 'after'), l.replaceListAD(e('#channel_' + n + ' .content-list section'), s)
            },
            error: function (e) {t.setBottomLock(n, !1)}
          })
        },
        ADListSucc: function (t, n, l) {a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata, t), a.publicMethod.generateHtml(e('#channel_' + l + ' .content-list'), n.listdata.data, t)},
        noAD: function (n, l) {
          a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata), a.publicMethod.generateHtml(e('#channel_' + l + ' .content-list'), n.listdata.data), 0 != e('#channel_' + l + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + l,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          })
        },
        ADSucc: function (n, a) {
          l.replaceFocusAD(e('#channel_' + a + ' .headslide li'), n), 0 != e('#channel_' + a + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + a,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          }), l.replaceListAD(e('#channel_' + a + ' .content-list section'), n)
        }
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {this.starInfo = void 0, this.championInfo = null}

  function a () {this.template = Handlebars.templates.module_ui_stars_rank_tpl, this.ele = void 0, this.rankPageLink = 'http://3g.163.com/touch/idol_ranklist.html'}

  function l () {this.template = Handlebars.templates.module_ui_idol_banner_tpl}

  var i = t.tools, s = t.ad, o = (t.Nav, t.indexTools)
  n.prototype = {
    scroll: function () {
      var n, a = e(window).scrollTop(), l = 0, i = e('.u_topmenu').offset().height,
        s = e('.bar_wrap').offset().height + i, o = this
      e(window).on('scroll', function (i) {
        var r = e(window).scrollTop() - a > 0 ? 'down' : 'up', c = n !== r
        c && (l = 0), n = r, a = e(window).scrollTop(), 'idol' === t.infoFlow.channel && (0 == l && 'down' == r && e(window).scrollTop() > s ? (l += 1, o.toggleSubNav('hide')) : 0 == l && 'up' == r && e(window).scrollTop() < s && (l += 1, o.toggleSubNav('show')))
      })
    },
    toggleSubNav: function (t) {'hide' == t ? e('#channel_wrap_idol').addClass('nav_hide') : e('#channel_wrap_idol').removeClass('nav_hide')},
    getChampionInfo: function () {
      var e = this
      return e.championInfo ? (e.renderTopBar(e.championInfo.icon, 'http://3g.163.com/touch/idol_ranklist.html'), !1) : void t.tools.publicMethod.fetch({
        url: 'http://star.3g.163.com/star/rank/champion.html',
        notformat: !0,
        dataType: 'jsonp',
        cache: !0,
        jsonpCallback: 'getChampiondata',
        success: function (t) {
          var n = t.data
          e.championInfo = n, e.renderTopBar(n.icon, 'http://3g.163.com/touch/idol_ranklist.html')
        }
      })
    },
    renderTopBar: function (t, n) {
      var a = ''
      t && n && (a = '<div class="u-ad-wrap column"><a href="' + n + '"><img src="' + t + '" alt=""></a></div>'), e('.u-top-idol').html(a)
    },
    getNextMondayDate: function () {
      var e = new Date, t = e.getTime(), n = e.getDay(), a = 7 - n + 1, l = 24 * a * 60 * 60 * 1e3, i = t + l,
        s = new Date(i), r = o.dateFormat.call(s, 'yyyy-MM-dd'), c = new Date(r + ' 00:00:00')
      return c
    },
    setChampionCookie: function (e, t) {
      var n = this.getNextMondayDate(), a = JSON.stringify(t)
      cookie.setItem(e, a, n, '/', '163.com')
    },
    checkIdolNew: function (t) {
      var n = !1
      return e.each(t, function (e, t) {if (3 == parseInt(t.status))return n = !0, !1}), n
    }
  }, a.prototype = new n, a.prototype.init = function (e) {this.ele = e, this.getRankData()}, a.prototype.getRankData = function () {
    var e = this
    i.publicMethod.fetch({
      dataType: 'jsonp',
      useflag: !1,
      notformat: !0,
      cache: !0,
      jsonpCallback: 'getRankList',
      url: 'http://star.3g.163.com/star/rank/list/0-3.html',
      success: function (t) {e.generateRankList(t.data)},
      error: function (e) {console.log(e)}
    })
  }, a.prototype.transRankList = function (t) {
    var n = {}
    return e.each(t, function (e, t) {n['rank_' + (t.currentRank - 1)] = t}), n.rankPageLink = this.rankPageLink, n
  }, a.prototype.generateRankList = function (e) {
    var t = '', n = this.transRankList(e)
    t += this.template(n), this.ele.html(t)
  }
  var r = new a
  l.prototype.init = function (e) {this.ele = e, this.getDataAndRender()}, l.prototype.getDataAndRender = function (e) {
    var t = this
    i.publicMethod.fetch({
      dataType: 'jsonp',
      useflag: !1,
      notformat: !0,
      cache: !0,
      jsonpCallback: 'getIdolData',
      url: 'http://star.3g.163.com/star/ppk/isActivityOK.html',
      success: function (e) {t.render(e.data)},
      error: function (e) {console.log(e)}
    })
  }, l.prototype.render = function (t) {
    var n = ''
    3 == t && (n += this.template(), this.ele.html(n), e('#channel_ent .rank-list').hide())
  }
  var c = new l
  e.extend(t.infoFlow.channelHandle, {
    ent: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'headslide'}
          }, {tag: 'div', attr: {'class': 'swipe-content content-list'}}, {
            tag: 'div',
            attr: {'class': 'list-more'},
            template: Handlebars.templates.listmore_tpl
          }]
        },
        init: function (t, n, a) {
          var l = this
          if (l.setOffsetNum(t, function () {return 0}), a) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
          l.createFrame('#channel_' + t, l.callHandle(t, n, 'getFrameConfig')), e('#channel_' + t + ' .list-more').show(), i.publicMethod.fetch({
            DPData: {
              channel: l.channelId,
              child: n
            },
            useflag: !1,
            success: function (a) {l.simple && e.each(a.listdata.data, function (e, t) {t.type = 'doc_simple'}), s.getChannelAllAD(s.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})},
            error: function (e) {console.log(e)}
          })
        },
        bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10}), t.setBottomLock(n, !0), i.publicMethod.fetch({
            DPData: {
              offset: t.offset[n],
              channel: t.channelId,
              child: t.child
            },
            useflag: !1,
            success: function (a) {
              t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + '_' + t.child + 'listinfo/#bottom' + t.offset[n] / 10, n + '_' + t.child + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick')), t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide(), t.simple && e.each(a.listdata.data, function (e, t) {t.type = 'doc_simple'})
              var l = s.getADDetailData(n, t.child)
              i.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), a.listdata.data, l, 'after'), s.replaceListAD(e('#channel_' + n + ' .content-list section'), l)
            },
            error: function (e) {t.setBottomLock(n, !1)}
          })
        },
        ADListSucc: function (t, n, a) {i.publicMethod.generateHtml(e('#channel_' + a + ' .headslide'), n.topdata, t), i.publicMethod.generateHtml(e('#channel_' + a + ' .content-list'), n.listdata.data, t)},
        noAD: function (n, a) {
          i.publicMethod.generateHtml(e('#channel_' + a + ' .headslide'), n.topdata), i.publicMethod.generateHtml(e('#channel_' + a + ' .content-list'), n.listdata.data), 0 != e('#channel_' + a + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + a,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          })
        },
        ADSucc: function (n, a) {
          s.replaceFocusAD(e('#channel_' + a + ' .headslide li'), n), 0 != e('#channel_' + a + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + a,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          }), s.replaceListAD(e('#channel_' + a + ' .content-list section'), n)
        }
      },
      all: {
        getFrameConfig: function () {
          return [{tag: 'div', attr: {'class': 'headslide'}}, {
            tag: 'div',
            attr: {'class': 'swipe-content rank-list'}
          }, {tag: 'div', attr: {'class': 'swipe-content idol-banner'}}, {
            tag: 'div',
            attr: {'class': 'swipe-content content-list'}
          }, {tag: 'div', attr: {'class': 'list-more'}, template: Handlebars.templates.listmore_tpl}]
        },
        init: function (t, n, a) {
          var l = this
          if (l.setOffsetNum(t, function () {return 0}), a) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
          l.createFrame('#channel_' + t, l.callHandle(t, n, 'getFrameConfig')), e('#channel_' + t + ' .list-more').show(), c.init(e('#channel_' + t + ' .idol-banner')), r.init(e('#channel_' + t + ' .rank-list')), i.publicMethod.fetch({
            DPData: {
              channel: l.channelId,
              child: n
            },
            useflag: !1,
            success: function (a) {l.simple && e.each(a.listdata.data, function (e, t) {t.type = 'doc_simple'}), s.getChannelAllAD(s.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})},
            error: function (e) {console.log(e)}
          })
        },
        bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10}), t.setBottomLock(n, !0), i.publicMethod.fetch({
            DPData: {
              offset: t.offset[n],
              channel: t.channelId,
              child: t.child
            },
            useflag: !1,
            success: function (a) {
              t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + '_alllistinfo/#bottom' + t.offset[n] / 10, n + '_all\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick')), t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide(), t.simple && e.each(a.listdata.data, function (e, t) {t.type = 'doc_simple'})
              var l = s.getADDetailData(n, t.child)
              i.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), a.listdata.data, l, 'after'), s.replaceListAD(e('#channel_' + n + ' .content-list section'), l)
            },
            error: function (e) {t.setBottomLock(n, !1)}
          })
        },
        ADListSucc: function (t, n, a) {i.publicMethod.generateHtml(e('#channel_' + a + ' .headslide'), n.topdata, t), i.publicMethod.generateHtml(e('#channel_' + a + ' .content-list'), n.listdata.data, t)},
        noAD: function (n, a) {
          i.publicMethod.generateHtml(e('#channel_' + a + ' .headslide'), n.topdata), i.publicMethod.generateHtml(e('#channel_' + a + ' .content-list'), n.listdata.data), 0 != e('#channel_' + a + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + a,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          })
        },
        ADSucc: function (n, a) {
          s.replaceFocusAD(e('#channel_' + a + ' .headslide li'), n), 0 != e('#channel_' + a + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + a,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          }), s.replaceListAD(e('#channel_' + a + ' .content-list section'), n)
        }
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {this.NBATemplate = Handlebars.templates.module_ui_sport_live_tpl, this.UETemplate = Handlebars.templates.module_ui_sport_live_ue_tpl}

  var a = t.tools, l = t.ad, i = t.indexTools
  t.Nav
  e('.contents').on('click', '.sports_subnav_list a', function (e) {
    e.preventDefault()
    var n = e.currentTarget, a = n.getAttribute('href'), l = t.tools.publicMethod.localParam(a)
    neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/sports_subnav/#all', '\u4f53\u80b2\u5b50\u5bfc\u822a\u70b9\u51fb\u603b\u91cf', 'wapclick'), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/sports_subnav/#' + l.search.cid, '\u4f53\u80b2\u5b50\u5bfc\u822a\u70b9\u51fb' + l.search.cid, 'wapclick'), location.href = a
  }), n.prototype = {
    transdata: function (t) {
      var n = []
      return e.each(t, function (t, a) {e.each(a, function (e, a) {a.liveday = t, n.push(a)})}), n
    },
    processUEData: function (e, t) {
      var n = new Date, a = i.dateFormat.call(n, 'yyyy-MM-dd'), l = e.currentDay || a, s = new Date(l), o = s.getTime(),
        r = 864e5, c = new Date(o - r), h = i.dateFormat.call(c, 'yyyy-MM-dd'), d = new Date(o + r),
        u = i.dateFormat.call(d, 'yyyy-MM-dd'), m = {}
      return t && (m[h] = e[h] || []), m[l] = e[l] || [], m[u] = e[u] || [], m
    },
    getSportsData: function () {
      return a.publicMethod.fetch({
        url: 'http://api.sports.126.net/api/dataBox/sports_api.json',
        dataType: 'jsonp',
        cache: !0,
        jsonp: 'jsoncallback',
        jsonpCallback: 'getAllNBAMatch',
        notformat: !0,
        useflag: !1,
        success: function (e) {},
        error: function (e) {console.log(e)}
      })
    },
    getUEData: function () {
      return a.publicMethod.fetch({
        url: 'http://goal.sports.163.com/api/schedule/recent5DaysCalenders.json?callback=recent5scheduleCallBack',
        dataType: 'jsonp',
        cache: !0,
        jsonp: 'jsoncallback',
        jsonpCallback: 'getUEMatch',
        notformat: !0,
        useflag: !1,
        success: function (e) {},
        error: function (e) {console.log(e)}
      })
    },
    getAllLiveData: function () {return e.when(this.getSportsData())},
    separateData: function (t, n) {
      var a = [], l = [], i = []
      return n ? e.each(t, function (e, t) {'CSL' !== t.projectId && ('\u672a\u5f00\u8d5b' == t.status ? l.push(t) : '\u8fdb\u884c\u4e2d' == t.status ? a.push(t) : i.push(t))}) : e.each(t, function (e, t) {0 == t.matchstat || 3 == t.matchstat ? l.push(t) : 1 == t.matchstat ? a.push(t) : i.push(t)}), {
        matching: a,
        beforeMatch: l,
        afterMatch: i
      }
    },
    renderLive: function (t, n) {
      var a = '', l = this
      e.each(n.matching, function (e, t) {a += t.location ? l.NBATemplate(t) : l.UETemplate(t)}), e.each(n.beforeMatch, function (e, t) {a += t.location ? l.NBATemplate(t) : l.UETemplate(t)}), a += Handlebars.templates.module_ui_sport_separate_over_tpl()
      var i = ''
      e.each(n.afterMatch, function (e, t) {
        var n = ''
        n += t.location ? l.NBATemplate(t) : l.UETemplate(t), n += i, i = n
      }), a += i, t.html(a)
    },
    renderMatchScrollWrap: function (e, t) {
      var n = t.matching.concat(t.beforeMatch), a = Handlebars.templates.module_ui_sport_score_box3_tpl,
        l = Handlebars.templates.module_ui_sport_score_box2_tpl,
        i = Handlebars.templates.module_ui_sport_score_box1_tpl, s = ''
      n.length >= 3 ? s = i({data: n}) : 2 == n.length ? s = l({data: n}) : 1 == n.length ? s = 0 == t.afterMatch.length ? a({data: n}) : l({data: n.concat(t.afterMatch.pop())}) : e.hide(), e.html(s)
    },
    getLiveUserCount: function () {
      var t = [], n = 0
      return e('#channel_sports .live1.status1,#channel_sports .live1.status2').each(function () {t.push(e(this).data('roomid'))}), 0 != t.length && void function l () {
        var i = t[n]
        a.publicMethod.jsonp({
          url: 'http://data.live.126.net/partake/usercount/' + i + '.json?callback=liveUsercount',
          callbackName: 'liveUsercount'
        }).then(function (a) {
          var i = e('#channel_sports .content-list section').filter(function () {return e(this).data('roomid') == t[n]})
          i.find('.watchcount').text(a.msg.user_count), n < t.length - 1 && (n += 1, l())
        }, function (e) {n < t.length - 1 && (n += 1, l())})
      }()
    }
  }
  var s = new n
  e.extend(t.infoFlow.channelHandle, {
    sports: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'headslide'}
          }, {tag: 'div', attr: {'class': 'match_scroll_wrap'}}, {
            tag: 'div',
            attr: {'class': 'sports_subnav'},
            template: Handlebars.templates.module_ui_subnav_tpl
          }, {tag: 'div', attr: {'class': 'swipe-content content-list'}}, {
            tag: 'div',
            attr: {'class': 'list-more'},
            template: Handlebars.templates.listmore_tpl
          }]
        },
        init: function (t, n, i) {
          var o = this
          if (o.setOffsetNum(t, function () {return 0}), i) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
          o.createFrame('#channel_' + t, o.callHandle(t, n, 'getFrameConfig')), e('#channel_' + t + ' .list-more').show(), s.getAllLiveData().then(function (n) {
            var a = s.transdata(n), l = s.separateData(a, !0),
              i = {beforeMatch: l.beforeMatch, matching: l.matching, afterMatch: l.afterMatch}
            s.renderMatchScrollWrap(e('#channel_' + t + ' .match_scroll_wrap'), i)
          }), a.publicMethod.fetch({
            DPData: {channel: o.channelId, child: n},
            useflag: !1,
            success: function (a) {o.simple && e.each(a.listdata.data, function (e, t) {t.type = 'doc_simple'}), l.getChannelAllAD(l.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})},
            error: function (e) {console.log(e)}
          })
        },
        bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10}), t.setBottomLock(n, !0), a.publicMethod.fetch({
            DPData: {
              offset: t.offset[n],
              channel: t.channelId,
              child: t.child
            },
            useflag: !1,
            success: function (i) {
              t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + 'listinfo/#bottom' + t.offset[n] / 10, n + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick')), t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide(), t.simple && e.each(i.listdata.data, function (e, t) {t.type = 'doc_simple'})
              var s = l.getADDetailData(n, t.child)
              a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), i.listdata.data, s, 'after'), l.replaceListAD(e('#channel_' + n + ' .content-list section'), s)
            },
            error: function (e) {t.setBottomLock(n, !1)}
          })
        },
        ADListSucc: function (t, n, l) {a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata, t), a.publicMethod.generateHtml(e('#channel_' + l + ' .content-list'), n.listdata.data, t)},
        noAD: function (n, l) {
          a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata), a.publicMethod.generateHtml(e('#channel_' + l + ' .content-list'), n.listdata.data), 0 != e('#channel_' + l + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + l,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          })
        },
        ADSucc: function (n, a) {
          l.replaceFocusAD(e('#channel_' + a + ' .headslide li'), n), 0 != e('#channel_' + a + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + a,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          }), l.replaceListAD(e('#channel_' + a + ' .content-list section'), n)
        }
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {this.share = null, this.offset = 0, this.length = 10}

  Handlebars.registerHelper('date_format', function (e, t) {return e = new Date(e), e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate()}), Handlebars.registerHelper('fixThousands', function (e) {
    if (e < 1e4)return e
    var t = Math.floor(e / 1e3)
    return t / 10 + '\u4e07'
  }), Handlebars.registerHelper('tieUrl', function (e, n) {
    if (n.indexOf('photoview') !== -1 && n.indexOf('help') === -1) {
      var a, l = n.match(/\/(\w+)\.163\.com/)[1]
      for (var i in t._channelMap)t._channelMap[i].channel == l && (a = i);
      var s = n.match(/\/(\d+)\.html/)[1]
      return 'http://3g.163.com/touch/photoview.html?channel=' + l + '&offset=0&setid=' + s + '&channelid=' + a
    }
    return n.indexOf('help') !== -1 ? n : 'http://3g.163.com/touch/article.html?docid=' + e + '&from=tie'
  }), Handlebars.registerHelper('encodeURI', function (e) {return e})
  var a = t.tools, l = (t.ad, t.indexTools, t.Static || {})
  n.prototype = {
    handleShare: function () {
      var t = this
      e('#channel_' + this.channel + ' .tie-infoflow').on('click', '.share', function (n) {
        var a = {
          shareSummary: e(this).data('title'),
          shareTitle: e(this).data('summary'),
          shareImg: e(this).data('img') || 'http://img2.cache.netease.com/f2e/wap/common/images/weixinfixed.png',
          shareLink: e(this).data('url') || window.location.href
        }
        if (t.share) t.share.changeShareConfig(a) else {
          var i = new l.Share('.js-share-mask', a, {})
          i.render(), t.share = i
        }
        e(window).trigger('Share:show')
      })
    },
    genFocus: function () {
      var n = this
      a.publicMethod.jsonp({
        callbackName: 'artiList',
        url: 'http://3g.163.com/touch/article/list/BO3FSGU7zhangyiding/0-2.html'
      }).then(function (l) {
        var i = l.BO3FSGU7zhangyiding.map(function (e) {return e.type = 'module_ui_tie_focus', e})
        a.publicMethod.generateHtml(e('.tie-container .slides'), i), t.makeScroll({
          id: '#channel_' + n.channel,
          autoSlider: !1,
          autoTime: 2e3,
          openSlider: !0
        })
      })
    },
    genFlow: function () {
      var t = this.$infoFlow = e('#channel_' + this.channel + ' .tie-infoflow')
      t.on('click', '.item-wrap', function (e) {
        if (e.toElement.className.indexOf('title') === -1 && e.toElement.className.indexOf('share') === -1 && e.toElement.className.indexOf('fold') === -1) {
          var t = this.dataset.href
          location.href = t
        }
      }), this.fetchFlow()
    },
    fetchFlow: function (t, n) {
      var l = this
      'function' == typeof t && (n = t, t = l.length)
      var s = this.$infoFlow
      e('#channel_' + i.channel + ' .list-more').show(), a.publicMethod.jsonp({
        url: 'http://3g.163.com/touch/jsonp/hot/comments/' + (l.offset || 0) + '-' + (l.length || 10) + '.html',
        callbackName: 'hotcomment',
        isDeferred: !0
      }).then(function (t) {
        l.offset % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + i.channel + 'listinfo/#bottom' + l.offset / 10, i.channel + '\u9891\u9053\u4e0b\u62c9pv-' + l.offset / 10, 'wapclick'))
        var o = t.map(function (e) {
          var t = e.thread
          e.comments = e.comments.sort(function (e, t) {return t.buildLevel - e.buildLevel})
          var n = e.comments.splice(0, 1)[0]
          e.comments.length > 4 && (e.comments = e.comments.slice(-4), e.comments[0].foldControl = !0, e.comments[0].commentId = n.commentId, e.comments[0].docId = t.docId)
          var a, i = null, s = e.comments.length + 1
          return e.comments.forEach(function (e, t) {return s--, i ? (e.floorNum = s, a.next = e, void(a = a.next)) : (i = e, a = e, void(a.floorNum = s))}), {
            type: 'module_ui_tie_list_item',
            nickname: n.user.nickname || '\u706b\u661f\u7f51\u53cb',
            location: n.user.location,
            content: n.content,
            originDocId: t.docId,
            originTitle: t.title,
            board: t.boardId,
            channel: l.channel,
            originUrl: t.url,
            commentId: n.commentId,
            floors: i
          }
        })
        a.publicMethod.generateHtml(s, o, null, 'after'), e('#channel_' + i.channel + ' .list-more').hide(), l.offset += t.length, 'function' == typeof n && n()
      }, function (e) {console.log(e)})
    },
    dealUnfold: function () {
      e('.tie-infoflow').on('click', '.unfold', function (t) {
        var n = t.toElement.dataset.commentid, l = t.toElement.dataset.docid, i = e(t.toElement).parents('.floor')
        a.publicMethod.jsonp({
          url: 'http://comment.news.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads/' + l + '/comments/' + n + '?callback=fullFloorList&ibc=newswap',
          callbackName: 'fullFloorList',
          isDeferred: !0
        }).then(function (e) {
          var t, n, l = e.commentIds[0].split(',').reverse(), s = l.length
          l.forEach(function (a) {
            var l = e.comments[a]
            l.floorNum = s--, t ? (n.next = l, n = n.next) : n = t = l
          }), a.publicMethod.generateHtml(i, [{floor: t, type: 'module_ui_tie_fullfloor'}])
        }, function (e) {console.log(e)})
      })
    },
    handleTieActivity: function () {
      var t = a.publicMethod.localParam(), n = !1
      try {'tie_activity_170502' === t.search.from && (n = !0)} catch (l) {}
      if (n) {
        var i = e('<div class="tie_activity"></div>')
        e(document.body).append(i), i.bind('click', function () {
          try {
            window.openNewsapp.open({
              param: 'channel/T1419315959525',
              download: !1,
              channel: 'wapclick'
            }), neteaseTracker(!1, 'http://click.3g.163.com/wap/#tie_activity_170502', '\u8ddf\u8d34\u6d3b\u52a8170502\u70b9\u51fb\u5e95\u90e8\u5ba2\u6237\u7aef\u4e0b\u8f7d\u91cf', 'wapclick')
          } catch (e) {console.log('open failed')}
        })
      }
    }
  }
  var i = new n
  e.extend(t.infoFlow.channelHandle, {
    tie: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'swipe-content content-list'}
          }, {tag: 'div', attr: {'class': 'list-more'}, template: Handlebars.templates.listmore_tpl}]
        },
        init: function (t, n, l) {
          var s = this
          return i.channel = t, (!l || 0 == e('#channel_' + t + ' .content-list section').length) && (s.createFrame('#channel_' + t, s.callHandle(t, n, 'getFrameConfig')), a.publicMethod.generateHtml(e('#channel_' + t + ' .content-list'), [{
            type: 'module_ui_tie_frame',
            schemeURL: a.publicMethod.transURL('http://3g.163.com/touch/tie_special.html#!/scheme'),
            rankURL: a.publicMethod.transURL('http://3g.163.com/touch/tie_special.html#!/rank')
          }]), e('#channel_' + t + ' .list-more').show(), i.handleShare(), i.genFocus(), i.genFlow(), i.dealUnfold(), void i.handleTieActivity())
        },
        bottom: function () {i.fetchFlow()},
        ADListSucc: function (e, t, n) {},
        noAD: function (e, t) {},
        ADSucc: function (e, t) {}
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {
    this.childMap = {
      all: 'VATL2LQO4',
      amuse: 'VAP4BFE3U',
      beauty: 'VAP4BG6DL',
      newscene: 'VAV3H6JSN',
      BoBo: 'VBK3JKUIF',
      moe: 'VAP4BFR16',
      goosip: 'VBF8EUDUS',
      novelty: 'VBF8ET3S2',
      sports: 'VBF8F2E94',
      blacktech: 'VBF8F2PKF',
      knowladge: 'VBF8F3SGL',
      acgn: 'VBF8F1PSA',
      equip: 'VBF8F3301'
    }, this.columnId = 'VATL2LQO4', this.allVideoData = {}
  }

  var a = t.tools, l = t.ad
  t.indexTools, t.Static || {}
  n.prototype = {
    processData: function (t, n) {return e.each(t, function (e, t) {t.type = n || 'video_doc'}), t},
    saveVideoData: function (e, t) {this.allVideoData[e] = t},
    getVideoData: function (e, t, n) {
      var a
      return a = this.allVideoData[e] || [], a.splice(t, n)
    }
  }
  var i = new n
  e.extend(t.infoFlow.channelHandle, {
    video: {
      all: {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'swipe-content content-list'}
          }, {tag: 'div', attr: {'class': 'list-more'}, template: Handlebars.templates.listmore_tpl}, {
            tag: 'div',
            attr: {'class': 'no-more list-more', id: 'no-more'}
          }]
        }, init: function (t, n, s) {
          var o = this
          if (i.columnId = i.childMap[n], o.setOffsetNum(t, function () {return 0}), s) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
          o.createFrame('#channel_' + t, o.callHandle(t, n, 'getFrameConfig')), e('#no-more').text('\u6ca1\u6709\u66f4\u591a\u4e86~').css({
            'text-align': 'center',
            'line-height': '1.5rem',
            color: '#888'
          }), e('#channel_' + t + ' .list-more').show(), a.publicMethod.fetch({
            dataType: 'jsonp',
            useflag: !1,
            cache: !0,
            jsonpCallback: 'callback_video',
            notformat: !0,
            url: 'http://v.163.com/special/video_tuijian/',
            success: function (a) {i.saveVideoData(n, a.list), a = i.getVideoData(n, o.offset[t], o.offset[t] + 10), l.getChannelAllAD(l.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})}
          })
        }, bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10})
          var l = i.getVideoData(t.child, t.offset[n], t.offset[n] + 10), s = i.processData(l, 'video_all_doc')
          e('#channel_' + n + ' .list-more').hide(), 0 !== s.length ? (t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + '_' + t.child + 'listinfo/#bottom' + t.offset[n] / 10, n + '_' + t.child + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick')), a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), s, 'after')) : e('#no-more').show()
        }, ADListSucc: function (e, t, n) {}, noAD: function (t, n) {
          var l = i.processData(t, 'video_all_doc')
          a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), l)
        }, ADSucc: function (e, t) {}
      }, 'default': {
        getFrameConfig: function () {
          return [{tag: 'div', attr: {'class': 'swipe-content content-list'}}, {
            tag: 'div',
            attr: {'class': 'list-more'},
            template: Handlebars.templates.listmore_tpl
          }]
        }, init: function (t, n, s) {
          var o = this
          if (i.columnId = i.childMap[n], o.setOffsetNum(t, function () {return 0}), s) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
          o.createFrame('#channel_' + t, o.callHandle(t, n, 'getFrameConfig')), e('#channel_' + t + ' .list-more').show(),
            a.publicMethod.fetch({
              dataType: 'jsonp',
              useflag: !1,
              cache: !0,
              jsonpCallback: 'getVideoList',
              notformat: !0,
              url: 'http://c.m.163.com/nc/video/list/' + i.columnId + '/y/0-10.html',
              success: function (a) {l.getChannelAllAD(l.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})}
            })
        }, bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10}), t.setBottomLock(n, !0), a.publicMethod.fetch({
            dataType: 'jsonp',
            useflag: !1,
            cache: !0,
            jsonpCallback: 'getVideoList',
            notformat: !0,
            url: 'http://c.m.163.com/nc/video/list/' + i.columnId + '/y/' + t.offset[n] + '-10.html',
            success: function (l) {
              t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + '_' + t.child + 'listinfo/#bottom' + t.offset[n] / 10, n + '_' + t.child + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick'))
              var s = i.processData(l[i.columnId])
              t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide(), a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), s, 'after')
            },
            error: function () {t.setBottomLock(n, !1)}
          })
        }, ADListSucc: function (e, t, n) {}, noAD: function (t, n) {
          var l = i.processData(t[i.columnId])
          a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), l)
        }, ADSucc: function (e, t) {}
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {this.share = null}

  Handlebars.registerHelper('date_format', function (e, t) {return e = new Date(e), e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate()}), Handlebars.registerHelper('fixThousands', function (e) {
    if (e < 1e4)return e
    var t = Math.floor(e / 1e3)
    return t / 10 + '\u4e07'
  })
  var a = t.tools, l = t.ad, i = (t.indexTools, t.Static || {})
  n.prototype = {
    processData: function (t) {
      var n = []
      return e.each(t, function (e, t) {2 == t.rtype && (t.type = 'openList', t.link = 'http://3g.163.com/wap/special/openarticle/', n.push(t))}), n
    }
  }, n.prototype.handleShare = function () {
    var t = this
    e('#channel_open').on('click', '.o_share_btn', function (n) {
      var a = {
        shareSummary: e(this).data('digest'),
        shareTitle: e(this).data('title'),
        shareImg: e(this).data('img') || 'http://img1.cache.netease.com/travel/2014/7/22/20140722172931b2127.png',
        shareLink: e(this).data('link') || window.location.href
      }
      if (t.share) t.share.changeShareConfig(a) else {
        var l = new i.Share('.js-share-mask', a, {})
        l.render(), t.share = l
      }
      e(window).trigger('Share:show')
    })
  }
  var s = new n
  e.extend(t.infoFlow.channelHandle, {
    open: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'swipe-content content-list'}
          }, {tag: 'div', attr: {'class': 'list-more'}, template: Handlebars.templates.listmore_tpl}]
        }, init: function (t, n, i) {
          var o = this
          if (s.handleShare(), o.setOffsetNum(t, function () {return 0}), i) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
          o.createFrame('#channel_' + t, o.callHandle(t, n, 'getFrameConfig')), e('#channel_' + t + ' .list-more').show(), a.publicMethod.fetch({
            dataType: 'jsonp',
            useflag: !1,
            cache: !0,
            notformat: !0,
            url: 'http://c.open.163.com/mob/home/list.do?cursor=0&pagesize=10',
            success: function (a) {l.getChannelAllAD(l.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})}
          })
        }, bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10}), t.setBottomLock(n, !0), a.publicMethod.fetch({
            dataType: 'jsonp',
            useflag: !1,
            cache: !0,
            notformat: !0,
            url: 'http://c.open.163.com/mob/home/list.do?cursor=' + t.offset[n] + '&pagesize=10',
            success: function (l) {
              t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + 'listinfo/#bottom' + t.offset[n] / 10, n + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick'))
              var i = s.processData(l.data)
              t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide(), a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), i, 'after')
            },
            error: function () {t.setBottomLock(n, !1)}
          })
        }, ADListSucc: function (e, t, n) {}, noAD: function (t, n) {
          var l = s.processData(t.data)
          a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), l)
        }, ADSucc: function (e, t) {}
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {this.template = Handlebars.templates.module_ui_jiankang_link_tpl, this.ele = void 0}

  var a = t.tools, l = t.ad
  t.Nav, t.indexTools
  n.prototype.init = function (e) {this.ele = e, this.generateHtml()}, n.prototype.generateHtml = function (e) {
    var t = this.template(e)
    this.ele.html(t)
  }
  var i = new n
  e.extend(t.infoFlow.channelHandle, {
    jiankang: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'headslide'}
          }, {tag: 'div', attr: {'class': 'swipe-content link-jiankang'}}, {
            tag: 'div',
            attr: {'class': 'swipe-content content-list'}
          }, {tag: 'div', attr: {'class': 'list-more'}, template: Handlebars.templates.listmore_tpl}]
        },
        init: function (t, n, s) {
          var o = this
          if (o.setOffsetNum(t, function () {return 0}), s) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
          o.createFrame('#channel_' + t, o.callHandle(t, n, 'getFrameConfig')), e('#channel_' + t + ' .list-more').show(), i.init(e('#channel_' + t + ' .link-jiankang')), a.publicMethod.fetch({
            DPData: {
              channel: o.channelId,
              child: n
            },
            useflag: !1,
            success: function (a) {o.simple && e.each(a.listdata.data, function (e, t) {t.type = 'doc_simple'}), l.getChannelAllAD(l.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})},
            error: function (e) {console.log(e)}
          })
        },
        bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10}), t.setBottomLock(n, !0), a.publicMethod.fetch({
            DPData: {
              offset: t.offset[n],
              channel: t.channelId,
              child: t.child
            },
            useflag: !1,
            success: function (i) {
              t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + 'listinfo/#bottom' + t.offset[n] / 10, n + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick')), t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide(), t.simple && e.each(i.listdata.data, function (e, t) {t.type = 'doc_simple'})
              var s = l.getADDetailData(n, t.child)
              a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), i.listdata.data, s, 'after'), l.replaceListAD(e('#channel_' + n + ' .content-list section'), s)
            },
            error: function (e) {t.setBottomLock(n, !1)}
          })
        },
        ADListSucc: function (t, n, l) {a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata, t), a.publicMethod.generateHtml(e('#channel_' + l + ' .content-list'), n.listdata.data, t)},
        noAD: function (n, l) {
          a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata), a.publicMethod.generateHtml(e('#channel_' + l + ' .content-list'), n.listdata.data), 0 != e('#channel_' + l + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + l,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          })
        },
        ADSucc: function (n, a) {
          l.replaceFocusAD(e('#channel_' + a + ' .headslide li'), n), 0 != e('#channel_' + a + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + a,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          }), l.replaceListAD(e('#channel_' + a + ' .content-list section'), n)
        }
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n () {this.template = Handlebars.templates.module_ui_art_link_tpl, this.ele = void 0}

  var a = t.tools, l = t.ad
  t.Nav, t.indexTools
  n.prototype.init = function (e) {this.ele = e, this.generateHtml()}, n.prototype.generateHtml = function (e) {
    var t = this.template(e)
    this.ele.html(t)
  }
  var i = new n
  e.extend(t.infoFlow.channelHandle, {
    art: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'headslide'}
          }, {tag: 'div', attr: {'class': 'swipe-content link-art'}}, {
            tag: 'div',
            attr: {'class': 'swipe-content content-list'}
          }, {tag: 'div', attr: {'class': 'list-more'}, template: Handlebars.templates.listmore_tpl}]
        },
        init: function (t, n, s) {
          var o = this
          if (o.setOffsetNum(t, function () {return 0}), s) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t).html('')
          o.createFrame('#channel_' + t, o.callHandle(t, n, 'getFrameConfig')), e('#channel_' + t + ' .list-more').show(), i.init(e('#channel_' + t + ' .link-art')), a.publicMethod.fetch({
            DPData: {
              channel: o.channelId,
              child: n
            },
            useflag: !1,
            success: function (a) {o.simple && e.each(a.listdata.data, function (e, t) {t.type = 'doc_simple'}), l.getChannelAllAD(l.ADpath, 'ad_callback', a, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})},
            error: function (e) {console.log(e)}
          })
        },
        bottom: function () {
          var t = this, n = t.channel
          e('#channel_' + n + ' .list-more').show(), t.setOffsetNum(n, function (e) {return e += 10}), t.setBottomLock(n, !0), a.publicMethod.fetch({
            DPData: {
              offset: t.offset[n],
              channel: t.channelId,
              child: t.child
            },
            useflag: !1,
            success: function (i) {
              t.offset[n] % 10 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + 'listinfo/#bottom' + t.offset[n] / 10, n + '\u9891\u9053\u4e0b\u62c9pv-' + t.offset[n] / 10, 'wapclick')), t.setBottomLock(n, !1), e('#channel_' + n + ' .list-more').hide(), t.simple && e.each(i.listdata.data, function (e, t) {t.type = 'doc_simple'})
              var s = l.getADDetailData(n, t.child)
              a.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), i.listdata.data, s, 'after'), l.replaceListAD(e('#channel_' + n + ' .content-list section'), s)
            },
            error: function (e) {t.setBottomLock(n, !1)}
          })
        },
        ADListSucc: function (t, n, l) {a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata, t), a.publicMethod.generateHtml(e('#channel_' + l + ' .content-list'), n.listdata.data, t)},
        noAD: function (n, l) {
          a.publicMethod.generateHtml(e('#channel_' + l + ' .headslide'), n.topdata), a.publicMethod.generateHtml(e('#channel_' + l + ' .content-list'), n.listdata.data), 0 != e('#channel_' + l + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + l,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          })
        },
        ADSucc: function (n, a) {
          l.replaceFocusAD(e('#channel_' + a + ' .headslide li'), n), 0 != e('#channel_' + a + ' .headslide li').length && t.makeScroll({
            id: '#channel_' + a,
            autoSlider: !1,
            autoTime: 2e3,
            openSlider: !0
          }), l.replaceListAD(e('#channel_' + a + ' .content-list section'), n)
        }
      }
    }
  })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
  function n (t, n, a) {
    var l = this, i = {scrollInterval: 5e3, scrollSpeed: 500, easing: 'linear'}
    if (l.options = e.extend({}, i, a), 1 == n.length)return null
    var s, o = 0, r = n.eq(0).height()
    n.css({height: r})
    var c = n.first().clone(!0)
    t.append(c), n.push(c[0])
    var h = {
      transition: 'all ' + l.options.scrollSpeed / 1e3 + 's ' + l.options.easing,
      '-webkit-transition': 'all ' + l.options.scrollSpeed / 1e3 + 's ' + l.options.easing,
      'will-change': 'transform'
    }, d = function (e) {
      h.transform = 'translateY(' + -e * r + 'px)', h['-webkit-transform'] = h.transform, t.css(h), window.setTimeout(function () {
        t.css({'will-change': 'auto'}), e == n.length - 1 && (t.css({
          '-webkit-transition': 'none',
          transition: 'none',
          '-webkit-transform': 'translateY(0)',
          transform: 'translateY(0)'
        }), o = 0)
      }, l.options.scrollSpeed), o = e
    }, u = function () {d((o + 1) % n.length)}
    this.startScroll = function () {s = window.setInterval(u, l.options.scrollInterval)}, this.stopScroll = function () {window.clearInterval(s)}, l.startScroll()
  }

  function a (t) {
    var n = t.ele, a = t.data || [], l = t.tpl, i = t.append || 'after', s = (t.noadTpl || '', ''), o = []
    if ('array' == e.type(a)) {
      e.each(a, function (e, t) {t.type && o.push(t)})
      try {s = Handlebars.templates[l + '_tpl']({data: o})} catch (r) {console.trace(r)}
    } else if ('string' == e.type(a))try {s = Handlebars.templates[l + '_tpl']({data: a})} catch (r) {console.trace(r)} else e.each(a, function (e, t) {if (t.type)if ('photoset' == t.type)try {s += t.pic_info.length < 3 ? Handlebars.templates.doc_tpl(t) : Handlebars.templates.photoset_tpl(t)} catch (n) {console.log(n)} else try {s += Handlebars.templates[t.type + '_tpl'](t)} catch (n) {console.trace(n)}})
    'before' === i ? n.prepend(s) : 'after' === i ? n.append(s) : n.html(s)
  }

  function l () {
    this.childMap = {}, this.childArray = c, this.childArray = [{
      type: 'column',
      visible: !1,
      name: '\u76f4\u64ad',
      id: 'all'
    }, {
      type: 'column',
      visible: !1,
      name: '\u9884\u544a',
      id: 'future'
    }].concat(this.childArray), this.allLiveData = {}, this.components = {
      top: {render: !1},
      nav: {render: !1},
      future: {render: !1},
      list: {render: !1}
    }
  }

  var i = t.tools, s = t.ad, o = t.Nav, r = (t.indexTools, t.Static || {}, t.DP.nosImageViewConfig)
  e.extend(!0, o.hasSpecificStyle, {liveshow: ''}), e.extend(!0, o.noBottomLine, {liveshow: ''}), e.extend(!0, o.otherChannelConfig, {
    liveshow: {
      childbar: '.live_nav_list',
      child: '.live_nav_item'
    }
  })
  var c = [{type: 'column', visible: !1, name: 'TOP100', id: 3}, {
    type: 'column',
    visible: !1,
    name: '\u5927\u76f4\u64ad',
    id: 4
  }, {type: 'column', visible: !1, name: '\u5728\u73b0\u573a', id: 5}, {
    type: 'column',
    visible: !1,
    name: '\u661f\u5728\u7ebf',
    id: 6
  }, {type: 'column', visible: !1, name: '\u7eb5\u6a2a\u8c08', id: 7}, {
    type: 'column',
    visible: !1,
    name: '\u8d44\u8baf',
    id: 8
  }, {type: 'column', visible: !1, name: '\u5a31\u4e50', id: 9}, {
    type: 'column',
    visible: !1,
    name: '\u672c\u5730',
    id: 10
  }, {type: 'column', visible: !1, name: '\u4f53\u80b2', id: 11}, {
    type: 'column',
    visible: !1,
    name: '\u65f6\u5c1a',
    id: 12
  }, {type: 'column', visible: !1, name: '\u6c7d\u8f66', id: 13}, {
    type: 'column',
    visible: !1,
    name: '\u79d1\u6280',
    id: 14
  }, {type: 'column', visible: !1, name: '\u8d22\u7ecf', id: 15}, {
    type: 'column',
    visible: !1,
    name: '\u751f\u6d3b',
    id: 16
  }]
  l.prototype = {
    processData: function (e, t, n, a) {
      for (var l = a || 'all', i = 0; i < e.length; i++) {
        var s = e[i]
        s.liveStatus = s.liveStatus || 0, s.source = s.source || '\u7f51\u6613\u539f\u521b', s.type = t || 'live_doc', s.link = 'http://3g.163.com/touch/live.html?channel=live&child=' + l + '&roomid=' + s.roomId, s.imgage_s = 'http://imgsize.ph.126.net/?imgurl=' + s.image + '_' + n.width + 'x' + n.height + 'x1x45.jpg&enlarge=true', s.image.indexOf('nosdn.127.net/') != -1 && (s.imgage_s = s.image + '?imageView&thumbnail=' + n.width + 'y' + n.height + '&quality=45&type=' + r.type + '&interlace=1&enlarge=1'), s.liveType && 1 == s.liveType && (e.splice(i, 1), i--)
      }
      return e
    },
    processFutureData: function (e) {
      for (var n = {}, a = 0; a < e.length; a++) {
        var l = e[a], i = t.getUEliveday(l.startTime)
        'undefined' == typeof n[i] && (n[i] = []), n[i].push(l)
      }
      return n
    },
    saveLiveData: function (e, t) {this.allLiveData[e] = t},
    getLiveData: function (e, t, n) {
      var a
      return a = this.allLiveData[e] || [], a.splice(t, n)
    },
    updateChild: function () {
      for (var e = this.childArray, t = e.length, n = 0; n < t; n++) {
        var a = e[n].id
        this.childMap[a] = e[n]
      }
    },
    requestData: function (e, t, n) {
      i.publicMethod.fetch({
        dataType: 'jsonp',
        useflag: !1,
        cache: !0,
        jsonpCallback: t,
        notformat: !0,
        url: e,
        success: function (e) {n(e)}
      })
    },
    renderHead: function (l, i, s, r, c) {
      if (h.components.top.render || (a({
          ele: e('#channel_' + l + ' .headslide'),
          data: s,
          tpl: 'module_ui_live_top'
        }), 0 != e('#channel_' + l + ' .headslide li').length && t.makeScroll({
          id: '#channel_' + l,
          autoSlider: !1,
          autoTime: 5e3,
          openSlider: !0
        }), h.components.top.render = !0), h.components.nav.render || (a({
          ele: e('#channel_' + l + ' .live-nav'),
          data: r,
          tpl: 'module_ui_live_nav'
        }), h.components.nav.render = !0), !h.components.future.render) {
        a({
          ele: e('#channel_' + l + ' .live-scroll'),
          data: c,
          tpl: 'module_ui_live_future'
        }), h.components.future.render = !0, o.toChannel(l, i)
        var d = e('#live_future_content').children('ul')
        new n(d, d.children('li'), {scrollInterval: 6e3, scrollSpeed: 300})
      }
    }
  }
  var h = new l
  h.updateChild(), e.extend(t.infoFlow.channelHandle, {
    liveshow: {
      'default': {
        getFrameConfig: function () {
          return [{
            tag: 'div',
            attr: {'class': 'headslide'}
          }, {tag: 'div', attr: {'class': 'swipe-content live-nav'}}, {
            tag: 'div',
            attr: {'class': 'swipe-content live-scroll'}
          }, {tag: 'div', attr: {'class': 'swipe-content content-list'}}, {
            tag: 'div',
            attr: {'class': 'list-more'},
            template: Handlebars.templates.listmore_tpl
          }, {tag: 'div', attr: {'class': 'no-more list-more', id: 'no-more'}}]
        },
        init: function (t, n, l) {
          var r = this
          if (r.setOffsetNum(t, function () {return 0}), l) {if (0 != e('#channel_' + t + ' .content-list section').length)return !1} else e('#channel_' + t + ' .content-list').html('')
          r.createFrame('#channel_' + t, r.callHandle(t, n, 'getFrameConfig'))
          var c = e('#no-more')
          c.text('\u6ca1\u6709\u66f4\u591a\u4e86~').css({
            'text-align': 'center',
            'line-height': '1.5rem',
            color: '#888'
          }), e('#channel_' + t + ' .list-more').show(), c.hide(), o.liveChildBind()
          var d = 'http://data.live.126.net/livechannel/previewlist.json', u = 'previewlist'
          if (h.requestData(d, u, function (a) {
              var l = h.processData(a.top, 'module_ui_live_top', {width: 750, height: 380}),
                i = h.processData(a.future, 'module_ui_live_future', {width: 690, height: 230}),
                o = h.processData(a.live_review, 'module_ui_live_list', {width: 690, height: 230}), r = a.nextPage
              h.childMap.all.nextPage = r, h.renderHead(t, n, l, h.childArray, i), 'future' == n && (e('.live-scroll').hide(), e('.live-nav .live_d_line').hide()), s.getChannelAllAD(s.ADpath, 'ad_callback', o, t, n).then(function () {e('#channel_' + t + ' .list-more').hide()})
            }), 'future' == n ? (e('.live-scroll').hide(), e('.live-nav .live_d_line').hide()) : (e('.live-scroll').show(), e('.live-nav .live_d_line').show()), 'future' == n) {
            var m = 'http://data.live.126.net/livechannel/futurelist.json', p = 'futurelist'
            h.requestData(m, p, function (n) {
              var l = h.processData(n, 'module_ui_live_list', {width: 690, height: 230}), s = h.processFutureData(l)
              for (var o in s)s.hasOwnProperty(o) && (a({
                ele: e('#channel_' + t + ' .content-list'),
                data: o,
                tpl: 'module_ui_live_future_classify',
                append: 'after'
              }), i.publicMethod.generateHtml(e('#channel_' + t + ' .content-list'), s[o], null, 'after'))
            })
          } else if ('all' != n) {
            var f = parseInt(n), p = 'classify_' + f + '_0',
              m = 'http://data.live.126.net/livechannel/classify/' + f + '/1.json'
            h.requestData(m, p, function (n) {
              var a = h.processData(n.live_review, 'module_ui_live_list', {
                width: 690,
                height: 230
              }), l = n.nextPage
              h.childMap[f].nextPage = l, i.publicMethod.generateHtml(e('#channel_' + t + ' .content-list'), a)
            })
          }
        },
        bottom: function () {
          var t = this, n = t.channel, a = t.child, l = parseInt(a)
          isNaN(l) && (l = a)
          var s = h.childMap[l].nextPage
          if (0 === s || 'undefined' == typeof s)return void e('#no-more').show()
          t.setBottomLock(n, !0), e('#channel_' + n + ' .list-more').show(), e('#no-more').hide()
          var o = '', r = ''
          if ('all' == a) o = 'previewlist_' + s, r = 'http://data.live.126.net/livechannel/previewlist/' + s + '.json' else {
            if ('future' == a)return e('#channel_' + n + ' .list-more').hide(), e('#no-more').show(), void t.setBottomLock(n, !1)
            o = 'classify_' + l + '_' + s, r = 'http://data.live.126.net/livechannel/classify/' + l + '/' + s + '.json'
          }
          h.requestData(r, o, function (s) {
            e('#channel_' + n + ' .list-more').hide()
            var o = s.nextPage
            h.childMap[l].nextPage = o, (o + 1) % 1 === 0 && (neteaseTracker && neteaseTracker(), neteaseTracker && neteaseTracker(!1, 'http://click.3g.163.com/wap/' + n + '_' + a + 'listinfo/#bottom' + (o + 1) / 1, n + '_' + t.child + '\u9891\u9053\u4e0b\u62c9pv-' + (o + 1) / 1, 'wapclick'))
            var r = h.processData(s.live_review, 'module_ui_live_list', {width: 690, height: 230})
            0 === o ? e('#no-more').show() : i.publicMethod.generateHtml(e('#channel_' + n + ' .content-list'), r, null, 'after'), t.setBottomLock(n, !1)
          })
        },
        ADListSucc: function (t, n, a) {i.publicMethod.generateHtml(e('#channel_' + a + ' .content-list'), n, t)},
        noAD: function (e, t) {},
        ADSucc: function (t, n) {s.replaceListAD(e('#channel_' + n + ' .content-list section'), t)}
      }
    }
  })
}(window.Zepto, window.NEWAP), function (e, t) {
  function n () {
    this.config = {
      headerbar: '.bar_wrap',
      header: '#l-indexheader',
      subbox: '.sub_box',
      backTop: '.back_to_top',
      feedBack: '.feed_back'
    }, this.systemOptions = {
      width: screen.width > 0 && window.innerWidth >= screen.width ? screen.width : window.innerWidth,
      anchor: window.location.href,
      anchor_hash: window.location.hash,
      Dpr: 1,
      uAgent: window.navigator.userAgent,
      firstSrceenHeight: screen.height > 0 && window.innerHeight >= screen.height ? screen.height : window.innerHeight,
      scrollHeight: l.publicMethod.scrollY(),
      banBrowser: l.uaMatch.isWX || l.uaMatch.isQQBrowser || l.uaMatch.isUCBrowser || l.uaMatch.isBaidu,
      barHeight: e('.u_topmenu').offset().height,
      jokeMainWidth: Math.floor(6.9 * parseInt(document.getElementsByTagName('html')[0].style.fontSize))
    }, this.headerbar = e('.bar_wrap'), this.header = e('#l-indexheader'), this.subbox = e('.sub_box'), this.backtop = e('.back_to_top', this.subbox), this.feedback = e('.feed_back', this.subbox), this.redPacketContainer = e('.ne_rps'), this.bottomAdClosed = !0, this.rp = null
  }

  var a = t.infoFlow, l = t.tools, i = t.indexTools
  t.wapLogin, new t.LoginPanel
  n.prototype = {
    init: function () {l.uaMatch.isIos && (this.systemOptions.width = screen.width), l.publicMethod.reviseViewPort(200), this.initHHelper(), this.setDownloadLink(), this.dotStatus('.more_channel.up', 'navDot'), this.statfocusClick()},
    run: function () {this.backtop && this.backToTop(), this.feedback && this.feedBack(), this.scrolling(), this.spreadNav(), this.redPacket()},
    backToTop: function () {this.backtop.click(function () {window.scrollTo(0, 0)})},
    feedBack: function () {this.feedback.click(function () {window.open('http://3g.163.com/touch/suggest.html', '_blank')})},
    redPacket: function () {
      var t = this
      this.rp = new RedPacket({
        once: !0,
        statistics: 'homepage',
        key: 'NEWAP_RedPacket_app_home',
        styleName: 'home_packet',
        hide: !0,
        open: function () {
          try {
            openNewsapp.open({
              param: 'startup',
              channel: 'news_wap_hongbao'
            })
          } catch (e) {location.href = 'http://m.163.com/newsapp/applinks.html?s=news_wap_hongbao'}
        }
      }), e(window).on('ad:bottom:start', function (e, n) {t.bottomAdClosed = !1}), e(window).on('ad:bottom:closed', function (e, n) {t.bottomAdClosed = !0})
    },
    scrolling: function () {
      var n, a = this, i = a.systemOptions.firstSrceenHeight,
        s = (a.systemOptions.barHeight, l.publicMethod.isSupportSticky())
      s ? (e('.fixedhack').addClass('ios_fixed'), e(window).on('scroll', function () {a.redPacketContainer[0] || (a.redPacketContainer = e('.ne_rps')), n = l.publicMethod.scrollY(), n > a.systemOptions.firstSrceenHeight ? (a.subbox.show(), 'all' === t.infoFlow.channel && a.bottomAdClosed && a.rp && a.rp.show()) : n < a.systemOptions.firstSrceenHeight && (a.subbox.hide(), 'all' === t.infoFlow.channel && a.bottomAdClosed && a.rp && a.rp.hide())})) : (e(window).on('touchend', function () {
        var t = e(a.config.header).offset().height
        n = l.publicMethod.scrollY(), n > t && !a.headerbar.hasClass('fixedheader') ? (a.headerbar.addClass('fixedheader'), a.header.addClass('have_fixedbars')) : n < t && a.headerbar.hasClass('fixedheader') && (a.headerbar.removeClass('fixedheader'), a.header.removeClass('have_fixedbars'))
      }), e('.content-list').on('touchmove', function () {
        var t = e(a.config.header).offset().height
        n = l.publicMethod.scrollY(), n > t ? a.headerbar.hasClass('fixedheader') || (a.headerbar.addClass('fixedheader'), a.header.addClass('have_fixedbars')) : a.headerbar.hasClass('fixedheader') && (a.headerbar.removeClass('fixedheader'), a.header.removeClass('have_fixedbars'))
      }), e(window).on('scroll', function () {
        var s = e(a.config.header).offset().height
        n = l.publicMethod.scrollY(), a.redPacketContainer[0] || (a.redPacketContainer = e('.ne_rps')), n > s ? (a.headerbar.hasClass('fixedheader') || (a.headerbar.addClass('fixedheader'), a.header.addClass('have_fixedbars')), n > i ? (a.subbox.show(), 'all' === t.infoFlow.channel && a.bottomAdClosed && a.rp.show()) : n < i && (a.subbox.hide(), 'all' === t.infoFlow.channel && a.bottomAdClosed && a.rp.hide())) : n < s && a.headerbar.hasClass('fixedheader') && (a.headerbar.removeClass('fixedheader'), a.header.removeClass('have_fixedbars'))
      }))
    },
    adListenerCallback: function () {
      e(window).on('getADSucc', function (n, i, s, o) {
        for (var r = i.banner ? i.banner : '', c = i.bottom ? i.bottom[0] : '', h = !1, d = r.length, u = d - 1; u >= 0; u--)t.ad.render(r[u], now_cnn), h = 'enlargeAD' == r[u].type || 'pushAD' == r[u].type || h;
        h ? e(window).on('putEnlargeOver', function () {t.ad.render(c, now_cnn)}) : t.ad.render(c, now_cnn), t.ad.setADDetailData(t.channelMap, s, a.child, i), t.supportNewsapp || c && c.type || (t.newsappFootbar.show({rem: !0}), t.supportNewsapp = !0, t.trackerQueue && t.trackerQueue.length > 0 && (l.publicMethod.doTrackerQueue(), t.trackerQueue = [])), t.infoFlow.callHandle(s, o, 'ADSucc', i, s)
      }), e(window).on('getADListSucc', function (e, n, a, l, i) {t.infoFlow.callHandle(l, i, 'ADListSucc', n, a, l)}), e(window).on('noAD', function (e, n, a, i) {t.supportNewsapp || (t.newsappFootbar.show({rem: !0}), t.supportNewsapp = !0, t.trackerQueue && t.trackerQueue.length > 0 && (l.publicMethod.doTrackerQueue(), t.trackerQueue = [])), t.infoFlow.callHandle(a, i, 'noAD', n, a)})
    },
    enterRoute: function (n) {
      var a = this
      e(window).on('ad:bottom:none', function () {t.supportNewsapp || (t.newsappFootbar.show({rem: !0}), t.supportNewsapp = !0, t.trackerQueue && t.trackerQueue.length > 0 && (l.publicMethod.doTrackerQueue(), t.trackerQueue = []))}), e(window).on('enterChannel', function (l, i) {
        e(window).scrollTop(0)
        var s = i.firstname, o = i.secondname, r = s.replace('channel=', ''), c = r !== t.infoFlow.channel
        a.setTitle(t.channelMap, r)
        try {neteaseTracker()} catch (l) {}
        t.infoFlow.channelSwiper.toChannel('channel_' + r), t.infoFlow.channelId = t.channelName[':firstname(' + s + ')'].channelId, t.infoFlow.channel = r, t.infoFlow.child = o, t.infoFlow.channelChildMap[r] = o, t.ad.setADPath(t.channelMap, r, o), t.infoFlow.callHandle(r, o, 'init', r, o, c), n.toChannel(s, o), 'all' !== r && a.redPacketContainer.hide()
        var h
        if (t.ad.getADDetailData(r, o) && (h = t.ad.getADDetailData(r, o)), e(t.ad.config.top_ad_con_push).html(''), void 0 != h && null != h || e(t.ad.config.top_ad_con_colums).html(''), e(t.ad.config.float_ad_con).remove(), r && ('all' == o || void 0 == o || null == o) && void 0 != h && null != h) {
          for (var d = h.banner ? h.banner : '', u = h.bottom ? h.bottom[0] : '', m = !1, p = d.length, f = p - 1; f >= 0; f--)t.ad.render(d[f], r), m = 'enlargeAD' == d[f].type || 'pushAD' == d[f].type || m;
          m ? e(window).on('putEnlargeOver', function () {t.ad.render(u, r)}) : t.ad.render(u, r)
        }
      })
    },
    leaveRoute: function () {
      e(window).on('leaveChannel', function (n, a) {
        var l = a.name.match(/firstname\(((channel=)?\w+)\)/)[1],
          i = a.name.match(/secondname\((\w+)\)/) ? a.name.match(/secondname\((\w+)\)/)[1] : '',
          s = l.replace('channel=', '')
        t.infoFlow.callHandle(s, i, 'left', s, i)
        var o = e('#newsappbar .u-layer-newsapp')
        o.hasClass('close') || o.addClass('close')
      })
    },
    initHHelper: function () {
      var n = this
      t.Static.handlebars_helper(), Handlebars.registerHelper('extractNumber', function (e, t) {
        var n = /\d+/
        return e.match(n)[0]
      }), Handlebars.registerHelper('isInMatch', function (t, n) {
        var a = 'number' != e.type(t) ? t.replace(/\-/g, '/') : t, l = new Date(a).getTime(), i = new Date,
          s = i.getTime(), o = 60 * i.getTimezoneOffset() * 1e3, r = s + o + 288e5
        return r > l ? 'in_match' : 'before_match'
      }), Handlebars.registerHelper('remainTime', function (t, n) {
        var a = 'number' != e.type(t) ? t.replace(/\-/g, '/') : t, l = new Date(a).getTime(), i = new Date,
          s = i.getTime(), o = 60 * i.getTimezoneOffset() * 1e3, r = s + o + 288e5, c = r - l,
          h = Math.abs(Math.ceil(c / 1e3 / 60 / 60 / 24)) + ''
        return h.length < 2 && (h = '0' + h), h.split('')[n]
      }), Handlebars.registerHelper('isGif', function (e, t, n) {
        var a = e && e[t] && e[t].o_url, l = /.+\.gif$/
        return a && l.test(a) ? n.fn(this) : n.inverse(this)
      }), Handlebars.registerHelper('isExtraHigh', function (e, t, a) {
        var l = n.systemOptions.jokeMainWidth, i = e[t].width, s = e[t].height, o = i / l, r = s / o
        return r > 600 ? a.fn(this) : a.inverse(this)
      }), Handlebars.registerHelper('isliving', function (e, t) {return '\u8fdb\u884c\u4e2d' === e ? t.fn(this) : t.inverse(this)}), Handlebars.registerHelper('isMatchEnd', function (e, t) {return '\u5df2\u7ed3\u675f' === e ? t.fn(this) : t.inverse(this)}), Handlebars.registerHelper('isBeforeLive', function (e, t) {return '\u672a\u5f00\u8d5b' === e ? t.fn(this) : t.inverse(this)}), Handlebars.registerHelper('getUEMatchStatus', function (e, t) {
        var n = {
          0: '\u672a\u5f00\u8d5b',
          1: '\u6b63\u5728\u8fdb\u884c',
          2: '\u6bd4\u8d5b\u7ed3\u675f',
          3: '\u5ef6\u671f'
        }
        return n[e]
      }), Handlebars.registerHelper('isUEBeforeLive', function (e, t, n) {
        var a = new Date, l = (a.getTime(), t.split(',')[0].replace(/\-/g, '/')), i = new Date(l)
        i.getTime()
        return 1 == e || 5 == e || 9 == e ? n.fn(this) : n.inverse(this)
      }), Handlebars.registerHelper('islive', function (e, t) {return 1 == e ? t.fn(this) : t.inverse(this)}), Handlebars.registerHelper('isShowCount', function (e, t, n, a) {
        var l = (new Date).getTime(), i = new Date(n.split(',')[0]).getTime()
        return (0 == e && l >= i || 1 == e || 2 == e) && 1 == t ? a.fn(this) : a.inverse(this)
      }), Handlebars.registerHelper('iswatching', function (e, t, n) {
        var a = (new Date).getTime(), l = new Date(t.split(',')[0]).getTime()
        return 1 == e || 0 == e && a >= l ? n.fn(this) : n.inverse(this)
      }), Handlebars.registerHelper('getliveday', function (e, t) {
        var n = ''
        switch (e) {
          case'1':
            n = '\u6628\u5929'
            break
          case'2':
            n = '\u4eca\u5929'
            break
          case'3':
            n = '\u660e\u5929'
        }
        return n
      }), t.getUEliveday = function (e) {
        var t, n = '', a = new Date, l = i.dateFormat.call(a, 'yyyy/MM/dd'), s = +new Date(l + ' 00:00:00'),
          o = e.replace(/\-/g, '/'), r = +new Date(o)
        switch (t = r >= s + 864e5 && r < s + 1728e5 ? '3' : r < s ? '1' : r >= s + 1728e5 ? '4' : '2') {
          case'1':
            n = '\u6628\u5929'
            break
          case'2':
            n = '\u4eca\u5929'
            break
          case'3':
            n = '\u660e\u5929'
            break
          case'4':
            n = e.replace(/([\s+^|,^]).*/, '$1')
        }
        return n
      }, Handlebars.registerHelper('getUEliveday', function (e, n) {return t.getUEliveday(e)}), Handlebars.registerHelper('sliceTime', function (e, t) {
        var n = /\s(.+)\:/
        return e.match(n)[1]
      }), Handlebars.registerHelper('getSportLiveURL', function (e, t, n) {return 'http://3g.163.com/touch/nbalive.html?roomid=' + e + '&mid=' + t}), Handlebars.registerHelper('getAllSportLiveURL', function (e, t, n, a, l) {
        var i = ''
        return i = 'NBA' === e ? 'http://3g.163.com/touch/nbalive.html?mid=' + t + '&roomid=' + a : 'CBA' === e ? 'http://3g.163.com/touch/cbalive.html?roomid=' + a + '&mid=' + t : 'CSL' === e ? 'http://3g.163.com/touch/footballcsl_live.html?cid=' + n + '&mid=' + t + '&roomid=' + a : 'http://3g.163.com/touch/footballlive.html?cid=' + n + '&mid=' + t + '&roomid=' + a
      }), Handlebars.registerHelper('getMatchStatus', function (e, t, n) {
        var a = (new Date).getTime(), l = new Date(t.split(',')[0]).getTime()
        switch (0 == e && a >= l && (e = 1), e) {
          case 0:
            return '\u672a\u5f00\u59cb'
          case 1:
            return '\u6b63\u5728\u76f4\u64ad'
          case 2:
            return '\u5df2\u7ed3\u675f'
        }
      })
      var a = function (e, t, n) {
        var a = Date.now()
        return t = new Date(t).getTime(), n = new Date(n).getTime(), 1 == e && a > n ? e = 2 : 0 == e && a > t && (e = 1), e
      }
      Handlebars.registerHelper('liveStatusClass', function (e, t, n, l) {
        e = a(e, t, n)
        var i = ''
        switch (e) {
          case 0:
            i = ' unstart'
            break
          case 1:
            i = ' ing'
            break
          case 2:
            i = ' isover'
            break
          default:
            return ''
        }
        return i
      }), Handlebars.registerHelper('liveStatusCompare', function (e, t, n, l, i, s) {
        e = a(e, t, n)
        var o = {'==': function (e, t) {return e == t}, '===': function (e, t) {return e === t}}, r = o[l](e, i)
        return r ? s.fn(this) : s.inverse(this)
      }), Handlebars.registerHelper('liveSubNavTail', function (e, t) {
        var n = ''
        return n += isNaN(e) ? e : e + 'sc'
      }), Handlebars.registerHelper('futureHourTime', function (e) {
        var n = t.getUEliveday(e)
        switch (n) {
          case'1':
            n = ''
            break
          case'2':
            n = '\u4eca\u5929'
            break
          case'3':
            n = '\u660e\u5929'
        }
        return n += e.replace(/.* (\d{1,2}:\d{1,2}):.*/, '$1')
      }), Handlebars.registerHelper('getIdolInfo', function (t, n) {
        var a = '', l = {
          constellation: t.constellation,
          height: t.height,
          weight: t.weight,
          blood: t.blood,
          national: t.national,
          country: t.country,
          hometown: t.hometown,
          professional: t.professional,
          represent: t.represent,
          appellation: t.appellation
        }, i = 0
        return e.each(l, function (e, t) {return !!(t && i < 3) && (a += 'height' === e ? t + 'cm|' : 'weight' === e ? t + 'kg|' : t + '|', void(i += 1))}), a = a.slice(0, -1)
      }), Handlebars.registerHelper('intercept', function (e, t, n) {
        var a = e.split(';'), l = a.slice(0, t), i = l.join(' ') + (a.length <= t ? '' : '\u7b49')
        return i
      }), Handlebars.registerHelper('showIdolFocus', function (t, n) {
        var a, l = i.storageLocalVal({key: 'myidol_list'}), s = l ? JSON.parse(l) : null
        return a = s ? e.grep(s, function (e, n) {return e.id == t}) : [], 0 == a.length ? n.fn(this) : n.inverse(this)
      }), Handlebars.registerHelper('formatDate', function (e) {
        var t = new Date(e)
        return i.dateFormat.call(t, 'yyyy\u5e74MM\u6708dd\u65e5')
      }), Handlebars.registerHelper('normalIndex', function (e) {return parseInt(e) + 1}), Handlebars.registerHelper('videoLength', function (e) {
        var t = parseInt(e / 60), n = e % 60
        return t + '"' + n + '"'
      })
    },
    versionChoice: function (e) {this.versionStatus(e)},
    versionStatus: function (t, n) {
      var a, s, o, r = i.spLocalStorage(), c = l.publicMethod.localParam(), h = window.location.href,
        d = (window.location.hash, 'v_standard'), u = n || !1
      if (r ? a = i.storageLocalVal({key: 'version'}) : s = window.location.search.match('version=v_simple'), d = a ? a : 'v_standard', 'version' in c.search && c.search.version == d ? (u = !1, o = h) : o = l.publicMethod.urlAddSearch(h, {version: d}, !0), u)try {history.replaceState(null, '', o)} catch (m) {console.warn('html5--history.pushState on error!')}
      return a && 'v_standard' != a ? (e('.item', t).removeClass('current'), e('#' + a).addClass('current'), a) : '' != s && null != s && void 0 != s && (e('.item', t).removeClass('current'), e('#v_simple').addClass('current'), s[0].replace('version=', ''))
    },
    versionClick: function (e) {
      var t = i.spLocalStorage()
      switch (e) {
        case'v_standard':
          return this.versionStandard(t, e)
        case'v_simple':
          return this.versionSimple(t, e)
        case'v_pc':
          return this.versionPC(t, e)
        case'v_app':
          return this.versionAPP(t, e)
        case'':
          return !1
      }
    },
    versionStandard: function (e, t) {
      var n, a = l.publicMethod.localParam(), s = window.location.origin + window.location.pathname,
        o = window.location.hash, r = '', c = 0, h = 'v_standard'
      for (n in a.search)'version' === n && (a.search[n] = h), r += (0 === c ? '?' : '&') + n + '=' + a.search[n], c++;
      r.match('version') || (r += '' == r ? '?version=' + h : '&version=' + h), e ? (i.storageLocalVal({
        key: 'version',
        str: t
      }), window.location.href = s + r + o) : (console.warn('Do not support LocalStorage.'), window.location.href = s + r + o)
    },
    versionSimple: function (e, t) {
      var n, a = l.publicMethod.localParam(), s = window.location.origin + window.location.pathname,
        o = window.location.hash, r = '', c = 0, h = 'v_simple'
      for (n in a.search)'version' === n && (a.search[n] = h), r += (0 === c ? '?' : '&') + n + '=' + a.search[n], c++;
      r.match('version') || (r += '' == r ? '?version=' + h : '&version=' + h), e ? (i.storageLocalVal({
        key: 'version',
        str: t
      }), window.location.href = s + r + o) : (console.warn('Do not support LocalStorage.'), window.location.href = s + r + o)
    },
    versionPC: function (e, t) {window.location.href = 'http://www.163.com/special/00774IGO/ipad.html?from=3gindex'},
    versionAPP: function (e, t) {
      var n = l.publicMethod.getQD()
      'function' == typeof neteaseTracker && (neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#WakeupClientCount_' + n, '\u5ba2\u6237\u7aef\u5524\u9192\u70b9\u51fb\u603b\u91cf', 'clickp'), neteaseTracker(!1, 'http://click.portal.163.com/wap/wap3gindex/#IndexBotWakeup_' + n, '\u9996\u9875\u7248\u672c\u9009\u62e9\u5524\u9192', 'clickp')), window.location.href = 'http://3g.163.com/links/6740?s=wap' + n
    },
    setDownloadLink: function () {
      e('.icon_appdownload').parent().click(function (e) {
        e.preventDefault()
        var t = l.publicMethod.getQD()
        'function' == typeof neteaseTracker && (
          neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#WakeupClientCount_' + t, '客户端唤醒点击总量', 'clickp');
        neteaseTracker(!1, 'http://click.3g.163.com/wap/app/statistics/topbar/download/home' + t, '顶部下载按钮唤醒', 'wapclick'));


        setTimeout(function () {window.location.href = 'http://m.163.com/newsapp/applinks.html?s=news_wap_indexhead' + (t ? '_' + t : '')}, 300)
      })
    },
    setTitle: function (e, t) {
      var n = l.publicMethod.find(e, function (e, n) {return n.term === t})
      'all' !== t && n ? stateman.title = n.name + '\u9891\u9053-\u624b\u673a\u7f51\u6613\u7f51' : stateman.title = '\u624b\u673a\u7f51\u6613\u7f51'
    },
    dotStatus: function (t, n, a) {
      var l = 'has_dot', s = '1', o = i.spLocalStorage()
      o ? s = i.storageLocalVal({key: n}) : console.warn('\u4e0d\u652f\u6301LocalStorage\uff0c\u4e00\u76f4\u663e\u793adot'), '1' != s && s || (e(t).addClass(l), i.storageLocalVal({
        key: n,
        str: '0'
      }))
    },
    spreadNav: function () {
      var t = l.publicMethod.localParam(), n = !1
      n = 'spreadnav' in t.search && '1' == t.search.spreadnav, n && setTimeout(function () {e('.more_channel').click()}, 1e3)
    },
    initStyle: function (e) {
      var t = document.createElement('style'), n = ''
      switch (e) {
        case'gdwf_top':
          n = '.m_article_desc_r,.m_photoset_square_desc_r{display:none;}'
          break
        case'wo':
          n = '.u_topmenu,.main_nav_topnav_wrap{display:none;}.u_topmenu_child{padding-top:0;}#l-indexheader{height:43px;}.main_nav_bar{height:auto;}.main_nav_bar{border:0;}'
      }
      t.innerHTML = n, document.head.appendChild(t)
    },
    statfocusClick: function () {
      e('.contents-tablist').on('click', '.news-pic', function (e) {
        var t = l.publicMethod.getQD()
        'function' == typeof neteaseTracker && t && neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#clickFocus_' + t, '\u7126\u70b9\u56fe\u70b9\u51fb\u603b\u91cf', 'clickp')
      })
    }
  }, t.AF = n
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t, n) {
  n.Static = n.Static || {}
  var a = n.Static, l = n.tools
  a.handlebars_helper = function () {
    t.registerHelper('hasimg', function (e, t) {return e.length > 0 ? t.fn(this) : t.inverse(this)}), t.registerHelper('getone', function (e, t, n, a) {return (n ? e[t][n] : e[t]) || ''}), t.registerHelper('isFirst', function (e, t) {0 == e ? t.fn(this) : t.inverse(this)}), t.registerHelper('tcounthandle', function (e, t, n) {
      var a = (t + '').length, l = 99999, i = 99999999, s = 999999999
      return e > i && e <= s ? (e / Math.pow(10, 8)).toFixed(1) + '\u4ebf' : e > s ? (e / Math.pow(10, 8)).toFixed(0) + '\u4e07' : e > parseInt(t) && e <= l ? (e / Math.pow(10, a)).toFixed(1) + '\u4e07' : e > l ? (e / Math.pow(10, a)).toFixed(0) + '\u4e07' : e
    }), t.registerHelper('nozero', function (e, t) {
      var n = !1
      return '0' == e && n ? t.inverse(this) : t.fn(this)
    }), t.registerHelper('getDvalueDay', function (e, t) {return l.publicMethod.getDayDvalue(e)}), t.registerHelper('arrLengthNot', function (e, t, n) {return e.length != t ? n.fn(this) : n.inverse(this)}), t.registerHelper('notIosSafari', function (e) {return l.uaMatch.isIos ? e.inverse(this) : e.fn(this)}), t.registerHelper('isSpecial', function (e, t) {return '\u4e13\u9898' == e ? t.fn(this) : t.inverse(this)}), t.registerHelper('isBigVideo', function (e, t) {return '\u89c6\u9891' == e ? t.fn(this) : t.inverse(this)}), t.registerHelper('bothEnClass', function (e, t, n) {return t % e === 0 ? ' first' : t % e === e - 1 ? ' tail' : ''})
  }
}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}), function (e) {
  var t = NEWAP.tools, n = new NEWAP.AF, a = NEWAP.ad, l = t.publicMethod.localParam(), i = l.search
  if ('qd' in i && '' != i.qd)if ('gdwf_top' == i.qd) a.banList = [{
    channel: 'whole',
    child: '',
    module: []
  }], n.initStyle('gdwf_top'), e('body').addClass('no_special') else if ('wo' == i.qd && ('wo_tech' == i.category || 'wo_ent' == i.category || 'wo_digi' == i.category)) {
    n.initStyle('wo')
    var s = '<iframe src="http://m.wo.cn/head/163.html" name="navbar_wo" frameborder="0" style="width:100%;height:43px;" scrolling="no"></iframe>'
    e('#l-indexheader').html(s)
  }
  n.init()
  n.systemOptions.width
  l = t.publicMethod.localParam(), i = l.search
  var o = NEWAP.Nav
  o.init(), e('.nav_link_idol').addClass('hot'), e('.nav_tie').addClass('new'), n.run(), n.versionChoice('#version_choice')
  var r = n.versionStatus('#version_choice', !0), c = new NEWAP.LoginPanel
  c.init({funcObj: n}), c.run(), document.body.style.hasOwnProperty('webkitBackdropFilter') && (e('.u_topmenu').addClass('ios9'), e('.u_topmenu_child').addClass('ios9')), n.adListenerCallback(), n.enterRoute(o), n.leaveRoute(), t.uaMatch.isSogou || !function () {
    var n = {
      appID: '/touch/com.163.3g',
      displayInterval: 604800,
      show: function (n) {
        if ('AndroidChrome' != n) {
          var a = (document.querySelector('body'), document.querySelector('.ath_close_area'))
          e('.u-layer-ath').show(), e('.u-layer-ath').addClass('u-ani-ath'), a.addEventListener('click', function () {
            var n = t.publicMethod.getQD()
            'function' == typeof neteaseTracker && n && neteaseTracker(!1, 'http://click.portal.163.com/wap/touch/#addtohomescreenCount_' + n, '\u6dfb\u52a0\u5230\u4e3b\u5c4f\u70b9\u51fb\u91cf', 'clickp'), e('.u-layer-ath').removeClass('u-ani-ath'), e('.u-layer-ath').hide()
          })
        }
      }
    }
    NEWAP.addToHomeScreen(n).show()
  }(window.Zepto), FastClick.attach(document.body)
  var h = NEWAP.infoFlow, t = NEWAP.tools
  r = 'v_simple' == r, h.init({simple: r}), stateman.start({
    html5: !NEWAP.hashrouter,
    root: '/touch'
  }), NEWAP.trackerQueue && NEWAP.trackerQueue.length > 0 && (t.publicMethod.doTrackerQueue(), NEWAP.trackerQueue = [])
}($), NEWAP.integrity.push({name: 'app', flag: 'end'})
