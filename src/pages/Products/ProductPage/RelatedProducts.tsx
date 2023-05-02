import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'

import { ChooseProducts } from '../ChooseProducts'
import { product_columns } from '../data'

import { ItemsPage } from 'src/components/ItemsPage/ItemsPage'
import { useUpdateProduct } from 'src/hooks/useProducts'
import { I_ProductDto, I_ProductPopulated } from 'src/services/products.service'

interface I_Props {
  prod_id: string
  related: I_ProductPopulated[]
  similar: I_ProductPopulated[]
}

type ListType = 'similar' | 'related' | null

export const SimilarRelatedProducts = ({ prod_id, related, similar }: I_Props) => {
  const [type, setType] = useState<ListType>(null)

  const [productsSelectionMode, setProductsSelectionMode] = useState(false)
  const { update, isLoading } = useUpdateProduct(prod_id)

  const handleItemClick = (id: string) => {
    //
  }

  const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newType: ListType) => {
    setType(newType)
  }

  const data = {
    similar: {
      data: similar,
      isLoading: false,
      isError: false,
      count: similar.length,
      limit: 99,
    },
    related: {
      data: related,
      isLoading: false,
      isError: false,
      count: related.length,
      limit: 99,
    },
  }

  const handleDeleteItems = (ids: string[]) => {
    //
  }
  const handleAddItems = (ids: string[]) => {
    if (type) {
      const idsList = data[type].data.map((i) => i._id)
      ids.forEach((id) => {
        if (!idsList.includes(id)) idsList.push(id)
      })
      const new_data: Partial<I_ProductDto> = {}
      if (type === 'similar') new_data.similar_products = idsList
      else if (type === 'related') new_data.related_products = idsList
      update({ id: prod_id, form_data: new_data })
    }
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
    <Box>
      <ToggleButtonGroup value={type} exclusive onChange={handleTypeChange}>
        <ToggleButton value='related'>
          <Typography>Related</Typography>
        </ToggleButton>
        <ToggleButton value='similar'>
          <Typography>Similar</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      {type && (
        <Box sx={{ height: '600px' }}>
          <ItemsPage
            // title={''}
            data={data[type]}
            columns={product_columns}
            clientPagination
            onDeleteMultiple={handleDeleteItems}
            onItemClick={handleItemClick}
            deleteTitle='Remove these items from the collection'
          >
            <Button onClick={() => setProductsSelectionMode(true)}>Add Products</Button>
          </ItemsPage>
        </Box>
      )}
    </Box>
  )
}
