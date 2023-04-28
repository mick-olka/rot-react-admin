import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

import { MultiLangTextField } from '../MultiLangTextField'

import * as S from 'src/components/styles'

import { lanEnumToObject } from 'src/services'
import { I_TextBlockForm } from 'src/services/text_blocks.service'

interface I_Props {
  onSubmit: (data: I_TextBlockForm) => void
  isLoading: boolean
  initValues?: I_TextBlockForm
}

const def: I_TextBlockForm = {
  text: lanEnumToObject(''),
}

const fieldBoxStyles = { display: 'flex', width: '20rem', alignItems: 'left' }

export const TextBlockForm = (props: Readonly<I_Props>) => {
  const { onSubmit, isLoading, initValues } = props
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<I_TextBlockForm>({
    defaultValues: initValues || def,
  })
  return (
    <Box sx={{ width: '30rem' }}>
      <form onSubmitCapture={handleSubmit(onSubmit)}>
        <S.TextFieldBox>
          <label>Text</label>
          <Box sx={fieldBoxStyles}>
            <MultiLangTextField
              registerOptions={{ required: false }}
              register={register}
              names={['text.ua', 'text.en', 'text.de']}
              // error={!!errors.text}
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
