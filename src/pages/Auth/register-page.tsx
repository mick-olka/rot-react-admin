import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { CredentialsForm } from '.'

import { I_Credentials } from './credentials-form'
import * as S from './styles'

import { TextFieldBox, TextFieldStyled } from 'src/components/styles'
import { useRegister } from 'src/hooks/use-auth'
import { ROUTES } from 'src/routing/routes'
import { useAuthStore } from 'src/store/auth.store'

export const Register = () => {
  const { register, tokens, isLoading, isError } = useRegister()
  const authenticate = useAuthStore((state) => state.authenticate)
  const { state } = useLocation()
  const navigate = useNavigate()
  const [adminKey, setAdminKey] = useState<string>('')
  const onSubmit = (dat: I_Credentials) => {
    const registerData = { ...dat, admin_key: adminKey }
    register(registerData)
  }
  // first logout if user wants to login or register again
  const logout = useAuthStore((state) => state.logout)
  useLayoutEffect(() => {
    logout()
  }, [])
  useEffect(() => {
    if (tokens) {
      authenticate(tokens)
      // redirect to page user tried to reach before login
      navigate(state?.path || ROUTES.home)
    }
  }, [tokens])

  return (
    <S.AuthPane>
      <h2>Register</h2>
      <TextFieldBox>
        <label>Admin Key</label>
        <TextFieldStyled
          value={adminKey}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            setAdminKey(e.target.value)
          }
        />
      </TextFieldBox>
      <CredentialsForm isLoading={isLoading} onSubmit={onSubmit} />
    </S.AuthPane>
  )
}
