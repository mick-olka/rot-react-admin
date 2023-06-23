export { productsAPI as ProductService } from './products.service'
export { collectionsAPI as CollectionService } from './collections.service'
export { photosAPI as PhotosService } from './photos.service'
export { authAPI as AuthService } from './auth.service'
export { ordersAPI as OrdersService } from './orders.service'
export { textBlocksAPI as TextBlocksService } from './text_blocks.service'

import axios from 'axios'

import { ROUTES } from 'src/routing/routes'
import { API_URL, LocalStorage } from 'src/utils'

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
