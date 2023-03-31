import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

import { MultiLangTextField } from '../MultiLangTextField'

import * as S from 'src/components/styles'

import { lanEnumToObject } from 'src/services'
import { I_CollectionForm } from 'src/services/collections.service'

interface I_Props {
  onSubmit: (data: I_CollectionForm) => void
  isLoading: boolean
  initValues?: I_CollectionForm
  required?: boolean
}

const def: I_CollectionForm = {
  name: lanEnumToObject(''),
  description: lanEnumToObject(''),
}

const fieldBoxStyles = { display: 'flex', width: '20rem', alignItems: 'left' }

export const CollectionForm = (props: Readonly<I_Props>) => {
  const { onSubmit, isLoading, initValues, required } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I_CollectionForm>({
    defaultValues: initValues || def,
  })
  return (
    <Box sx={{ width: '30rem' }}>
      <form onSubmitCapture={handleSubmit(onSubmit)}>
        <S.TextFieldBox>
          <label>Name</label>
          <Box sx={fieldBoxStyles}>
            <MultiLangTextField
              registerOptions={{ required: true }}
              register={register}
              names={['name.ua', 'name.en', 'name.de']}
              error={!!errors.name}
            />
          </Box>
        </S.TextFieldBox>

        <S.TextFieldBox>
          <label>Description</label>
          <Box sx={fieldBoxStyles}>
            <MultiLangTextField
              register={register}
              names={['description.ua', 'description.en', 'description.de']}
            />
          </Box>
        </S.TextFieldBox>

        <S.ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save'}
        </S.ButtonStyled>
      </form>
    </Box>
  )
}
