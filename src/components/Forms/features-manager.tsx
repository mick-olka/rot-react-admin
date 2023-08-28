import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { Box, Button, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'

import * as S from './styles'

import * as CS from 'src/components/styles'
import { E_Languages, I_ProductFeatures } from 'src/models'

interface I_Props {
  features: I_ProductFeatures
  onChange: (data: I_ProductFeatures) => void
}

export const FeaturesManager = ({ features, onChange }: I_Props) => {
  const [featuresLan, setFeaturesLan] = useState<E_Languages>(E_Languages.ua)

  const handleFeatureLan = (event: React.MouseEvent<HTMLElement>, lan: E_Languages) => {
    if (lan !== null) setFeaturesLan(lan)
  }

  const addFeature = () => {
    onChange({ ...features, [featuresLan]: [...features[featuresLan], { key: '', value: '' }] })
  }

  const deleteFeature = (i: number) => {
    const new_features = [...features[featuresLan]]
    new_features.splice(i, 1)
    onChange({ ...features, [featuresLan]: new_features })
  }

  const handleUpdate = (index: number, field: 'key' | 'value', value: string) => {
    const array = [...features[featuresLan]]
    array.splice(index, 1, { ...array[index], [field]: value })
    onChange({ ...features, [featuresLan]: array })
  }

  return (
    <S.FeaturesManagerWrapper>
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
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ fontWeight: 600, width: '48%' }}>Title</Typography>
        <Typography fontWeight={600}>Value</Typography>
      </Box>
      {features[featuresLan].map((f, i) => (
        <Box key={'f' + i} sx={{ display: 'flex' }}>
          <CS.TextFieldStyled
            value={f.key}
            size='small'
            onChange={(e) => handleUpdate(i, 'key', e.target.value)}
            sx={{ marginRight: 1 }}
          />
          <CS.TextFieldStyled
            value={f.value}
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
        sx={{ width: '90%' }}
      >
        <AddRoundedIcon fontSize='small' />
      </Button>
    </S.FeaturesManagerWrapper>
  )
}
