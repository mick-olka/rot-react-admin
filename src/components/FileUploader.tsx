import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ImageIcon from '@mui/icons-material/Image'

import { Box, SxProps, Theme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'

import * as S from './styles'

const fileTypes = ['JPEG', 'PNG', 'JPG']

interface I_Props {
  onDrop: (files: File[]) => void
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export const FilesDragDrop = ({ sx, onDrop, children }: I_Props) => {
  const handleChange = (files: File[]) => {
    onDrop(files)
  }
  return (
    <Box sx={{ ...sx, width: '100%', height: '100%', '& div': { cursor: 'pointer' } }}>
      <FileUploader handleChange={handleChange} name='file' types={fileTypes} multiple>
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {/* {files.length ? (
            <FilesPane removeFile={removeFile} files={files} />
          ) : (
            <>
              <Box>
                <ImageIcon
                  fontSize='large'
                  style={{
                    width: '5rem',
                    height: '5rem',
                    marginTop: '0.55rem',
                  }}
                />
              </Box>

              <p>Drag a local files to upload</p>
            </>
          )} */}
          {children}
        </Box>
      </FileUploader>
    </Box>
  )
}

export const __FilesPane = ({
  files,
  removeFile,
}: {
  files: File[]
  removeFile: (index: number) => void
}) => {
  return (
    <Box sx={{ width: '60%' }} onClick={(e) => e.preventDefault()}>
      {files.map((f, i) => (
        <Box
          key={`f${i}`}
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            margin: '0.5rem',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              fontWeight: '1.3rem',
              display: 'flex',
              justifyContent: 'space-between',
              width: '90%',
              border: '1px solid #aaa',
              borderRadius: '1rem',
              padding: '0.4rem 1rem',
            }}
          >
            {f.name} <CheckOutlinedIcon style={{ color: 'green' }} />
          </Box>
          <DeleteOutlinedIcon onClick={() => removeFile(i)} />
        </Box>
      ))}
    </Box>
  )
}

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
            <Avatar
              src={url}
              alt={url || 'no photo'}
              sx={{ width: '100%', height: '100%' }}
              variant='rounded'
            />
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
