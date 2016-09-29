// @flow
import type classes from 'classnames'
import type { KeyCallbackType, CountryType } from './types/flow'
import oCountries from './countries'


export const getCountries = () : Array<CountryType> => oCountries
export const getCountryCodes = (): Array<string> =>
  getCountries().map((o: CountryType) : string => o.code)

export const objectKeysApplyFn = (obj: classes, // eslint-disable-line import/prefer-default-export, max-len
                                  fn: KeyCallbackType) : classes =>
  Object.keys(obj).reduce((retObj: classes, key: string) : classes => { // eslint-disable-line arrow-body-style, max-len
    return {
      ...retObj,
      [fn(key)]: obj[key]
    }
  }, {})
