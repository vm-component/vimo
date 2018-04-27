/**
 * Created by Hsiang on 2017/4/22.
 */
exports.defineTags = function (dictionary) {
  // define tags here
  dictionary.defineTag('demo', {
    canHaveType: false,
    canHaveName: true,
    mustNotHaveDescription: true,
    onTagged: function (doclet, tag) {
      let _tmp = {}
      if (!!tag['value']) {
        _tmp['name'] = tag['value']['name']
      }
      doclet.demos = _tmp
    }
  })
}