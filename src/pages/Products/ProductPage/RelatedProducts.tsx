import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'

import { ChooseProducts } from '../ChooseProducts'
import { product_columns } from '../data'

import { ItemsPage } from 'src/components/ItemsPage/ItemsPage'
import { useUpdateProductItems } from 'src/hooks/useProducts'
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
  const { update, isLoading } = useUpdateProductItems(prod_id)

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
    if (type) {
      update({
        id: prod_id,
        form_data: {
          type,
          items: ids,
          action: 'delete',
        },
      })
    }
  }
  const handleAddItems = (ids: string[]) => {
    if (type) {
      update({
        id: prod_id,
        form_data: {
          type,
          items: ids,
          action: 'add',
        },
      })
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
