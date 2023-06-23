import { I_Locales, I_ProductPopulated } from '.'

export interface I_Collection {
  _id: string
  name: I_Locales
  url_name: string
  items: I_ProductPopulated[]
  keywords: string[]
  description: I_Locales
  index: number
}

export interface I_CollectionDto {
  name?: I_Locales
  url_name?: string
  items?: string[]
}

export interface I_CollectionItemsDto {
  items: string[]
  action: 'add' | 'delete'
}

export interface I_CollectionForm {
  name: I_Locales
  description: I_Locales
}
