import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { columns } from './data'

import { ItemsPage } from 'src/components/ItemsPage/ItemsPage'
import { useDeleteOrdersMany, useOrders } from 'src/hooks/useOrders'
import { getRouteWithId } from 'src/routing'
import { ROUTES } from 'src/routing/routes'

export const OrdersPage = () => {
  const { deleteMany } = useDeleteOrdersMany()
  const [page, setPage] = useState(1)
  const [regex, setRegex] = useState<string | undefined>(undefined)
  const { orders, count, isLoading, isError, refetch, limit } = useOrders({ page, regex })
  const navigate = useNavigate()
  const onItemClick = (id: string) => {
    if (orders) {
      const order_id = orders.find((c) => c._id === id)?._id
      if (order_id) navigate(getRouteWithId(ROUTES.order, order_id))
    }
  }
  const handleCreateOrder = () => {
    navigate(ROUTES.createOrder)
  }
  const handleSearchTrigger = (searchText: string | undefined) => {
    if (searchText) setRegex(searchText)
    else setRegex(undefined)
  }
  const data = { data: orders, count: count || 0, isLoading, isError, refetch, limit }

  return (
    <ItemsPage
      title='Orders'
      data={data}
      columns={columns}
      onDeleteMultiple={deleteMany}
      onItemClick={onItemClick}
      pagination
      page={page}
      setPage={setPage}
      onSearchTrigger={handleSearchTrigger}
      onCreateClick={handleCreateOrder}
    />
  )
}