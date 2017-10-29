// @flow
import * as React from 'react'
import test from 'ava' // eslint-disable-line import/no-extraneous-dependencies
import MakeConsoleHook, { ConsoleOutput } from './internals/ConsoleHook'
import FlagIconFactory from '../'
import { CustomFlagIconFactory } from '../FlagIcon/FlagIconFactory'
import type { FlagIconOptionsType } from '../types/flow'
import { codes, styles } from './example-custom-flags'

const ReactDefault = React.default
const customCodes = codes
const customCodesStyles = styles
const themeStyles = {}

test('FlagIcon options > customCodes', (t: *) => {
  const consoleHook = MakeConsoleHook({ outputType: ConsoleOutput.error })
  const options: FlagIconOptionsType<*> = {
    customCodes,
    themeStyles: {
      ...themeStyles,
      ...customCodesStyles,
    },
  }
  const FlagIconCssModules = CustomFlagIconFactory(ReactDefault, options)
  const FlagIcon = CustomFlagIconFactory(ReactDefault, {
    ...options,
    useCssModules: false,
  })

  // eslint-disable-next-line no-unused-vars
  let result = <FlagIconCssModules code="it" />

  result = <FlagIconCssModules code="ex1" />

  result = <FlagIcon code="ex2" />

  t.falsy(consoleHook.flushLog())

  // $FlowExpectError
  result = <FlagIconCssModules code="wrong" />
  t.truthy(consoleHook.flushLog())

  consoleHook.detach()
})

test('FlagIcon options > customCodes & !themeStyles', (t: *) => {
  const consoleHook = MakeConsoleHook({ outputType: ConsoleOutput.error })
  const options: FlagIconOptionsType<*> = {
    customCodes,
  }
  const FlagIconCssModules = FlagIconFactory(ReactDefault, options)
  const FlagIcon = FlagIconFactory(ReactDefault, {
    ...options,
    useCssModules: false,
  })

  // eslint-disable-next-line no-unused-vars
  let result = <FlagIconCssModules code="it" />

  // 'themeStyles' is required when 'useCssModules' IS true and 'customCodes' IS NOT null.
  t.truthy(consoleHook.flushLog().includes('themeStyles'))

  result = <FlagIcon code="eu" />

  t.falsy(consoleHook.flushLog())

  consoleHook.detach()
})

test('FlagIcon options > customCodes classes not in themeStyles', (t: *) => {
  const consoleHook = MakeConsoleHook({ outputType: ConsoleOutput.error })
  const options: FlagIconOptionsType<*> = {
    customCodes,
    themeStyles: {
      lorem: 'ipsum',
      'theme-base': 'lorem-ipsum',
    },
  }
  const FlagIconCssModules = FlagIconFactory(ReactDefault, options)
  const FlagIcon = FlagIconFactory(ReactDefault, {
    ...options,
    useCssModules: false,
  })

  // eslint-disable-next-line no-unused-vars
  let result = <FlagIconCssModules code="it" />

  // A valid 'themeStyles' is required when 'useCssModules' IS true and 'customCodes' IS NOT null.
  t.truthy(consoleHook.flushLog().includes('Invalid prop'))

  result = <FlagIcon code="eu" />

  t.falsy(consoleHook.flushLog())

  consoleHook.detach()
})
