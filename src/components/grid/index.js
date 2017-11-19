import Grid from './grid.vue'
import Column from './column.vue'
import Row from './row.vue'

Grid.install = function (Vue) {
  Vue.component(Grid.name, Grid)
}
Column.install = function (Vue) {
  Vue.component(Column.name, Column)
}
Row.install = function (Vue) {
  Vue.component(Row.name, Row)
}

export {Grid, Column, Row}
