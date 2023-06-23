import { Box, InputLabel, MenuItem, Select } from '@mui/material'
import { useForm } from 'react-hook-form'

import { TextFieldBox, FieldBox, TextFieldStyled, ButtonStyled } from 'src/components'
import { I_OrderForm, StatusEnum } from 'src/models'

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

  // in case other fields get passed from getById response
  const prepareSubmit = (data: I_OrderForm) => {
    const filtered_data = {
      name: data.name,
      phone: data.phone,
      message: data.message,
      status: data.status,
    }
    onSubmit(filtered_data)
  }
  return (
    <Box sx={{ width: '30rem' }}>
      <form onSubmitCapture={handleSubmit(prepareSubmit)}>
        <TextFieldBox>
          <InputLabel>Client Name</InputLabel>
          <FieldBox>
            <TextFieldStyled {...register('name', { required: !!required })} />
          </FieldBox>
        </TextFieldBox>

        <TextFieldBox>
          <InputLabel>Client Phone</InputLabel>
          <FieldBox>
            <TextFieldStyled {...register('phone', { required: !!required })} />
          </FieldBox>
        </TextFieldBox>

        <TextFieldBox>
          <InputLabel>Details</InputLabel>
          <FieldBox>
            <TextFieldStyled {...register('message', { required: false })} />
          </FieldBox>
        </TextFieldBox>

        <TextFieldBox>
          <InputLabel>Status</InputLabel>
          <FieldBox>
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
          </FieldBox>
        </TextFieldBox>

        <ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save'}
        </ButtonStyled>
      </form>
    </Box>
  )
}
