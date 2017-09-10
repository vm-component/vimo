import path from 'path'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
// import babel from 'rollup-plugin-babel'
import buble from 'rollup-plugin-buble'
// import scss from 'rollup-plugin-scss'

// import livereload from 'rollup-plugin-livereload'
// import serve from 'rollup-plugin-serve'

const config = {
  input: path.resolve(__dirname, '../components/backdrop/index.js'),
  output: [{
    file: path.resolve(__dirname, '../umd/backdrop.js'),
    format: 'umd',
    name: 'Backdrop'
  }],
  sourcemap: true,
  external: [
    'Vue', 'Vue',
    'vue', 'Vue'
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
      css: true
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
