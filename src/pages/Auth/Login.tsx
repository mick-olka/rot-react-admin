import { Box } from '@mui/material'
import { useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { CredentialsForm, I_Credentials } from '.'

import * as S from './styles'

import { useLogin } from 'src/hooks/useAuth'
import { useAuthStore } from 'src/store/auth.store'
import { ROUTES } from 'src/routing/routes'

export const Login = () => {
  const { login, tokens, isLoading, isError } = useLogin()
  const authenticate = useAuthStore((state) => state.authenticate)
  const { state } = useLocation()
  const navigate = useNavigate()
  // first logout if user wants to login or register again
  const logout = useAuthStore((state) => state.logout)
  useLayoutEffect(() => {
    logout()
  }, [])
  const onSubmit = (dat: I_Credentials) => {
    login(dat)
  }
  useEffect(() => {
    if (tokens) {
      authenticate(tokens)
      // redirect to page user tried to reach before login
      navigate(state?.path || ROUTES.home)
    }
  }, [tokens])
  return (
    <S.AuthPane>
      <h2>Login</h2>
      <CredentialsForm isLoading={isLoading} onSubmit={onSubmit} />
    </S.AuthPane>
  )
}
