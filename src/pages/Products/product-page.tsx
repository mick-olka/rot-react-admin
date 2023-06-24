import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { Box, Button, IconButton } from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { SimilarRelatedProducts } from '.'

import { AlertDialog, AvatarUploader, ContentDialog, PhotosList, ProductForm } from 'src/components'
import {
  useUpdateCollectionItems,
  useDeleteProduct,
  useProductById,
  useUpdateProduct,
} from 'src/hooks'
import { StatusWrapper } from 'src/layouts'
import { I_ProductForm } from 'src/models'
import { ROUTES } from 'src/routing'
import { PHOTOS_URL } from 'src/utils'

export const ProductPage = () => {
  const { id } = useParams()
  const { product, isFetching, isError } = useProductById(String(id))
  const { update, isLoading } = useUpdateProduct(String(id))
  const { deleteOne, isLoading: delete_loading } = useDeleteProduct()
  // const collectionsUpdate = useUpdateCollectionItems()
  const navigate = useNavigate()

  const onSubmit = (data: I_ProductForm) => {
    if (product && data) {
      const update_data = { ...data, thumbnail: file }
      update({ id: product._id, form_data: update_data })
    }
  }

  const [file, setFile] = useState<File | undefined>(undefined)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [collectionsDialog, setCollectionsDialog] = useState(false)

  const uploadAvatar = (file: File) => {
    setFile(file)
  }

  const onDeleteProduct = () => {
    if (product) deleteOne(product._id)
    navigate(ROUTES.home)
  }

  return (
    <StatusWrapper isLoading={isFetching} isError={isError} sx={{ padding: '0 2rem' }}>
      {product && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ margin: '0.5rem 2rem 0' }}>Update Product</h2>
            <Button onClick={() => setCollectionsDialog(true)}>Manage Collections</Button>
            <IconButton onClick={() => setDeleteDialog(true)} disabled={delete_loading}>
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ margin: '1rem', height: '200px', minWidth: '300px' }}>
              <AvatarUploader
                handleChange={uploadAvatar}
                currentURL={`${PHOTOS_URL}${product.thumbnail}`}
              />
            </Box>
            <h2 style={{ margin: '2rem' }}>{product.name.ua}</h2>
          </Box>
          <Box width='fit-content' sx={{ width: '100%' }}>
            <ProductForm isLoading={isLoading} initValues={product} onSubmit={onSubmit} />
          </Box>
          <PhotosList
            product_id={product._id}
            product_url={product.url_name}
            photos={product.photos}
          />
          <hr />
          <SimilarRelatedProducts
            prod_id={product._id}
            related={product.related_products}
            similar={product.similar_products}
          />
        </Box>
      )}
      <AlertDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        title={'Delete this product?'}
        text='This action can not be undone'
        onAgree={onDeleteProduct}
        onCancel={() => null}
      />
      <ContentDialog
        open={collectionsDialog}
        setOpen={setCollectionsDialog}
        title='Manage Collections'
      >
        <Box>Collections</Box>
      </ContentDialog>
    </StatusWrapper>
  )
}
