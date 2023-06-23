import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface I_Props {
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
  children: React.ReactNode
}

export const ContentDialog = (props: Readonly<I_Props>) => {
  const handleClose = () => {
    props.setOpen(false)
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='content-dialog-title'
      aria-describedby='content-dialog-description'
    >
      {props.title && <DialogTitle id='content-dialog-title'>{props.title}</DialogTitle>}
      <DialogContent>{props.children} </DialogContent>
    </Dialog>
  )
}
