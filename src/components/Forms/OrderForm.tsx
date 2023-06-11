import { Box, InputLabel, MenuItem, Select } from '@mui/material'
import { useForm } from 'react-hook-form'

import * as S from 'src/components/styles'

import { I_OrderForm, StatusEnum } from 'src/services/orders.service'

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
  status: StatusEnum.w,
}

export const OrderForm = (props: Readonly<I_Props>) => {
  const { onSubmit, isLoading, initValues, required } = props
  const {
    register,
    getValues,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<I_OrderForm>({
    defaultValues: initValues || def,
  })
  watch('status')
  return (
    <Box sx={{ width: '30rem' }}>
      <form onSubmitCapture={handleSubmit(onSubmit)}>
        <S.TextFieldBox>
          <InputLabel>Client Name</InputLabel>
          <S.FieldBox>
            <S.TextFieldStyled {...register('name', { required: !!required })} />
          </S.FieldBox>
        </S.TextFieldBox>

        <S.TextFieldBox>
          <InputLabel>Client Phone</InputLabel>
          <S.FieldBox>
            <S.TextFieldStyled {...register('phone', { required: !!required })} />
          </S.FieldBox>
        </S.TextFieldBox>

        <S.TextFieldBox>
          <InputLabel>Details</InputLabel>
          <S.FieldBox>
            <S.TextFieldStyled {...register('message', { required: false })} />
          </S.FieldBox>
        </S.TextFieldBox>

        <S.TextFieldBox>
          <InputLabel>Status</InputLabel>
          <S.FieldBox>
            <Select
              value={getValues('status')}
              onChange={(e) => setValue('status', e.target.value as StatusEnum)}
              sx={{ width: '15rem', textAlign: 'left' }}
            >
              <MenuItem value={StatusEnum.c}>Cancelled</MenuItem>
              <MenuItem value={StatusEnum.d}>Done</MenuItem>
              <MenuItem value={StatusEnum.w}>Cancelled</MenuItem>
              <MenuItem value={StatusEnum.p}>In Progress</MenuItem>
            </Select>
          </S.FieldBox>
        </S.TextFieldBox>

        <S.ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save'}
        </S.ButtonStyled>
      </form>
    </Box>
  )
}
