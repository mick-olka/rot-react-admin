const isFile = (v: unknown) => {
  return v instanceof File
}

const isArrayOfFiles = (v: unknown) => {
  if (Array.isArray(v) && v[0] instanceof File) return true
  return false
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
    } else form_data.append(key, typeof value === 'string' ? value : parsed_obj)
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
