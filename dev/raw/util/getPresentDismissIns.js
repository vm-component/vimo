/**
 * Created by Hsiang on 2017/4/9.
 * actionsheet/alert/loading, 三个组件的返回结构
 * @private
 */
export function getPresentDismissIns (Factory) {
  return {
    /**
     * 组件实例
     * */
    _i: null, // instance

    /**
     * 开启
     * @desc
     * 如果上一个实例是开启状态, 则自动关闭后开启新的
     * @param {object} options - 传入参数
     * @return {Promise} - 开启动画结束的promise
     * */
    present(options){
      return new Promise((resolve) => {
        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => {
            this._i = Factory(options)
            // 自动开启
            this._i.present().then(() => {resolve()})
          })
        } else {
          this._i = Factory(options)
          // 自动开启
          this._i.present().then(() => {resolve()})
        }
      })
    },

    /**
     * 关闭
     * @return {Promise} - 关闭动画结束的promise
     * */
    dismiss(){
      return new Promise((resolve) => {
        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => {resolve()})
        } else {
          resolve()
        }
      })
    }
  }
}