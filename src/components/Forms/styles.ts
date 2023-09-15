import { Box, IconButton } from '@mui/material'
import styled from 'styled-components'

export const FeaturesManagerWrapper = styled(Box)`
  /* width: 40rem; */
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 2rem;
  text-align: left;
`

export const AddBtn = styled(IconButton)`
  &&& {
    background-color: #eee;
  }
`
