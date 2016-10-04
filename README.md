A simple React SVG country flags component

## Installation

React Flag Icon Css is distributed as an [npm package](https://www.npmjs.org/package/react-flag-icon-css):

```bash
$ npm install --save react-flag-icon-css
```

## Prerequisites

The [webpack](//github.com/webpack/webpack) module bundler and ecosystem are recommended. You will need to install a few modules, including:

```bash
$ npm install --save-dev babel-loader css-loader file-loader sass-loader node-sass style-loader extract-text-webpack-plugin react-css-modules
```

## Basic usage

Import the factory from 'react-flag-icon-css', it accepts the React module as the first argument and creates the FlagIcon component.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import FlagIconFactory from 'react-flag-icon-css'

const FlagIcon = FlagIconFactory(React)
// If you are not using css modules, write the following:
// const FlagIcon = FlagIconFactory(React, { useCssModules: false })

const App = (props = {}) =>
  <div>
    <FlagIcon code='it' size='3x' />
  </div>

const rootEL = document.body.querySelector('#app')
ReactDOM.render(<App {...appProps} />, rootEL)
```



## Development

TODO

## Contributing

TODO

## License

This project is licensed under the terms of the [MIT license](relative link/LICENSE).
