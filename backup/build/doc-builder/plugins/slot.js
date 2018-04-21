/**
 * Created by Hsiang on 2017/4/22.
 */
exports.defineTags = function (dictionary) {
  // define tags here
  dictionary.defineTag('slot', {
    canHaveType: false,
    canHaveName: true,
    mustNotHaveDescription: false,
    onTagged: function (doclet, tag) {
      if (!doclet.slots) {
        doclet.slots = []
      }
      let _tmp = {}
      if (!!tag['value']) {
        _tmp['type'] = tag['value']['type']
        _tmp['name'] = tag['value']['name']
        _tmp['description'] = tag['value']['description']
        _tmp['defaultvalue'] = tag['value']['defaultvalue']
        _tmp['optional'] = tag['value']['optional']
      }
      doclet.slots.push(_tmp)
    }
  })
}