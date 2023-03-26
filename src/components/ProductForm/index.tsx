import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

import { MultiLangTextField } from 'src/components/MultiLangTextField'
import * as S from 'src/components/styles'
import { I_ProductForm } from 'src/services/products.service'

interface I_Props {
  onSubmit: (data: I_ProductForm) => void
  isLoading: boolean
  defaultValues?: I_ProductForm
  required?: boolean
}
const def: I_ProductForm = {
  name: {
    en: '',
    ua: '',
    de: '',
  },
  code: '',
  price: 1000,
}

const fieldBoxStyles = { display: 'flex', width: '20rem', alignItems: 'left' }

export const ProductForm = ({
  onSubmit,
  isLoading,
  defaultValues,
  required,
}: Readonly<I_Props>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I_ProductForm>({
    defaultValues: defaultValues || def,
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

        <S.ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save'}
        </S.ButtonStyled>
      </form>
    </Box>
  )
}
