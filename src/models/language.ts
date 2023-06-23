export enum E_Languages {
  ua = 'ua',
  en = 'en',
  de = 'de',
}

export type I_Locales = {
  [key in E_Languages]: string
}
