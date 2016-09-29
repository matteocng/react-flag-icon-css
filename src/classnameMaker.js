// @flow
import classnames from 'classnames'
import type classes from 'classnames'
import type { FlagIconPropsType, FlagIconOptionsType } from './types/flow'

const baseThemeStyleName = 'theme-base'

export const makeClassNameObject = ({ ...props, code = '', squared = false, rotate,
  size = '' }: FlagIconPropsType, options: FlagIconOptionsType) : classes => {
  let obj = {
    'flag-icon': true,
    'flag-icon-squared': squared,
    [`flag-icon-${size}`]: size,
    [`flag-icon-${code}`]: code,
    [`flag-icon-rotate-${rotate ? rotate : ''}`]: rotate, // eslint-disable-line no-unneeded-ternary
    [baseThemeStyleName]: options.useCssModules && options.themeStyles
  }

  if (props.className && options.useCssModules) {
    obj = { ...obj, [props.className]: true }
  }
  return obj
}

export default (props: FlagIconPropsType, options: FlagIconOptionsType) : string =>
  classnames(makeClassNameObject(props, options))
