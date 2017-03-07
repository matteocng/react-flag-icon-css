module.exports = { // eslint-disable-line import/unambiguous
  parser: 'babel-eslint',
  plugins: [
    'ava', // SEE: https://github.com/avajs/eslint-plugin-ava
    'babel', // SEE: https://github.com/babel/eslint-plugin-babel
    'flowtype', // SEE: https://github.com/gajus/eslint-plugin-flowtype
    'import', // required by 'eslint-config-airbnb'
    'jsx-a11y', // required by 'eslint-config-airbnb'
    'react', // required by 'eslint-config-airbnb'
  ],
  extends: [
    // SEE: https://git.io/vy8hw
    'airbnb',

    // SEE: https://github.com/avajs/eslint-plugin-ava#recommended-config
    'plugin:ava/recommended', // https://git.io/vy8hy

    // SEE: https://git.io/vy8h7
    'plugin:flowtype/recommended', // https://git.io/vy8hF

    // We don't use 'plugin:import/recommended' because it configures some rules
    // as warnings and not errors.
    // SEE: https://github.com/benmosher/eslint-plugin-import
    'plugin:import/errors', // https://git.io/vyRvM
    'plugin:import/warnings', // https://git.io/vyRv9
  ],
  rules:
  {
    // Disable this for now, it doesn't seem to work correctly with polymorphic
    // Flow types (e.g <T>(...)).
    'arrow-parens': 0,

    // From 'eslint-plugin-import'.
    'import/unambiguous': 1,

    // Disable this, use 'import/no-duplicates' instead (compatible with Flow).
    // SEE: https://git.io/vy4vX
    'no-duplicate-imports': 0,

    // Allow .js files to contain jsx. Overrides the recommended 'airbnb' setting.
    // SEE: https://github.com/airbnb/javascript/issues/1089
    'react/jsx-filename-extension': 0,

    // No semicolons. Overrides the recommended 'airbnb' setting.
    semi: 0,
  },
}
