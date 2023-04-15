import axios from 'axios'

import { API_URL } from 'src/utils/constants/constants'
import { ROUTES } from 'src/routing/routes'
import { LocalStorage } from 'src/utils/helpers/localStorage'
export { productsAPI as ProductService } from './products.service'
export { collectionsAPI as CollectionService } from './collections.service'
export { photosAPI as PhotosService } from './photos.service'
export { authAPI as AuthService } from './auth.service'
export { ordersAPI as OrdersService } from './orders.service'

export enum E_Languages {
  ua = 'ua',
  en = 'en',
  de = 'de',
}

export const lanEnumToObject = <T>(value: T): { [key in E_Languages]: T } => {
  return {
    en: value,
    ua: value,
    de: value,
  }
}

export type I_Locales = {
  [key in E_Languages]: string
}

axios.defaults.baseURL = API_URL
axios.defaults.headers.common = {
  Authorization: LocalStorage.getAuthToken() ? `Bearer ${LocalStorage.getAuthToken()}` : null,
}

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      window.location.pathname = ROUTES.login
    }
    return Promise.reject(error)
  },
)
