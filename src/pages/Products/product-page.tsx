import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { Box, IconButton, Link, Tab, Tabs, Typography } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { CustomTabPanel, SimilarRelatedProducts, a11yProps } from '.'

import { CollectionsManager } from './collections-manager'

import { AlertDialog, AvatarUploader, PhotosList, ProductForm } from 'src/components'
import { useDeleteProduct, useProductById, useUpdateProduct } from 'src/hooks'
import { StatusWrapper } from 'src/layouts'
import { I_ProductForm } from 'src/models'
import { ROUTES } from 'src/routing'
import { PHOTOS_URL, client_url } from 'src/utils'

export const ProductPage = () => {
  const { id } = useParams()
  const { product, isFetching, isError } = useProductById(String(id))
  const { update, isLoading } = useUpdateProduct(String(id))
  const { deleteOne, isLoading: delete_loading } = useDeleteProduct()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  const onSubmit = (data: I_ProductForm) => {
    if (product && data) {
      const update_data = { ...data, thumbnail: file }
      update({ id: product._id, form_data: update_data })
    }
  }

  const [file, setFile] = useState<File | undefined>(undefined)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const uploadAvatar = (file: File) => {
    setFile(file)
  }

  const onDeleteProduct = () => {
    if (product) deleteOne(product._id)
    navigate(ROUTES.home)
  }

  return (
    <StatusWrapper isLoading={isFetching && !product} isError={isError} sx={{ padding: '0 2rem' }}>
      {product && (
        <Box sx={{ marginBottom: '2rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: '2rem' }}>
              <Link
                href={client_url + 'products/' + product.url_name}
                target='_blank'
                color='inherit'
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                {product.name.ua}
              </Link>
            </h2>
            <IconButton
              color='warning'
              onClick={() => setDeleteDialog(true)}
              disabled={delete_loading}
              sx={{ width: '3rem', height: '3rem' }}
            >
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
            <Box sx={{ margin: '2rem' }}>
              <CollectionsManager available_list={product.collections} product_id={product._id} />
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tab} onChange={handleChange} aria-label='basic tabs example'>
                <Tab label='General' {...a11yProps(0)} />
                <Tab label='Photos' {...a11yProps(1)} />
                <Tab label='Related' {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tab} index={0}>
              <Box width='fit-content' sx={{ width: '100%' }}>
                <ProductForm isLoading={isLoading} initValues={product} onSubmit={onSubmit} />
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
              <PhotosList
                product_id={product._id}
                product_url={product.url_name}
                photos={product.photos}
              />
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={2}>
              <SimilarRelatedProducts
                prod_id={product._id}
                related={product.related_products}
                similar={product.similar_products}
              />
            </CustomTabPanel>
          </Box>
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
    </StatusWrapper>
  )
}
