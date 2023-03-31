import { Box } from '@mui/material'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ItemsPage } from 'src/components/ItemsPage/ItemsPage'

import { useCollectionById, useUpdateCollectionItems } from 'src/hooks/useCollections'
import { product_columns } from 'src/pages/Products/data'
import { getRouteWithId } from 'src/routing'
import { I_ProductPopulated } from 'src/services/products.service'
import { ROUTES } from 'src/utils/constants/routes'

export const CollectionPage = () => {
  const id = String(useParams().id)
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const { collection, isLoading, isError } = useCollectionById(id)
  const { update: deleteItems } = useUpdateCollectionItems(id)
  const [filter, setFilter] = useState<string | null>(null)
  const getFilteredProductsList = (): I_ProductPopulated[] =>
    useMemo(() => {
      if (collection) {
        if (filter) {
          const reg = new RegExp(filter, 'gi')
          const matchedItems = collection.items.filter((i) => String(i.name.ua).match(reg))
          return matchedItems
        }
        return collection.items
      }
      return []
    }, [collection, filter])
  const onItemsDelete = (ids: string[]) => {
    if (collection) deleteItems({ id: collection._id, data: { action: 'delete', items: ids } })
  }
  const onProdClick = (id: string) => {
    if (collection) {
      const url_name = collection.items.find((p) => p._id === id)?.url_name
      if (url_name) navigate(getRouteWithId(ROUTES.product, url_name))
    }
  }
  const handleSearchTrigger = (query?: string) => {
    setFilter(query || null)
  }
  const data = {
    data: getFilteredProductsList(),
    isLoading,
    isError,
    count: collection?.items.length || 0,
    limit: 20,
  }
  if (collection) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          <h2>{collection.name.ua}</h2>
        </Box>
        <Box>{collection.description.ua}</Box>
        <hr />
        <Box sx={{ height: '100%' }}>
          <ItemsPage
            title='Collection Items'
            data={data}
            columns={product_columns}
            pagination
            page={page}
            setPage={setPage}
            clientPagination
            onDeleteMultiple={onItemsDelete}
            onItemClick={onProdClick}
            onSearchTrigger={handleSearchTrigger}
            deleteTitle='Remove these items from the collection'
          />
        </Box>
      </Box>
    )
  }
  if (isLoading) return <Box>Loading...</Box>
  return (
    <Box>
      <h3>Error</h3>
    </Box>
  )
}
