import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'

import { product_columns } from '../data'

import { useUpdateProduct } from 'src/hooks/useProducts'
import { I_ProductPopulated } from 'src/services/products.service'

interface I_Props {
  prod_id: string
  related: I_ProductPopulated[]
  similar: I_ProductPopulated[]
}

export const SimilarRelatedProducts = ({ prod_id, related, similar }: I_Props) => {
  const [type, setType] = useState<string | null>(null)

  const { update, isLoading } = useUpdateProduct(prod_id)

  const handleDeleteItems = () => {
    //
  }

  const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    setType(newType)
  }

  const similar_data = {
    data: similar,
    isLoading: false,
    isError: false,
    count: similar.length,
    limit: 99,
  }

  const related_data = {
    data: related,
    isLoading: false,
    isError: false,
    count: related.length,
    limit: 99,
  }

  return (
    <Box>
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={handleTypeChange}
        aria-label='text alignment'
      >
        <ToggleButton value='related'>
          <Typography>Related</Typography>
        </ToggleButton>
        <ToggleButton value='similar'>
          <Typography>Similar</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}
