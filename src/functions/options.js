import type { FlagIconOptionsType } from '../types/flow'
import { FlagIconOptionsTypeTcomb } from '../types/tcomb'


const defaultOptions: FlagIconOptionsType = {
  useCssModules: true,
}

export default (options?: FlagIconOptionsType): FlagIconOptionsType =>
  FlagIconOptionsTypeTcomb({ ...defaultOptions, ...options })
