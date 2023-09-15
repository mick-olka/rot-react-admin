import { Box, Chip, Stack, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { ItemSelector } from 'src/components'

import { useCollections, useUpdateCollectionItems } from 'src/hooks'
import { StatusWrapper } from 'src/layouts'
import { E_Queries } from 'src/models'
import { getRouteWithId, ROUTES } from 'src/routing'

export const CollectionsManager = ({
  product_id,
  available_list,
  onUpdate,
}: {
  product_id: string
  available_list: string[]
  onUpdate?: () => void
}) => {
  const navigate = useNavigate()
  const all = useCollections()
  const { update, isError, isLoading, isSuccess } = useUpdateCollectionItems()
  const queryClient = useQueryClient()
  const handleUpdateItems = (collection_id: string, action: 'add' | 'delete') => {
    update({ id: collection_id, data: { action, items: [product_id] } })
    onUpdate && onUpdate()
  }

  useEffect(() => {
    if (isSuccess) queryClient.invalidateQueries([E_Queries.products, product_id])
  }, [isSuccess])

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
    handleUpdateItems(id, 'add')
  }

  return (
    <StatusWrapper
      isError={isError}
      isLoading={isLoading}
      isSuccess={isSuccess}
      errorAlert
      loadingAlert
    >
      <Box sx={{ width: '20rem', display: 'flex', alignItems: 'center' }}>
        <Typography>Collections: </Typography>
        <ItemSelector
          placeholder='Add to Collection'
          items={other_collections}
          onSelect={handleCollectionSelected}
        />
      </Box>
      <StatusWrapper isError={all.isError} isLoading={all.isLoading}>
        <Stack direction='row' spacing={1}>
          {own_collections.map((c) => (
            <Chip
              key={c.id}
              label={c.name}
              onClick={() => navigate(getRouteWithId(ROUTES.collection, c.id))}
              onDelete={() => handleUpdateItems(c.id, 'delete')}
            />
          ))}
        </Stack>
      </StatusWrapper>
    </StatusWrapper>
  )
}
