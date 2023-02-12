import React from 'react'

import { CardWrapper, StyledCard } from '../../../common/style'

import { ProfileForm } from './profile-form'

export const Profile = () => {
  return (
    <CardWrapper>
      <StyledCard>
        <ProfileForm />
      </StyledCard>
    </CardWrapper>
  )
}
