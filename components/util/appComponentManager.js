/**
 * 在App组件中增加子组件
 * */
export function addChild (vm) {
  if (window.VM && window.VM.$app) {
    window.VM.$app.$children.push(vm)
  } else {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      console.error('将当前组件插入到App组成中失败, 请检查!')
    }
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
  } else {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      console.error(`将当前组件 _uid:${uid} 从App组成中移除失败, 请检查!`)
    }
  }
}
