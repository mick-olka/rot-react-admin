import { Box } from '@mui/material'
import styled from 'styled-components'

export const MainLayout = styled(Box)`
  height: 100%;
  background-color: ${({ theme }) => theme.components.main.bg};
  color: ${({ theme }) => theme.components.main.c};
`

export const MainHeader = styled.header`
  padding: 1px;
  background-color: ${({ theme }) => theme.components.header.bg};
  color: ${({ theme }) => theme.components.header.c};
  height: 6vh;
  /* border-bottom: 2px solid ${({ theme }) => theme.colors.gray}; */
`

export const MainMiddle = styled.div`
  min-height: calc(94vh - 2px);
  display: flex;
`

export const MainContent = styled.main`
  width: 100%;
  overflow: auto;
  & > div {
    height: 100%;
  }
`

export const MainNav = styled.nav`
  background-color: ${({ theme }) => theme.components.nav.bg};
  color: ${({ theme }) => theme.components.nav.c};
  width: 10rem;
  padding: 0.1rem;
  /* border-right: 1px solid ${({ theme }) => theme.colors.light_gray}; */
`

export const MainFooter = styled.footer`
  background-color: ${({ theme }) => theme.components.footer.bg};
  color: ${({ theme }) => theme.components.footer.c};
  height: 10vh;
`

export const FooterContent = styled(Box)`
  display: flex;
  & > p {
    margin: 1rem;
  }
`

export const HeaderText = styled.h1`
  margin: 0.3rem;
`
