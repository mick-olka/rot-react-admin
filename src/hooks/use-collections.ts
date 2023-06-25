import { useMutation, useQuery, useQueryClient } from 'react-query'

import { toasterPending } from './data'

import { E_Queries, I_CollectionDto, I_CollectionItemsDto } from 'src/models'
import { CollectionService } from 'src/services'

export const useCollections = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    [E_Queries.collections],
    () => CollectionService.getAll(),
    {
      select: ({ data }) => data,
    },
  )
  return { collections: data, isLoading, isError, refetch }
}

export const useCollectionById = (id: string | undefined) => {
  const { data, isLoading, isError } = useQuery(
    [E_Queries.collections, id],
    () => CollectionService.getById(String(id)),
    { select: ({ data }) => data, enabled: !!id },
  )
  return { collection: data, isLoading, isError }
}

export const useCreateCollection = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (form_data: I_CollectionDto) => toasterPending(CollectionService.create(form_data)),
    { onSuccess: () => queryClient.invalidateQueries([E_Queries.collections]) },
  )
  return { create: mutateAsync, collection: data, isLoading, isError }
}

export const useUpdateCollection = (validation_id?: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    ({ id, form_data }: { id: string; form_data: I_CollectionDto }) => {
      if (form_data.items) delete form_data.items // for items use updateCollectionItems (PUT)
      return toasterPending(CollectionService.update(id, form_data))
    },
    { onSuccess: () => queryClient.invalidateQueries([E_Queries.collections]) },
  )
  return { update: mutateAsync, collection: data, isLoading, isError }
}

export const useUpdateCollectionItems = (validation_id?: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError, isSuccess } = useMutation(
    ({ id, data }: { id: string; data: I_CollectionItemsDto }) =>
      toasterPending(CollectionService.updateItems(id, data)),
    {
      onSuccess: (data) =>
        queryClient.invalidateQueries([E_Queries.collections, validation_id || data.data._id]),
    },
  )
  return { update: mutateAsync, collection: data, isLoading, isError, isSuccess }
}

export const useDeleteCollection = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    'delete collection',
    (id: string) => toasterPending(CollectionService.delete(id)),
    { onSuccess: () => queryClient.invalidateQueries([E_Queries.collections]) },
  )
  return { delete: mutateAsync, collection: data, isLoading, isError }
}

export const useDeleteCollectionsMany = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (ids: string[]) => toasterPending(CollectionService.deleteMany(ids)),
    { onSuccess: () => queryClient.invalidateQueries([E_Queries.collections]) },
  )
  return { deleteMany: mutateAsync, collections: data, isLoading, isError }
}
