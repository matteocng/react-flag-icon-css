// @flow
import fs from 'fs'
import path from 'path'
import {
  flagIconModulePath,
  flagIconClassesPrefix,
} from '../functions/constants'
import styles from '../styles'


export const GetFlagIconModuleCountryCodes = ( // eslint-disable-line import/prefer-default-export
    modulePath: string = flagIconModulePath,
): string[] =>
  fs.readdirSync(path.resolve(`${modulePath}/flags/4x3`)).reduce(
    (retAr: string[], fileName: string): string[] => { // reduce() first argument: function.
      const code = path.basename(fileName, path.extname(fileName))
      return styles[`${flagIconClassesPrefix}${code}`] ? [...retAr, code] : retAr
    }
    , ([]: string[]), // reduce() second argument: initial value of 'retAr'.
  )
