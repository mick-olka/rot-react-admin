import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { MainLayout } from 'src/layouts'

import {
  HomePage,
  Login,
  Register,
  CollectionPage,
  CollectionsListPage,
  CreateCollectionPage,
  CreateProductPage,
  ProductPage,
  OrdersPage,
  OrderPage,
  CreateOrderPage,
  TextBlocksPage,
} from 'src/pages'
import { ROUTES } from 'src/routing'
import { useAuthStore } from 'src/store'

export { ROUTES } from './routes'

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
              <CollectionsListPage />
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

      <Route
        path={ROUTES.ordersPage}
        element={
          <RequireAuth>
            <MainLayout>
              <OrdersPage />
            </MainLayout>
          </RequireAuth>
        }
      />

      <Route
        path={ROUTES.createOrder}
        element={
          <RequireAuth>
            <MainLayout>
              <CreateOrderPage />
            </MainLayout>
          </RequireAuth>
        }
      />

      <Route
        path={ROUTES.order}
        element={
          <RequireAuth>
            <MainLayout>
              <OrderPage />
            </MainLayout>
          </RequireAuth>
        }
      />

      <Route
        path={ROUTES.textBlocksPage}
        element={
          <RequireAuth>
            <MainLayout>
              <TextBlocksPage />
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
