import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

import { TextListCreator } from '../inputs'
import { MultiLangTextField } from '../inputs/multi-lang-text-field'

import * as S from 'src/components/styles'

import { I_CollectionForm } from 'src/models'
import { lanEnumToObject } from 'src/utils'

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
  const { onSubmit, isLoading, initValues } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<I_CollectionForm>({
    defaultValues: initValues || def,
  })

  // in case other fields get passed from getById response
  const prepareSubmit = (data: I_CollectionForm) => {
    const filtered_data = {
      name: data.name,
      description: data.description,
    }
    onSubmit(filtered_data)
  }
  return (
    <Box sx={{ width: '30rem' }}>
      <form onSubmitCapture={handleSubmit(prepareSubmit)}>
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
              textarea
            />
          </Box>
        </S.TextFieldBox>

        <S.TextFieldBox>
          <S.TextFieldStyled
            type='number'
            {...register('index', { required: false })}
            label='Index'
            fullWidth
          />
        </S.TextFieldBox>

        <S.TextFieldBox>
          <TextListCreator
            label='Keywords'
            list={getValues('keywords')}
            onListChange={(l) => setValue('keywords', l)}
            sx={{ width: '100%' }}
          />
        </S.TextFieldBox>

        <S.ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save'}
        </S.ButtonStyled>
      </form>
    </Box>
  )
}
