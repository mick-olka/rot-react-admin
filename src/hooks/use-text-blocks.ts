import { useMutation, useQuery, useQueryClient } from 'react-query'

import { toasterPending } from './data'

import { I_TextBlockDto } from 'src/models'
import { TextBlocksService } from 'src/services'

export const useTextBlocks = () => {
  const { data, isLoading, isError } = useQuery(['text_blocks'], () => TextBlocksService.getAll(), {
    select: ({ data }) => data,
  })
  return { text_blocks: data, isLoading, isError }
}

export const useTextBlockById = (id: string | undefined) => {
  const { data, isLoading, isError } = useQuery(
    ['text_blocks', id],
    () => TextBlocksService.getById(String(id)),
    { select: ({ data }) => data, enabled: !!id },
  )
  return { text_block: data, isLoading, isError }
}

export const useCreateTextBlock = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (form_data: I_TextBlockDto) => toasterPending(TextBlocksService.create(form_data)),
    { onSuccess: () => queryClient.invalidateQueries(['text_blocks']) },
  )
  return { create: mutateAsync, text_block: data, isLoading, isError }
}

export const useUpdateTextBlock = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    ({ id, form_data }: { id: string; form_data: I_TextBlockDto }) =>
      toasterPending(TextBlocksService.update(id, form_data)),
    { onSuccess: () => queryClient.invalidateQueries(['text_blocks']) },
  )
  return { update: mutateAsync, text_block: data, isLoading, isError }
}

export const useDeleteTextBlock = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    'delete text_block',
    (id: string) => toasterPending(TextBlocksService.delete(id)),
    { onSuccess: () => queryClient.invalidateQueries(['text_blocks']) },
  )
  return { delete: mutateAsync, text_block: data, isLoading, isError }
}

export const useDeleteTextBlocksMany = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, data, isLoading, isError } = useMutation(
    (ids: string[]) => toasterPending(TextBlocksService.deleteMany(ids)),
    { onSuccess: () => queryClient.invalidateQueries(['text_blocks']) },
  )
  return { deleteMany: mutateAsync, text_blocks: data, isLoading, isError }
}
