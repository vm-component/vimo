// /**
//  * Created by Hsiang on 2016/2/16.
//  */
// import Vue from 'vue'
// import backdropComponent from './backdrop.vue'
// const BackdropConstructor = Vue.extend(backdropComponent)
//
// export default {
//   _i: null,
//   present (options = null) {
//     let _insertPosition = null
//     if (!this._i) {
//       this._i = new BackdropConstructor({
//         el: document.createElement('div')
//       })
//       // 插入DOM中
//       _insertPosition = document.getElementById('backdropPortal')
//       if (_insertPosition) {
//         _insertPosition.appendChild(this._i.$el)
//       } else {
//         document.body.appendChild(this._i.$el)
//       }
//     }
//     this._i.present(options)
//   },
//   dismiss() {
//     this._i && this._i.dismiss()
//   }
// }
