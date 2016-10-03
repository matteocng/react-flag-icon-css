// @flow
import type { default as ReactType } from 'react'
import typeof { default as ReactModule } from 'react'
import type { FlagIconPropsType, FlagIconOptionsType } from '../types/flow'
import { makeClassnames } from '../functions'


const FlagIcon = (React: ReactModule, options: FlagIconOptionsType) : ReactType.createElement => // eslint-disable-line flowtype/no-weak-types, max-len
  ({ ...props, Component = 'span', children }: FlagIconPropsType) : React$Element<*> => {
    const stylePropName = options.useCssModules ? 'styleName' : 'className'
    const p = { [stylePropName]: makeClassnames(props, options) }

    return <Component {...p}>{children}</Component>
  }

export default FlagIcon
