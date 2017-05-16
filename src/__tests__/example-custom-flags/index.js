// @flow
import styles from './styles.css'

const codes = {
  ex1: 'Example 1 country',
  ex2: 'Example 2 country',
  ex3: 'Example 3 country',
}

// You can comment or remove the following line if you don't use Facebook's Flow.
export type CustomCodeType = $Keys<typeof codes>

export { styles, codes }
