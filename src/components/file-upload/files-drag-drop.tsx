import { Box, SxProps, Theme } from '@mui/material'
import { FileUploader } from 'react-drag-drop-files'

import { fileTypes } from './data'

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
