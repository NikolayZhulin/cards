import React from 'react'

import { useAppSelector } from '../../../common/hooks/reduxHooks'
import { BackToPacksButton } from '../../tables/table/Cards/cards-blocks/BackToPacksButton'
import { LearnCardWrapper, LearnStyledCard, LearnWrapper } from '../styles'

import { Card } from './Card'

export const Learn = () => {
  const packName = useAppSelector(state => state.learn.packName)

  return (
    <LearnWrapper>
      <BackToPacksButton />
      <LearnCardWrapper>
        <h1>{packName}</h1>
        <LearnStyledCard>
          <Card />
        </LearnStyledCard>
      </LearnCardWrapper>
    </LearnWrapper>
  )
}
