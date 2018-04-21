/**
 * blur out TEXTAREA或者INPUT的状态
 * @return {boolean}
 * */
export default function focusOutActiveElement () {
  const activeElement = document.activeElement //  <HTMLElement>
  activeElement && activeElement.blur && activeElement.blur()
}