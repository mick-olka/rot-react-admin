import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import { products_page_limit } from 'src/utils/constants/constants'

interface I_Props<T> {
  columns: GridColDef[]
  rows: T[]
  onRowClick: (id: string) => void
  onSelect: (ids: string[]) => void
  limit?: number
  pagination?: boolean
}

export const DataTable = <T,>(props: I_Props<T>) => {
  const { columns, rows, onRowClick, onSelect, limit, pagination } = props
  const pageSize = limit || products_page_limit
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        // pageSize={limit || products_page_limit}
        // pageSizeOptions={[pageSize, pageSize + 20, pageSize + 30]}
        pageSizeOptions={[pageSize]}
        checkboxSelection
        disableColumnMenu
        disableColumnFilter
        disableRowSelectionOnClick
        // hideFooterSelectedRowCount={!pagination}
        // hideFooter={!pagination}
        hideFooterPagination={!pagination}
        onRowSelectionModelChange={(ids: GridRowSelectionModel) => {
          onSelect(ids as string[])
        }}
        initialState={{
          pagination: { paginationModel: { pageSize } },
        }}
        keepNonExistentRowsSelected
        onRowClick={(param) => onRowClick(String(param.id))}
      />
    </Box>
  )
}
