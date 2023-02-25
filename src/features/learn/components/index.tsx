import React from 'react'

import { useAppSelector } from '../../../common/hooks/reduxHooks'
import { BackToPacksButton } from '../../cards/components/BackToPacksButton'
import { LearnCardWrapper, LearnStyledCard, LearnWrapper, PackName } from '../styles'

import { Card } from './card'

export const Learn = () => {
  const packName = useAppSelector(state => state.learn.packName)

  return (
    <LearnWrapper>
      <BackToPacksButton />
      <LearnCardWrapper>
        <PackName>{packName}</PackName>
        <LearnStyledCard>
          <Card />
        </LearnStyledCard>
      </LearnCardWrapper>
    </LearnWrapper>
  )
}
