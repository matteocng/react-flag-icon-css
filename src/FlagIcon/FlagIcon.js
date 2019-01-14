// @flow
import type { Node } from 'react'
import type {
  FlagIconPropsType,
  FlagIconOptionsType,
  FlagIconReturnType,
  CssModuleType,
  ReactModuleType,
} from '../types/flow'
import { makeClassnames } from '../functions'

const FlagIcon = <T>(
  React: ReactModuleType,
  options: FlagIconOptionsType<T>,
  styles?: CssModuleType,
): FlagIconReturnType<T> => (props: FlagIconPropsType): Node => {
  const { Component = 'span', children } = props

  /*
   *  When this component, built by `FlagIconFactory`, is instantiated with some
   *  props, a 'Could not resolve the styleName ...' Error may be thrown by
   *  `makeClassnames`.
   *
   *  It can be caused by:
   *
   *  -  `options.useCssModules` passed as `true` to `FlagIconFactory` (or `true` as
   *     default) and an incompatible configuration of the user's module bundler
   *     (webpack loaders...). What happens: all `.css` files, or just `.css` files
   *     in `node_modules/react-flag-icon-css/*` and in `node_modules/flag-icon-css/*`,
   *     are not loaded in the { key: value } `CSS modules` format ... therefore
   *     `import styles from 'flag-icon-css/...' and/or
   *     `import styles from 'react-flag-icon-css/...' return `{}` or null.
   *
   *        Solution 1: the user sets `options.useCssModules` to `false`.
   *        Solution 2: the user adds `exclude: /react-flag-icon-css|flag-icon-css/`
   *            to the existing `css-loader` configuration object (`.css` extension),
   *            assuming such object does not have `modules: true`, and adds a new
   *            `css-loader` configuration object (`.css` extension) with
   *            `include: /react-flag-icon-css|flag-icon-css/` and `modules: true`.
   *            This makes `webpack` load the `react-flag-icon/*` and `flag-icon/*`
   *            styles as `CSS modules`. In case the user is passing `options.themeStyles`,
   *            the path to such styles must be added to the `include` regex.
   *            SEE: https://github.com/gajus/react-css-modules#usage
   *
   *  -  invalid props supplied to 'FlagIconComponent'; a side effect is that the
   *     'className' property of 'FlagIconComponent', which is a function of its
   *     props and the options it was built with, contains CSS classes not part of
   *     'computedStyles', so 'makeClassnames' throws. If NODE_ENV !== 'production',
   *     'prop-types' prints a debugging message to the browser console.
   *
   *  -  `options.themeStyles` was passed and `options.useCssModules` is `true`.
   *      The user also passed a custom code e.g `z3` as a prop to `FlagIconComponent`
   *      but he/she:
   *        - forgot to include .flag-icon-z3 { ... } in the stylesheet/s
   *          loaded-mapped to `themeStyles`.
   *        - included the correct classes in the stylesheet/s loaded-mapped to
   *          `themeStyles` but forgot to make webpack load them as 'CSS modules'.
   *          See the section about `include` and `exclude` above.
   *
   *  TODO: add this text with a few examples to the docs.
   *
   */
  return (
    <Component className={makeClassnames(props, options, styles)}>
      {children}
    </Component>
  )
}

export default FlagIcon
