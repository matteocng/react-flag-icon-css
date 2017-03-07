// @flow
import CssModulesTransform from 'react-css-modules'
import { propTypes as tcombPropTypes } from 'tcomb-react'

import typeof ReactModule from 'react'
import FlagIcon from './FlagIcon'
import styles from '../styles'
import { makeStyles, makeFlagIconOptions } from '../functions'
import { FlagIconPropsTypeTcomb } from '../types/tcomb'
import type { FlagIconOptionsType, FlagIconFactoryReturnType } from '../types/flow'


const FlagIconFactory = (
  React: ReactModule,
  options?: FlagIconOptionsType,
): FlagIconFactoryReturnType => {
  // We 'makeFlagIconOptions' by merging the default options with the (optional)
  // user-supplied options.
  const computedOptions = makeFlagIconOptions(options)
  const { useCssModules } = computedOptions

  // We assign the React Component to 'FlagIconComponent'. SEE: './FlagIcon.js'
  let FlagIconComponent = FlagIcon(React, computedOptions)

  if (process.env.NODE_ENV !== 'production') { // UglifyJS strips this block out in production.
    // We assign tcomb's propTypes (dynamic type checking) to the React component.
    // SEE: https://github.com/gcanti/tcomb-react#how-it-works
    FlagIconComponent = Object.assign(FlagIconComponent, {
      propTypes: tcombPropTypes(FlagIconPropsTypeTcomb),
    })
  } // In production, FlagIconComponent.propTypes will be undefined.

  if (useCssModules) {
    const computedStyles = makeStyles(styles, options)

    if (process.env.NODE_ENV !== 'production') { // UglifyJS strips this block out in production.
      if (useCssModules) {
        // Has the user set 'useCssModules' to true or is it just the default value?
        const userSetUseCssModules = options ? options.useCssModules : false

        if (!Object.prototype.hasOwnProperty.call(computedStyles, 'flag-icon')) {
          const readme = 'https://github.com/matteocng/react-flag-icon-css/blob/master/README.md'
          const readmeModules = 'https://github.com/gajus/react-css-modules#usage'

          console.error( // eslint-disable-line no-console
`Warning: Detected configuration mismatch/error: [react-flag-icon-css] \
FlagIconFactory tried to build FlagIcon with the option 'useCssModules' set to true \
(${userSetUseCssModules ? 'by you' : 'default'}), but it seems that your environment \
is not loading the stylesheets in the appropriate way. Two possibilities: \
\n\n 1. Your project is not using CSS Modules / you don't want to use them. \
Try building FlagIcon like this: \n\n\tFlagIconFactory(React, { useCssModules: false }) \
\n\n\tSee the README for more info: ${readme} \
\n\n 2. You are using CSS Modules but your module bundler e.g Webpack \
is not correctly set up for CSS modules. If you are using Webpack, the key \
modules to set up are 'style-loader', 'css-loader' and 'extract-text-webpack-plugin' \
('sass-loader' also comes into play if you are using SASS). \
The link below may help you:\n\n\t${readmeModules}`,
          )
        }
      }
    }

    /*
     *  We decorate the 'FlagIconComponent' using React Css Modules' decorator function.
     *
     *  SEE:  https://github.com/gajus/react-css-modules#decorator
     *        https://github.com/gajus/react-css-modules#options
     *
     *  When the 'FlagIconComponent' built by this factory is instantiated with some
     *  props, CssModulesTransform may throw a '... CSS module is undefined' Error.
     *
     *  It can be caused by:
     *
     *  -  an incorrect configuration of the user's module bundler (Webpack
     *     loaders...), meaning that the styles have not been loaded in the format
     *     that 'react-css-modules' needs and expects.
     *
     *     SEE: https://github.com/gajus/react-css-modules#usage
     *
     *  -  options.useCssModules passed as 'true' to this factory (or 'true' as
     *     default), but the user's module bundler is configured for standard CSS
     *     classes and not CSS modules.
     *
     *  -  invalid props supplied to 'FlagIconComponent'; a side effect is that the
     *     'styleName' property of 'FlagIconComponent', which is a function of its
     *     props and the options it was built with, contains CSS modules not part of
     *     'computedStyles'. If NODE_ENV !== 'production', tcomb prints a debugging
     *     message to the browser console (before 'CssModulesTransform' is executed).
     *
     *  -  'options.themeStyles' was passed and 'options.useCssModules' is
     *     'true'. The user then passed a custom code e.g 'z3' as a prop to
     *     'FlagIconComponent' but he/she forgot to include .flag-icon-z3 { ... }
     *     in the stylesheet/s loaded-mapped to 'themeStyles'.
     *
    */
    return CssModulesTransform(
      FlagIconComponent,
      computedStyles,
      { allowMultiple: true },
    )
  }// /if useCssModules

  return FlagIconComponent
}

export default FlagIconFactory
