// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'standard',
    'plugin:vue/base'
  ],
  parserOptions: {
    'parser': 'babel-eslint',
    'ecmaVersion': 2017,
    'sourceType': 'module'
  },
  env: {
    browser: true
  },
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'eol-last': 0,
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
