// @flow
import type { Node, StatelessFunctionalComponent } from 'react'
import type {
  FlagIconCodeType,
  FlagIconSizeType,
  FlagIconRotateType,
  FlagIconFlipType,
} from './enums'

// Workaround for exact types because: "Exact fails when doing es6 object spread".
// SEE: https://github.com/facebook/flow/issues/2405
type Exact<T> = T & $Shape<T>

// Object whose values are 'ReactPropTypes'.
// SEE: https://git.io/vFIvf
export type PropsTypeObjectType = $Subtype<{
  [string]: $npm$propTypes$ReactPropsCheckType,
}>

export type ObjStringKeyValuesType = { [key: string]: string }

export type CssModuleType = ObjStringKeyValuesType

export type {
  FlagIconCodeType,
  FlagIconSizeType,
  FlagIconRotateType,
  FlagIconFlipType,
}

type FlagIconPropsTypeBase = {
  squared?: boolean,
  size?: FlagIconSizeType,
  rotate?: FlagIconRotateType,
  flip?: FlagIconFlipType,
  Component?: string,
  children?: Node,
  className?: string,
  styleName?: string,
}

export type FlagIconPropsType = FlagIconPropsTypeBase & {
  code: FlagIconCodeType,
}

export type CustomFlagIconPropsType<T> = FlagIconPropsTypeBase & {
  code: FlagIconCodeType | $Keys<T & {}>,
}

export type FlagIconOptionsType<T> = Exact<{
  customCodes?: T,
  themeStyles?: CssModuleType,
  useCssModules?: boolean,
}>

export type KeyCallbackType = (key: string, i: number) => string

export type FlagIconReturnType<T> = StatelessFunctionalComponent<
  CustomFlagIconPropsType<T>,
>
export type FlagIconFactoryReturnType<T> = FlagIconReturnType<T>
export type StandardFlagIconFactoryReturnType = StatelessFunctionalComponent<
  FlagIconPropsType,
>

export type CountryType = {
  name: string,
  code: FlagIconCodeType,
}

export type ReactTestRendererTreeType = {
  type: string,
  props: {
    className?: string,
  },
  children?: ReactTestRendererTreeType,
}
