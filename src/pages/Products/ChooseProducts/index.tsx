import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { product_columns } from '../data'

import { ItemsPage } from 'src/components/ItemsPage/ItemsPage'
import { useDeleteProductsMany, useProducts } from 'src/hooks/useProducts'
import { getRouteWithId } from 'src/routing'
import { ROUTES } from 'src/routing/routes'
import { useProductsStore } from 'src/store/products.store'

export const ChooseProducts = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (ids: string[]) => void
  onCancel: () => void
}) => {
  const page = useProductsStore((state) => state.page)
  const setPage = useProductsStore((state) => state.setPage)
  // const { deleteMany } = useDeleteProductsMany()
  const [regex, setRegex] = useState<string | undefined>(undefined)
  const [selected, setSelected] = useState<string[]>([])
  const { products, count, isLoading, isError, refetch, limit } = useProducts({ page, regex })
  const data = { data: products, count: count || 0, isLoading, isError, refetch, limit }
  // const navigate = useNavigate()
  useEffect(() => {
    data.refetch()
  }, [page, regex])
  useEffect(() => {
    if (regex) setPage(1)
  }, [data.count])
  const onProdClick = (id: string) => {
    // if (products) {
    //   const url_name = products.find((p) => p._id === id)?.url_name
    //   if (url_name) navigate(getRouteWithId(ROUTES.product, url_name))
    // }
  }
  // const onCreateProdClick = () => {
  //   navigate(ROUTES.createProduct)
  // }
  const handleSearchTrigger = (searchText: string | undefined) => {
    if (searchText) setRegex(searchText)
    else setRegex(undefined)
  }
  const handleSelectProducts = () => {
    onSubmit(selected)
    // addProductsToCollection({ id: col_id, data: { items: selected, action: 'add' } })
  }

  return (
    <Box sx={{ height: '100%' }}>
      <ItemsPage
        title='Select Products'
        data={data}
        columns={product_columns}
        pagination
        page={page}
        setPage={setPage}
        // onDeleteMultiple={deleteMany}
        onItemClick={onProdClick}
        onSearchTrigger={handleSearchTrigger}
        // onCreateClick={onCreateProdClick}
        onSelect={(ids) => setSelected(ids)}
      >
        <Button disabled={!selected.length} onClick={handleSelectProducts}>
          ADD
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ItemsPage>
    </Box>
  )
}