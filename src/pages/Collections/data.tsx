import { Box, TextField } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { useUpdateCollection } from 'src/hooks'

export const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130, valueGetter: (param) => param.value.ua },
  { field: 'url_name', headerName: 'Url', width: 130 },
  {
    field: 'index',
    headerName: 'Index',
    width: 100,
    renderCell: (params) => {
      const [index, setIndex] = useState<number>(params.value || 0)
      const [value] = useDebounce(index, 1000)
      const { update, isLoading } = useUpdateCollection(params.row._id)
      useEffect(() => {
        if (params.value !== value) update({ id: params.row._id, form_data: { index: value } })
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
  },
  // { field: 'name', headerName: 'Name', width: 130, valueGetter: (param) => param.value.ua },
]
