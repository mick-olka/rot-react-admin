import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130, valueGetter: (param) => param.value.ua },
]
