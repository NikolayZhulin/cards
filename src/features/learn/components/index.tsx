import React, { useCallback } from 'react'

import { useSelector } from 'react-redux'

import { Preloader } from '../../../common/components'
import { useAppDispatch } from '../../../common/hooks/reduxHooks'
import { BackToPacksButton } from '../../cards/components/BackToPacksButton'
import { useFetchAllCards, useLearnCardSearchParams } from '../hooks'
import { packNameSelector } from '../selectors'
import { chooseRandomCard } from '../slice'
import {
  LearnCardWrapper,
  LearnStyledCard,
  LearnWrapper,
  PackName,
  PreloaderMarginTopWrapper,
} from '../styles'

import { Card } from './card'

export const Learn = () => {
  const packName = useSelector(packNameSelector)

  const dispatch = useAppDispatch()
  const { cardsPack_id } = useLearnCardSearchParams()

  const changeCard = useCallback(() => {
    dispatch(chooseRandomCard())
  }, [dispatch])

  const { isFetching } = useFetchAllCards(cardsPack_id, changeCard)

  return (
    <LearnWrapper>
      <BackToPacksButton />
      <LearnCardWrapper>
        {isFetching && (
          <PreloaderMarginTopWrapper>
            <Preloader />
          </PreloaderMarginTopWrapper>
        )}
        {!isFetching && (
          <>
            <PackName>{packName}</PackName>
            <LearnStyledCard>
              <Card changeCard={changeCard} />
            </LearnStyledCard>
          </>
        )}
      </LearnCardWrapper>
    </LearnWrapper>
  )
}
