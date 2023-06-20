import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Box } from '@mui/material'

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
