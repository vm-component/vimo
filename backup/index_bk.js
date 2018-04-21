import core from './core.js'

// 通过构建工具使用, 只安装必要组件
export default {
  install (Vue, options = {}) {
    if (this.installed) return
    core(Vue, options)
    this.installed = true
  }
}
