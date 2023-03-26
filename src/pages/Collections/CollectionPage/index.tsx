import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

import { useCollectionById } from 'src/hooks/useCollections'

import { I_Collection } from 'src/services/collections.service'

export const CollectionPage = () => {
  const { id } = useParams()
  const { collection, isLoading, isError } = useCollectionById(String(id))
  return <Box>{collection?.name.ua}</Box>
}
