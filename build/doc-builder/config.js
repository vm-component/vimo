var path = require('path')
var base = path.resolve(__dirname, '../../')
module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: [
      'jsdoc',
      'closure'
    ]
  },
  opts: {
    'destination': `${base}/docs`,
    'encoding': 'utf8',
    'template': 'theme'
  },
  plugins: [
    'jsdoc-vue',
    'jsdoc/plugins/markdown',
    'plugins/slot.js',
    'plugins/demo.js',
    'plugins/usage.js',
    'plugins/props.js',
    'plugins/component.js'
  ],
  markdown: {
    tags: [
      'props',
      'usage',
      'component',
      'demo',
      'slot'
    ],
    parser: 'gfm',
    hardwrap: true
  },
  source: {
    include: [
      `${base}/README.md`,
      `${base}/components/util`,
      `${base}/components/base/config.js`,
      `${base}/components/base/history.js`,
      `${base}/components/base/platform.js`,
      `${base}/components/base/app`,
      `${base}/components/base/content`,
      `${base}/components/base/page`,
      `${base}/components/base/nav`,
      `${base}/components/base/navbar`,
      `${base}/components/button`,
      `${base}/components/toolbar`,
      `${base}/components/segment`,
      `${base}/components/slides`,
      `${base}/components/slides-lite`,
      `${base}/components/tabs`,
      `${base}/components/textarea`,
      `${base}/components/alert`,
      `${base}/components/action-sheet`,
      `${base}/components/loading`,
      `${base}/components/modal`,
      `${base}/components/toast`,
      `${base}/components/indicator`,
      `${base}/components/infinite-scroll`,
      `${base}/components/refresher`,
      `${base}/components/list`,
      `${base}/components/item`,
      `${base}/components/avatar`,
      `${base}/components/thumbnail`,
      `${base}/components/note`,
      `${base}/components/label`,
      `${base}/components/input`,
      `${base}/components/checkbox`,
      `${base}/components/radio`,
      `${base}/components/range`,
      `${base}/components/searchbar`,
      `${base}/components/select`,
      `${base}/components/toggle`,
      `${base}/components/spinner`,
      `${base}/components/img`,
      `${base}/components/icon`,
      `${base}/components/card`,
      `${base}/components/badge`,
      `${base}/components/backdrop`,
      `${base}/components/menus`,
      `${base}/components/grid`,
      `${base}/components/scroll`,
      `${base}/components/popover`,
      `${base}/components/picker`,
      `${base}/components/fab`,
      `${base}/components/datetime`,
      `${base}/components/separation`,
      `${base}/components/noticebar`,
      `${base}/components/scroll-segment`,
      `${base}/components/slide-box`,
      `${base}/components/city-picker`,
      `${base}/components/feedback`,
      `${base}/components/preview-image`,
      `${base}/components/choose-city`,
      `${base}/components/sheet`,
      `${base}/components/pop-sheet`
    ],
    exclude: [
      'gulpfile.js'
    ],
    includePattern: '.+\\.js(doc|x)?$|.+\\.vue$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  templates: {
    'cleverLinks': false,
    'monospaceLinks': false,
    'default': {
      'outputSourceFiles': true,
      'includeDate': false
    }
  },
  docdash: {
    'static': true,
    'sort': true,
    'homeName': '首页 / Home',
    'demoUrl': 'https://dtfe.github.io/vimo-demo',
    'links': [
      {
        'name': '如何开始 / How To Start',
        'link': 'https://github.com/DTFE/vimo-start-kit'
      },
      {
        'name': '更新日志 / Change Log',
        'link': 'https://github.com/DTFE/Vimo/blob/master/CHANGELOG.md'
      },
      {
        'name': '常见问题 / Question',
        'link': '#'
      }
    ]
  }
}
