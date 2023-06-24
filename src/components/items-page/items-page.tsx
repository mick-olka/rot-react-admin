import { Box, Pagination } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'

import { ControlPane } from './control-pane'
import { ItemsTable } from './items-table'

import * as S from '../styles'

import { AlertDialog } from 'src/components'
import { StatusWrapper } from 'src/layouts/status'

type DataType<T> = {
  count: number
  limit: number
  data: T[] | undefined
  isLoading: boolean
  isError: boolean
}

type CommonProps<T> = {
  title?: string
  data: DataType<T>
  columns: GridColDef[]
  deleteTitle?: string
  clientPagination?: boolean
  children?: React.ReactNode
  onItemClick: (id: string) => void
  onDeleteMultiple?: (ids: string[]) => void
  onCreateClick?: () => void
  onSearchTrigger?: (query: string | undefined) => void
  onSelect?: (prod_ids: string[]) => void
}

type PaginationProps =
  | { pagination?: false; page?: never; setPage?: never }
  | { pagination: true; page: number; setPage: (page: number) => void }

type I_Props<T> = CommonProps<T> & PaginationProps

export const ItemsPage = <T extends { _id: string }>(props: I_Props<T>) => {
  const {
    title,
    data,
    columns,
    page,
    setPage,
    onSearchTrigger,
    onDeleteMultiple: deleteMany,
    onCreateClick,
    onItemClick,
    pagination,
    onSelect,
    clientPagination,
    deleteTitle,
    children,
  } = props
  const [selected, setSelected] = useState<string[]>([])
  const [deleteDialog, setDeleteDialog] = useState(false)
  const handleSelect = (ids: string[]) => {
    setSelected(ids)
    onSelect && onSelect(ids)
  }
  const onPageChange = (e: unknown, p: number) => pagination && setPage(p)
  const handleSearchTrigger = (searchText: string) => {
    if (onSearchTrigger) onSearchTrigger(searchText ? searchText : undefined)
  }

  const onDeleteClick = () => setDeleteDialog(true)
  const onConfirmDelete = () => deleteMany && deleteMany(selected)
  return (
    <S.ItemsListPane sx={{ maxWidth: '100%' }}>
      <StatusWrapper isError={data.isError}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <ControlPane
            title={title}
            selected={selected}
            onDeleteClick={deleteMany ? onDeleteClick : undefined}
            handleSearchTrigger={onSearchTrigger ? handleSearchTrigger : undefined}
            onCreateClick={onCreateClick}
            // onChooseClick={onChooseCollection}
            deleteTitle={deleteTitle}
          >
            {children}
          </ControlPane>
          <ItemsTable
            columns={columns}
            items={data.data}
            onSelect={handleSelect}
            onItemClick={onItemClick}
            limit={data.limit}
            clientPagination={clientPagination}
            isLoading={data.isLoading}
          />
          {pagination && !clientPagination && (
            <Pagination
              sx={{ paddingTop: '0.5rem' }}
              onChange={onPageChange}
              count={Math.ceil(data.count! / data.limit)}
              page={page}
            />
          )}
        </Box>
        <AlertDialog
          open={deleteDialog}
          setOpen={setDeleteDialog}
          title={deleteTitle || 'Delete Selected Items?'}
          text='This action can not be undone'
          onAgree={onConfirmDelete}
          onCancel={() => null}
        />
      </StatusWrapper>
    </S.ItemsListPane>
  )
}
