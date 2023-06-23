import { GridColDef } from '@mui/x-data-grid'

import { DataTable } from 'src/components'

export const ItemsTable = <T extends { _id: string }>(
  props: Readonly<{
    columns: GridColDef[]
    items?: T[]
    limit: number
    clientPagination?: boolean
    onSelect: (ids: string[]) => void
    onItemClick: (id: string) => void
    isLoading?: boolean
  }>,
) => {
  const onProdsSelect = (ids: string[]) => props.onSelect(ids)
  return (
    <DataTable
      rows={props.items || []}
      columns={props.columns}
      onRowClick={props.onItemClick}
      onSelect={onProdsSelect}
      limit={props.limit}
      pagination={props.clientPagination}
      isLoading={props.isLoading}
    />
  )
}
