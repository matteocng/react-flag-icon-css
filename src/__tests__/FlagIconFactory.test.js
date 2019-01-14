// @flow
import * as React from 'react' // eslint-disable-line import/no-duplicates
import OldWayReact from 'react' // eslint-disable-line import/no-duplicates
import render from 'react-test-renderer'
import test from 'ava' // eslint-disable-line import/no-extraneous-dependencies
import FlagIconFactory from '..'

// SEE: https://github.com/facebook/flow/tree/master/packages/flow-upgrade
test('Works when React is imported in the "old way"', t => {
  const FlagIcon = FlagIconFactory(OldWayReact)

  t.notThrows(() => {
    render.create(<FlagIcon code="it" />)
  })
})

test('does not set FlagIcon.propTypes in production', t => {
  const previousEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'

  const FlagIcon = FlagIconFactory(React)

  process.env.NODE_ENV = previousEnv

  // eslint-disable-next-line react/forbid-foreign-prop-types
  t.falsy(FlagIcon.propTypes)
})

test('sets FlagIcon.propTypes in development', t => {
  const previousEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'development'

  const FlagIcon = FlagIconFactory(React)

  process.env.NODE_ENV = previousEnv

  // eslint-disable-next-line react/forbid-foreign-prop-types
  t.truthy(FlagIcon.propTypes)
})
