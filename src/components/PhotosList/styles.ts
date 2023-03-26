import { Box } from '@mui/material'
import styled from 'styled-components'

export const PhotoOverlay = styled(Box)`
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0.4;
  z-index: 1;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`
export const InnerBorder = styled(Box)`
  margin-top: 3px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: 3px solid grey;
  width: 148px;
  min-width: 148px;
  height: 148px;
  cursor: pointer;
`
