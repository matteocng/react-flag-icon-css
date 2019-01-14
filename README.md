A simple `React` SVG country flags component: it works with `Css Modules` (default) or standard `Css`.

[![NPM version](http://img.shields.io/npm/v/react-flag-icon-css.svg?style=flat-square)](https://www.npmjs.org/package/react-flag-icon-css)
[![NPM downloads](https://img.shields.io/npm/dm/react-flag-icon-css.svg)]()
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Build Status](https://travis-ci.org/matteocng/react-flag-icon-css.svg?branch=master)](https://travis-ci.org/matteocng/react-flag-icon-css)
[![Greenkeeper badge](https://badges.greenkeeper.io/matteocng/react-flag-icon-css.svg)](https://greenkeeper.io/)
[![dependencies Status](https://david-dm.org/matteocng/react-flag-icon-css/status.svg)](https://david-dm.org/matteocng/react-flag-icon-css)
[![devDependencies Status](https://david-dm.org/matteocng/react-flag-icon-css/dev-status.svg)](https://david-dm.org/matteocng/react-flag-icon-css?type=dev)
[![peerDependencies Status](https://david-dm.org/matteocng/react-flag-icon-css/peer-status.svg)](https://david-dm.org/matteocng/react-flag-icon-css?type=peer)
[![codecov](https://codecov.io/gh/matteocng/react-flag-icon-css/branch/master/graph/badge.svg)](https://codecov.io/gh/matteocng/react-flag-icon-css)
[![Coverage Status](https://coveralls.io/repos/github/matteocng/react-flag-icon-css/badge.svg?branch=master)](https://coveralls.io/github/matteocng/react-flag-icon-css?branch=master)

## Installation

**React Flag Icon Css** is distributed as an [npm package](https://www.npmjs.org/package/react-flag-icon-css).

We recommend installing and managing `npm` packages with [`yarn`](https://yarnpkg.com/) or [`npm 6`](https://www.npmjs.com/package/npm5):

```bash
$ yarn add react-flag-icon-css
```

or with `npm` <sup>1</sup>:

```bash
$ npm install --save react-flag-icon-css
```

<sup>1</sup> *You can omit --save if using npm >= 5.*

## Using in a `create-react-app` app

Apps bootstrapped with [`create-react-app`](https://github.com/facebookincubator/create-react-app) support this module out of the box, just follow the [Basic Usage](#basic-usage) example and remember to set `useCssModules` to `false` (`create-react-app` [does not currently](https://github.com/facebookincubator/create-react-app/pull/2285) support Css modules in its stable version, you can try [the alpha](https://github.com/facebook/create-react-app/issues/3815) but it will still not work with this module).

## Prerequisites for *custom* apps

We recommend using the [`webpack 4`](//github.com/webpack/webpack) module bundler and ecosystem to *assemble* your app, even though this module works with `webpack >= 1` and should also work with other bundlers.

If you are using `webpack`, you will need to install and configure a few commmonly used modules - see the [webpack 4 example project](//github.com/matteocng/react-flag-icon-css-example-multi) (also available for: [webpack 3](https://github.com/matteocng/react-flag-icon-css-example-multi/tree/webpack-3), [webpack 2](https://github.com/matteocng/react-flag-icon-css-example-multi/tree/webpack-2), and [webpack 1](https://github.com/matteocng/react-flag-icon-css-example-multi/tree/webpack-1)).

```bash
$ yarn add -D babel-loader css-loader file-loader style-loader extract-text-webpack-plugin
```

or with `npm`:

```bash
$ npm install --save-dev ...
```

## Basic usage

Import `FlagIconFactory` from `react-flag-icon-css`, it accepts the `React` module as the first argument and creates the `FlagIcon` component (remove the *@flow* comment if you don't use `Flow`, it does not have any effect).  *This approach ensures that `FlagIcon` uses your app's `React` instance, avoiding issues such as two versions of `React` being loaded at the same time.*

```js
/* your-app/your-components-directory/FlagIcon.js */
// @flow
import * as React from 'react'
import FlagIconFactory from 'react-flag-icon-css'

// Please only use `FlagIconFactory` one time in your application, there is no
// need to use it multiple times (it would slow down your app). You may place the
// line below in a `FlagIcon.js` file in your 'components' directory, then
// write `export default FlagIcon` as shown below and import it elsewhere in your app.
const FlagIcon = FlagIconFactory(React)
// If you are not using css modules, write the following:
// const FlagIcon = FlagIconFactory(React, { useCssModules: false })

export default FlagIcon
```

```js
/* your-app/App.js */
// @flow
import * as React from 'react';
import ReactDOM from 'react-dom'
import FlagIcon from './your-components-directory/FlagIcon.js'

const App = (props = {}) =>
  <div>
    <FlagIcon code={props.code} size={props.size} />
  </div>

const rootEL = document.body.querySelector('#app')

const appProps = { code: 'it', size: '3x' }
ReactDOM.render(<App {...appProps} />, rootEL)
```

A [`webpack 3` example project](//github.com/matteocng/react-flag-icon-css-example-multi) is available ([webpack 2](https://github.com/matteocng/react-flag-icon-css-example-multi/tree/webpack-2) and [webpack 1](https://github.com/matteocng/react-flag-icon-css-example-multi/tree/webpack-1) versions).

## :flags: FlagIcon props

*The entries marked with `&ast;` are required.*

| Prop | Type | Flow Type | Default | Description | Supported values |
| --- | --- | --- | --- | --- |  --- |
| code * | `String` | `FlagIconCodeType` <sup>1</sup> | | [ISO 3166-1-alpha-2](https://www.iso.org/iso/country_names_and_code_elements) code. | The list is [here](src/static/enums.js#L24). |
| size | `String` | `FlagIconSizeType` | |  | lg, 2x, 3x, 4x, 5x |
| flip | `String` | `FlagIconFlipType` | |  | horizontal, vertical |
| rotate | `Number` | `FlagIconRotateType` | |  | 30, 60, 90, 180, 270 |
| squared | `Boolean` | `boolean` | `false` | Uses the `1x1` image if `true`. | |
| Component | `String` | `string` | `span` |  | e.g `span`, `div` |
| className | `String` | `string` | | This is always appended *as-is* to `class` in the HTML. | e.g `some-class` |
| styleName | `String` | `string` | | This is mapped to a `CSS module` and appended to `class` in<br> the HTML. | e.g `some-class` |
| Children | `String` | `React$Element<*>` | | `React` element. | e.g ```<Something />``` |

*Remember to always build `FlagIcon` with `FlagIconFactory`.*

<sup>1</sup> *Upgrade to version 1.0.17 or later of this module.*

## :factory: FlagIconFactory

*The entries marked with `&ast;` are required.*

| Argument | Type | Flow Type | Description | Supported values |
| --- | --- | --- | --- |  --- |
| React * | `Module` | `ReactModule`  | Your app's `React` instance. | Versions in [peerDependencies](./package.json). |
| options | `Object` | `FlagIconOptionsType` |  | See *FlagIconFactory options* below.  ||

### :factory: FlagIconFactory options

| Argument | Type | Flow Type | Description | Supported values | Default |
| --- | --- | --- | --- |  --- | --- |
| useCssModules | `Boolean` | `Boolean`  | Use `CSS modules` styles (your module bundler must be correctly setup). | `true`, `false` | `true` |
| customCodes <sup>2</sup> | `Object` | `Object` | An object literal whose keys are your custom codes.<br> [Example](#exampleCustomFlagsIndex). |  ||
| themeStyles | `Object` | `CssModule` | Set this if `useCssModules` is `true` and a) you want to apply styles to `FlagIcon`<br> using `.theme-base` *and/or*<br> b) you are using [custom flags](#custom-flags). |  || |

<sup>2</sup> *Upgrade to version 1.0.17 or later of this module.*

## Facebook's Flow support

This module has **0** Flow errors on `flow-bin` version: **^0.76.0**.

If in your app you are using a Flow version that is the same or newer than that, you should not need any specific configuration excluding the installation of the [flow-typed](https://github.com/flowtype/flow-typed) definition for `prop-types` (you may also take the opportunity to install definitions for all your app's modules using [flow-typed](https://github.com/flowtype/flow-typed)).

However, if in your app you are using a newer or particularly older version (not recommended) of Flow, it may throw warnings or errors. Please open an issue or submit a pull request if this module has not yet been made compatible with a newer Flow version.

## Custom flags

### Required parameters

-   **Always** set `FlagIconFactory options.customCodes` to make this module aware of your codes. Otherwise: runtime warnings in development (and Flow errors, if you use it).
-   **If** using *`Css Modules`*, import your styles in `someVariable` and set `FlagIconFactory options.themeStyles` to `someVariable`. Otherwise: runtime `Css Modules` errors.
-   **Else if** using standard *Css*, make sure to import the styles. Otherwise: the custom images won't be loaded.
-   **If** using *`Flow`* use `CustomFlagIconFactory` and not `FlagIconFactory`. Otherwise: `Flow` errors.

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

Import `CustomFlagIconFactory` in your app and build `FlagIcon` as shown:

```js
/* app.js */
// @flow
import React from 'react'
import { CustomFlagIconFactory } from 'react-flag-icon-css'
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

**Static type checking**:

If you use Facebook's [`flow`](https://github.com/facebook/flow) in your app (otherwise you can skip this section, unless you want to submit a pull request), it should automatically pick up this package's definitions from the `.js.flow` files that are distributed with it, checking your code accordingly when you run `yarn flow`. Using the latest `Flow` version or the version in `./package.json` is recommended. We also recommend using a `Flow`-aware editor such as [`Nuclide`](https://nuclide.io/) for [`Atom`](https://atom.io/).

If you use Microsoft's [`TypeScript`](https://www.typescriptlang.org/) in your app (otherwise you can skip this section, unless you want to submit a pull request), the package that contains the type definitions for this module is: [@types/react-flag-icon-css](https://www.npmjs.com/package/@types/react-flag-icon-css).

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
