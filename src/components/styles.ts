import { Box, Button, TextField } from '@mui/material'
import styled from 'styled-components'

export const TextFieldStyled = styled(TextField)`
  border-radius: 15px;
  margin: 1rem;
  background-color: ${({ theme }) => theme.components.textInput.bg};
  color: ${({ theme }) => theme.components.textInput.c};
  .MuiFormLabel-root {
    font-size: 20px;
  }
`

export const TextFieldBox = styled(Box)`
  display: flex;
  width: 100%;
  /* max-width: 30rem; */
  margin: 1rem auto;
  justify-content: space-between;
  align-items: center;
`
export const ItemsListPane = styled(Box)`
  &&& {
    height: calc(100% - 2rem);
    padding: 0 1rem;
  }
`

export const RoundButton = styled(Button)<{ width?: string }>`
  &&& {
    height: ${(props) => props.width || '3rem'};
    width: ${(props) => props.width || '3rem'};
    border-radius: 50%;
    min-width: ${(props) => props.width || '3rem'};
    background-color: ${({ theme }) => theme.components.button.bg};
    color: ${({ theme }) => theme.components.button.c};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    margin: 0.5rem;
  }
`

export const ControlPaneStyled = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0 1rem;
  & > div > * {
    margin-right: 1rem;
  }
`

export const ControlPaneBox = styled(Box)`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`

export const SubmitButton = styled(TextField)`
  &&& {
    background-color: ${({ theme }) => theme.components.button.bg};
    color: ${({ theme }) => theme.components.button.c};
    margin: 1rem;
    & > div {
      &:hover {
        background-color: ${({ theme }) => theme.colors.white};
      }
      background-color: ${({ theme }) => theme.colors.blue};

      border-radius: 25px;
      transition: all 0.2s;
    }
    & div input {
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.white};
      padding: 0.5rem 3rem;
      height: 2rem;
      min-width: 10rem;
    }
  }
`

export const ButtonStyled = styled(Button)`
  &&& {
    border-radius: 20px;
    padding: 1rem 3rem;
    margin: 1rem;
    background-color: ${({ theme }) => theme.components.button.bg};
    color: ${({ theme }) => theme.components.button.c};
  }
`
export const MultipleLangFieldPane = styled(Box)`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
`

export const ImageUploadIconStyled = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  &:hover {
    opacity: 1;
  }
`

export const FieldBox = styled(Box)`
  display: flex;
  width: 20rem;
  align-items: left;
`
export const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  flex-wrap: wrap;
`
