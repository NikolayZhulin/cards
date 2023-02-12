import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useForm } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'

import { FormField, Preloader } from '../../../common/components'
import {
  CardWrapper,
  Form,
  FormInformationText,
  FormTitle,
  FormWrapper,
  PrimaryButton,
  StyledCard,
} from '../../../common/style'
import { schemaPass } from '../../../common/validation'
import { useSetNewPasswordMutation } from '../authAPI'

import { SetNewPasswordForm } from './set-new-password-form'

export const SetNewPassword: React.FC = () => {
  return (
    <>
      <CardWrapper>
        <StyledCard>
          <SetNewPasswordForm />
        </StyledCard>
      </CardWrapper>
    </>
  )
}
