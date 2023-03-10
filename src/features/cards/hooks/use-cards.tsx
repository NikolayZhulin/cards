import React, { useEffect } from 'react'

import { show } from '@ebay/nice-modal-react'
import { Rate } from 'antd'

import { DeleteCardModal } from '../../../common/components/modal/DeleteCardModal'
import { UpdateCardModal } from '../../../common/components/modal/UpdateCardModal'
import { UpdateButtons } from '../../../common/components/update-buttons/UpdateButtons'
import { useAppSelector } from '../../../common/hooks/reduxHooks'
import { useSearch } from '../../../common/hooks/useSearch'
import { formatDate } from '../../../common/utils'
import {
  useAddCardMutation,
  useDeleteCardMutation,
  useLazyFetchCardsQuery,
  useUpdateCardMutation,
} from '../cardsApi'

export const UseCards = () => {
  const [addCard] = useAddCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const [trigger, response] = useLazyFetchCardsQuery()
  const userId = useAppSelector(state => state.auth.userId)
  const { search, setSearchParams, searchParams } = useSearch()

  useEffect(() => {
    trigger({ ...search })
  }, [searchParams])

  const deleteCardHandler = (id: string, question: string) => {
    show(DeleteCardModal, { cardId: id, cardQuestion: question })
  }
  const updateCardHandler = (
    id: string,
    answer: string,
    question: string,
    questionImg: string | undefined
  ) => {
    show(UpdateCardModal, {
      cardId: id,
      prevAnswer: answer,
      prevQuestion: question,
      prevQuestionImg: questionImg,
    })
  }

  const isMyPack = response?.data?.packUserId === userId
  const rows = response.data?.cards.map(c => {
    return {
      key: c._id,
      question: c.questionImg ? <img src={c.questionImg} style={{ width: '100px' }} /> : c.question,
      answer: c.answer,
      updated: formatDate(c.updated),
      grade: <Rate disabled defaultValue={c.grade} style={{ fontSize: '13px' }} />,
      actions: (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <UpdateButtons
            isMyItem={isMyPack}
            editHandler={() => updateCardHandler(c._id, c.answer, c.question, c.questionImg)}
            deleteHandler={() => deleteCardHandler(c._id, c.question)}
          />
        </div>
      ),
    }
  })

  const addNewCard = () => {
    addCard({ card: { cardsPack_id: search.cardsPack_id } })
  }

  const onChangePaginationHandler = (newPage: number, newPageCount: number) => {
    setSearchParams({ ...search, page: newPage.toString(), pageCount: newPageCount.toString() })
  }
  const isLoading = response.isLoading || response.isFetching

  const isEmptyPack = !response?.data?.cards.length

  return {
    onChangePaginationHandler,
    addNewCard,
    deleteCard,
    updateCard,
    response,
    search,
    rows,
    isLoading,
    isMyPack,
    isEmptyPack,
  }
}
