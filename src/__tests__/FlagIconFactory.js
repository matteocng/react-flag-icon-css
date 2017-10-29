// @flow
import * as React from 'react' // eslint-disable-line import/no-duplicates
import test from 'ava' // eslint-disable-line import/no-extraneous-dependencies
import FlagIconFactory from '../'

const ReactDefault = React.default

test('does not set FlagIcon.propTypes in production', t => {
  const previousEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'

  const FlagIcon = FlagIconFactory(ReactDefault)

  process.env.NODE_ENV = previousEnv
  t.falsy(FlagIcon.propTypes)
})

test('sets FlagIcon.propTypes in development', t => {
  const previousEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'development'

  const FlagIcon = FlagIconFactory(ReactDefault)

  process.env.NODE_ENV = previousEnv
  t.truthy(FlagIcon.propTypes)
})
