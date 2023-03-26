import ImageIcon from '@mui/icons-material/Image'
import { Avatar, Box } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { PHOTOS_URL } from 'src/utils/constants/constants'

export const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130, valueGetter: (param) => param.value.ua },
  {
    field: 'thumbnail',
    headerName: 'Image',
    width: 130,
    renderCell: (params: GridRenderCellParams<string>) => (
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
  },
  { field: 'price', headerName: 'Price', width: 130 },
]
