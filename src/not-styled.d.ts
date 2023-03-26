// import original module declarations
import 'styled-components'
import { T_Colors, T_Components } from './styles/theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: T_Colors
    components: T_Components
  }
}
