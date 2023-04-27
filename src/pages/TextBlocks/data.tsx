import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'text',
    headerName: 'text',
    valueGetter: (params) => params.row.text.ua,
    flex: 1,
  },
  {
    field: 'edit',
    headerName: '',
    width: 50,
    renderCell: () => (
      <IconButton>
        <EditOutlinedIcon />
      </IconButton>
    ),
    align: 'right',
  },
]
