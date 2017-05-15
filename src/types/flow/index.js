// @flow
import type {
  FlagIconCodeType,
  FlagIconSizesType,
  FlagIconRotateType,
  FlagIconFlipType,
} from './enums'

// Workaround for exact types because: "Exact fails when doing es6 object spread".
// SEE: https://github.com/facebook/flow/issues/2405
type Exact<T> = T & $Shape<T>

// Object whose values are 'ReactPropTypes'.
// SEE: https://github.com/facebook/flow/blob/v0.44.1/lib/react.js#L138
export type PropsTypeObjectType = $Subtype<{
  [string]: $Keys<ReactPropTypes>,
}>

export type ObjStringKeyValuesType = { [key: string]: string }

export type CssModuleType = ObjStringKeyValuesType

export type {
  FlagIconCodeType,
  FlagIconSizesType,
  FlagIconRotateType,
  FlagIconFlipType,
}

export type FlagIconPropsType<T> = {
  code: FlagIconCodeType | $Keys<T & {}>,
  squared?: boolean,
  size?: FlagIconSizesType,
  rotate?: FlagIconRotateType,
  flip?: FlagIconFlipType,
  Component?: string,
  children?: React$Element<*>,
  className?: string,
}

export type FlagIconOptionsType<T> = Exact<{
  customCodes?: T,
  themeStyles?: CssModuleType,
  useCssModules?: boolean,
}>

export type FlagIconOptionsTypeStandard = Exact<{
  customCodes?: ObjStringKeyValuesType,
  themeStyles?: CssModuleType,
  useCssModules?: boolean,
}>

export type KeyCallbackType = (key: string) => string

export type FlagIconReturnType<T> = (
  props: FlagIconPropsType<T>,
) => React$Element<*>

export type FlagIconFactoryReturnType<T> = FlagIconReturnType<T>
export type StandardFlagIconFactoryReturnType = (
  props: FlagIconPropsType<void>,
) => React$Element<*>

export type CountryType = {
  name: string,
  code: FlagIconCodeType,
}
