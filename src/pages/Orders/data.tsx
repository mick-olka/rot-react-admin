import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [{ field: 'name', headerName: 'Name', width: 130 }]

export const cart_item_columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 130,
  },
  { field: 'sum', headerName: 'Sum', width: 130 },
]
