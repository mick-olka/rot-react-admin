import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'

interface I_Props {
  items: { id: string; name: string }[]
  onSelect: (id: string) => void
  init?: string
  placeholder?: string
}

const def = {
  id: '',
  name: '',
}

export const ItemSelector = ({ items, placeholder, onSelect, init }: I_Props) => {
  const [current, setCurrent] = useState<{ id: string; name: string }>(
    items.find((i) => i.id === init) || def,
  )

  useEffect(() => {
    setCurrent(def)
  }, [items])

  const handleChange = (event: SelectChangeEvent) => {
    const item = items.find((i) => i.id === (event.target.value as string))
    if (item) {
      setCurrent(item)
      onSelect(item.id)
    }
  }

  return (
    <Box sx={{ margin: 1 }}>
      <FormControl fullWidth>
        <InputLabel>{placeholder || def.name}</InputLabel>
        <Select
          value={items.length ? current.id : def.id}
          onChange={handleChange}
          label={placeholder || def.name}
          fullWidth
        >
          {items.map((i) => (
            <MenuItem key={i.id} value={i.id}>
              {i.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
