import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { removePrevCard, setRandomCard } from '../learn-reducer'
import { useFetchAllCardsQuery, useUpdateGradeMutation } from '../learnApi'

import { GradedCardsIds, GradesType, HandledPackType } from './index'

export type CardPropsType = {
  cards?: HandledPackType
  cardsIds?: GradedCardsIds
  grades?: GradesType
}

export const Card: React.FC<CardPropsType> = () => {
  const { data, isSuccess } = useFetchAllCardsQuery({
    cardsPack_id: '607fece70857db0004f314d1',
    pageCount: 100,
  })
  const cards = useAppSelector(state => state.learn.handledCards)
  const cardsIds = useAppSelector(state => state.learn.ids)
  const grades = useAppSelector(state => state.learn.grades)
  const [trigger] = useUpdateGradeMutation()
  const dispatch = useAppDispatch()
  const randomCard = useAppSelector(state => state.learn.randomCard)

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
  const updateCardGrade = async (grade: 1 | 2 | 3 | 4 | 5) => {
    if (randomCard) {
      await trigger({ grade, card_id: randomCard._id })
      dispatch(removePrevCard(randomCard))
      chooseRandomCard()
    }
  }

  useEffect(() => {
    console.log('useEffect')
    chooseRandomCard()
  }, [])

  console.log(cards)
  console.log(randomCard)

  return (
    <>
      <div>{JSON.stringify(randomCard)}</div>
      <button onClick={chooseRandomCard}>random</button>
      <button onClick={() => updateCardGrade(5)}>5</button>
      <button onClick={() => updateCardGrade(4)}>4</button>
      <button onClick={() => updateCardGrade(3)}>3</button>
      <button onClick={() => updateCardGrade(2)}>2</button>
      <button onClick={() => updateCardGrade(1)}>1</button>
    </>
  )
}
