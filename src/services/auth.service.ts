import axios from 'axios'

export interface I_LoginCreds {
  email: string
  password: string
}

export interface I_RegisterCreds extends I_LoginCreds {
  admin_key: string
}

export interface I_AuthResponseData {
  access_token: string
  refresh_token: string
}

export interface I_LogoutResponseData {
  message: string
}

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
