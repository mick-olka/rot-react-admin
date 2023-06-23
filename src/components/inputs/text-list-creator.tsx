import { Autocomplete, SxProps, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

interface I_Props {
  label?: string
  list?: string[]
  onListChange?: (list: string[]) => void
  options?: string[]
  sx?: SxProps
}

export const TextListCreator = ({ label, list, onListChange, options, sx }: I_Props) => {
  const [value, setValue] = useState<string[]>(list || [])
  const [input, setInput] = useState<string>('')
  const saveInputToList = () => {
    if (input) {
      setValue((v) => [...v, input])
      setInput('')
    }
  }
  useEffect(() => {
    onListChange && onListChange(value)
  }, [value])
  return (
    <Autocomplete
      multiple
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      selectOnFocus
      onKeyDown={(e) => {
        if (e.key === ' ') saveInputToList()
      }}
      onBlur={saveInputToList}
      inputValue={input}
      onInputChange={(e, v) => setInput(v)}
      handleHomeEndKeys
      options={options || []}
      sx={{ width: '20rem', ...sx }}
      freeSolo
      renderInput={(params) => <TextField {...params} label={label || 'Write here'} />}
    />
  )
}
