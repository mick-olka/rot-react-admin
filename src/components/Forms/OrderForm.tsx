import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

import * as S from 'src/components/styles'

import { I_OrderForm } from 'src/services/orders.service'

interface I_Props {
  onSubmit: (data: I_OrderForm) => void
  isLoading: boolean
  initValues?: I_OrderForm
  required?: boolean
}

const def: I_OrderForm = {
  name: '',
  phone: '',
  message: '',
}

const fieldBoxStyles = { display: 'flex', width: '20rem', alignItems: 'left' }

export const OrderForm = (props: Readonly<I_Props>) => {
  const { onSubmit, isLoading, initValues, required } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I_OrderForm>({
    defaultValues: initValues || def,
  })
  return (
    <Box sx={{ width: '30rem' }}>
      <form onSubmitCapture={handleSubmit(onSubmit)}>
        <S.TextFieldBox>
          <label>Client Name</label>
          <Box sx={fieldBoxStyles}>
            <S.TextFieldStyled {...register('name', { required: !!required })} />
          </Box>
        </S.TextFieldBox>

        <S.TextFieldBox>
          <label>Client Phone</label>
          <Box sx={fieldBoxStyles}>
            <S.TextFieldStyled {...register('phone', { required: !!required })} />
          </Box>
        </S.TextFieldBox>

        <S.TextFieldBox>
          <label>Details</label>
          <Box sx={fieldBoxStyles}>
            <S.TextFieldStyled {...register('message', { required: false })} />
          </Box>
        </S.TextFieldBox>

        <S.ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save'}
        </S.ButtonStyled>
      </form>
    </Box>
  )
}
