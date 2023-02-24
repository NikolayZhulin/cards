import { useCallback } from 'react'

import { Preloader } from '../../../common/components'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { useFetchAllCards, useLearnCardSearchParams } from '../hooks'
import { chooseRandomCard } from '../learn-reducer'

import { CardContent } from './CardContent'
import { GradeSection } from './GradeSection'

export const Card = () => {
  const randomCard = useAppSelector(state => state.learn.randomCard)

  const dispatch = useAppDispatch()
  const { cardsPack_id } = useLearnCardSearchParams()

  const changeCard = useCallback(() => {
    dispatch(chooseRandomCard())
  }, [dispatch])

  const { isLoading } = useFetchAllCards(cardsPack_id, changeCard)

  if (isLoading) return <Preloader />

  return (
    <>
      <CardContent question={randomCard.question} shots={randomCard.shots} />
      <GradeSection randomCard={randomCard} changeCard={changeCard} />
    </>
  )
}
