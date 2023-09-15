import { Box, Avatar } from '@mui/material'
import styled from 'styled-components'

export const CreateProductPane = styled(Box)`
  margin: 1rem;
`
export const Thumbnail = styled(Avatar)`
  &&& {
    width: 100px;
    height: 50px;
    img {
      object-fit: contain;
    }
  }
`
