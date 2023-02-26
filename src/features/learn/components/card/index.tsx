import { useCallback } from 'react'

import { Preloader } from '../../../../common/components'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/reduxHooks'
import { useFetchAllCards, useLearnCardSearchParams } from '../../hooks'
import { chooseRandomCard } from '../../slice'
import { PreloaderCenterWrapper } from '../../styles'

import { CardContent } from './card-content'
import { GradeSection } from './grade-section'

export const Card = () => {
  const randomCard = useAppSelector(state => state.learn.randomCard)

  const dispatch = useAppDispatch()
  const { cardsPack_id } = useLearnCardSearchParams()

  const changeCard = useCallback(() => {
    dispatch(chooseRandomCard())
  }, [dispatch])

  const { isLoading } = useFetchAllCards(cardsPack_id, changeCard)

  if (isLoading)
    return (
      <PreloaderCenterWrapper>
        <Preloader />
      </PreloaderCenterWrapper>
    )

  return (
    <>
      <CardContent question={randomCard.question} shots={randomCard.shots} />
      <GradeSection randomCard={randomCard} changeCard={changeCard} />
    </>
  )
}
