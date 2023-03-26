import { useMutation, useQuery, useQueryClient } from 'react-query'

import { toasterPending } from './data'

import { CollectionService } from 'src/services'
import { I_CollectionDto } from 'src/services/collections.service'

export const useCollections = () => {
  const { data, isLoading, isError } = useQuery('collections', () => CollectionService.getAll(), {
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
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (form_data: I_CollectionDto) => toasterPending(CollectionService.create(form_data)),
    {},
  )
  return { create: mutateAsync, product: data, isLoading, isError }
}

export const useUpdateCollection = () => {
  const { mutateAsync, data, isLoading, isError } = useMutation(
    ({ id, form_data }: { id: string; form_data: I_CollectionDto }) =>
      toasterPending(CollectionService.update(id, form_data)),
  )
  return { update: mutateAsync, product: data, isLoading, isError }
}

export const useDeleteCollection = () => {
  const { mutateAsync, data, isLoading, isError } = useMutation('delete collection', (id: string) =>
    toasterPending(CollectionService.delete(id)),
  )
  return { delete: mutateAsync, product: data, isLoading, isError }
}

export const useDeleteCollectionsMany = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (ids: string[]) => toasterPending(CollectionService.deleteMany(ids)),
    { onSuccess: () => queryClient.invalidateQueries(['collections']) },
  )
  return { deleteMany: mutateAsync, products: data, isLoading, isError }
}
