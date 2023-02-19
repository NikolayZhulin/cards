import React from 'react'

import { CardWrapper, StyledCard } from '../../../common/style'
import { CardType } from '../../tables'

import { Card } from './Card'

export type HandledPackType = {
  [key: string]: CardObjType
}

export type GradedCardsIds = {
  [key: string]: string[]
}

export type GradesType = number[]

export type CardObjType = { [key: string]: CardType }

export const Learn = () => {
  console.log('learn')

  return (
    <CardWrapper>
      <StyledCard>
        <Card />
      </StyledCard>
    </CardWrapper>
  )
}
