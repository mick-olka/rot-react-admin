import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import { products_page_limit } from 'src/utils'

interface I_Props<T> {
  columns: GridColDef[]
  rows: T[]
  onRowClick: (id: string) => void
  onSelect: (ids: string[]) => void
  limit?: number
  pagination?: boolean
  isLoading?: boolean
}

export const DataTable = <T,>(props: I_Props<T>) => {
  const { columns, rows, onRowClick, onSelect, limit, pagination, isLoading } = props
  const pageSize = limit || products_page_limit
  return (
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
      loading={isLoading}
      sx={{
        '.MuiDataGrid-overlayWrapperInner': { width: '80vw !important' },
        '.MuiDataGrid-virtualScrollerContent': { width: '80vw !important' },
      }}
    />
  )
}
