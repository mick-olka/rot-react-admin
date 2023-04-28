import { Box, Skeleton } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { AvatarUploader, PhotosList, ProductForm } from 'src/components'
import { useProductById, useUpdateProduct } from 'src/hooks/useProducts'
import { I_Product, I_ProductForm } from 'src/services/products.service'
import { PHOTOS_URL } from 'src/utils/constants/constants'

const getDefaultValues = (data: I_Product): I_ProductForm => {
  return {
    name: data.name,
    code: data.code,
    price: data.price,
  }
}

export const ProductPage = () => {
  const { id } = useParams()
  const { product, isFetching, isError } = useProductById(String(id))
  const { update, isLoading } = useUpdateProduct()

  const onSubmit = (data: I_ProductForm) => {
    if (product && data) {
      const update_data = { ...data, thumbnail: file }
      update({ id: product._id, form_data: update_data })
    }
  }

  const [file, setFile] = useState<File | undefined>(undefined)

  const uploadAvatar = (file: File) => {
    setFile(file)
  }

  return (
    <Box sx={{ padding: '0 2rem' }}>
      {!isFetching && product && (
        <Box>
          <h2>Update Product</h2>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ margin: '3rem', height: '150px', width: '150px' }}>
              <AvatarUploader
                handleChange={uploadAvatar}
                currentURL={`${PHOTOS_URL}${product.thumbnail}`}
              />
            </Box>
            <ProductForm
              isLoading={isLoading}
              initValues={getDefaultValues(product)}
              onSubmit={onSubmit}
            />
          </Box>
          <PhotosList
            product_id={product._id}
            product_url={product.url_name}
            photos={product.photos}
          />
        </Box>
      )}
      {isFetching && <Skeleton width='20rem' height='20rem' />}
      {isError && <div>Error</div>}
    </Box>
  )
}

// const ProductPane = () => {
//   return (
//     <Box>
//       <h2>Update Product</h2>
//       <Box sx={{ display: 'flex' }}>
//         <Box sx={{ margin: '3rem', height: '150px' }}>
//           <AvatarUploader
//             handleChange={uploadAvatar}
//             currentURL={`${PHOTOS_URL}${product.thumbnail}`}
//           />
//         </Box>
//         <ProductForm
//           isLoading={productUpdate.isLoading}
//           defaultValues={getDefaultValues(product)}
//           onSubmit={onSubmit}
//         />
//       </Box>
//       <hr />
//       <h2>Photos</h2>
//       {/* <hr /> */}
//       <PhotosList product_id={product._id} product_url={product.url_name} photos={product.photos} />
//     </Box>
//   )
// }
