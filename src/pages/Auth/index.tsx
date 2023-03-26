import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

import { TextFieldBox, TextFieldStyled } from 'src/components/styles'
import { I_LoginCreds } from 'src/services/auth.service'
export { Login as SignIn } from './Login'
export { Register as SignUp } from './Register'

export interface I_Credentials extends I_LoginCreds {}

interface I_Props {
  onSubmit: (dat: I_Credentials) => void
  isLoading: boolean
}

export const CredentialsForm = ({ onSubmit, isLoading }: I_Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<I_Credentials>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <Box>
      <form onSubmitCapture={handleSubmit(onSubmit)}>
        <TextFieldBox>
          <label>Email</label>
          <TextFieldStyled error={!!errors.email} {...register('email', { required: true })} />
        </TextFieldBox>

        <TextFieldBox>
          <label>Password</label>
          <TextFieldStyled
            error={!!errors.password}
            type='password'
            {...register('password', { required: true, minLength: 4 })}
          />
        </TextFieldBox>

        <TextFieldStyled
          sx={{ backgroundColor: '#55f' }}
          disabled={isLoading}
          type='submit'
          // value={isLoading ? 'Loading...' : 'Create'}
        />
      </form>
    </Box>
  )
}
