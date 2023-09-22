import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import styled, { ThemeProvider } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'
import 'src/styles/normalize.scss'
import 'src/styles/fonts.scss'

import { useCheckLogin } from './hooks/use-auth'
import { Routing } from './routing'
import { ROUTES } from './routing/routes'
import { theme } from './styles/theme'

const AppStyled = styled.div`
  background-color: ${theme.components.app.bg};
  color: ${theme.components.app.c};
  margin: 0 auto;
  text-align: center;
`

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <AppStyled>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <AuthGuard>
          <ThemeProvider theme={theme}>
            <Routing />
            <ToastContainer hideProgressBar autoClose={1500} />
          </ThemeProvider>
        </AuthGuard>
      </QueryClientProvider>
    </AppStyled>
  )
}

export default App

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { fetch } = useCheckLogin()
  useEffect(() => {
    if (window.location.pathname !== ROUTES.login && window.location.pathname !== ROUTES.register) {
      fetch() // if 401 then interceptor catches and redirects to the login page
    }
  }, [])
  return <>{children}</>
}
