// @flow
import { getCountryCodes } from '../functions/countries'

export type ObjStringKeyValuesType = { [key: string]: string }

export type CssModuleType = ObjStringKeyValuesType

export type FlagIconSizesType =
  | "lg"
  | "2x"
  | "3x"
  | "4x"
  | "5x"

export type FlagIconRotateType =
  | 30
  | 60
  | 90
  | 180
  | 270

export type FlagIconFlipType =
  | "horizontal"
  | "vertical"

export type FlagIconPropsType = {
  code: string,
  squared?: boolean,
  size?: FlagIconSizesType,
  rotate?: FlagIconRotateType,
  flip?: FlagIconFlipType,
  Component?: string,
  children?: React$Element<*>
}

export type FlagIconOptionsType = {
  useCssModules?: boolean,
  themeStyles?: CssModuleType
}

export type KeyCallbackType = (key: string) => string

const countryCodesEnum = getCountryCodes().reduce(
  (arReturn: ObjStringKeyValuesType, countryCode: string): ObjStringKeyValuesType =>
    ({ ...arReturn, [countryCode]: countryCode })
  , {},
)

// SEE: https://github.com/facebook/flow/issues/627
export type FlagIconCodeType = $Keys<typeof countryCodesEnum>

export type FlagIconReturnType = (props: FlagIconPropsType) => React$Element<*>

export type FlagIconFactoryReturnType = FlagIconReturnType

export type CountryType = {
  name: string,
  code: FlagIconCodeType
}
