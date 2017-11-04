var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var utils = require('../examples/build/utils')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var fs = require('fs')
var camelcase = require('lodash.camelcase')
let componentsFileNames = []
// 获取符合条件的fileNames
fs.readdir('./src', function (err, files) {
  if (err) {
    throw err
  }
  // files是一个数组
  // 每个元素是此目录下的文件或文件夹的名称
  let filterCondition = (fileName) => {
    return fileName.indexOf('.') === -1 && fileName.indexOf('_') !== 0
  }
  componentsFileNames = files.filter((fileName) => filterCondition(fileName))
  buildLib(componentsFileNames)
})

// 根据fileName生成webpack配置
function webpackConfigFactory (fileName) {
  var config = {
    entry: path.resolve(__dirname, '..', `components/${fileName}`),
    outputFileName: 'index.js',
    libraryTarget: 'umd',
    library: camelcase(fileName), // action-sheet -> actionSheet
    outputPath: path.resolve(__dirname, `../lib/${fileName}`),
    outputPublicPath: '/',
    sourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    gzip: false,
    gzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: false
  }

  let webpackConfig = {
    entry: config.entry,
    devtool: '#source-map',
    output: {
      filename: config.outputFileName,
      path: config.outputPath,
      publicPath: config.outputPublicPath,
      libraryTarget: config.libraryTarget,
      library: config.library
    },
    module: {
      rules: [
        ...utils.styleLoaders({
          sourceMap: true,
          extract: true
        }),
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: utils.cssLoaders({
              sourceMap: true,
              extract: true
            })
          },
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
          // include: [resolve('src'), resolve('test'), resolve('../src')]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        filename: 'style.css'
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different src can be deduped.
      new OptimizeCSSPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        sourceMap: true
      })
    ]
  }
  return webpackConfig
}

// 执行构造lib
function buildLib (fileNames) {
  // start
  var spinner = ora('building for production...')
  spinner.start()

  rm(path.join(path.resolve(__dirname, '../lib')), err => {
    if (err) throw err
    buildComponent(fileNames.pop())

    function buildComponent (filename) {
      webpack(webpackConfigFactory(filename), function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
        ))

        console.log(`DONE -> ${filename}`)
        if (fileNames.length > 0) {
          // next
          buildComponent(fileNames.pop())
        }
      })
    }
  })
}
