import ImageIcon from '@mui/icons-material/Image'
import { Avatar, Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useState } from 'react'

import { PHOTOS_URL } from 'src/utils/constants/constants'

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
  { field: 'index', headerName: 'Index', width: 130 },
  // {
  //   field: 'index',
  //   headerName: 'Index',
  //   width: 130,
  //   renderCell: (params) => {
  //     // console.log(params)
  //     const [index, setIndex] = useState(params.value || 0)
  //     return (
  //       <Box onClick={(e) => e.stopPropagation()}>
  //         <TextField size='small' value={index} onChange={(e) => setIndex(e.currentTarget.value)} />
  //       </Box>
  //     )
  //   },
  //   // valueGetter: (params) => params.row.thumbnail,
  // },
]
