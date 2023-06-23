import { I_Locales } from '.'

export interface I_TextBlock {
  _id: string
  text: I_Locales
  name: string
  font?: {
    size?: number
    weight?: number
    color?: string
  }
  url?: string
}

export interface I_TextBlockDto {
  text: I_Locales
  font?: {
    size?: number
    weight?: number
    color?: string
  }
  url?: string
}

export interface I_TextBlockForm {
  text: I_Locales
}
