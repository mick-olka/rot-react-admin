import ImageIcon from '@mui/icons-material/Image'
import { Avatar, Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { useUpdateProduct } from 'src/hooks/use-products'
import { PHOTOS_URL } from 'src/utils'

export const product_columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130, valueGetter: (param) => param.value.ua },
  {
    field: 'thumbnail',
    headerName: 'Image',
    width: 130,
    renderCell: (params) => (
      <Box>
        {params.value ? (
          <Box sx={{ width: '3rem', height: '3rem' }}>
            <Avatar
              alt={params.value}
              src={`${PHOTOS_URL}${params.value}`}
              sx={{ width: 100, height: 50 }}
              variant='square'
            />
          </Box>
        ) : (
          <ImageIcon />
        )}
      </Box>
    ),
    // valueGetter: (params) => params.row.thumbnail,
  },
  { field: 'price', headerName: 'Price', width: 130 },
  // { field: 'index', headerName: 'Index', width: 130 },
  {
    field: 'index',
    headerName: 'Index',
    width: 100,
    renderCell: (row_props) => {
      const [index, setIndex] = useState<number>(row_props.value || 0)
      const [value] = useDebounce(index, 1000)
      const { update, isLoading } = useUpdateProduct(row_props.row._id)
      useEffect(() => {
        if (row_props.value !== value)
          update({ id: row_props.row._id, form_data: { index: value } })
      }, [value])
      return (
        <Box onClick={(e) => e.stopPropagation()}>
          <TextField
            size='small'
            type='number'
            value={index}
            onChange={(e) => setIndex(Number(e.currentTarget.value))}
            disabled={isLoading}
          />
        </Box>
      )
    },
    // valueGetter: (params) => params.row.thumbnail,
  },
]
