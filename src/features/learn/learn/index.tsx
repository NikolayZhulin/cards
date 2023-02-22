import React from 'react'

import { CardWrapper, StyledCard } from '../../../common/style'
import { BackToPacksButton } from '../../tables/table/Cards/cards-blocks/BackToPacksButton'

import { Card } from './Card'

export const Learn = () => {
  return (
    <>
      <BackToPacksButton />
      <CardWrapper>
        <StyledCard>
          <Card />
        </StyledCard>
      </CardWrapper>
    </>
  )
}
