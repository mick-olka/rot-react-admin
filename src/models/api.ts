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
