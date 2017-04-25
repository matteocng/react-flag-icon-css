// @flow
import React from 'react'
import test from 'ava' // eslint-disable-line import/no-extraneous-dependencies

import MakeConsoleHook, { ConsoleOutput } from '../ConsoleHook'
import FlagIconFactory from '../../'

/**
 * TODO: remove 'ConsoleHook' as soon as possible. SEE: "Add ability to throw
 * "error instead of warning in tests": https://github.com/reactjs/prop-types/issues/28
 *
 * Note: when 'prop-types' validation fails the second time for a certain
 * prop i.e 'wrong', the error message is not printed again to the console.
 */

test('prop-types > FlagIconPropsType', (t: *) => {
  const consoleHook = MakeConsoleHook({ outputType: ConsoleOutput.error })

  // We set 'useCssModules' to false because otherwise a 'react-css-modules' error
  // would be thrown, and this test is not about that.
  const FlagIcon = FlagIconFactory(React, { useCssModules: false })

  let element = <FlagIcon code="it" rotate={30} /> // eslint-disable-line no-unused-vars
  t.falsy(consoleHook.flushLog().includes('Failed prop type'))

  // $FlowExpectError
  element = <FlagIcon flip="horizontal" />
  t.truthy(consoleHook.flushLog().includes('Failed prop type'))

  element = <FlagIcon code="wrong" />
  t.truthy(consoleHook.flushLog().includes('Failed prop type'))

  // $FlowExpectError
  element = <FlagIcon code="it" rotate="wrong" />
  t.truthy(consoleHook.flushLog().includes('Failed prop type'))

  consoleHook.detach()
})

test('prop-types > FlagIconOptionsType', (t: *) => {
  const consoleHook = MakeConsoleHook({ outputType: ConsoleOutput.error })

  FlagIconFactory(React)
  t.falsy(consoleHook.flushLog())

  FlagIconFactory(React, { useCssModules: true })
  t.falsy(consoleHook.flushLog())

  // $FlowExpectError
  FlagIconFactory(React, { useCssModules: false, wrong: 'lorem' })
  t.truthy(consoleHook.flushLog())

  // $FlowExpectError
  FlagIconFactory(React, { useCssModules: 'string', themeStyles: {} })
  t.truthy(consoleHook.flushLog())

  // $FlowExpectError
  FlagIconFactory(React, { anotherWrong: 'wrong' })
  t.truthy(consoleHook.flushLog())

  consoleHook.detach()
})
