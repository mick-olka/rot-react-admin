import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

import { MultiLangTextField } from 'src/components/MultiLangTextField'
import * as S from 'src/components/styles'
import { lanEnumToObject } from 'src/services'
import { I_ProductForm } from 'src/services/products.service'

interface I_Props {
  onSubmit: (data: I_ProductForm) => void
  isLoading: boolean
  initValues?: I_ProductForm
  required?: boolean
}
const def: I_ProductForm = {
  name: lanEnumToObject(''),
  code: '',
  price: 1000,
  index: 0,
}

const fieldBoxStyles = { display: 'flex', width: '20rem', alignItems: 'left' }

export const ProductForm = ({ onSubmit, isLoading, initValues, required }: Readonly<I_Props>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I_ProductForm>({
    defaultValues: initValues || def,
  })

  return (
    <Box sx={{ width: '30rem' }}>
      <form onSubmitCapture={handleSubmit(onSubmit)}>
        <S.TextFieldBox>
          <label>Name</label>
          <Box sx={fieldBoxStyles}>
            <MultiLangTextField register={register} names={['name.ua', 'name.en', 'name.de']} />
          </Box>
        </S.TextFieldBox>

        <S.TextFieldBox>
          <label>Code</label>
          <Box sx={fieldBoxStyles}>
            <S.TextFieldStyled {...register('code', { required: !!required })} />
          </Box>
          {errors.code && <span>This field is required</span>}
        </S.TextFieldBox>

        <S.TextFieldBox>
          <label>Price</label>
          <Box sx={fieldBoxStyles}>
            <S.TextFieldStyled type='number' {...register('price', { required: !!required })} />
          </Box>
          {errors.code && <span>This field is required</span>}
        </S.TextFieldBox>

        <S.TextFieldBox>
          <label>Index</label>
          <Box sx={fieldBoxStyles}>
            <S.TextFieldStyled type='number' {...register('index', { required: false })} />
          </Box>
        </S.TextFieldBox>

        <S.ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save'}
        </S.ButtonStyled>
      </form>
    </Box>
  )
}
