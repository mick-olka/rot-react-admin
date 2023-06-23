import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

export { Register as SignUp, Login as SignIn } from '.'
import { TextFieldBox, TextFieldStyled } from 'src/components'
import { I_LoginCreds } from 'src/models'

interface I_Props {
  onSubmit: (dat: I_LoginCreds) => void
  isLoading: boolean
}

export const CredentialsForm = ({ onSubmit, isLoading }: I_Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<I_LoginCreds>({
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
