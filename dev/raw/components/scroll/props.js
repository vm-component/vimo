/**
 * Created by Hsiang on 2017/5/11.
 */
const DEFAULT = {
  startX: 0,
  startY: 0,
  scrollY: true,
  directionLockThreshold: 5,
  momentum: true,
  bounce: true,
  selectedIndex: 0,
  rotate: 25,
  wheel: false,
  snap: false,
  snapLoop: false,
  snapThreshold: 0.1,
  swipeTime: 2500,
  bounceTime: 700,
  adjustTime: 400,
  swipeBounceTime: 1200,
  deceleration: 0.001,
  momentumLimitTime: 300,
  momentumLimitDistance: 15,
  resizePolling: 60,
  preventDefault: true,
  preventDefaultException: {
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
  },
  HWCompositing: true,
  useTransition: true,
  useTransform: true,
  probeType: 1
}

function defaultDataToProps (defaults) {

  let props = {}
  for (let key in defaults) {
    let value = defaults[key]
    let valueType = typeof value
    let tmp = null
    switch (valueType) {
      case 'number':
        tmp = {
          type: [Number, String],
          default: value
        }
        break
      case 'string':
        tmp = {
          type: String,
          default: value
        }
        break
      case 'boolean':
        tmp = {
          type: [Boolean, Number],
          default: value
        }
        break
      case 'object':
        if (value) {
          tmp = {
            type: Object,
            default () {
              return JSON.parse(JSON.stringify(value))
            }
          }
        } else {
          // Number String Function
          tmp = {
            type: [Object, Number, String, Function, Array],
            default () {
              return null
            }
          }
        }
        break
      case 'function':
        tmp = {
          type: Function,
          default () {
            return value
          }
        }
        break
      case 'undefined':
        tmp = [Object]
        break
      default:
        tmp = [Object]
        console.debug('这个属性未找到::props.js::defaultDataToProps()')
        console.debug('key: ' + key)
        console.debug('value: ' + value)
        console.debug('valueType: ' + valueType)
        break
    }
    props[key] = tmp
  }
  return props
}

export default defaultDataToProps(DEFAULT)