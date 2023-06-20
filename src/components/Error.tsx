import { Alert, AlertTitle, Box } from '@mui/material'

const default_message = (
  <>
    An error occurred — <strong>try reloading the page or report to developers</strong>
  </>
)

export const SimpleError = ({ message }: { message?: string }) => {
  return (
    <Box>
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        {message || default_message}
      </Alert>
    </Box>
  )
}
