import PercentRoundedIcon from '@mui/icons-material/PercentRounded'
import { Box, Divider } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { fieldBoxStyles } from './data'

import { FeaturesManager } from './features-manager'

import { MultiLangTextField, TextListCreator } from 'src/components'
import * as S from 'src/components/styles'
import { I_ProductForm } from 'src/models'
import { lanEnumToObject } from 'src/utils'

interface I_Props {
  onSubmit: (data: I_ProductForm) => void
  isLoading: boolean
  initValues?: I_ProductForm
  required?: boolean
}
const def: I_ProductForm = {
  name: lanEnumToObject(''),
  description: lanEnumToObject(''),
  code: '',
  price: 1000,
  oldPrice: undefined,
  index: 0,
  keywords: [],
  features: lanEnumToObject([]),
}

export const ProductForm = ({ onSubmit, isLoading, initValues, required }: Readonly<I_Props>) => {
  const [isSale, setIsSale] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm<I_ProductForm>({
    defaultValues: initValues || def,
  })

  watch(['keywords', 'features'])

  // to filter all other fields that may pass from getById response
  const prepareSubmit = (data: I_ProductForm) => {
    const filteredData: I_ProductForm = {
      name: data.name,
      code: data.code,
      price: data.price,
      index: data.index,
      keywords: data.keywords,
      description: data.description,
      features: data.features,
    }
    onSubmit(filteredData)
  }

  const toggleSale = () => {
    if (!isSale) setValue('oldPrice', getValues('price'))
    else setValue('oldPrice', undefined)
    setIsSale(!isSale)
  }

  return (
    <S.Form onSubmitCapture={handleSubmit(prepareSubmit)}>
      <Box sx={{ width: '40%', minWidth: '20rem' }}>
        <S.ButtonStyled
          variant='contained'
          type='submit'
          disabled={isLoading}
          sx={{ position: 'fixed', left: '-8px', bottom: 0 }}
        >
          {isLoading ? 'Loading...' : 'Save'}
        </S.ButtonStyled>
        <S.TextFieldBox>
          <MultiLangTextField
            register={register}
            names={['name.ua', 'name.en', 'name.de']}
            label='Name'
          />
        </S.TextFieldBox>

        <S.TextFieldBox>
          <S.TextFieldStyled
            {...register('code', { required: !!required })}
            label='Code'
            fullWidth
          />
          {errors.code && <span>This field is required</span>}
        </S.TextFieldBox>

        <S.TextFieldBox>
          {isSale && (
            <S.TextFieldStyled
              type='number'
              {...register('oldPrice', { required: !!required })}
              label='Old Price'
              fullWidth
            />
          )}
          <S.TextFieldStyled
            type='number'
            {...register('price', { required: !!required })}
            label={isSale ? 'New Price' : 'Price'}
            fullWidth
          />
          <S.RoundButton
            sx={{
              width: '55px',
              height: '55px',
              bgcolor: isSale ? 'Highlight' : 'none',
            }}
            onClick={toggleSale}
            title='Discount'
          >
            <PercentRoundedIcon />
          </S.RoundButton>
          {errors.code && <span>This field is required</span>}
        </S.TextFieldBox>

        <S.TextFieldBox>
          <S.TextFieldStyled
            type='number'
            {...register('index', { required: false })}
            label='Index'
            fullWidth
          />
        </S.TextFieldBox>

        <S.TextFieldBox>
          <Box sx={fieldBoxStyles}>
            <MultiLangTextField
              register={register}
              names={['description.ua', 'description.en', 'description.de']}
              label='Description'
              textarea
            />
          </Box>
        </S.TextFieldBox>

        <S.TextFieldBox>
          <TextListCreator
            label='Keywords'
            list={getValues('keywords')}
            onListChange={(l) => setValue('keywords', l)}
            sx={{ width: '100%' }}
          />
        </S.TextFieldBox>
      </Box>

      {/* <Divider orientation='vertical' flexItem /> */}

      <Box sx={{ width: '40%', minWidth: '35rem' }}>
        <FeaturesManager
          features={getValues('features')}
          onChange={(f) => setValue('features', f)}
        />
      </Box>
    </S.Form>
  )
}
