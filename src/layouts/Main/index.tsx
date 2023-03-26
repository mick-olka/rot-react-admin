import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { NavPane } from './components/NavPane'
import * as S from './styles'

import { Footer } from '..'

import { ROUTES } from 'src/utils/constants/routes'

interface I_Authorized {
  children: ReactNode
}

export const MainLayout = ({ children }: I_Authorized) => {
  return (
    <S.MainLayout>
      <S.MainHeader>
        <h1>
          <Link to={ROUTES.home}>HEADER</Link>
        </h1>
      </S.MainHeader>
      <S.MainMiddle>
        <S.MainNav>
          <NavPane />
        </S.MainNav>
        <S.MainContent>{children}</S.MainContent>
      </S.MainMiddle>
      <Footer />
    </S.MainLayout>
  )
}
