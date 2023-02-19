import React, { useState } from 'react'

import { CardType } from '../../tables'

import { GradedCardsIds, GradesType, HandledPackType } from './index'

export type CardPropsType = {
  cards?: HandledPackType
  cardsIds?: GradedCardsIds
  grades?: GradesType
}

export const Card: React.FC<CardPropsType> = ({ cards, cardsIds, grades }) => {
  const [randomCard, setRandomCard] = useState<CardType>()

  const chooseRandomCard = () => {
    if (cards && cardsIds && grades) {
      const randomGradeIdx = grades[Math.floor(Math.random() * grades.length)]
      const gradedCards = cards[randomGradeIdx]
      const gradedIds = cardsIds[randomGradeIdx]

      const cardId = gradedIds[Math.floor(Math.random() * gradedIds.length)]

      setRandomCard(gradedCards[cardId])
    }
  }

  return (
    <>
      <div>{JSON.stringify(randomCard)}</div>
      <button onClick={chooseRandomCard}>random</button>
    </>
  )
}
