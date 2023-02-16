import { NavLink } from 'react-router-dom'

import { FormField, Preloader } from '../../../../common/components'
import {
  Form,
  FormInformationText,
  FormTitle,
  FormWrapper,
  PrimaryButton,
} from '../../../../common/style'
import { PATH } from '../../../../common/utils/path'
import { useRegistration } from '../hooks/use-registration'

export const RegistrationForm = () => {
  const { onSubmit, errors, control, isLoading } = useRegistration()

  if (isLoading) return <Preloader />

  return (
    <FormWrapper>
      <FormTitle>Sign up</FormTitle>
      <Form onSubmit={onSubmit}>
        <FormField
          control={control}
          formLabel={'Email:'}
          errors={errors}
          fieldPlaceholder={'Email'}
          fieldName={'email'}
        />
        <FormField
          control={control}
          formLabel={'Password:'}
          errors={errors}
          fieldPlaceholder={'Password'}
          fieldName={'password'}
          inputType={'password'}
        />
        <FormField
          control={control}
          formLabel={'Confirm password:'}
          errors={errors}
          fieldPlaceholder={'Confirm password'}
          fieldName={'confirmPwd'}
          inputType={'password'}
        />
        <PrimaryButton>Submit</PrimaryButton>
      </Form>
      <FormInformationText>Already have an account?</FormInformationText>
      <NavLink to={PATH.LOGIN}>Sign in</NavLink>
    </FormWrapper>
  )
}
