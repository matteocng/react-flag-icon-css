import type { FlagIconOptionsType } from './types/flow'
import { FlagIconOptionsTypeTcomb } from './types/tcomb'


const defaultOptions: FlagIconOptionsType = {
  useCssModules: true
}

const computedOptions: FlagIconOptionsType =
                       (options: FlagIconOptionsType) : FlagIconOptionsType =>
                          FlagIconOptionsTypeTcomb({ ...defaultOptions, ...options })

export default computedOptions
