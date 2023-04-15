import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { cart_item_columns } from '../data'

import { OrderForm } from 'src/components'
import { ContentDialog } from 'src/components/Dialogs/ContentDialog'
import { ItemsPage } from 'src/components/ItemsPage/ItemsPage'
import { RoundButton } from 'src/components/styles'

import { useOrderById, useUpdateOrder } from 'src/hooks/useOrders'
import { getRouteWithId } from 'src/routing'
import { ROUTES } from 'src/routing/routes'
import { I_OrderForm, I_OrderItem, StatusEnum } from 'src/services/orders.service'

export const OrderPage = () => {
  const id = String(useParams().id)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState<I_OrderItem[]>([])
  const { order, isLoading, isError } = useOrderById(id)
  const { update: update_order } = useUpdateOrder()
  useEffect(() => {
    if (order) {
      setCart(order.cart)
    }
  }, [order])
  const onItemsDelete = (ids: string[]) => {
    const new_cart = cart.filter((i) => !ids.includes(i._id))
    setCart(new_cart)
    // if (order) deleteItems({ id: order._id, data: { action: 'delete', items: ids } })
  }
  const onProdClick = (id: string) => {
    if (order) {
      const url_name = order.cart.find((p) => p.product._id === id)?.product.url_name
      if (url_name) navigate(getRouteWithId(ROUTES.product, url_name))
    }
  }
  const handleOrderUpdate = (dat: I_OrderForm) => {
    let sum = 0
    cart.forEach((i) => {
      sum += i.product.price * i.count
    })
    const form_data = {
      ...dat,
      cart: cart.map((i) => i.product._id),
      sum,
      status: StatusEnum.p,
    }
    if (order) update_order({ id: order._id, form_data })
    setOpen(false)
  }
  const cart_items = {
    data: cart,
    isLoading,
    isError,
    count: cart.length,
    limit: 20,
  }
  if (order) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: '100%' }}>
          <ItemsPage
            title={`Order #${order._id.slice(20, 24)} - ${order.name}`}
            data={cart_items}
            columns={cart_item_columns}
            clientPagination
            onDeleteMultiple={onItemsDelete}
            onItemClick={onProdClick}
            deleteTitle='Remove these items from the order'
          >
            <RoundButton onClick={() => setOpen(true)}>
              <EditOutlinedIcon />
            </RoundButton>
          </ItemsPage>
        </Box>
        <ContentDialog open={open} setOpen={setOpen}>
          <OrderForm initValues={order} isLoading={isLoading} onSubmit={handleOrderUpdate} />
        </ContentDialog>
      </Box>
    )
  }
  if (isLoading) return <Box>Loading...</Box>
  return (
    <Box>
      <h3>Error</h3>
    </Box>
  )
}
