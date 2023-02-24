import React, { useEffect } from 'react'

import emptyStar from '../../../assets/pictures/emptyStar.png'
import fullStar from '../../../assets/pictures/fullStar.png'
import halfStar from '../../../assets/pictures/halfStar.png'
import { UpdateButtons } from '../../../common/components/update-buttons/UpdateButtons'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { useSearch } from '../../../common/hooks/useSearch'
import { StyledIcon } from '../../../common/style'
import { formatDate } from '../../../common/utils'
import {
  saveCardForDelete,
  saveCardForUpdate,
  toggleDeleteCardModal,
  toggleUpdateCardModal,
} from '../cards-reducer'
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
  const dispatch = useAppDispatch()

  useEffect(() => {
    trigger({ ...search })
  }, [searchParams])

  const deleteCardHandler = (id: string, question: string) => {
    dispatch(toggleDeleteCardModal({ showModal: true }))
    dispatch(saveCardForDelete({ id, question }))
  }
  const updateCardHandler = (id: string, question: string, answer: string) => {
    dispatch(saveCardForUpdate({ id, question, answer }))
    dispatch(toggleUpdateCardModal({ showModal: true }))
  }
  const rows = response.data?.cards.map(c => {
    const isMyPack = c.user_id === userId

    return {
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
            editHandler={() => updateCardHandler(c._id, c.question, c.answer)}
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

  return {
    onChangePaginationHandler,
    addNewCard,
    deleteCard,
    updateCard,
    response,
    search,
    rows,
    isLoading,
  }
}
