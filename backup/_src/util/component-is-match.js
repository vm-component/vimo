export default function componentIsMatch (component, name) {
  return (
    !!component &&
    !!component.$options &&
    component.$options._componentTag.toString().toLowerCase() === name
  )
}
