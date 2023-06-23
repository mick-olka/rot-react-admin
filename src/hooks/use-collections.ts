import { useMutation, useQuery, useQueryClient } from 'react-query'

import { toasterPending } from './data'

import { I_CollectionDto, I_CollectionItemsDto } from 'src/models'
import { CollectionService } from 'src/services'

export const useCollections = () => {
  const { data, isLoading, isError } = useQuery(['collections'], () => CollectionService.getAll(), {
    select: ({ data }) => data,
  })
  return { collections: data, isLoading, isError }
}

export const useCollectionById = (id: string | undefined) => {
  const { data, isLoading, isError } = useQuery(
    ['collections', id],
    () => CollectionService.getById(String(id)),
    { select: ({ data }) => data, enabled: !!id },
  )
  return { collection: data, isLoading, isError }
}

export const useCreateCollection = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (form_data: I_CollectionDto) => toasterPending(CollectionService.create(form_data)),
    { onSuccess: () => queryClient.invalidateQueries(['collections']) },
  )
  return { create: mutateAsync, collection: data, isLoading, isError }
}

export const useUpdateCollection = (validation_id?: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    ({ id, form_data }: { id: string; form_data: I_CollectionDto }) => {
      delete form_data.items // for items use updateCollectionItems (PUT)
      return toasterPending(CollectionService.update(id, form_data))
    },
    { onSuccess: () => queryClient.invalidateQueries(['collections', validation_id]) },
  )
  return { update: mutateAsync, collection: data, isLoading, isError }
}

export const useUpdateCollectionItems = (validation_id?: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    ({ id, data }: { id: string; data: I_CollectionItemsDto }) =>
      toasterPending(CollectionService.updateItems(id, data)),
    {
      onSuccess: (data) =>
        queryClient.invalidateQueries(['collections', validation_id || data.data._id]),
    },
  )
  return { update: mutateAsync, collection: data, isLoading, isError }
}

export const useDeleteCollection = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    'delete collection',
    (id: string) => toasterPending(CollectionService.delete(id)),
    { onSuccess: () => queryClient.invalidateQueries(['collections']) },
  )
  return { delete: mutateAsync, collection: data, isLoading, isError }
}

export const useDeleteCollectionsMany = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (ids: string[]) => toasterPending(CollectionService.deleteMany(ids)),
    { onSuccess: () => queryClient.invalidateQueries(['collections']) },
  )
  return { deleteMany: mutateAsync, collections: data, isLoading, isError }
}
