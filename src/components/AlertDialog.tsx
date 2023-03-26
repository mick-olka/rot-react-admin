import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface I_Props {
  open: boolean
  setOpen: (open: boolean) => void
  readonly title: string
  readonly text: string
  readonly onAgree: () => void
  readonly onCancel: () => void
  readonly agreeTitle?: string
  readonly cancelTitle?: string
}

export const AlertDialog = (props: I_Props) => {
  const handleClose = () => {
    props.onCancel()
    props.setOpen(false)
  }
  const handleAgree = () => {
    props.onAgree()
    props.setOpen(false)
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{props.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{props.cancelTitle || 'Cancel'}</Button>
        <Button onClick={handleAgree} autoFocus>
          {props.agreeTitle || 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
