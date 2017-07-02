// @flow
import test from 'ava' // eslint-disable-line import/no-extraneous-dependencies
import MakeConsoleHook, { ConsoleOutput } from './internals/ConsoleHook'
import { validateStyles } from '../functions/styles'
import styles from './static/testThemeStyles.css'

test("throws if 'computedOptions' is not passed", t => {
  t.throws(() => {
    // $FlowExpectError
    validateStyles(styles)
  })
})

test("throws if 'useCssModules' is falsy", t => {
  const options = { useCssModules: false }

  t.throws(() => {
    validateStyles(styles, options, options)
  })

  t.throws(() => {
    validateStyles(styles, options)
  })
})

test("prints error to console if 'styles' is invalid", t => {
  // Please only use the 'console hook' method when there is no alternative.
  const consoleHook = MakeConsoleHook({ outputType: ConsoleOutput.error })
  const options = { useCssModules: true }

  validateStyles(styles, options)
  const log = consoleHook.flushLog()
  t.truthy(log)

  // Prints a custom error if 'useCssModules' is user-set and not default.
  validateStyles(styles, options, options)
  const secondLog = consoleHook.flushLog()
  t.truthy(secondLog) // Not empty.
  t.true(secondLog !== log) // Different from the previous error message.

  consoleHook.detach()
})

test('does and prints nothing if in production', t => {
  const previousEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'

  // Please only use the 'console hook' method when there is no alternative.
  const consoleHook = MakeConsoleHook({ outputType: ConsoleOutput.error })

  validateStyles(styles, { useCssModules: true })
  t.falsy(consoleHook.flushLog())

  process.env.NODE_ENV = previousEnv
  consoleHook.detach()
})
