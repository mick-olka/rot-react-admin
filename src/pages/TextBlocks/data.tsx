import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { I_Locales } from 'src/services'
import { I_TextBlock } from 'src/services/text_blocks.service'

export const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'text',
    headerName: 'text',
    valueGetter: (params) => params.row.text.ua,
    flex: 1,
  },
  {
    field: 'edit',
    headerName: '',
    width: 50,
    renderCell: () => (
      <IconButton>
        <EditOutlinedIcon />
      </IconButton>
    ),
    align: 'right',
  },
]

const objectHasMatch = (loc: I_Locales, reg: RegExp) => {
  const values = Object.values(loc)
  for (const v in values) {
    if (values[v].match(reg)) {
      return true
    }
  }
  return false
}

export const textBlocksFilter = (
  tbs: I_TextBlock[] | undefined,
  filter: string | null,
): I_TextBlock[] => {
  if (tbs) {
    if (filter) {
      const regE = new RegExp(filter, 'i')
      const filtered = tbs.filter((i) => i.name.match(regE) || objectHasMatch(i.text, regE))
      return filtered
    }
    return tbs
  }
  return []
}
