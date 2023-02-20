import React from 'react'

import { ModalFC } from '../../../common/components/modal/ModalFC'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { toggleDeleteCardModal } from '../cards-reducer'
import { useDeleteCardMutation } from '../tablesApi'

export const DeleteCardModal = () => {
  const showModal = useAppSelector(state => state.cards.isDeleteCardModalOpen)
  const id = useAppSelector(state => state.cards.cardForDelete.id)
  const cardQuestion = useAppSelector(state => state.cards.cardForDelete.question)
  const [deleteCard, { isLoading: cardIsDeleting }] = useDeleteCardMutation()
  const dispatch = useAppDispatch()

  const closeModal = () => dispatch(toggleDeleteCardModal({ showModal: false }))

  const deleteCardHandler = async () => {
    try {
      await deleteCard(id).unwrap()
      closeModal()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ModalFC
      okText={'Delete'}
      danger={true}
      isOpen={showModal}
      isLoading={cardIsDeleting}
      handleOk={deleteCardHandler}
      handleCancel={closeModal}
    >
      <div>
        <h3>Delete pack</h3>
        <hr />
        <div>
          Do yo really want to delete <b>{cardQuestion}</b>?
        </div>
      </div>
    </ModalFC>
  )
}
