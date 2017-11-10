/**
 * 在App组件中增加子组件
 * */
export function addChild (vm) {
  if (window.VM && window.VM.$app) {
    window.VM.$app.$children.push(vm)
  }
}

/**
 * 在App组件中移除子组件
 * */
export function removeChild (vm) {
  let uid = vm._uid
  if (window.VM && window.VM.$app) {
    let uids = window.VM.$app.$children.map((item) => item._uid)
    let index = uids.indexOf(uid)
    window.VM.$app.$children.splice(index, 1)
  }
}
