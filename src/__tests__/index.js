// @flow
// This file is required by 'ava' before running the tests. SEE: './package.json'

/*
  We make sure that every time we require a .css file, it is parsed and processed
  by PostCSS and a few plugins. We need this hook because we are not running the
  tests with Webpack, and therefore we can't use 'postcss-loader' for the same purpose.

  SEE: './src/__tests__/cmrh.conf.js'
*/
import 'css-modules-require-hook/preset' // eslint-disable-line import/no-extraneous-dependencies

// This imports and initializes 'jsdom', a JavaScript implementation of the WHATWG DOM.
import './internals/create-document-register'
