import { DefaultTheme } from 'styled-components'

const colors = {
  yellow: '#ffc300',
  red: '#ff6b6b',
  blue: '	#3a86ff',
  dark_blue: 'rgb(0, 30, 60)',
  dark_blue2: 'rgb(30, 50, 70)',
  light_yellow: '#f7dc6f',
  pink: '#f0a27a',
  white: '#fff',
  light_gray: '#ddd',
  gray: '#aaa',
  black: '#222',
}

const components = {
  app: {
    bg: colors.white,
    c: colors.black,
  },
  textInput: {
    bg: colors.white,
    c: colors.black,
  },
  button: {
    bg: colors.blue,
    c: colors.white,
  },
  header: {
    bg: colors.black,
    c: colors.white,
  },
  main: {
    bg: colors.white,
    c: colors.black,
  },
  nav: {
    bg: colors.white,
    c: colors.dark_blue,
  },
  footer: {
    bg: colors.gray,
    c: colors.black,
  },
}

export type T_Components = typeof components
export type T_Colors = typeof colors

export const theme: DefaultTheme = {
  colors,
  components,
}

export type ThemeT = typeof theme
