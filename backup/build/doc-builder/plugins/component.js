/**
 * Created by Hsiang on 2017/4/22.
 */
exports.defineTags = function (dictionary) {
  // define tags here
  dictionary.defineTag('component', {
    isNamespace: true,
    canHaveName: true,
    onTagged: function (doclet, tag) {
      doclet.kind = 'module'
      doclet.trueKind = 'component'
      doclet.scope = 'instance'
      doclet.name = tag.text
      doclet.longname = 'component' + ':' + tag.text
      // doclet.longname = 'module' + ':' + tag.text
      doclet.memberof = ''
    }
  })
}

