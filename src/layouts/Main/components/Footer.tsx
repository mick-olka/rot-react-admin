import { Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import * as S from '../styles'

import { useAuthStore } from 'src/store/auth.store'

import { ROUTES } from 'src/utils/constants/routes'

export const Footer = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const isAuth = useAuthStore((state) => state.isAuth)

  const onLogout = () => {
    logout()
    navigate(ROUTES.login)
  }

  return (
    <S.MainFooter>
      <S.FooterContent>
        {!isAuth && (
          <>
            <p>
              <Link to={ROUTES.login}>Sign In</Link>
            </p>
            <p>
              <Link to={ROUTES.register}>Sign Up</Link>
            </p>
          </>
        )}
        <p>
          <Link to='#' onClick={onLogout}>
            Logout
          </Link>
        </p>
        <p>
          <Link to='https://rotang.ua' target='_blank' onClick={onLogout}>
            rotang.ua
          </Link>
        </p>
      </S.FooterContent>
    </S.MainFooter>
  )
}
