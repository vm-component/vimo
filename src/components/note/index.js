import Note from './note.vue'

Note.install = function (Vue) {
  Vue.component(Note.name, Note)
}

export default Note
