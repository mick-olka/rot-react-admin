import { Box } from '@mui/material'
import { Navigate } from 'react-router-dom'

import * as S from './styles'

import { OrderForm } from 'src/components'
import { useCreateOrder } from 'src/hooks/use-orders'
import { getRouteWithId } from 'src/routing'
import { ROUTES } from 'src/routing/routes'
import { I_OrderForm, StatusEnum } from 'src/services/orders.service'

export const CreateOrderPage = () => {
  const { create, isLoading, isError, order } = useCreateOrder()

  const onSubmit = (data: I_OrderForm) => {
    const create_data = { ...data, cart: [], sum: 0, status: StatusEnum.w }
    create(create_data)
  }

  return (
    <S.Pane>
      <h2>Create Order</h2>
      <Box sx={{ display: 'flex' }}>
        <OrderForm onSubmit={onSubmit} isLoading={isLoading} />
      </Box>
      {isError && <h3>Error creating order</h3>}
      {order && <Navigate to={getRouteWithId(ROUTES.order, order.data._id)} />}
    </S.Pane>
  )
}
