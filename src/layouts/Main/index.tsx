import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { NavPane } from './components/NavPane'
import * as S from './styles'

import { ROUTES } from 'src/routing/routes'

interface I_Authorized {
  children: ReactNode
}

export const MainLayout = ({ children }: I_Authorized) => {
  return (
    <S.MainLayout>
      <S.MainHeader>
        <S.HeaderText>
          <Link to={ROUTES.home}>RUA-2</Link>
        </S.HeaderText>
      </S.MainHeader>
      <S.MainMiddle>
        <S.MainNav>
          <NavPane />
        </S.MainNav>
        <S.MainContent>{children}</S.MainContent>
      </S.MainMiddle>
      {/* <Footer /> */}
    </S.MainLayout>
  )
}
