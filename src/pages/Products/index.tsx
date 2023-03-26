export { ProductPage } from './ProductPage'
export { ProductForm, CollectionSelector, DataTable, SearchField } from 'src/components'
export { CreateProductPage } from './CreateProduct'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { columns } from './data'

import { ItemsPage } from 'src/components/ItemsPage/ItemsPage'
import { useDeleteProductsMany, useProducts } from 'src/hooks/useProducts'
import { getRouteWithId } from 'src/routing'
import { useProductsStore } from 'src/store/products.store'
import { ROUTES } from 'src/utils/constants/routes'

export const ProductsList = () => {
  const page = useProductsStore((state) => state.page)
  const setPage = useProductsStore((state) => state.setPage)
  const { deleteMany } = useDeleteProductsMany()
  const [regex, setRegex] = useState<string | undefined>(undefined)
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
      const url_name = products.find((p) => p._id === id)?.url_name
      if (url_name) navigate(getRouteWithId(ROUTES.product, url_name))
    }
  }
  const onCreateProdClick = () => {
    navigate(ROUTES.createProduct)
  }
  const handleSearchTrigger = (searchText: string | undefined) => {
    if (searchText) setRegex(searchText)
    else setRegex(undefined)
  }

  return (
    <ItemsPage
      title='Products'
      data={data}
      columns={columns}
      pagination
      page={page}
      setPage={setPage}
      onDeleteMultiple={deleteMany}
      onItemClick={onProdClick}
      onSearchTrigger={handleSearchTrigger}
      onCreateClick={onCreateProdClick}
    />
  )
}
