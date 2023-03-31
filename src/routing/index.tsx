import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { MainLayout } from 'src/layouts'

import { HomePage, Login, Register } from 'src/pages'
import { CollectionPage, CollectionsList } from 'src/pages/Collections'
import { CreateCollectionPage } from 'src/pages/Collections/CreateCollection'
import { CreateProductPage, ProductPage } from 'src/pages/Products'
import { useAuthStore } from 'src/store/auth.store'
import { ROUTES } from 'src/utils/constants/routes'

export const Routing = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.home}
        element={
          <RequireAuth>
            <MainLayout>
              <HomePage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.product}
        element={
          <RequireAuth>
            <MainLayout>
              <ProductPage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.createProduct}
        element={
          <RequireAuth>
            <MainLayout>
              <CreateProductPage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.collectionsPage}
        element={
          <RequireAuth>
            <MainLayout>
              <CollectionsList />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.collection}
        element={
          <RequireAuth>
            <MainLayout>
              <CollectionPage />
            </MainLayout>
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.createCollection}
        element={
          <RequireAuth>
            <MainLayout>
              <CreateCollectionPage />
            </MainLayout>
          </RequireAuth>
        }
      />

      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.register} element={<Register />} />
      <Route
        path={ROUTES.error}
        element={
          <MainLayout>
            <div>404</div>
          </MainLayout>
        }
      />
    </Routes>
  )
}

export const getRouteWithId = (route: ROUTES, id: string): string => {
  if (route.includes(':')) {
    return route.split(':')[0] + id
  }
  return ROUTES.home
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAuthStore((state) => state.isAuth)
  const location = useLocation()

  return isAuth ? (
    children
  ) : (
    <Navigate to={ROUTES.login} replace state={{ path: location.pathname }} />
  )
}
