// @flow
export const ThrowNoJsonLoaderError = () => { // eslint-disable-line import/prefer-default-export
  if (process.env.NODE_ENV !== 'production') { // UglifyJS strips this code out in production.
    /* eslint-disable camelcase */
    declare var __webpack_require__;
    declare var __webpack_modules__;
    const webpackSignatures = [typeof __webpack_require__, typeof __webpack_modules__]
    /* eslint-enable camelcase */
    const isWebpackOne = (webpackSignatures[0] !== 'undefined') || (webpackSignatures[1] !== 'undefined')

    const message = 'react-flag-icon-css needs to import json files'
    const suggestion = isWebpackOne ? ' update to Webpack 2 to load json out of the box or add ' +
                                      'https://github.com/webpack/json-loader and this in your Webpack ' +
                                      'configuration: { test: /\\.json$/, loader: "json-loader" }'
                                    : ' add/configure the json loader or plugin for your module bundler.'

    throw new Error(`${message}:${suggestion}`)
  }
}
