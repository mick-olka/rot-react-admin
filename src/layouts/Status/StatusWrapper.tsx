import { Box, Skeleton, SxProps, Snackbar, Alert } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'

import { SimpleError } from 'src/components'

interface I_Props {
  isSuccess?: boolean
  isError?: boolean
  isLoading?: boolean
  errorAlert?: boolean
  loadingAlert?: boolean
  children: ReactNode
  sx?: SxProps
  error?: string
}

export const StatusWrapper = (p: I_Props) => {
  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)

  const [errMsg, setErrMsg] = useState<string | undefined>(undefined)

  useEffect(() => {
    // if (p.error) {
    //   if (typeof p.error === 'string') {
    //     setErrMsg(p.error)
    //   } else if ('status' in p.error) {
    //     // you can access all properties of `FetchBaseQueryError` here
    //     const msg =
    //       'error' in p.error
    //         ? p.error.error
    //         : JSON.stringify((p.error.data as { message: string }).message)
    //     setErrMsg(msg)
    //   }
    // }
    setErrMsg(p.error)
  }, [p.error])

  const triggerSuccessAlert = () => {
    setSuccessAlert(true)
    // setTimeout(() => setSuccessStatus(false), 2000)
  }

  const triggerErrorAlert = () => {
    setErrorAlert(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setSuccessAlert(false)
    setErrorAlert(false)
  }
  useEffect(() => {
    if (p.isSuccess) triggerSuccessAlert()
    if (p.errorAlert && p.isError) triggerErrorAlert()
  }, [p.isSuccess, p.isError])

  if (p.isLoading && !p.loadingAlert)
    return <Skeleton variant='rectangular' width={'100%'} height={'100%'} />
  if (p.isError && !p.errorAlert) return <SimpleError message={errMsg} />
  return (
    <Box sx={{ height: '100%', ...p.sx }}>
      {p.children}
      <Snackbar
        open={successAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Success!
        </Alert>
      </Snackbar>
      <Snackbar
        open={p.isLoading && p.loadingAlert}
        // autoHideDuration={2000}
        // onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
          Loading...
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {errMsg || 'Some Error'}
        </Alert>
      </Snackbar>
    </Box>
  )
}
