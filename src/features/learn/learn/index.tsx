import React from 'react'

import { BackToPacksButton } from '../../tables/table/Cards/cards-blocks/BackToPacksButton'
import { LearnCardWrapper, LearnStyledCard, LearnWrapper } from '../styles'

import { Card } from './Card'

export const Learn = () => {
  return (
    <LearnWrapper>
      <BackToPacksButton />
      <LearnCardWrapper>
        <LearnStyledCard>
          <Card />
        </LearnStyledCard>
      </LearnCardWrapper>
    </LearnWrapper>
  )
}
