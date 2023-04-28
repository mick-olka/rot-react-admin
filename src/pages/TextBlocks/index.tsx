import { Box } from '@mui/material'
import { useMemo, useState } from 'react'

import { columns, textBlocksFilter } from './data'

import { TextBlockForm } from 'src/components'
import { ContentDialog } from 'src/components/Dialogs/ContentDialog'
import { ItemsPage } from 'src/components/ItemsPage/ItemsPage'
import { useTextBlockById, useTextBlocks, useUpdateTextBlock } from 'src/hooks/useTextBlocks'
import { I_TextBlock, I_TextBlockForm } from 'src/services/text_blocks.service'

export const TextBlocksPage = () => {
  const [filter, setFilter] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [tbId, setTbId] = useState<string | null>(null)
  const { text_blocks, isLoading, isError } = useTextBlocks()
  const { text_block, isLoading: textBlockLoading } = useTextBlockById(tbId || undefined)
  const { update, isLoading: isFetchingUpdate } = useUpdateTextBlock()

  const getFilteredTextBlocksList = (): I_TextBlock[] =>
    useMemo(() => {
      return textBlocksFilter(text_blocks, filter)
    }, [text_blocks, filter])

  const onItemClick = (id: string) => {
    if (text_blocks) {
      setTbId(id)
      setOpen(true)
    }
  }
  const handleSearchTrigger = (query?: string) => {
    setFilter(query || null)
  }
  const handleSubmitUpdate = (form_data: I_TextBlockForm) => {
    if (tbId) update({ id: tbId, form_data })
    setOpen(false)
  }
  const data = {
    data: getFilteredTextBlocksList(),
    count: text_blocks?.length || 0,
    isLoading,
    isError,
    limit: 99,
  }
  return (
    <Box>
      <ItemsPage
        title='Text on Site'
        data={data}
        columns={columns}
        clientPagination
        onItemClick={onItemClick}
        onSearchTrigger={handleSearchTrigger}
      />
      <ContentDialog open={open && !textBlockLoading} setOpen={setOpen}>
        <TextBlockForm
          isLoading={isFetchingUpdate}
          onSubmit={handleSubmitUpdate}
          initValues={text_block}
        />
      </ContentDialog>
    </Box>
  )
}
