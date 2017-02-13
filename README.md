
A simple React SVG country flags component that works with React Css Modules (default) or global Css.

[![Build Status](https://travis-ci.org/matteocng/react-flag-icon-css.svg?branch=master)](https://travis-ci.org/matteocng/react-flag-icon-css)

## Installation

React Flag Icon Css is distributed as an [npm package](https://www.npmjs.org/package/react-flag-icon-css):

```bash
$ npm install --save react-flag-icon-css
```

## Prerequisites

The [webpack](//github.com/webpack/webpack) module bundler and ecosystem are recommended. You will need to install a few packages, including:

```bash
$ npm install --save-dev babel-loader css-loader file-loader sass-loader node-sass style-loader extract-text-webpack-plugin classnames tcomb tcomb-react react-css-modules
```

## Basic usage

Import the factory from 'react-flag-icon-css', it accepts the React module as the first argument and creates the FlagIcon component. This approach ensures that FlagIcon uses your app's React instance, avoiding issues such as two versions of React being loaded at the same time.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import FlagIconFactory from 'react-flag-icon-css'

const FlagIcon = FlagIconFactory(React)
// If you are not using css modules, write the following:
// const FlagIcon = FlagIconFactory(React, { useCssModules: false })

const App = (props = {}) =>
  <div>
    <FlagIcon code={props.code} size={props.size} />
  </div>

const rootEL = document.body.querySelector('#app')

const appProps = { code: 'it', size: '3x' }
ReactDOM.render(<App {...appProps} />, rootEL)
```

An [example project](//github.com/matteocng/react-flag-icon-css-example-multi) is available.

## FlagIcon props

| Prop | Type | Flow Type | Default | Description | Supported values |
| --- | --- | --- | --- | --- |  --- |
| code * | <code>String</code> | <code>FlagIconCodeType</code> | | [ISO 3166-1-alpha-2 code](https://www.iso.org/iso/country_names_and_code_elements) | The list is [here](static/countries.json) |
| size | <code>String</code> | <code>FlagIconSizeType</code> | |  | lg, 2x, 3x, 4x, 5x |
| flip | <code>String</code> | <code>FlagIconFlipType</code> | |  | horizontal, vertical |
| rotate | <code>Number</code> | <code>FlagIconRotateType</code>| |  | 30, 60, 90, 180, 270 |
| squared | <code>Boolean</code> | |<code>false</code> |  | |
| Component | <code>String</code> | |<code>span</code> |  | e.g <code>span</code>, <code>div</code> |
| Children | <code>String</code> | <code>React$Element<*></code>| | React element | e.g ```<Something />``` |

Remember to always build FlagIcon with its factory.

## FlagIconFactory

| Argument | Type | Flow Type | Description | Supported values |
| --- | --- | --- | --- |  --- |
| React * | <code>Module</code> | <code>ReactModule</code>  | Your app's React instance | Versions in peerDependencies |
| options | <code>Object</code> | <code>FlagIconOptionsType</code> |  |  ||

## Development

Runtime type checking: in development mode (process.env.NODE_ENV !== 'production'), if you attempt to use an unsupported prop or prop value, you will see "Failed prop type" errors in the browser console (tcomb package).

Static type checking: if you use Flow, it should automatically pick up this package's definitions from the .js.flow files and check your code accordingly when you run <code>npm run flow</code>. The latest Flow version or the version in package.json is recommended.

## Contributing

Contributions are welcome. Please use a topic branch, follow the [AngularJS commit style guidelines](//github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines) and check that <code>yarn run prepublish</code> (recommended) or <code>npm run prepublish</code> (build, test, type checking, lint ...) returns zero errors before opening a PR. Thanks!

## Source of the flags

This project uses [flag-icon-css](//github.com/lipis/flag-icon-css) SVG and Css.

## License

This project is licensed under the terms of the [MIT license](LICENSE).
