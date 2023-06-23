export { CollectionPage } from './CollectionPage'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { columns } from './data'

import { ItemsPage } from 'src/components/items-page/ItemsPage'
import { useCollections, useDeleteCollectionsMany } from 'src/hooks/useCollections'
import { getRouteWithId } from 'src/routing'
import { ROUTES } from 'src/routing/routes'
import { I_Collection } from 'src/services/collections.service'
import { filterArrByReg } from 'src/utils/helpers/utils'

export const CollectionsList = () => {
  const { deleteMany } = useDeleteCollectionsMany()
  const [filter, setFilter] = useState<string | null>()
  const { collections, isLoading, isError } = useCollections()
  const navigate = useNavigate()
  const getFilteredProductsList = (): I_Collection[] =>
    useMemo(() => {
      if (collections) {
        if (filter) return filterArrByReg(collections, filter)
        return collections
      }
      return []
    }, [collections, filter])
  const onItemClick = (id: string) => {
    if (collections) {
      // const url_name = collections.find((c) => c._id === id)?.url_name
      navigate(getRouteWithId(ROUTES.collection, id))
    }
  }
  const handleSearchTrigger = (query?: string) => {
    setFilter(query || null)
  }
  const onCreateProdClick = () => {
    navigate(ROUTES.createCollection)
  }
  const data = {
    data: getFilteredProductsList(),
    count: collections?.length || 0,
    isLoading,
    isError,
    limit: 99,
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
      onSearchTrigger={handleSearchTrigger}
    />
  )
}
