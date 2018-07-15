// @flow
/* eslint-disable no-console */
// This is the script used by React with minimal changes (ES2015 and options)
// https://github.com/facebook/react/blob/master/scripts/prettier/index.js

import chalk from 'chalk' // eslint-disable-line import/no-extraneous-dependencies
import glob from 'glob' // eslint-disable-line import/no-extraneous-dependencies
import path from 'path'
import childProcess from 'child_process'

const { execFileSync } = childProcess
const shouldWrite = process.argv[2] === 'write'
const isWindows = process.platform === 'win32'
const prettier = isWindows ? 'prettier.cmd' : 'prettier'
const prettierCmd = path.resolve(
  __dirname,
  `../../node_modules/.bin/${prettier}`,
)

// We assign the 'Object' type to specify that 'config' is not sealed.
// eslint-disable-next-line flowtype/no-weak-types
let config: Object = {
  default: {
    patterns: ['src/**/*.js', '.eslintrc.js'],
    ignore: ['**/node_modules/**'],
  },
  scripts: {
    patterns: ['scripts/**/*.js'],
    ignore: [],
  },
}

if (process.argv[3]) {
  config = {
    userProvided: {
      ...config.default,
      patterns: [process.argv[3]],
    },
  }
}

const exec = (command, args) => {
  console.log(`> ${[command].concat(args).join(' ')}`)
  const options = {}
  return execFileSync(command, args, options).toString()
}

Object.keys(config).forEach(key => {
  const patterns = config[key].patterns
  const options = config[key].options || {}
  const ignore = config[key].ignore

  const globPattern =
    patterns.length > 1 ? `{${patterns.join(',')}}` : `${patterns.join(',')}`
  const files = glob.sync(globPattern, { ignore })

  const args = []
  args.push(`--${shouldWrite ? 'write' : 'l'}`)

  try {
    exec(prettierCmd, [...args, ...files])
  } catch (e) {
    if (!shouldWrite) {
      console.log(
        `\n${chalk.red(
          '  This project uses prettier to format all JavaScript code.\n',
        )}${chalk.dim('    Please run ')}${chalk.reset(
          'yarn prettier',
        )}${chalk.dim(
          ' and add changes to files listed above to your commit.',
        )}\n`,
      )
      process.exit(1)
    }
    throw e
  }
})
