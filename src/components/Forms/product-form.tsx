import PercentRoundedIcon from '@mui/icons-material/PercentRounded'
import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
  code: '',
  price: 1000,
  oldPrice: undefined,
  index: 0,
  keywords: [],
}

const fieldBoxStyles = { display: 'flex', width: '20rem', alignItems: 'left' }

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

  watch('keywords')

  // to filter all other fields that may pass from getById response
  const prepareSubmit = (data: I_ProductForm) => {
    const filteredData: I_ProductForm = {
      name: data.name,
      code: data.code,
      price: data.price,
      index: data.index,
      keywords: data.keywords,
    }
    onSubmit(filteredData)
  }

  const toggleSale = () => {
    if (!isSale) setValue('oldPrice', getValues('price'))
    else setValue('oldPrice', undefined)
    setIsSale(!isSale)
  }

  return (
    <Box sx={{ width: '30rem' }}>
      <form onSubmitCapture={handleSubmit(prepareSubmit)}>
        <S.TextFieldBox>
          <Box sx={fieldBoxStyles}>
            <MultiLangTextField
              register={register}
              names={['name.ua', 'name.en', 'name.de']}
              label='Name'
            />
          </Box>
        </S.TextFieldBox>

        <S.TextFieldBox>
          <Box sx={fieldBoxStyles}>
            <S.TextFieldStyled {...register('code', { required: !!required })} label='Code' />
          </Box>
          {errors.code && <span>This field is required</span>}
        </S.TextFieldBox>

        <S.TextFieldBox>
          <Box sx={fieldBoxStyles}>
            {isSale && (
              <S.TextFieldStyled
                type='number'
                {...register('oldPrice', { required: !!required })}
                label='Old Price'
              />
            )}
            <S.TextFieldStyled
              type='number'
              {...register('price', { required: !!required })}
              label={isSale ? 'New Price' : 'Price'}
            />
            <IconButton
              sx={{ width: '55px', height: '55px', bgcolor: isSale ? 'Highlight' : 'none' }}
              onClick={toggleSale}
              title='Discount'
            >
              <PercentRoundedIcon />
            </IconButton>
          </Box>
          {errors.code && <span>This field is required</span>}
        </S.TextFieldBox>

        <S.TextFieldBox>
          <Box sx={fieldBoxStyles}>
            <S.TextFieldStyled
              type='number'
              {...register('index', { required: false })}
              label='Index'
            />
          </Box>
        </S.TextFieldBox>

        <S.TextFieldBox>
          <TextListCreator
            label='Keywords'
            list={getValues('keywords')}
            onListChange={(l) => setValue('keywords', l)}
          />
        </S.TextFieldBox>

        <S.ButtonStyled variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save'}
        </S.ButtonStyled>
      </form>
    </Box>
  )
}
