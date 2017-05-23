A simple `React` SVG country flags component: it works with `React Css Modules` (default) or standard `Css`.

[![NPM version](http://img.shields.io/npm/v/react-flag-icon-css.svg?style=flat-square)](https://www.npmjs.org/package/react-flag-icon-css)
[![Build Status](https://travis-ci.org/matteocng/react-flag-icon-css.svg?branch=master)](https://travis-ci.org/matteocng/react-flag-icon-css)
[![Greenkeeper badge](https://badges.greenkeeper.io/matteocng/react-flag-icon-css.svg)](https://greenkeeper.io/)
[![dependencies Status](https://david-dm.org/matteocng/react-flag-icon-css/status.svg)](https://david-dm.org/matteocng/react-flag-icon-css)
[![devDependencies Status](https://david-dm.org/matteocng/react-flag-icon-css/dev-status.svg)](https://david-dm.org/matteocng/react-flag-icon-css?type=dev)
[![peerDependencies Status](https://david-dm.org/matteocng/react-flag-icon-css/peer-status.svg)](https://david-dm.org/matteocng/react-flag-icon-css?type=peer)

[![codecov](https://codecov.io/gh/matteocng/react-flag-icon-css/branch/master/graph/badge.svg)](https://codecov.io/gh/matteocng/react-flag-icon-css)
[![Coverage Status](https://coveralls.io/repos/github/matteocng/react-flag-icon-css/badge.svg?branch=master)](https://coveralls.io/github/matteocng/react-flag-icon-css?branch=master)

## Installation

**React Flag Icon Css** is distributed as an [npm package](https://www.npmjs.org/package/react-flag-icon-css).

We recommend installing and managing `npm` packages with [`yarn`](https://yarnpkg.com/):

```bash
$ yarn add react-flag-icon-css
```

or with `npm`:

```bash
$ npm install --save react-flag-icon-css
```

## Using in a <code>create-react-app</code> app

Apps bootstrapped with [<code>create-react-app</code>](https://github.com/facebookincubator/create-react-app) support this module out of the box, remember to set <code>useCssModules</code> to <code>false</code> (unfortunately <code>create-react-app</code> does not currently support Css modules).

```js
import FlagIconFactory from 'react-flag-icon-css'

const FlagIcon = FlagIconFactory(React, { useCssModules: false })
// ...
```

## Prerequisites for *custom* apps

We recommend using the [`Webpack 2`](//github.com/webpack/webpack) module bundler and ecosystem to *assemble* your app, but this module also works with `Webpack 1` and should work with other bundlers.

If you are using `Webpack`, you will need to install and configure a few commmonly used modules (see the [Webpack 2 example project](//github.com/matteocng/react-flag-icon-css-example-multi)):

```bash
$ yarn add -D babel-loader css-loader file-loader style-loader extract-text-webpack-plugin
```

or with `npm`:

```bash
$ npm install --save-dev ...
```

## Basic usage

Import `FlagIconFactory` from `react-flag-icon-css`, it accepts the `React` module as the first argument and creates the `FlagIcon` component. *This approach ensures that `FlagIcon` uses your app's `React` instance, avoiding issues such as two versions of `React` being loaded at the same time.*

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

A [Webpack 2 example project](//github.com/matteocng/react-flag-icon-css-example-multi) is available.

## :flags: FlagIcon props

*The entries marked with <code>&ast;</code> are required.*

| Prop | Type | Flow Type | Default | Description | Supported values |
| --- | --- | --- | --- | --- |  --- |
| code * | <code>String</code> | <code>FlagIconCodeType</code> <sup>1</sup> | | [ISO 3166-1-alpha-2](https://www.iso.org/iso/country_names_and_code_elements) code. | The list is [here](src/static/enums.js#L24). |
| size | <code>String</code> | <code>FlagIconSizeType</code> | |  | lg, 2x, 3x, 4x, 5x |
| flip | <code>String</code> | <code>FlagIconFlipType</code> | |  | horizontal, vertical |
| rotate | <code>Number</code> | <code>FlagIconRotateType</code> | |  | 30, 60, 90, 180, 270 |
| squared | <code>Boolean</code> | <code>boolean</code> | <code>false</code> | Uses the <code>1x1</code> image if <code>true</code>. | |
| Component | <code>String</code> | <code>string</code> | <code>span</code> |  | e.g <code>span</code>, <code>div</code> |
| Children | <code>String</code> | <code>React$Element<*></code> | | `React` element. | e.g ```<Something />``` |

*Remember to always build `FlagIcon` with `FlagIconFactory`.*

<sup>1</sup> *Upgrade to version 1.0.17 or later of this module.*

## :factory: FlagIconFactory

*The entries marked with <code>&ast;</code> are required.*

| Argument | Type | Flow Type | Description | Supported values |
| --- | --- | --- | --- |  --- |
| React * | <code>Module</code> | <code>ReactModule</code>  | Your app's `React` instance. | Versions in [peerDependencies](./package.json). |
| options | <code>Object</code> | <code>FlagIconOptionsType</code> |  |  ||

### :factory: FlagIconFactory options

| Argument | Type | Flow Type | Description | Supported values | Default |
| --- | --- | --- | --- |  --- | --- |
| useCssModules | <code>Boolean</code> | <code>Boolean</code>  | Use <code>react-css-modules</code>. | <code>true</code>, <code>false</code> | <code>true</code> |
| customCodes <sup>2</sup> | <code>Object</code> | <code>Object</code> | An object literal whose keys are your custom codes.<br> [Example](#exampleCustomFlagsIndex). |  ||
| themeStyles | <code>Object</code> | <code>CssModule</code> | Set this if <code>useCssModules</code> is <code>true</code> and a) you want to apply styles to <code>FlagIcon</code><br> using <code>.theme-base</code> *and/or*<br> b) you are using [custom flags](#custom-flags). |  || |

<sup>2</sup> *Upgrade to version 1.0.17 or later of this module.*

## Configuration for Facebook's Flow

*You can skip this section if you are not using <code>Flow</code> in your project.*

The following are the rules that you need in your <code>.flowconfig</code>:

```ini
[options]
...
# Used in tests.
suppress_comment=\\(.\\|\n\\)*\\$FlowExpectError
suppress_comment=\\(.\\|\n\\)*\\$FlowFixMe
# SEE: https://github.com/facebook/flow/issues/1895
suppress_type=$FlowIssue
...
[ignore]
...
# SEE: https://github.com/stylelint/stylelint/issues/2322
.*/node_modules/stylelint/.*
...
```

## Custom flags

### Required parameters

-   **Always** set <code>FlagIconFactory options.customCodes</code> to make this module aware of your codes. Otherwise: runtime warnings in development (and Flow errors, if you use it).
-   **If** using *`React Css Modules`*, import your styles in <code>someVariable</code> and set <code>FlagIconFactory options.themeStyles</code> to <code>someVariable</code>. Otherwise: runtime `React Css Modules` errors.
-   **Else if** using standard *Css*, make sure to import the styles. Otherwise: the custom images won't be loaded.
-   **If** using *<code>Flow</code>* use <code>CustomFlagIconFactory</code> and not <code>FlagIconFactory</code>. Otherwise: <code>Flow</code> errors.

### Quick example

We recommend organizing your custom flags in a folder similar to [`example-custom-flags`](src/__tests__/example-custom-flags). You may copy-paste it in the root of your app and replace the codes and images.

Example folder structure:

```
|-- app.js
|-- example-custom-flags
    |--index.js
    |--istyles.css
    |--images
       |--1x1
          |--ex1.svg
          |--ex2.svg
          |--ex3.svg
       |--4x3
          |--ex1.svg
          |--ex2.svg
          |--ex3.svg
```

Write the styles for each one of your codes, and load the appropriate images:
<a name="exampleCustomFlagsStyles"></a>
```css
/* example-custom-flags/styles.css */
/**
 * Note: you can use PostCSS, SASS or whatever preprocessor your
 * app is using here.
 */
.flag-icon-ex1 {
  background-image: url(../images/4x3/ex1.svg);
}

.flag-icon-ex1.flag-icon-squared {
  background-image: url(../images/1x1/ex1.svg);
}

/* ... */

```

Import the styles and export them and the object with your codes:
<a name="exampleCustomFlagsIndex"></a>
```js
/* example-custom-flags/index.js */
import styles from './styles.css'

const codes = {
  ex1: 'Example 1 country',
  ex2: 'Example 2 country',
  ex3: 'Example 3 country',
}

// You can comment or remove the following line if you don't use Facebook's Flow.
export type CustomCodeType = $Keys<typeof codes>

export { styles, codes }
```

Import <code>CustomFlagIconFactory</code> in your app and build <code>FlagIcon</code> as shown:

```js
/* app.js */
import React from 'react'
import CustomFlagIconFactory from 'react-flag-icon-css'
import { styles, codes } from './my-custom-flags'

// Using 'react-css-modules'? Use this:
const optionsCssModules = { customCodes: codes, themeStyles: styles }
const FlagIconCssModules = CustomFlagIconFactory(React, optionsCssModules)

// Using global CSS? Use this instead:
const options = { useCssModules: false, customCodes: codes }
const FlagIcon = CustomFlagIconFactory(React, options)

```

*Note: when you build FlagIcon with CustomFlagIconFactory, it can be used with both built-in and custom codes.*

## Development

**Runtime type checking**: in development mode (`process.env.NODE_ENV !== 'production'`), when using unsupported props or prop values, you are warned at runtime by *Failed prop type* errors in the browser console. Feature powered by [`prop-types`](https://github.com/reactjs/prop-types).

**Static type checking**: if you use Facebook's [`flow`](https://github.com/facebook/flow) in your app (otherwise you can skip this section, unless you want to submit a pull request), it should automatically pick up this package's definitions from the `.js.flow` files that are distributed with it, checking your code accordingly when you run `yarn flow`. Using the latest `Flow` version or the version in `./package.json` is recommended. We also recommend using a `Flow`-aware editor such as [`Nuclide`](https://nuclide.io/) for [`Atom`](https://atom.io/).

## Contributing

Contributions are welcome:

-   :pencil2: **Write code:** use a topic branch, follow the [AngularJS commit style guidelines](//github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines) and check that `yarn prepublish` (build, test, type checking, linting ...) returns zero errors before opening a PR. If you want to make major modifications to the code, please [open an issue](https://github.com/matteocng/react-flag-icon-css/issues) to discuss them first.

-   :bug: **Report a bug:** first, [search all issues](https://github.com/matteocng/react-flag-icon-css/issues?q=is%3Aissue). If nothing turns up, [open a new issue](https://github.com/matteocng/react-flag-icon-css/issues/new) and be as specific as possible, so that we can reproduce your setup and find out if it is a bug or a configuration issue.

-   :triangular_ruler: **Propose a feature:** first, [search all issues](https://github.com/matteocng/react-flag-icon-css/issues?q=is%3Aissue). If nothing turns up, [open a new issue](https://github.com/matteocng/react-flag-icon-css/issues/new) and describe what the proposed feature should do, why you think it is important and an example use case.

Thanks! :blue_heart:

## Find this module useful?

:star: **[Starring it](https://help.github.com/articles/about-stars/)** lets you keep track of this project and helps more people discover it.

## Source of the flags

This project uses the great SVG country flags from [flag-icon-css](//github.com/lipis/flag-icon-css).

## License

This project is licensed under the terms of the [MIT license](LICENSE).
