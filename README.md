A simple React SVG country flags component.

## Installation

React Flag Icon Css is distributed as an [npm package](https://www.npmjs.org/package/react-flag-icon-css):

```bash
$ npm install --save react-flag-icon-css
```

## Prerequisites

The [webpack](//github.com/webpack/webpack) module bundler and ecosystem are recommended. You will need to install a few packages, including:

```bash
$ npm install --save-dev babel-loader css-loader file-loader sass-loader node-sass style-loader extract-text-webpack-plugin classnames tcomb tcomb-react
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

| Prop | Type | Default | Description | Supported values |
| --- | --- | --- | --- |
| code * | <code>String</code> |  | [ISO 3166-1-alpha-2 code](http://www.iso.org/iso/country_names_and_code_elements) | The list is [here](relative link/static/countries.json) |
| size | <code>String</code> |  |  | lg, 2x, 3x, 4x, 5x |
| flip | <code>String</code> |  |  | horizontal, vertical |
| rotate | <code>Number</code> |  |  | 30, 60, 90, 180, 270 |
| squared | <code>Boolean</code> | <code>false</code> |  | |
| Component | <code>String</code> | <code>span</code> |  | e.g <code>span</code>, <code>div</code> |
| Children | <code>String</code> | <code>false</code> | React element | e.g ```<Something />``` |

In development mode, you will see warnings in the console if you attempt to use an unsupported prop value.

## Development

TODO

## Contributing

TODO

## Origin of the flags

This project uses the [flag-icon-css](github.com/lipis/flag-icon-css) SVG country flags and CSS.

## License

This project is licensed under the terms of the [MIT license](relative link/LICENSE).
