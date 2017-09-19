import path from 'path'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
// import babel from 'rollup-plugin-babel'
import buble from 'rollup-plugin-buble'
// import scss from 'rollup-plugin-scss'
import fs from 'fs'
// import livereload from 'rollup-plugin-livereload'
// import serve from 'rollup-plugin-serve'

const config = {
  input: path.resolve(__dirname, '../components/action-sheet/index.js'),
  output: [{
    file: path.resolve(__dirname, '../umd/action-sheet/action-sheet.js'),
    format: 'es',
    name: 'ActionSheet'
  }],
  sourcemap: true,
  external: [
    'vue',
    'Vue',
    'Backdrop'
  ],
  // 定义全局变量
  globals: {
    vue: 'Vue'
  },
  plugins: [
    resolve(),
    commonjs(),
    sourceMaps(),
    // babel({
    //   exclude: 'node_modules/**' // 仅仅转译我们的源码
    // }),
    vue({
      css (style, styles, compiler) {
        // console.log('------style------')
        // console.log(style)

        fs.writeFileSync(path.resolve(__dirname, '../umd/action-sheet/bundle.css'), style)
        let codes = []
        codes = styles.map(function (style) {

          console.log('------style.code------')
          console.log(style.code)

          return style.code
        })

        // fs.writeFileSync(path.resolve(__dirname, '../umd/action-sheet/bundle.less'), styles.map(style =>
        // style.code).concat(' '))
      }
    }),
    buble({
      exclude: 'node_modules/**' // 仅仅转译我们的源码
    })
    // scss(),

  ]
}

if (process.env.NODE_ENV === 'production') {
  // config.sourcemap = false
  // config.plugins.push(uglify())
}

if (process.env.NODE_ENV === 'development') {
  // config.plugins.push(livereload())
  // config.plugins.push(serve({
  //   contentBase: './',
  //   port: 8081,
  //   open: true
  // }))
}

export default config
