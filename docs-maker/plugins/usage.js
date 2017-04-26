/**
 * Created by Hsiang on 2017/4/26.
 */
exports.defineTags = function (dictionary) {
  // define tags here
  dictionary.defineTag('usage', {
    canHaveType: false,
    canHaveName: false,
    mustHaveValue: false,
    mustNotHaveDescription: false,
    onTagged: function (doclet, tag) {
      let _tmp = {}
      if (!!tag['value']) {
        _tmp['description'] = tag['value']
      }
      doclet.usages = [{
        "caption":"",
        "code":tag['value']
      }]
    }
  })
}