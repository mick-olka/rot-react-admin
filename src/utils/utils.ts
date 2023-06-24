import { E_Languages, I_Locales, languages_list } from 'src/models'

const isFile = (v: unknown) => {
  return v instanceof File
}

const isArrayOfFiles = (v: unknown) => {
  if (Array.isArray(v) && v[0] instanceof File) return true
  return false
}

export const lanEnumToObject = <T>(value: T): { [key in E_Languages]: T } => {
  return {
    en: value,
    ua: value,
    de: value,
  }
}

export const getLangList = (
  transform?: (list_el: E_Languages) => string,
): string[] | E_Languages[] => {
  return languages_list.map((el) => {
    return transform ? transform(el) : el
  })
}

export const getFormData = (data: object): FormData => {
  const form_data = new FormData()
  const n_data = removeEmptyFields(data)
  for (const [key, value] of Object.entries(n_data)) {
    const parsed_obj = isFile(value) ? value : JSON.stringify(value) // check if file
    if (isArrayOfFiles(value)) {
      for (let i = 0; i < value.length; i++) {
        form_data.append(key, value[i])
      }
    } else form_data.append(key, typeof value === 'string' ? JSON.stringify(value) : parsed_obj)
  }
  return form_data
}

export const removeEmptyFields = (data: object): Partial<typeof data> => {
  const res: Record<string, unknown> = {}
  Object.entries(data).forEach(([key, value]) => {
    if (value || !isNaN(value)) res[key] = value
  })
  return res
}

export const areEqualObjects = (obj1: object, obj2: object): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const filterArrByReg = <T extends { name: I_Locales }>(arr: T[], filter: string): T[] => {
  const reg = new RegExp(filter, 'gi')
  const matchedItems = arr.filter((i) => String(i.name.ua).match(reg))
  return matchedItems
}
