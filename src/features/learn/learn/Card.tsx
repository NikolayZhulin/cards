import React, { useEffect, useState } from 'react'

import { Button, Space } from 'antd'
import Radio from 'antd/es/radio'
import { RadioChangeEvent } from 'antd/es/radio/interface'
import styled from 'styled-components'

import { Preloader } from '../../../common/components'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import {
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
  // const { isLoading } = useFetchAllCardsQuery({
  //   // cardsPack_id: '607fece70857db0004f314d1',
  //   // cardsPack_id: '63f27d4e2f5b653e95c0d6f5',
  //   // cardsPack_id: '629fa8c5f0ffde100d74e176',
  //   // cardsPack_id: '63aae5104bbb7936c28c1316',
  //   // cardsPack_id: '6311bf4b1ced5d2bb4e1fa4d',
  //   // cardsPack_id: '63b699c0e62d0f092fc7b57e',
  //   cardsPack_id: '63f2778d2f5b653e95c0d4fa',
  //   pageCount: 100,
  // })
  const [fetch, { isLoading, data }] = useLazyFetchAllCardsQuery()
  const randomCard = useAppSelector(state => state.learn.randomCard)
  const [trigger] = useUpdateGradeMutation()

  const dispatch = useAppDispatch()

  const chooseRandomCardInSlice = () => {
    dispatch(setRandomCard())
  }

  const [grade, setGrade] = useState<1 | 2 | 3 | 4 | 5>(1)

  const updateCardGrade = async () => {
    if (randomCard) {
      dispatch(removePrevPlaceCard())
      await trigger({ grade, card_id: randomCard._id })
      chooseRandomCardInSlice()
    }
  }

  const changeGrade = (e: RadioChangeEvent) => {
    setGrade(e.target.value)
  }

  useEffect(() => {
    const foo = async () => {
      await fetch({
        cardsPack_id: '607fece70857db0004f314d1',
        pageCount: 100,
      })

      if (data && data.cardsTotalCount > data.pageCount) {
        const fetchQty = Math.ceil(data.cardsTotalCount / data.pageCount) - 1

        for (let i = 0; i < fetchQty; i++) {
          await fetch({
            cardsPack_id: '607fece70857db0004f314d1',
            pageCount: 100,
            page: i + 2,
          })
        }
      }
      chooseRandomCardInSlice()
    }

    foo()
  }, [isLoading])

  if (isLoading) return <Preloader />

  return (
    <>
      <h2>Question: {randomCard.question}</h2>
      <p style={{ color: 'gray' }}>Количество попыток ответов на вопрос: {randomCard.shots}</p>
      <h3>Answer: {randomCard.answer}</h3>

      <Button type={'primary'}>Show Answer</Button>

      <HiddenSection>
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
    </>
  )
}

const HiddenSection = styled.div`
  display: flex;
  flex-direction: column;
`
