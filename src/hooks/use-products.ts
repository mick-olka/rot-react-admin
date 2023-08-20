import { useMutation, useQuery, useQueryClient } from 'react-query'

import { toasterPending } from './data'

import { E_Queries, I_ProductDto, I_ProductItemsDto } from 'src/models'
import { ProductService } from 'src/services'
import { products_page_limit } from 'src/utils'

export const useProducts = ({
  page,
  limit,
  regex,
}: {
  page?: number
  regex?: string
  limit?: number
}) => {
  const { data, isLoading, isError, refetch } = useQuery(
    E_Queries.products,
    () => ProductService.getAll({ page, regex, limit }),
    {
      select: ({ data }) => data,
      // onSuccess: ({ data }) => setProducts(data.docs),
      // onError: (err: AxiosError) => alert(err.message),
    },
  )
  return {
    products: data?.docs,
    count: data?.count,
    limit: limit || products_page_limit,
    isLoading,
    isError,
    refetch,
  }
}

export const useProductById = (id: string | undefined) => {
  const { data, isError, isFetching, refetch } = useQuery(
    [E_Queries.products, id],
    () => ProductService.getById(String(id)),
    {
      select: ({ data }) => data,
      cacheTime: undefined,
      staleTime: undefined,
      enabled: !!id, // disable request if id === undefined
    },
  )
  return { product: data, isFetching, isError, refetch }
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (form_data: I_ProductDto) => toasterPending(ProductService.create(form_data)),
    { onSuccess: () => queryClient.invalidateQueries([E_Queries.products]) },
  )
  return { create: mutateAsync, product: data, isLoading, isError }
}

export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    ({ id, form_data }: { id: string; form_data: Partial<I_ProductDto> }) =>
      toasterPending(ProductService.update(id, form_data)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([E_Queries.products])
        queryClient.invalidateQueries([E_Queries.collections])
      },
    },
  )
  return { update: mutateAsync, product: data, isLoading, isError }
}

export const useUpdateProductItems = (id: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    ({ id, form_data }: { id: string; form_data: I_ProductItemsDto }) =>
      toasterPending(ProductService.updateItems(id, form_data)),
    { onSuccess: () => queryClient.invalidateQueries([E_Queries.products, id]) },
  )
  return { update: mutateAsync, product: data, isLoading, isError }
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (id: string) => toasterPending(ProductService.delete(id)),
    { onSuccess: () => queryClient.invalidateQueries([E_Queries.products]) },
  )
  return { deleteOne: mutateAsync, product: data, isLoading, isError }
}

export const useDeleteProductsMany = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (ids: string[]) => toasterPending(ProductService.deleteMany(ids)),
    { onSuccess: () => queryClient.invalidateQueries([E_Queries.products]) },
  )
  return { deleteMany: mutateAsync, products: data, isLoading, isError }
}
