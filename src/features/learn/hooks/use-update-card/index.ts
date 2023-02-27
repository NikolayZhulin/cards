import { useState } from 'react'

import { RadioChangeEvent } from 'antd'

import { useAppDispatch } from '../../../../common/hooks/reduxHooks'
import { CardType } from '../../../cards'
import { useUpdateGradeMutation } from '../../api'
import { removePrevPlaceCard } from '../../slice'

export const useUpdateCard = (randomCard: CardType, changeCard: () => void) => {
  const [trigger, { isLoading }] = useUpdateGradeMutation()
  const [grade, setGrade] = useState<1 | 2 | 3 | 4 | 5>(1)
  const dispatch = useAppDispatch()

  const changeGrade = (e: RadioChangeEvent) => {
    setGrade(e.target.value)
  }

  const updateCardGrade = async () => {
    if (randomCard) {
      dispatch(removePrevPlaceCard())
      await trigger({ grade, card_id: randomCard._id })
      changeCard()
      setGrade(5)
    }
  }

  return { grade, updateCardGrade, changeGrade, isLoading }
}
