import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useForm } from 'react-hook-form'

import { TextFieldBox, TextFieldStyled, ButtonStyled } from 'src/components'
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
    <Box sx={{ width: '100%' }}>
      <form onSubmitCapture={handleSubmit(prepareSubmit)}>
        <TextFieldBox>
          <TextFieldStyled
            {...register('name', { required: !!required })}
            fullWidth
            label='Client Name'
          />
        </TextFieldBox>

        <TextFieldBox>
          <TextFieldStyled
            {...register('phone', { required: !!required })}
            fullWidth
            label='Phone'
          />
        </TextFieldBox>

        <TextFieldBox>
          <TextFieldStyled
            {...register('message', { required: false })}
            fullWidth
            label='Message'
          />
        </TextFieldBox>

        <TextFieldBox>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={getValues('status')}
              onChange={(e) => setValue('status', e.target.value as StatusEnum)}
              sx={{ textAlign: 'left' }}
              label='Status'
              fullWidth
            >
              <MenuItem value={StatusEnum.c}>Cancelled</MenuItem>
              <MenuItem value={StatusEnum.d}>Done</MenuItem>
              <MenuItem value={StatusEnum.w}>Cancelled</MenuItem>
              <MenuItem value={StatusEnum.p}>In Progress</MenuItem>
            </Select>
          </FormControl>
        </TextFieldBox>

        <ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save'}
        </ButtonStyled>
      </form>
    </Box>
  )
}
