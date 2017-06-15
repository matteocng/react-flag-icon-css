// @flow
import stylesFlagIcon from 'flag-icon-css/css/flag-icon.css'
import stylesMain from './styles/main.css'
import type { CssModuleType } from './types/flow'

const finalStyles: CssModuleType = {
  ...stylesFlagIcon,
  ...stylesMain,
}

export default finalStyles
