import { useMemo, useState } from 'react'

import { columns } from './data'

import { ItemsPage } from 'src/components/ItemsPage/ItemsPage'
import { useTextBlocks } from 'src/hooks/useTextBlocks'
import { I_TextBlock } from 'src/services/text_blocks.service'

export const TextBlocksPage = () => {
  // const { deleteMany } = useDeleteCollectionsMany()
  const [filter, setFilter] = useState<string | null>()
  const { text_blocks, isLoading, isError } = useTextBlocks()
  const getFilteredTextBlocksList = (): I_TextBlock[] =>
    useMemo(() => {
      if (text_blocks) {
        // filter
        return text_blocks
      }
      return []
    }, [text_blocks, filter])
  const onItemClick = (id: string) => {
    if (text_blocks) {
      // open form
    }
  }
  const handleSearchTrigger = (query?: string) => {
    setFilter(query || null)
  }
  const data = {
    data: getFilteredTextBlocksList(),
    count: text_blocks?.length || 0,
    isLoading,
    isError,
    limit: 99,
  }
  return (
    <ItemsPage
      title='Collections'
      data={data}
      columns={columns}
      pagination={false}
      onItemClick={onItemClick}
      onSearchTrigger={handleSearchTrigger}
    />
  )
}
