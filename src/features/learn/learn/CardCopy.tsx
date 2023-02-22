import React, { useEffect, useState } from 'react'

import { Button, Space } from 'antd'
import Radio from 'antd/es/radio'
import { RadioChangeEvent } from 'antd/es/radio/interface'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { Preloader } from '../../../common/components'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { CardType } from '../../tables'
import { sortCardsByGrade } from '../helpers/sort-cards-by-grade'
import {
  clearAllState,
  GradedCardsIds,
  GradesType,
  HandledPackType,
  removePrevPlaceCard,
  setRandomCard,
} from '../learn-reducer'
import { useLazyFetchAllCardsQuery, useUpdateGradeMutation } from '../learnApi'

import { CardContent } from './CardContent'
import { GradeSection } from './GradeSection'

export type CardPropsType = {
  cards?: HandledPackType
  cardsIds?: GradedCardsIds
  grades?: GradesType
}

export const Card: React.FC<CardPropsType> = () => {
  const [state, setState] = useState({
    packName: '',
    handledCards: {},
    ids: {},
    grades: [],
    randomCard: {} as CardType,
  })

  const [grade, setGrade] = useState<1 | 2 | 3 | 4 | 5>(1)

  const [fetchCards, { isLoading, data }] = useLazyFetchAllCardsQuery()

  const changeGrade = (e: RadioChangeEvent) => {
    setGrade(e.target.value)
  }

  if (isLoading) return <Preloader />

  return (
    <>
      <CardContent
        packName={state.packName}
        question={state.randomCard.question}
        shots={state.randomCard.shots}
      />
      <GradeSection
        randomCard={state.randomCard}
        grade={grade}
        changeGrade={changeGrade}
        updateCardGrade={() => {}}
      />
    </>
  )
}

const HiddenSection = styled.div`
  display: flex;
  flex-direction: column;
`
