// @flow
import sass from 'node-sass' // eslint-disable-line import/no-extraneous-dependencies

const cssExtensions = ['.css', '.scss']
const cssModulesScopedName = '[path]___[name]__[local]___[hash:base64:5]'


module.exports = {
  extensions: cssExtensions,
  generateScopedName: cssModulesScopedName,
  preprocessCss: (data: string, file: string) : Buffer =>
    sass.renderSync({
      file,
      data
    }).css
}
