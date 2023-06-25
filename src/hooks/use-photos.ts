import { useMutation, useQuery, useQueryClient } from 'react-query'

import { toasterPending } from './data'

import { E_Queries, I_PhotosDto } from 'src/models'
import { PhotosService } from 'src/services'

export const useGetPhotosGroupById = (id: string | undefined) => {
  const { data, isLoading, isError } = useQuery(
    [E_Queries.photos, id],
    () => PhotosService.getById(String(id)),
    { select: ({ data }) => data, enabled: !!id },
  )
  return { collection: data, isLoading, isError }
}

export const useCreatePhotosGroup = (product_id: string, product_url: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (data: I_PhotosDto) => toasterPending(PhotosService.create(product_id, data)),
    { onSuccess: () => queryClient.invalidateQueries(['products', product_id]) },
  )
  return { create: mutateAsync, product: data, isLoading, isError }
}

export const useUpdatePhotosGroup = (product_id: string, product_url: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    ({ id, form_data }: { id: string; form_data: I_PhotosDto }) =>
      toasterPending(PhotosService.update(id, form_data)),
    { onSuccess: () => queryClient.invalidateQueries(['products', product_id]) },
  )
  return { update: mutateAsync, product: data, isLoading, isError }
}

export const useDeletePhotosGroup = (product_id: string, product_url: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (id: string) => toasterPending(PhotosService.delete(id, product_id)),
    { onSuccess: () => queryClient.invalidateQueries(['products', product_id]) },
  )
  return { delete: mutateAsync, product: data, isLoading, isError }
}

export const useDeletePhotoFromGroup = (product_id: string, product_url: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    ({ id, filename }: { id: string; filename: string }) =>
      toasterPending(PhotosService.deletePhoto(id, filename)),
    { onSuccess: () => queryClient.invalidateQueries(['products', product_id]) },
  )
  return { delete: mutateAsync, product: data, isLoading, isError }
}
