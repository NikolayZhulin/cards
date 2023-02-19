import React, { useEffect } from 'react'

import { Preloader } from '../../../common/components'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import {
  GradedCardsIds,
  GradesType,
  HandledPackType,
  removePrevPlaceCard,
  setRandomCard,
} from '../learn-reducer'
import { useFetchAllCardsQuery, useUpdateGradeMutation } from '../learnApi'

export type CardPropsType = {
  cards?: HandledPackType
  cardsIds?: GradedCardsIds
  grades?: GradesType
}

export const Card: React.FC<CardPropsType> = () => {
  const { isLoading } = useFetchAllCardsQuery({
    cardsPack_id: '607fece70857db0004f314d1',
    pageCount: 100,
  })
  const cards = useAppSelector(state => state.learn.handledCards)
  const cardsIds = useAppSelector(state => state.learn.ids)
  const grades = useAppSelector(state => state.learn.grades)
  const [trigger] = useUpdateGradeMutation()
  const randomCard = useAppSelector(state => state.learn.randomCard)
  const dispatch = useAppDispatch()

  console.log('cards :', cards)
  console.log('cardsIds :', cardsIds)
  console.log('grades :', grades)

  const chooseRandomCard = () => {
    if (cards && cardsIds && grades) {
      const randomGradeIdx = grades[Math.floor(Math.random() * grades.length)]
      const gradedCards = cards[randomGradeIdx]
      const gradedIds = cardsIds[randomGradeIdx]

      if (gradedIds) {
        const randomCardId = gradedIds[Math.floor(Math.random() * gradedIds.length)]

        dispatch(setRandomCard(gradedCards[randomCardId]))
      }
    }
  }
  const updateCardGrade = (grade: 1 | 2 | 3 | 4 | 5) => {
    if (randomCard) {
      trigger({ grade, card_id: randomCard._id })
      dispatch(removePrevPlaceCard(randomCard))
      chooseRandomCard()
    }
  }

  useEffect(() => {
    chooseRandomCard()
  }, [isLoading])

  if (isLoading) return <Preloader />

  return (
    <>
      <h2>Question: {randomCard.question}</h2>
      <h3>Answer: {randomCard.answer}</h3>
      <button onClick={() => updateCardGrade(5)}>Knew the answer</button>
      <button onClick={() => updateCardGrade(4)}>Confused</button>
      <button onClick={() => updateCardGrade(3)}>A lot of thought</button>
      <button onClick={() => updateCardGrade(2)}>Forgot</button>
      <button onClick={() => updateCardGrade(1)}>Did not know</button>
    </>
  )
}
