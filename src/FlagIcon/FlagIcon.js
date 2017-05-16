// @flow
import typeof ReactModule from 'react'
import type {
  FlagIconPropsType,
  FlagIconOptionsType,
  FlagIconReturnType,
} from '../types/flow'
import { makeClassnames } from '../functions'

const FlagIcon = <T>(
  React: ReactModule,
  options: FlagIconOptionsType<T>,
): FlagIconReturnType<T> => ({
  ...props,
  Component = 'span',
  children,
}: FlagIconPropsType<T>): React$Element<*> => {
  const stylePropName = options.useCssModules ? 'styleName' : 'className'
  const p = { [stylePropName]: makeClassnames(props, options) }

  return <Component {...p}>{children}</Component>
}

export default FlagIcon
