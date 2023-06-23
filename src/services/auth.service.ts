import axios from 'axios'

import { I_AuthResponseData, I_LoginCreds, I_LogoutResponseData, I_RegisterCreds } from 'src/models'

export const authAPI = {
  async login(creds: I_LoginCreds) {
    return axios.post<I_AuthResponseData>('/auth/login', creds)
  },
  async register(creds: I_RegisterCreds) {
    return axios.post<I_AuthResponseData>(`/auth/register`, creds)
  },
  async logout() {
    return axios.post<I_LogoutResponseData>(`/auth/logout`)
  },
  async checkLogin() {
    return axios.get<{ logged: boolean }>('/auth/check')
  },
}
