import { Box } from '@mui/material'
import { Navigate } from 'react-router-dom'

import * as S from './styles'

import { CollectionForm } from 'src/components/Forms/CollectionForm'
import { useCreateCollection } from 'src/hooks/useCollections'
import { getRouteWithId } from 'src/routing'
import { I_CollectionForm } from 'src/services/collections.service'
import { ROUTES } from 'src/routing/routes'

export const CreateCollectionPage = () => {
  const { create, isLoading, isError, product } = useCreateCollection()

  const onSubmit = (data: I_CollectionForm) => {
    const create_data = { ...data }
    create(create_data)
  }

  return (
    <S.Pane>
      <h2>Create Collection</h2>
      <Box sx={{ display: 'flex' }}>
        <CollectionForm onSubmit={onSubmit} isLoading={isLoading} />
      </Box>
      {isError && <h3>Error creating collection</h3>}
      {product && <Navigate to={getRouteWithId(ROUTES.collection, product.data._id)} />}
    </S.Pane>
  )
}
