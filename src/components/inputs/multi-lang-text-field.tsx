import { useState } from 'react'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

import * as S from '../styles'

interface I_Props<T extends FieldValues> {
  register: UseFormRegister<T>
  names: Path<T>[]
  registerOptions?: RegisterOptions<T, Path<T>>
  label?: string
  error?: boolean
  textarea?: boolean
}

export const MultiLangTextField = <I_FormData extends FieldValues>({
  names,
  register,
  registerOptions,
  label,
  error,
  textarea,
}: I_Props<I_FormData>) => {
  const [current, setCurrent] = useState<number>(0)
  // const [name, setName] = useState<Path<I_FormData>>(names[0])
  const cycleLang = () => {
    let next = current + 1
    if (next >= names.length) next = 0
    setCurrent(next)
    // setName(names[next])
  }

  return (
    <S.MultipleLangFieldPane>
      {names.map((n) => (
        <S.TextFieldStyled
          key={n}
          {...register(n, registerOptions)}
          sx={{
            display: n === names[current] ? 'block' : 'none',
            '& textarea': { resize: 'vertical' },
            '& input': { width: 'calc(100% - 5rem)' },
          }}
          label={label}
          error={error}
          multiline={textarea || false}
          rows={textarea ? 6 : undefined}
          fullWidth
        />
      ))}

      <S.RoundButton
        width='3rem'
        variant='contained'
        onClick={cycleLang}
        sx={{ position: 'absolute', right: 0 }}
      >
        {names[current].split('.')[1].toUpperCase()}
      </S.RoundButton>
    </S.MultipleLangFieldPane>
  )
}
