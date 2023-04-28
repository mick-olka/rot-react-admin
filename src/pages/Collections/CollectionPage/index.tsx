import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box } from '@mui/material'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ContentDialog } from 'src/components/Dialogs/ContentDialog'
import { CollectionForm } from 'src/components/Forms/CollectionForm'
import { ItemsPage } from 'src/components/ItemsPage/ItemsPage'
import { RoundButton } from 'src/components/styles'

import {
  useCollectionById,
  useUpdateCollection,
  useUpdateCollectionItems,
} from 'src/hooks/useCollections'
import { product_columns } from 'src/pages/Products/data'
import { getRouteWithId } from 'src/routing'
import { ROUTES } from 'src/routing/routes'
import { I_CollectionForm } from 'src/services/collections.service'
import { I_ProductPopulated } from 'src/services/products.service'
import { filterArrByReg } from 'src/utils/helpers/utils'

export const CollectionPage = () => {
  const id = String(useParams().id)
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const [open, setOpen] = useState(false)
  const { collection, isLoading, isError } = useCollectionById(id)
  const { update: deleteItems } = useUpdateCollectionItems(id)
  const { update: update_collection } = useUpdateCollection()
  const [filter, setFilter] = useState<string | null>(null)
  const getFilteredProductsList = (): I_ProductPopulated[] =>
    useMemo(() => {
      if (collection) {
        if (filter) return filterArrByReg(collection.items, filter)
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
  const handleCollectionUpdate = (dat: I_CollectionForm) => {
    if (collection) update_collection({ id: collection._id, form_data: dat })
    setOpen(false)
  }
  const products = {
    data: getFilteredProductsList(),
    isLoading,
    isError,
    count: collection?.items.length || 0,
    limit: 20,
  }
  if (collection) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: '100%' }}>
          <ItemsPage
            title={collection.name.ua}
            data={products}
            columns={product_columns}
            pagination
            page={page}
            setPage={setPage}
            clientPagination
            onDeleteMultiple={onItemsDelete}
            onItemClick={onProdClick}
            onSearchTrigger={handleSearchTrigger}
            deleteTitle='Remove these items from the collection'
          >
            <RoundButton onClick={() => setOpen(true)}>
              <EditOutlinedIcon />
            </RoundButton>
          </ItemsPage>
        </Box>
        <ContentDialog open={open} setOpen={setOpen}>
          <CollectionForm
            initValues={collection}
            isLoading={isLoading}
            onSubmit={handleCollectionUpdate}
          />
        </ContentDialog>
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