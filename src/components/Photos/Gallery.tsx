import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import { Avatar, Box, Dialog } from '@mui/material'
import { useState } from 'react'

import * as PS from './styles'

import { AvatarUploader, FilesDragDrop } from 'src/components'
import * as S from 'src/components/styles'
import { PHOTOS_URL } from 'src/utils/constants/constants'
import { ButtonClickEvent } from 'src/utils/types'

interface I_Props {
  readonly path_arr: string[]
  readonly editMode: boolean
  readonly newFiles: File[]
  readonly setNewFiles: (files: File[]) => void
  readonly onDeletePhoto?: (path: string) => void
}

export const Gallery = (props: I_Props) => {
  // const [newFiles, setNewFiles] = useState<File[]>([])
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<string>('')
  const onPhotoDeleteClick = (e: ButtonClickEvent, path: string) => {
    e.stopPropagation()
    // e.preventDefault()
    props.onDeletePhoto && props.onDeletePhoto(path)
  }
  const onNewPhotoDeleteClick = (e: ButtonClickEvent, file: File) => {
    e.stopPropagation()
    const new_files = props.newFiles.filter((f) => f.name !== file.name)
    props.setNewFiles(new_files)
  }
  const onPhotoOpenClick = (url: string) => {
    // console.log('open photo')
    setImage(url)
    setOpen(true)
  }
  const onPhotosAdd = (files: File[]) => {
    const new_files = [...props.newFiles, ...files]
    props.setNewFiles(new_files)
  }
  // useEffect(() => {
  //   console.log(files)
  //   // setPathArr((arr) => [...arr, URL.createObjectURL(file)])
  // }, [files])
  return (
    <Box sx={{ display: 'flex', overflow: 'auto', width: '100%' }}>
      {props.path_arr.map((path) => (
        <Box
          key={path}
          sx={{
            margin: '2px',
            position: 'relative',
            height: 150,
          }}
        >
          <PS.PhotoOverlay onClick={() => onPhotoOpenClick(`${PHOTOS_URL}${path}`)}>
            {props.editMode && (
              <S.RoundButton
                onClick={(e) => onPhotoDeleteClick(e, path)}
                variant='contained'
                width='2rem'
                sx={{
                  position: 'absolute',
                  bottom: 1,
                  right: 1,
                }}
              >
                <DeleteOutlinedIcon />
              </S.RoundButton>
            )}
          </PS.PhotoOverlay>
          <Avatar
            sx={{ width: 150, height: 150 }}
            src={`${PHOTOS_URL}${path}`}
            variant='rounded'
            alt={path}
          />
        </Box>
      ))}
      {/* new photos to be saved */}
      {props.newFiles.map((f) => (
        <Box
          key={f.name}
          sx={{
            margin: '2px',
            position: 'relative',
            height: 150,
          }}
        >
          <PS.PhotoOverlay onClick={() => onPhotoOpenClick(URL.createObjectURL(f))}>
            {props.editMode && (
              <S.RoundButton
                onClick={(e) => onNewPhotoDeleteClick(e, f)}
                variant='contained'
                width='2rem'
                sx={{
                  position: 'absolute',
                  bottom: 1,
                  right: 1,
                }}
              >
                <DeleteOutlinedIcon />
              </S.RoundButton>
            )}
          </PS.PhotoOverlay>
          <Avatar
            sx={{ width: 150, height: 150 }}
            src={URL.createObjectURL(f)}
            variant='rounded'
            alt={f.name}
          />
        </Box>
      ))}
      {props.editMode && (
        <PS.InnerBorder className='flex-center' sx={{ position: 'relative' }}>
          {/* <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              opacity: 0,
            }}
          > */}
          <FilesDragDrop onDrop={onPhotosAdd}>
            <Box>
              <AddRoundedIcon fontSize='large' />
            </Box>
          </FilesDragDrop>
          {/* <AvatarUploader handleChange={onPhotoAdd} /> */}
          {/* </Box> */}
        </PS.InnerBorder>
      )}
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        sx={{ '& .MuiPaper-root': { maxWidth: 'calc(100% - 64px)' } }}
      >
        <Avatar
          variant='square'
          alt='image'
          src={image || undefined}
          sx={{ width: 800, height: 800 }}
        />
      </Dialog>
    </Box>
  )
}