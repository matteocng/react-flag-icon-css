// @flow
/*
 * The PostCSS plugins used in this file and their options must be exactly equal
 * to the ones declared in the key 'postcss' of './package.json', otherwise there
 * would be discrepancies between the testing and other environments.
 *
 * SEE: https://github.com/css-modules/css-modules-require-hook#using-with-babel-node--es6-imports
*/
import atRulesVariables from 'postcss-at-rules-variables'
import each from 'postcss-each'
import customProperties from 'postcss-custom-properties'
import discardComments from 'postcss-discard-comments'


const cssModulesScopedName = '[path]___[name]__[local]___[hash:base64:5]'


module.exports = {
  generateScopedName: cssModulesScopedName,
  prepend: [
    atRulesVariables(),
    each(),
    customProperties(),
    discardComments()
  ]
}
