import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { Box, Button, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'

import { FeaturesManagerWrapper } from './styles'

import * as S from 'src/components/styles'
import { E_Languages, I_ProductFeatures } from 'src/models'

interface I_Props {
  features: I_ProductFeatures
  onChange: (data: I_ProductFeatures) => void
}

export const FeaturesManager = ({ features, onChange }: I_Props) => {
  const [featuresLan, setFeaturesLan] = useState<E_Languages>(E_Languages.ua)

  const handleFeatureLan = (event: React.MouseEvent<HTMLElement>, lan: E_Languages) => {
    setFeaturesLan(lan)
  }

  const addFeature = () => {
    onChange({ ...features, [featuresLan]: [...features[featuresLan], { key: '', value: '' }] })
  }

  const deleteFeature = (i: number) => {
    onChange({ ...features, [featuresLan]: features[featuresLan].splice(i, 1) })
  }

  const handleUpdate = (index: number, field: 'key' | 'value', value: string) => {
    const array = [...features[featuresLan]]
    array.splice(index, 1, { ...array[index], [field]: value })
    const new_data = { ...features, [featuresLan]: array }
    console.log(new_data)
    onChange(new_data)
  }

  return (
    <FeaturesManagerWrapper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
        <h3>Features</h3>
        <ToggleButtonGroup value={featuresLan} exclusive onChange={handleFeatureLan} size='small'>
          {Object.values(E_Languages).map((l) => (
            <ToggleButton key={l} value={l}>
              {l}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      {features[featuresLan].map((f, i) => (
        <Box key={'f' + i}>
          <S.TextFieldStyled
            value={f.key}
            label='Title'
            size='small'
            onChange={(e) => handleUpdate(i, 'key', e.target.value)}
            sx={{ marginRight: 1 }}
          />
          <S.TextFieldStyled
            value={f.value}
            label='Value'
            size='small'
            onChange={(e) => handleUpdate(i, 'value', e.target.value)}
          />
          <IconButton onClick={() => deleteFeature(i)}>
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        size='small'
        variant='contained'
        onClick={addFeature}
        color='inherit'
        sx={{ width: '92%' }}
      >
        <AddRoundedIcon fontSize='small' />
      </Button>
    </FeaturesManagerWrapper>
  )
}
