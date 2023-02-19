import React, { useEffect, useState } from 'react'

import { CardWrapper, StyledCard } from '../../../common/style'
import { CardType } from '../../tables'
import { useFetchAllCardsQuery, useLazyFetchAllCardsQuery } from '../learnApi'

import { Card } from './Card'

export type HandledPackType = {
  [key: string]: CardObjType
}

export type GradedCardsIds = {
  [key: string]: string[]
}

export type GradesType = number[]

type CardObjType = { [key: string]: CardType }

export const Learn = () => {
  const { data, isSuccess } = useFetchAllCardsQuery({
    cardsPack_id: '607fece70857db0004f314d1',
    pageCount: 100,
  })
  const [cards, setCards] = useState<HandledPackType>()
  const [gradedCardsIds, setGradedCardsIds] = useState<GradedCardsIds>()
  const [grades, setGrades] = useState<GradesType>()

  const handlePack = (cards: CardType[]) => {
    let handledCards: HandledPackType = {
      '0': {} as CardObjType,
      '1': {} as CardObjType,
      '2': {} as CardObjType,
      '3': {} as CardObjType,
      '4': {} as CardObjType,
      '5': {} as CardObjType,
    }

    let ids: GradedCardsIds = {
      '0': [],
      '1': [],
      '2': [],
      '3': [],
      '4': [],
      '5': [],
    }

    let gradesSet = new Set()

    cards.forEach(c => {
      handledCards[String(c.grade)] = { ...handledCards[String(c.grade)], [c._id]: c }
      ids[String(c.grade)].push(c._id)
      gradesSet.add(c.grade)
    })

    let grades: GradesType = []

    const multiplyGradesPush = (value: number, pushQty: number) => {
      for (let i = 0; i < pushQty; i++) {
        grades.push(value)
      }
    }

    gradesSet.forEach(g => {
      switch (g) {
        case 0:
          multiplyGradesPush(g, 5)
          break
        case 1:
          multiplyGradesPush(g, 5)
          break
        case 2:
          multiplyGradesPush(g, 4)
          break
        case 3:
          multiplyGradesPush(g, 3)
          break
        case 4:
          multiplyGradesPush(g, 2)
          break
        case 5:
          multiplyGradesPush(g, 1)
      }
    })

    return { handledCards, ids, grades }
  }

  useEffect(() => {
    setTimeout(() => {
      if (data) {
        const { handledCards, ids, grades } = handlePack(data.cards)

        setCards(handledCards)
        setGradedCardsIds(ids)
        setGrades(grades)
      }
    }, 1000)
  }, [])

  return (
    <CardWrapper>
      <StyledCard>
        <Card cards={cards} cardsIds={gradedCardsIds} grades={grades} />
      </StyledCard>
    </CardWrapper>
  )
}
