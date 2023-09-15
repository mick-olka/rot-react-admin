import ImageIcon from '@mui/icons-material/Image'

import { Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'

import { fileTypes } from './data'

import * as S from '../styles'

export const AvatarUploader = ({
  handleChange,
  currentURL,
}: {
  handleChange: (file: File) => void
  currentURL?: string
}) => {
  const [url, setUrl] = useState<string | undefined>(currentURL)
  const onChange = (file: File) => {
    setUrl(URL.createObjectURL(file))
    handleChange(file)
  }
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <FileUploader handleChange={onChange} name='file' types={fileTypes}>
        {url ? (
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <S.Thumbnail src={url} alt={url || 'no photo'} variant='rounded' />
            <S.ImageUploadIconStyled>
              <ImageIcon sx={{ width: '50%', height: '50%', opacity: 0.8 }} />
            </S.ImageUploadIconStyled>
          </Box>
        ) : (
          <ImageIcon sx={{ width: '100%', height: '100%' }} />
        )}
      </FileUploader>
    </Box>
  )
}
