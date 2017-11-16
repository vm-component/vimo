import { addClass, hasClass, removeClass } from './util'

let scrollTop = 0

export function enableScroll () {
  let element = document.querySelectorAll('.ion-app')[0]
  console.log(element)

  if (hasClass(element, 'disable-scroll')) {
    // for mobile
    removeClass(element, 'disable-scroll')
    // scrollTop lost after set position:fixed, restore it back.
    window.scrollTo(0, scrollTop)
  }
}

export function disableScroll () {
  let element = document.querySelectorAll('.ion-app')[0]
  console.log(element)

  if (!hasClass(element, 'disable-scroll')) {
    // for mobile
    scrollTop = window.scrollY
    addClass(element, 'disable-scroll')
    element.style.top = -scrollTop + 'px'
  }
}
