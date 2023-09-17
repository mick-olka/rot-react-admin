import { Box, Button } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import { product_columns } from './data'

import { ItemsPage } from 'src/components'
import { useProducts } from 'src/hooks'
import { I_Product } from 'src/models'
import { useProductsStore } from 'src/store'

export const ChooseProducts = ({
  onSubmit,
  onCancel,
  collectionId,
  exclude,
}: {
  onSubmit: (ids: string[]) => void
  onCancel: () => void
  collectionId?: string
  exclude?: string[]
}) => {
  const page = useProductsStore((state) => state.page)
  const setPage = useProductsStore((state) => state.setPage)
  // const { deleteMany } = useDeleteProductsMany()
  const [regex, setRegex] = useState<string | undefined>(undefined)
  const [selected, setSelected] = useState<string[]>([])
  const { products, count, isLoading, isError, refetch, limit } = useProducts({ page, regex })
  const products_filtered = useMemo(() => {
    let res: I_Product[] = products || []
    if (products && collectionId)
      res = res.map((p) => ({ ...p, disabled: p.collections.includes(collectionId) }))
    if (products && exclude) res = res.filter((p) => ({ ...p, disabled: !exclude.includes(p._id) }))
    return res
  }, [products, collectionId, exclude])
  const data = { data: products_filtered, count: count || 0, isLoading, isError, refetch, limit }
  useEffect(() => {
    data.refetch()
  }, [page, regex])
  useEffect(() => {
    if (regex) setPage(1)
  }, [data.count])
  const onProdClick = (id: string) => {
    //
  }
  const handleSearchTrigger = (searchText: string | undefined) => {
    if (searchText) setRegex(searchText)
    else setRegex(undefined)
  }
  const handleSelectProducts = () => {
    onSubmit(selected)
    // addProductsToCollection({ id: col_id, data: { items: selected, action: 'add' } })
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: '#fff',
        zIndex: 10,
      }}
    >
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
