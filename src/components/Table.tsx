import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid'

import { products_page_limit } from 'src/utils/constants/constants'

interface I_Props {
  columns: GridColDef[]
  rows: any[]
  onRowClick: (id: string) => void
  onSelect: (ids: string[]) => void
  limit?: number
}

export const DataTable = ({ columns, rows, onRowClick, onSelect, limit }: I_Props) => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        pageSize={limit || products_page_limit}
        // rowsPerPageOptions={[1]}
        checkboxSelection
        disableColumnMenu
        disableSelectionOnClick
        hideFooterSelectedRowCount
        hideFooter
        onSelectionModelChange={(ids: GridSelectionModel) => {
          onSelect(ids as string[])
        }}
        sortingMode='server'
        onRowClick={(param) => onRowClick(String(param.id))}
      />
    </Box>
  )
}
