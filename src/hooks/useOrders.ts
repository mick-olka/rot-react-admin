import { useMutation, useQuery, useQueryClient } from 'react-query'

import { toasterPending } from './data'

import { OrdersService } from 'src/services'
import { I_OrderDto } from 'src/services/orders.service'
import { orders_page_limit } from 'src/utils/constants/constants'

export const useOrders = ({
  page,
  limit,
  regex,
}: {
  page?: number
  regex?: string
  limit?: number
}) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ['orders'],
    () => OrdersService.getAll({ page, regex, limit }),
    {
      select: ({ data }) => data,
    },
  )
  return {
    orders: data?.docs,
    count: data?.count,
    limit: limit || orders_page_limit,
    isLoading,
    isError,
    refetch,
  }
}

export const useOrderById = (id: string | undefined) => {
  const { data, isLoading, isError } = useQuery(
    ['orders', id],
    () => OrdersService.getById(String(id)),
    { select: ({ data }) => data, enabled: !!id },
  )
  return { order: data, isLoading, isError }
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (form_data: I_OrderDto) => toasterPending(OrdersService.create(form_data)),
    { onSuccess: () => queryClient.invalidateQueries(['orders']) },
  )
  return { create: mutateAsync, order: data, isLoading, isError }
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    ({ id, form_data }: { id: string; form_data: I_OrderDto }) =>
      toasterPending(OrdersService.update(id, form_data)),
    { onSuccess: () => queryClient.invalidateQueries(['orders']) },
  )
  return { update: mutateAsync, order: data, isLoading, isError }
}

// export const useUpdateOrderItems = (validation_id?: string) => {
//   const queryClient = useQueryClient()
//   const { mutateAsync, data, isLoading, isError } = useMutation(
//     ({ id, data }: { id: string; data: I_OrderItemsDto }) =>
//       toasterPending(OrdersService.updateItems(id, data)),
//     {
//       onSuccess: (data) =>
//         queryClient.invalidateQueries(['orders', validation_id || data.data.url_name]),
//     },
//   )
//   return { update: mutateAsync, product: data, isLoading, isError }
// }

export const useDeleteOrder = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    'delete collection',
    (id: string) => toasterPending(OrdersService.delete(id)),
    { onSuccess: () => queryClient.invalidateQueries(['orders']) },
  )
  return { delete: mutateAsync, order: data, isLoading, isError }
}

export const useDeleteOrdersMany = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (ids: string[]) => toasterPending(OrdersService.deleteMany(ids)),
    { onSuccess: () => queryClient.invalidateQueries(['orders']) },
  )
  return { deleteMany: mutateAsync, order: data, isLoading, isError }
}
