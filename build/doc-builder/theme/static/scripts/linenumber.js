/*global document */
(function () {
  var source = document.getElementsByClassName('prettyprint source linenums')
  var i = 0
  var len = 0
  var lineNumber = 0
  var lineId
  var lines
  var totalLines
  var anchorHash

  if (source && source[0]) {
    anchorHash = document.location.hash.substring(1)
    lines = source[0].getElementsByTagName('li')
    totalLines = lines.length
    for (; i < totalLines; i++) {
      lineNumber++
      lineId = 'line' + lineNumber
      lines[i].id = lineId
      if (lineId === anchorHash) {
        lines[i].className += ' selected'
      }
    }
  }

  var navElement = document.querySelectorAll('body>nav')[0]
  var navs = document.querySelectorAll('nav>ul>li a')
  navs = Array.prototype.slice.call(navs)

  // 如果nav有浏浏览记录则滚动到那个位置
  var selectedEleScrollTop = window.sessionStorage.getItem('selectedEleScrollTop')
  if (selectedEleScrollTop && parseInt(selectedEleScrollTop) > 0) {
    navElement.scrollTop = parseInt(selectedEleScrollTop)
  }

  // 监听a标签的点击事件, 记录点击位置, 同步url那nav的对应关系
  for (i = 0, len = navs.length; len > i; i++) {
    var nav = navs[i]
    nav.addEventListener('click', function () {
      window.sessionStorage.setItem('selectedEleScrollTop', navElement.scrollTop)
    })
    var href = window.location.href.split('#')[0]
    if (nav.href === href) {
      nav.className += ' active'
    }
  }

  var mainNavs = document.querySelectorAll('nav>.nav__header>h2 a')
  mainNavs = Array.prototype.slice.call(mainNavs)

  for (i = 0, len = mainNavs.length; len > i; i++) {
    var mainNav = mainNavs[i]
    mainNav.addEventListener('click', function () {
      window.sessionStorage.removeItem('selectedEleScrollTop')
    })
  }
})()
