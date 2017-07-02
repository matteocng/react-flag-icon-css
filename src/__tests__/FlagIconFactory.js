// @flow
import React from 'react'
import test from 'ava' // eslint-disable-line import/no-extraneous-dependencies
import FlagIconFactory from '../'

test('does not set FlagIcon.propTypes in production', t => {
  const previousEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'

  const FlagIcon = FlagIconFactory(React)

  process.env.NODE_ENV = previousEnv
  t.falsy(FlagIcon.propTypes)
})

test('sets FlagIcon.propTypes in development', t => {
  const previousEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'development'

  const FlagIcon = FlagIconFactory(React)

  process.env.NODE_ENV = previousEnv
  t.truthy(FlagIcon.propTypes)
})
