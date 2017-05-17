// @flow
/* eslint-disable no-console */
import chalk from 'chalk' // eslint-disable-line import/no-extraneous-dependencies
import childProcess from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  getCountryCodes,
  getFlips,
  getRotates,
  getSizes,
} from '../../src/functions/props'

const { execFileSync } = childProcess
const { EOL } = os

// Types.
type MakeEnumTypeInputType<T: string | number> = {
  typeName: string,
  values: T[],
  eol: string,
  quote?: string,
}

type TypesTupleType<T: string | number> = [
  string,
  T[],
  $Shape<MakeEnumTypeInputType<*>>,
]

// Utility functions.
const makeEnumType = <T: string | number>(
  arg: MakeEnumTypeInputType<T>,
): string => {
  const { typeName, values, eol, quote = "'" } = arg
  const valuesString: string = values
    .map((value: T): string => `  | ${quote}${value}${quote}`)
    .join('\n')
  return `export type ${typeName} =${eol}${valuesString}`
}

const makeHeading = (npmScriptName: string): string => `// @flow
/**
 * This file must be generated with \`yarn ${npmScriptName}\` or \`npm run ${npmScriptName}\`,
 * do not modify manually.
 * SEE: package.json.
*/
`

// Execute task.
const npmConfigArgv = JSON.parse(process.env.npm_config_argv || '')
const npmScriptName = npmConfigArgv ? npmConfigArgv.original : ''
const fileName = 'enums.js'

const castEnumToString = <T: string | number>(values: T[]): string[] =>
  values.map((value: T): string => value.toString())

const countryCodes = castEnumToString(getCountryCodes())
const flips = castEnumToString(getFlips())
const sizes = castEnumToString(getSizes())
const rotates = castEnumToString(getRotates())

const typesToGenerate: TypesTupleType<*>[] = [
  ['FlagIconFlipType', flips, {}],
  ['FlagIconRotateType', rotates, { quote: '' }],
  ['FlagIconSizeType', sizes, {}],
  ['FlagIconCodeType', countryCodes, {}],
]

const types: string = typesToGenerate
  .map(([typeName, values, options]) =>
    makeEnumType({ typeName, values, eol: EOL, ...options }),
  )
  .join(`${EOL}${EOL}`)

const filePath = path.join(__dirname, `../../src/types/flow/${fileName}`)
const fileContents: string = `${makeHeading(npmScriptName)}${types}`

try {
  fs.writeFileSync(filePath, fileContents)
  execFileSync('yarn', ['prettier', filePath])
} catch (error) {
  console.error(`Error: ${error.message}`)
}

// eslint-disable-next-line no-console
console.warn(`\`${fileName}\` generated, saved to disk and formatted with prettier.
${chalk.dim(`Run \`yarn ${npmScriptName}\` or \`npm run ${npmScriptName}\` to generate again.`)}`)
