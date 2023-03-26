import AddIcon from '@mui/icons-material/Add'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import { Box, Pagination, Skeleton } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'

import * as S from '../../components/styles'

import { AlertDialog, CollectionSelector, DataTable, SearchField } from 'src/components'

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
  onItemClick: (id: string) => void
  onDeleteMultiple?: (ids: string[]) => Promise<unknown>
  onCreateClick?: () => void
  onSearchTrigger?: (query: string | undefined) => void
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
  } = props
  const [selected, setSelected] = useState<string[]>([])
  const [deleteDialog, setDeleteDialog] = useState(false)
  const handleSelect = (ids: string[]) => setSelected(ids)
  const onPageChange = (e: unknown, p: number) => pagination && setPage(p)
  const handleSearchTrigger = (searchText: string) => {
    if (onSearchTrigger) onSearchTrigger(searchText ? searchText : undefined)
  }

  const onDeleteClick = () => setDeleteDialog(true)
  const onConfirmDelete = () => deleteMany && deleteMany(selected)
  return (
    <S.ProductsListPane>
      {data.isLoading && <Skeleton width='20rem' height='20rem' />}
      {data.data && (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <ControlPane
            title={title}
            selected={selected}
            onDeleteClick={deleteMany ? onDeleteClick : undefined}
            handleSearchTrigger={onSearchTrigger ? handleSearchTrigger : undefined}
            onCreateClick={onCreateClick}
          />
          <ItemsTable
            columns={columns}
            items={data.data}
            onSelect={handleSelect}
            onItemClick={onItemClick}
            limit={data.limit}
          />
          {pagination && (
            <Pagination
              sx={{ paddingTop: '0.5rem' }}
              onChange={onPageChange}
              count={Math.ceil(data.count! / data.limit)}
              page={page}
            />
          )}
        </Box>
      )}
      {data.isError && <div>Error</div>}
      <AlertDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        title='Delete Selected Items?'
        text='This action can not be undone'
        onAgree={onConfirmDelete}
        onCancel={() => null}
      />
    </S.ProductsListPane>
  )
}

const ControlPane = (
  props: Readonly<{
    title?: string
    selected?: string[]
    handleSearchTrigger?: (text: string) => void
    onDeleteClick?: () => void
    onCreateClick?: () => void
  }>,
) => {
  return (
    <S.ControlPaneStyled>
      {props.title && <h2>{props.title}</h2>}
      {props.onCreateClick && (
        <S.RoundButton color='primary' variant='contained' onClick={props.onCreateClick}>
          <AddIcon />
        </S.RoundButton>
      )}
      {props.handleSearchTrigger && <SearchField onSearchTrigger={props.handleSearchTrigger} />}
      {props.selected && (
        <>
          <CollectionSelector disabled={!props.selected.length} />
          {props.onDeleteClick && (
            <S.RoundButton
              variant='contained'
              disabled={!props.selected.length}
              onClick={props.onDeleteClick}
            >
              <DeleteOutlined />
            </S.RoundButton>
          )}
        </>
      )}
    </S.ControlPaneStyled>
  )
}

const ItemsTable = <T extends { _id: string }>(
  props: Readonly<{
    columns: GridColDef[]
    items: T[]
    limit: number
    onSelect: (ids: string[]) => void
    onItemClick: (id: string) => void
  }>,
) => {
  const onProdsSelect = (ids: string[]) => props.onSelect(ids)
  return (
    <Box sx={{ height: '100%' }}>
      <DataTable
        rows={props.items}
        columns={props.columns}
        onRowClick={props.onItemClick}
        onSelect={onProdsSelect}
        limit={props.limit}
      />
    </Box>
  )
}
