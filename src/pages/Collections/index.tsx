export { CollectionPage } from './CollectionPage'
import { useNavigate } from 'react-router-dom'

import { columns } from './data'

import { ItemsPage } from 'src/components/ItemsPage/ItemsPage'
import { useCollections, useDeleteCollectionsMany } from 'src/hooks/useCollections'
import { getRouteWithId } from 'src/routing'
import { ROUTES } from 'src/utils/constants/routes'

export const CollectionsList = () => {
  const { deleteMany } = useDeleteCollectionsMany()
  const { collections, isLoading, isError } = useCollections()
  const data = {
    data: collections,
    count: collections?.length || 0,
    isLoading,
    isError,
    limit: 99,
  }
  const navigate = useNavigate()
  const onItemClick = (id: string) => {
    if (collections) {
      const url_name = collections.find((p) => p._id === id)?.url_name
      if (url_name) navigate(getRouteWithId(ROUTES.collection, url_name))
    }
  }
  const onCreateProdClick = () => {
    navigate(ROUTES.createProduct)
  }

  return (
    <ItemsPage
      title='Collections'
      data={data}
      columns={columns}
      pagination={false}
      onDeleteMultiple={deleteMany}
      onItemClick={onItemClick}
      onCreateClick={onCreateProdClick}
    />
  )
}
