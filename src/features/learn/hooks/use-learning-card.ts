import { useEffect, useState } from 'react'

import { RadioChangeEvent } from 'antd/es/radio/interface'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { clearAllState, removePrevPlaceCard, setRandomCard } from '../learn-reducer'
import { useLazyFetchAllCardsQuery, useUpdateGradeMutation } from '../learnApi'

export const useLearningCard = () => {
  const [fetchCards, { isLoading, data }] = useLazyFetchAllCardsQuery()
  const [trigger] = useUpdateGradeMutation()

  const [searhParams] = useSearchParams()
  const cardsPack_id = Object.fromEntries(searhParams)['cardsPack_id']

  useEffect(() => {
    const foo = async () => {
      await fetchCards({
        cardsPack_id: cardsPack_id,
        pageCount: 100,
      })

      if (data && data.cardsTotalCount > data.pageCount) {
        const fetchQty = Math.ceil(data.cardsTotalCount / data.pageCount) - 1

        for (let i = 0; i < fetchQty; i++) {
          await fetchCards({
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
  }, [])

  return {}
}
