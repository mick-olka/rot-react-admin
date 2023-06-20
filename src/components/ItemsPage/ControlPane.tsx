import AddIcon from '@mui/icons-material/Add'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import { Box, Tooltip } from '@mui/material'

import * as S from '../../components/styles'

import { SearchField } from 'src/components'

export const ControlPane = (
  props: Readonly<{
    title?: string
    selected?: string[]
    deleteTitle?: string
    children?: React.ReactNode
    handleSearchTrigger?: (text: string) => void
    onDeleteClick?: () => void
    onCreateClick?: () => void
    // onChooseClick?: (id: string) => void
  }>,
) => {
  return (
    <S.ControlPaneStyled>
      <S.ControlPaneBox>
        {props.title && <h2>{props.title}</h2>}
        {props.children}
        {props.onCreateClick && (
          <S.RoundButton color='primary' variant='contained' onClick={props.onCreateClick}>
            <AddIcon />
          </S.RoundButton>
        )}
      </S.ControlPaneBox>
      <S.ControlPaneBox>
        {props.handleSearchTrigger && <SearchField onSearchTrigger={props.handleSearchTrigger} />}
        {props.selected && (
          <>
            {/* {props.onChooseClick && (
                <CollectionSelector
                  disabled={!props.selected.length}
                  onSubmit={props.onChooseClick}
                />
              )} */}
            {props.onDeleteClick && (
              <Tooltip title={props.deleteTitle || 'Delete Selected Items'}>
                <Box>
                  <S.RoundButton
                    variant='contained'
                    disabled={!props.selected.length}
                    onClick={props.onDeleteClick}
                  >
                    <DeleteOutlined />
                  </S.RoundButton>
                </Box>
              </Tooltip>
            )}
          </>
        )}
      </S.ControlPaneBox>
    </S.ControlPaneStyled>
  )
}
