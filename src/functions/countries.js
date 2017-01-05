import { ThrowNoJsonLoaderError } from './config'
import type { CountryType } from '../types/flow'
import oCountries from '../../static/countries.json'


// Webpack 2 can require/import json out of the box, Webpack 1 and maybe other
// bundlers cannot, so we warn the user. UglifyJS strips this code out in production.
if (process.env.NODE_ENV !== 'production') {
  if (!oCountries || Object.keys(oCountries).length === 0) {
    ThrowNoJsonLoaderError()
  }
}

export const getCountries = (): CountryType[] => oCountries
export const getCountryCodes = (): FlagIconCodeType[] =>
  getCountries().map((o: CountryType): FlagIconCodeType => o.code)
