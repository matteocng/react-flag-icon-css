// @flow
/* eslint-disable no-console */
// This is the script used by React with minimal changes (ES2015 and options)
// https://github.com/facebook/react/blob/master/scripts/prettier/index.js

import chalk from 'chalk' // eslint-disable-line import/no-extraneous-dependencies
import glob from 'glob' // eslint-disable-line import/no-extraneous-dependencies
import path from 'path'

const execFileSync = require('child_process').execFileSync

const shouldWrite = process.argv[2] === 'write'
const isWindows = process.platform === 'win32'
const prettier = isWindows ? 'prettier.cmd' : 'prettier'
const prettierCmd = path.resolve(
  __dirname,
  `../../node_modules/.bin/${prettier}`,
)
const defaultOptions = {
  'bracket-spacing': 'true',
  'single-quote': 'true',
  'jsx-bracket-same-line': 'true',
  'trailing-comma': 'all',
  'print-width': 80,
  semi: 'false',
}
const config = {
  default: {
    patterns: ['src/**/*.js'],
    ignore: ['**/node_modules/**'],
  },
  scripts: {
    patterns: ['scripts/**/*.js'],
    ignore: [],
  },
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

  const globPattern = patterns.length > 1
    ? `{${patterns.join(',')}}`
    : `${patterns.join(',')}`
  const files = glob.sync(globPattern, { ignore })

  const args = Object.keys(defaultOptions).map(
    k => `--${k}=${(options && options[k]) || defaultOptions[k]}`,
  )
  args.push(`--${shouldWrite ? 'write' : 'l'}`)

  try {
    exec(prettierCmd, [...args, ...files])
  } catch (e) {
    if (!shouldWrite) {
      console.log(
        `\n${chalk.red('  This project uses prettier to format all JavaScript code.\n')}${chalk.dim('    Please run ')}${chalk.reset('yarn prettier')}${chalk.dim(' and add changes to files listed above to your commit.')}\n`,
      )
      process.exit(1)
    }
    throw e
  }
})
