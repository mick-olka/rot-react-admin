import { Box } from '@mui/material'
import { Navigate } from 'react-router-dom'

import * as S from './styles'

import { CollectionForm } from 'src/components/forms/collection-form'
import { useCreateCollection } from 'src/hooks/useCollections'
import { I_CollectionForm } from 'src/models'
import { getRouteWithId } from 'src/routing'
import { ROUTES } from 'src/routing/routes'

export const CreateCollectionPage = () => {
  const { create, isLoading, isError, collection } = useCreateCollection()

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
      {collection && <Navigate to={getRouteWithId(ROUTES.collection, collection.data._id)} />}
    </S.Pane>
  )
}
