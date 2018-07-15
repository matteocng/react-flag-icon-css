// @flow
import type { FlagIconOptionsType, CssModuleType } from '../types/flow'

export const validateStyles = <T>(
  styles: CssModuleType,
  computedOptions: FlagIconOptionsType<T>,
  options?: FlagIconOptionsType<T>,
) => {
  // UglifyJS strips this block out in production.
  if (process.env.NODE_ENV !== 'production') {
    if (!computedOptions) throw Error('Passing `computedOptions` is required.')
    if (!computedOptions.useCssModules) {
      throw Error('Cannot validate global CSS.')
    }
    // Has the user set 'useCssModules' to `true` or is it just the default value?
    const userSetUseCssModules = options ? options.useCssModules : false

    if (!Object.prototype.hasOwnProperty.call(styles, 'flag-icon')) {
      const readme =
        'https://github.com/matteocng/react-flag-icon-css/blob/master/README.md'
      const readmeModules = 'https://github.com/gajus/react-css-modules#usage'

      // eslint-disable-next-line no-console
      console.error(`Warning: Detected configuration mismatch/error: [react-flag-icon-css] \
FlagIconFactory tried to build FlagIcon with the option 'useCssModules' set to true \
(${
        userSetUseCssModules ? 'by you' : 'default'
      }), but it seems that your environment \
is not loading the stylesheets in the appropriate way. Two possibilities: \
\n\n 1. Your project is not using CSS Modules / you don't want to use them. \
Try building FlagIcon like this: \n\n\timport * as React from 'react' \
\n\n\tconst FlagIcon = FlagIconFactory(React, { useCssModules: false }) \
\n\n\tSee the README for more info: ${readme} \
\n\n 2. You are using CSS Modules but your module bundler e.g Webpack \
is not correctly set up for CSS modules. If you are using Webpack, the key \
modules to set up are 'style-loader', 'css-loader' and 'extract-text-webpack-plugin' \
('sass-loader' also comes into play if you are using SASS). \
The link below may help you:\n\n\t${readmeModules}`)
    }
  }
}

export default <T>(
  styles: CssModuleType,
  options?: FlagIconOptionsType<T>,
  // eslint-disable-next-line arrow-body-style
): CssModuleType => {
  return options && options.themeStyles
    ? { ...styles, ...options.themeStyles }
    : styles
}
