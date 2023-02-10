import React from 'react'

import { NavLink } from 'react-router-dom'

import email from '../../../assets/pictures/Email.png'
import {
  FormInformationText,
  FormTitle,
  FormWrapper,
  PrimaryButton,
  StyledCard,
  CardWrapper,
} from '../../../common/style'
import { useForgotPasswordMutation } from '../authAPI'

export const CheckEmail: React.FC = () => {
  const [forgotPassword, { data }] = useForgotPasswordMutation()

  console.log(data)

  return (
    <>
      <CardWrapper>
        <StyledCard>
          <FormWrapper>
            <FormTitle>Check Email</FormTitle>
            <img src={email} alt="email" style={{ width: '250px', marginBottom: '30px' }} />
            <FormInformationText style={{ marginBottom: '30px' }}>
              We have sent Email with instructions to {'your email'}
            </FormInformationText>
            <NavLink to={'/login'}>
              <PrimaryButton>Back To Login</PrimaryButton>
            </NavLink>
          </FormWrapper>
        </StyledCard>
      </CardWrapper>
    </>
  )
}
