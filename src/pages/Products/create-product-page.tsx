import { Box } from '@mui/material'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import * as S from './styles'

import { AvatarUploader, ProductForm } from 'src/components'
import { useCreateProduct } from 'src/hooks/useProducts'
import { getRouteWithId } from 'src/routing'
import { ROUTES } from 'src/routing/routes'
import { I_ProductForm } from 'src/services/products.service'

export const CreateProductPage = () => {
  const { create, isLoading, isError, product } = useCreateProduct()

  const [file, setFile] = useState<File | undefined>(undefined)
  const uploadAvatar = (file: File) => {
    setFile(file)
  }

  const onSubmit = (data: I_ProductForm) => {
    const create_data = { ...data, thumbnail: file }
    create(create_data)
  }

  return (
    <S.CreateProductPane>
      <h2>Create Product</h2>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '150px', height: '150px', margin: '2rem' }}>
          <AvatarUploader
            handleChange={uploadAvatar}
            currentURL={file && URL.createObjectURL(file)}
          />
        </Box>
        <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
      </Box>
      {isError && <h3>Error creating product</h3>}
      {product && <Navigate to={getRouteWithId(ROUTES.product, product.data._id)} />}
    </S.CreateProductPane>
  )
}
