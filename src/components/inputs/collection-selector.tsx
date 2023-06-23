import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useEffect, useState } from 'react'

import { ItemSelector } from '..'

import { useCollections } from 'src/hooks'

interface I_Props {
  disabled?: boolean
  onSubmit: (col_id: string) => void
}

export const CollectionSelector = ({ disabled, onSubmit }: I_Props) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const { collections, isLoading } = useCollections()
  const [items, setItems] = useState<{ id: string; name: string }[]>([])
  useEffect(() => {
    if (collections) {
      const prepared = collections.map((c) => ({ id: c._id, name: c.name.ua }))
      setItems(prepared)
    }
  }, [collections])
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason === 'submit' && selected) {
      onSubmit(selected)
      setOpen(false)
    }
    if (reason !== 'submit') setOpen(false)
  }
  const handleSelect = (id: string) => {
    setSelected(id)
  }
  return (
    <Box>
      <Button disabled={disabled || false} variant='contained' onClick={handleClickOpen}>
        Choose Collection
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add products to collection</DialogTitle>
        <DialogContent>
          {isLoading && <h3>Loading...</h3>}
          {items.length && <ItemSelector items={items} onSelect={handleSelect} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e, 'cancel')}>Cancel</Button>
          <Button onClick={(e) => handleClose(e, 'submit')}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
