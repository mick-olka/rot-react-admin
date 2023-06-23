import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Gallery } from './Gallery'
import * as S from './styles'

import { MultiLangTextField } from '../inputs/multi-lang-text-field'

import { AlertDialog } from 'src/components'
import * as CS from 'src/components/styles'
import { I_Locales, lanEnumToObject } from 'src/services'
import { I_Photos } from 'src/services/photos.service'
import { areEqualObjects } from 'src/utils/helpers/utils'

const def: I_FormData = {
  main_color: lanEnumToObject(''),
  pill_color: lanEnumToObject(''),
}
interface I_FormData {
  main_color: I_Locales
  pill_color: I_Locales
}
interface I_Props {
  data?: I_Photos
  editMode: boolean
  onCancel?: () => void
  onSubmit?: (form_data: I_FormData, files: File[]) => void
  onDeletePhoto?: (path: string) => void
}

export const PhotosForm = ({ data, editMode, onCancel, onSubmit, onDeletePhoto }: I_Props) => {
  const photos = data ? { main_color: data.main_color, pill_color: data.pill_color } : def
  const [isAlert, setIsAlert] = useState(false)
  // const [photos, setPhotos] = useState<I_Photos>(data || def)
  const [newFiles, setNewFiles] = useState<File[]>([])
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    // formState: { errors },
  } = useForm<I_FormData>({
    defaultValues: photos,
  })
  // const watchFields = watch()
  // useEffect(() => {
  //   // console.log(watchFields)
  // }, [watchFields])
  const onSave = (form_data: I_FormData) => {
    onSubmit && onSubmit(form_data, newFiles)
  }
  const handleCancelClick = () => {
    const unsaved_data = getValues()
    if (
      newFiles.length ||
      !areEqualObjects(photos.main_color, unsaved_data.main_color) ||
      !areEqualObjects(photos.pill_color, unsaved_data.pill_color)
    ) {
      setIsAlert(true) // show not saved changes alert
    } else cancelChanges()
  }
  const cancelChanges = () => {
    reset()
    onCancel && onCancel()
  }
  return (
    <Box sx={{ display: 'flex', overflow: 'auto', position: 'relative', width: '100%' }}>
      <Box sx={{ width: '17rem' }}>
        {editMode ? (
          <S.PhotosFormStyled onSubmitCapture={handleSubmit(onSave)}>
            <Box>
              <CS.TextFieldBox>
                <MultiLangTextField
                  label='Main Color'
                  register={register}
                  names={['main_color.ua', 'main_color.en', 'main_color.de']}
                />
              </CS.TextFieldBox>
              <CS.TextFieldBox>
                <MultiLangTextField
                  label='Pill Color'
                  register={register}
                  names={['pill_color.ua', 'pill_color.en', 'pill_color.de']}
                />
              </CS.TextFieldBox>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '10rem',
                justifyContent: 'space-around',
              }}
            >
              <CS.RoundButton variant='contained' type='submit' width='3rem'>
                <CheckRoundedIcon />
              </CS.RoundButton>
              <CS.RoundButton variant='contained' onClick={handleCancelClick} width='3rem'>
                <ClearRoundedIcon />
              </CS.RoundButton>
            </Box>
          </S.PhotosFormStyled>
        ) : (
          <Box>
            <Typography>Main Color:</Typography>
            <Typography fontSize='20px'>{photos.main_color.ua}</Typography>
            <br />
            <Typography>Fabric Color: </Typography>
            <Typography fontSize='20px'>{photos.pill_color.ua}</Typography>
          </Box>
        )}
      </Box>
      <Gallery
        path_arr={data?.path_arr || []}
        editMode={editMode}
        newFiles={newFiles}
        setNewFiles={setNewFiles}
        onDeletePhoto={onDeletePhoto}
      />
      <AlertDialog
        open={isAlert}
        setOpen={setIsAlert}
        title='Discard changes?'
        text='You have unsaved changes. Delete them?'
        agreeTitle='Delete Changes'
        cancelTitle='Save Changes'
        onAgree={cancelChanges}
        onCancel={handleSubmit(onSave)}
      />
    </Box>
  )
}
