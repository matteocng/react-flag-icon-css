// @flow
import { ReactChildren } from 'tcomb-react'
import {
  enums,
  maybe,
  struct,
  Boolean as tcombBoolean,
  Object as tcombObject,
  String as tcombString,
} from 'tcomb'
import type {
  CountryType,
  ObjStringKeyValuesType,
} from '../types/flow'
import { getCountries } from '../functions/countries'


const strict = true

// Functions
const addKeyToObj = (
  retObj: ObjStringKeyValuesType,
  curObj: CountryType,
): ObjStringKeyValuesType => ({ ...retObj, [curObj.code]: curObj.name })

const countriesKeyValue = getCountries().reduce(addKeyToObj, {})

// Types
const FlagIconSizeType = enums.of(['lg', '2x', '3x', '4x', '5x'], 'FlagIconSizeType')
const FlagIconRotateType = enums.of([30, 60, 90, 180, 270], 'FlagIconRotateType')
const FlagIconFlipType = enums.of(['horizontal', 'vertical'], 'FlagIconFlipType')
const FlagIconCodeType = enums(countriesKeyValue, 'FlagIconCodeType')

export const FlagIconClassesObjectTypeTcomb = struct({
  code: FlagIconCodeType,
  size: maybe(FlagIconSizeType),
  squared: maybe(tcombBoolean),
  rotate: maybe(FlagIconRotateType),
  flip: maybe(FlagIconFlipType),
}, 'FlagIconClassesObjectType')

export const FlagIconPropsTypeTcomb = FlagIconClassesObjectTypeTcomb.extend({
  Component: maybe(tcombString),
  children: maybe(ReactChildren),
}, { name: 'FlagIconPropsType', strict })

export const FlagIconOptionsTypeTcomb = struct({
  useCssModules: tcombBoolean,
  themeStyles: maybe(tcombObject),
}, { name: 'FlagIconOptionsType', strict })
