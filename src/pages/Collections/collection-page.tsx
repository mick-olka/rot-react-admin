import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, Button } from '@mui/material'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ContentDialog } from 'src/components/dialogs/content-dialog'
import { CollectionForm } from 'src/components/forms/collection-form'
import { ItemsPage } from 'src/components/items-page/ItemsPage'
import { RoundButton } from 'src/components/styles'

import {
  useCollectionById,
  useUpdateCollection,
  useUpdateCollectionItems,
} from 'src/hooks/use-collections'
import { I_ProductPopulated, I_CollectionForm } from 'src/models'
import { ChooseProducts } from 'src/pages/products/choose-products-pane'
import { product_columns } from 'src/pages/products/data'
import { getRouteWithId } from 'src/routing'
import { ROUTES } from 'src/routing/routes'
import { filterArrByReg } from 'src/utils'

export const CollectionPage = () => {
  const id = String(useParams().id)
  const navigate = useNavigate()
  // const [page, setPage] = useState<number>(1)
  const [open, setOpen] = useState(false)
  const [productsSelectionMode, setProductsSelectionMode] = useState(false)
  const { collection, isLoading, isError } = useCollectionById(id)
  const { update: updateItems } = useUpdateCollectionItems(id)
  const { update: update_collection } = useUpdateCollection(id)
  const [filter, setFilter] = useState<string | null>(null)
  const getFilteredProductsList = (): I_ProductPopulated[] =>
    useMemo(() => {
      if (collection) {
        if (filter) return filterArrByReg(collection.items, filter)
        return collection.items
      }
      return []
    }, [collection, filter])
  const handleDeleteItems = (ids: string[]) => {
    if (collection) updateItems({ id: collection._id, data: { action: 'delete', items: ids } })
  }
  const handleAddItems = (ids: string[]) => {
    if (collection) updateItems({ id: collection._id, data: { action: 'add', items: ids } })
  }
  const onProdClick = (id: string) => {
    if (collection) {
      // const url_name = collection.items.find((p) => p._id === id)?.url_name
      navigate(getRouteWithId(ROUTES.product, id))
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
  if (productsSelectionMode) {
    return (
      <Box>
        <ChooseProducts
          onSubmit={(ids) => {
            handleAddItems(ids)
            setProductsSelectionMode(false)
          }}
          onCancel={() => setProductsSelectionMode(false)}
        />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ height: '100%' }}>
        <ItemsPage
          title={collection?.name.ua}
          data={products}
          columns={product_columns}
          // pagination
          // page={page}
          // setPage={setPage}
          clientPagination
          onDeleteMultiple={handleDeleteItems}
          onItemClick={onProdClick}
          onSearchTrigger={handleSearchTrigger}
          deleteTitle='Remove these items from the collection'
        >
          <RoundButton onClick={() => setOpen(true)}>
            <EditOutlinedIcon />
          </RoundButton>
          <Button onClick={() => setProductsSelectionMode(true)}>Add Products</Button>
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
