import React, { useEffect, useState } from 'react'

import { Button, Space } from 'antd'
import Radio from 'antd/es/radio'
import { RadioChangeEvent } from 'antd/es/radio/interface'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { Preloader } from '../../../common/components'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import {
  clearAllState,
  GradedCardsIds,
  GradesType,
  HandledPackType,
  removePrevPlaceCard,
  setRandomCard,
} from '../learn-reducer'
import { useLazyFetchAllCardsQuery, useUpdateGradeMutation } from '../learnApi'

export type CardPropsType = {
  cards?: HandledPackType
  cardsIds?: GradedCardsIds
  grades?: GradesType
}

export const Card: React.FC<CardPropsType> = () => {
  const [fetch, { isLoading, data }] = useLazyFetchAllCardsQuery()
  const randomCard = useAppSelector(state => state.learn.randomCard)
  const [trigger] = useUpdateGradeMutation()
  const [isHidden, setIsHidden] = useState(true)
  const dispatch = useAppDispatch()

  const [searhParams] = useSearchParams()
  const cardsPack_id = Object.fromEntries(searhParams)['cardsPack_id']

  const packName = useAppSelector(state => state.learn.packName)

  const chooseRandomCardInSlice = () => {
    dispatch(setRandomCard())
  }

  const [grade, setGrade] = useState<1 | 2 | 3 | 4 | 5>(1)

  const changeGrade = (e: RadioChangeEvent) => {
    setGrade(e.target.value)
  }

  const updateCardGrade = async () => {
    if (randomCard) {
      dispatch(removePrevPlaceCard())
      await trigger({ grade, card_id: randomCard._id })
      chooseRandomCardInSlice()
    }
    hideAnswer()
  }

  const showAnswer = () => {
    setIsHidden(false)
  }

  const hideAnswer = () => {
    setIsHidden(true)
  }

  useEffect(() => {
    const foo = async () => {
      await fetch({
        cardsPack_id: cardsPack_id,
        pageCount: 100,
      })

      if (data && data.cardsTotalCount > data.pageCount) {
        const fetchQty = Math.ceil(data.cardsTotalCount / data.pageCount) - 1

        for (let i = 0; i < fetchQty; i++) {
          await fetch({
            cardsPack_id: cardsPack_id,
            pageCount: 100,
            page: i + 2,
          })
        }
      }
      chooseRandomCardInSlice()
    }

    foo()

    return () => {
      dispatch(clearAllState())
    }
  }, [isLoading])

  if (isLoading) return <Preloader />

  return (
    <>
      <h1>{packName}</h1>

      <h2 style={{ wordWrap: 'break-word' }}>Question: {randomCard.question}</h2>
      <p style={{ color: 'gray' }}>Количество попыток ответов на вопрос: {randomCard.shots}</p>

      {isHidden && (
        <Button type={'primary'} style={{ width: '100%' }} onClick={showAnswer}>
          Show Answer
        </Button>
      )}

      {!isHidden && (
        <HiddenSection>
          <h3 style={{ wordWrap: 'break-word' }}>Answer: {randomCard.answer}</h3>
          <Radio.Group onChange={changeGrade} value={grade}>
            <Space direction={'vertical'}>
              <Radio value={5}>Knew the answer</Radio>
              <Radio value={4}>Confused</Radio>
              <Radio value={3}>A lot of thought</Radio>
              <Radio value={2}>Forgot</Radio>
              <Radio value={1}>Did not know</Radio>
            </Space>
          </Radio.Group>
          <Button onClick={updateCardGrade} type={'primary'}>
            Next
          </Button>
        </HiddenSection>
      )}
    </>
  )
}

const HiddenSection = styled.div`
  display: flex;
  flex-direction: column;
`
