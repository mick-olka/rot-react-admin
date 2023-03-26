import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useState } from 'react'

import { ItemSelector } from '.'

interface I_Props {
  disabled?: boolean
}

export const CollectionSelector = ({ disabled }: I_Props) => {
  const [open, setOpen] = useState(false)

  const items: { id: string; name: string }[] = [
    { id: '1', name: 'collection1' },
    { id: '2', name: 'collection2' },
    { id: '3', name: 'collection3' },
  ]
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    // if (reason !== 'backdropClick') // if click outside
    if (reason === 'submit') console.log('submit')
    setOpen(false)
  }
  const handleSelect = (id: string) => {
    console.log(id)
  }
  return (
    <Box>
      <Button disabled={disabled || false} variant='contained' onClick={handleClickOpen}>
        Choose Collection
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add products to collection</DialogTitle>
        <DialogContent>
          <ItemSelector items={items} onSelect={handleSelect} />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e, 'cancel')}>Cancel</Button>
          <Button onClick={(e) => handleClose(e, 'submit')}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
