import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { product_columns } from './data'

import { ItemsPage, CollectionSelector } from 'src/components'
import { useDeleteProductsMany, useProducts, useUpdateCollectionItems } from 'src/hooks'
import { ROUTES, getRouteWithId } from 'src/routing'
import { useProductsStore } from 'src/store'

export const ProductsListPage = () => {
  const page = useProductsStore((state) => state.page)
  const setPage = useProductsStore((state) => state.setPage)
  const { deleteMany } = useDeleteProductsMany()
  const { update: addProductsToCollection } = useUpdateCollectionItems()
  const [regex, setRegex] = useState<string | undefined>(undefined)
  const [selected, setSelected] = useState<string[]>([])
  const { products, count, isLoading, isError, refetch, limit } = useProducts({ page, regex })
  const data = { data: products, count: count || 0, isLoading, isError, refetch, limit }
  const navigate = useNavigate()
  useEffect(() => {
    data.refetch()
  }, [page, regex])
  useEffect(() => {
    if (regex) setPage(1)
  }, [data.count])
  const onProdClick = (id: string) => {
    if (products) {
      // const url_name = products.find((p) => p._id === id)?.url_name
      navigate(getRouteWithId(ROUTES.product, id))
    }
  }
  const onCreateProdClick = () => {
    navigate(ROUTES.createProduct)
  }
  const handleSearchTrigger = (searchText: string | undefined) => {
    if (searchText) setRegex(searchText)
    else setRegex(undefined)
  }
  const handleSelectCollection = (col_id: string) => {
    addProductsToCollection({ id: col_id, data: { items: selected, action: 'add' } })
  }

  return (
    <ItemsPage
      title='Products'
      data={data}
      columns={product_columns}
      pagination
      page={page}
      setPage={setPage}
      onDeleteMultiple={deleteMany}
      onItemClick={onProdClick}
      onSearchTrigger={handleSearchTrigger}
      onCreateClick={onCreateProdClick}
      onSelect={(ids) => setSelected(ids)}
    >
      <CollectionSelector disabled={!selected.length} onSubmit={handleSelectCollection} />
    </ItemsPage>
  )
}
