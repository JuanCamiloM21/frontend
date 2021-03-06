import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Button } from '../../atoms/Button/Button'
import { FormField } from '../../molecules/FormField/FormField'
import loginFormData from './LoginFormData.json'
import { useForm } from 'react-hook-form'
import { LoginFormStyled, LoginFormTitle } from './LoginForm.styles'
import {
  FormActionText,
  FormActionLink,
  SubmitSection
} from '../SignUpForm/SingUpForm.styles'
import { serializeLoginFormData } from './helpers'
import { loginUserAsync, verifyUserAsync } from '../../../redux/slices/users'

export function LoginForm({ onFormChange }) {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const { state } = useLocation()
  const { replace } = useHistory()

  function onSubmit(loginFormData) {
    const loginFormDataSerialized = serializeLoginFormData(loginFormData)
    const { from } = state || { from: { pathname: '/' } }
    dispatch(loginUserAsync(loginFormDataSerialized))
      .then(() => dispatch(verifyUserAsync()))
      .then(() => replace(from))
  }

  return (
    <LoginFormStyled onSubmit={handleSubmit(onSubmit)}>
      <LoginFormTitle>{loginFormData.title}</LoginFormTitle>
      {loginFormData.fields.map(field => (
        <FormField
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          register={register}
        />
      ))}
      <SubmitSection>
        <Button>{loginFormData.button}</Button>
      </SubmitSection>
      <FormActionText>Still don´t have an acount?</FormActionText>
      <FormActionLink onClick={onFormChange}>Create an account</FormActionLink>
    </LoginFormStyled>
  )
}
