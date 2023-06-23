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
