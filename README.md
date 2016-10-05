A simple React SVG country flags component

## Installation

React Flag Icon Css is distributed as an [npm package](https://www.npmjs.org/package/react-flag-icon-css):

```bash
$ npm install --save react-flag-icon-css
```

## Prerequisites

The [webpack](//github.com/webpack/webpack) module bundler and ecosystem are recommended. You will need to install a few packages, including:

```bash
$ npm install --save-dev babel-loader css-loader file-loader sass-loader node-sass style-loader extract-text-webpack-plugin react-css-modules classnames tcomb tcomb-react
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

## Development

TODO

## Contributing

TODO

## License

This project is licensed under the terms of the [MIT license](relative link/LICENSE).
