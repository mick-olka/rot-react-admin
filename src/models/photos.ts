import { I_Locales } from '.'

export interface I_Photos {
  _id: string
  path_arr: string[]
  main_color: I_Locales
  pill_color: I_Locales
}

export interface I_PhotosForm {
  main_color: I_Locales
  pill_color: I_Locales
}

export interface I_PhotosDto {
  files: File[]
  main_color: I_Locales
  pill_color: I_Locales
}
