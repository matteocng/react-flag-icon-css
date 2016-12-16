// @flow
import typeof ReactModule from 'react'
import type { FlagIconPropsType, FlagIconOptionsType, FlagIconReturnType } from '../types/flow'
import { makeClassnames } from '../functions'


const FlagIcon = (React: ReactModule, options: FlagIconOptionsType): FlagIconReturnType =>
  ({ ...props, Component = 'span', children }: FlagIconPropsType): React$Element<*> => {
    const stylePropName = options.useCssModules ? 'styleName' : 'className'
    const p = { [stylePropName]: makeClassnames(props, options) }

    return <Component {...p}>{children}</Component>
  }

export default FlagIcon
