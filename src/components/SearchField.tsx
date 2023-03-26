import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import * as S from './styles'

export const SearchField = ({
  onSearchTrigger,
}: {
  onSearchTrigger: (searchText: string) => void
}) => {
  const [text, setText] = useState('')
  const search = useDebounce(text, 1000)
  useEffect(() => {
    onSearchTrigger(search[0])
  }, [search[0]])
  return (
    <Box>
      <S.TextFieldStyled
        placeholder='Search'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Box>
  )
}
