/**
 * 根据slot的名称, 将名称当做属性写到每个子元素上
 * 例如: 为slot="item-left"/slot="item-right"的沟槽设定属性
 * */
import { isObject, isPresent } from './util'

export default function (slots) {
  if (isPresent(slots) && isObject(slots)) {
    let slotKeys = Object.keys(slots)
    slotKeys.forEach(slotKey => {
      if (slotKey !== 'default') {
        slots[slotKey].forEach(item => {
          item.elm &&
            item.elm.setAttribute &&
            item.elm.setAttribute(slotKey, '')
        })
      }
    })
  }
}
