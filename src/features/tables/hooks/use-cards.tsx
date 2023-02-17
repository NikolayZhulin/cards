import React, { useEffect, useState } from 'react'

import emptyStar from '../../../assets/pictures/emptyStar.png'
import fullStar from '../../../assets/pictures/fullStar.png'
import halfStar from '../../../assets/pictures/halfStar.png'
import { useAppSelector } from '../../../common/hooks/reduxHooks'
import { useSearch } from '../../../common/hooks/useSearch'
import { formatDate } from '../../../common/utils'
import { UpdateButtons } from '../components'
import { PackDataType } from '../helpers'
import { StyledIcon } from '../styles'
import {
  useAddCardMutation,
  useDeleteCardMutation,
  useLazyFetchCardsQuery,
  useUpdateCardMutation,
} from '../tablesApi'

export const UseCards = () => {
  const [addCard] = useAddCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const [trigger, response] = useLazyFetchCardsQuery()
  const [rows, setRows] = useState<PackDataType[]>()
  const userId = useAppSelector(state => state.auth.userId)
  const { search, setSearchParams, searchParams } = useSearch()

  useEffect(() => {
    trigger({ ...search })
  }, [searchParams])

  useEffect(() => {
    if (response && response.data) {
      const { cards } = response.data
      let rows: PackDataType[] = []

      cards.forEach(c => {
        const isMyPack = c.user_id === userId

        rows.push({
          key: c._id,
          question: c.question,
          answer: c.answer,
          updated: formatDate(c.updated),
          grade: c.grade,
          render: () => (
            <div>
              <StyledIcon src={fullStar} alt={'full star'} />
              <StyledIcon src={fullStar} alt={'full star'} />
              <StyledIcon src={fullStar} alt={'full star'} />
              <StyledIcon src={halfStar} alt={'half star'} />
              <StyledIcon src={emptyStar} alt={'empty star'} />
            </div>
          ),
          actions: (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <UpdateButtons
                isMyItem={isMyPack}
                editHandler={() => updateCard(c._id)}
                deleteHandler={() => deleteCard(c._id)}
              />
            </div>
          ),
        })
      })
      setRows(rows)
    }
  }, [response])
  const addNewCard = () => {
    addCard(search.cardsPack_id)
  }

  const onChangePaginationHandler = (newPage: number, newPageCount: number) => {
    setSearchParams({ ...search, page: newPage.toString(), pageCount: newPageCount.toString() })
  }

  return { onChangePaginationHandler, addNewCard, deleteCard, updateCard, response, search, rows }
}
