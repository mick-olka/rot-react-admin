import { Box, Chip, Stack } from '@mui/material'
import { useMemo } from 'react'
import { useQueryClient } from 'react-query'

import { ItemSelector } from 'src/components'

import { useCollections, useUpdateCollectionItems } from 'src/hooks'
import { StatusWrapper } from 'src/layouts'
import { E_Queries } from 'src/models'

export const CollectionsManager = ({
  product_id,
  available_list,
  onUpdate,
}: {
  product_id: string
  available_list: string[]
  onUpdate?: () => void
}) => {
  const all = useCollections()
  const { update, isError, isLoading, collection: updated, isSuccess } = useUpdateCollectionItems()
  const queryClient = useQueryClient()
  const handleDelete = (collection_id: string) => {
    update({ id: collection_id, data: { action: 'delete', items: [product_id] } })
    queryClient.invalidateQueries([E_Queries.products, product_id])
    onUpdate && onUpdate()
  }
  const handleAdd = (collection_id: string) => {
    update({ id: collection_id, data: { action: 'add', items: [product_id] } })
    queryClient.invalidateQueries([E_Queries.products, product_id])
    onUpdate && onUpdate()
  }

  const [own_collections, other_collections] = useMemo(() => {
    const owned: { id: string; name: string }[] = []
    const other: { id: string; name: string }[] = []
    if (all.collections) {
      all.collections.forEach((c) => {
        const it = { id: String(c._id), name: c.name.ua }
        if (available_list.includes(String(c._id))) owned.push(it)
        else other.push(it)
      })
    }
    return [owned, other]
  }, [available_list, all.collections])

  const handleCollectionSelected = (id: string) => {
    handleAdd(id)
  }

  return (
    <StatusWrapper
      isError={isError}
      isLoading={isLoading}
      isSuccess={isSuccess}
      errorAlert
      loadingAlert
    >
      {/* <h2>Collections:</h2> */}
      <Box width='15rem'>
        <ItemSelector
          placeholder='Add to Collection'
          items={other_collections}
          onSelect={handleCollectionSelected}
        />
      </Box>
      <StatusWrapper isError={all.isError} isLoading={all.isLoading}>
        <Stack direction='row' spacing={1}>
          {own_collections.map((c) => (
            <Chip key={c.id} label={c.name} onDelete={() => handleDelete(c.id)} />
          ))}
        </Stack>
      </StatusWrapper>
    </StatusWrapper>
  )
}
