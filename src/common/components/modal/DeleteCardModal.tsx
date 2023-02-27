import React from 'react'

import { create, useModal } from '@ebay/nice-modal-react'

import { useDeleteCardMutation } from '../../../features/cards'
import { StyledTitle } from '../../style/modal-styles'

import { ModalFC } from './ModalFC'

type Props = {
  cardId?: string
  cardQuestion?: string
}

export const DeleteCardModal = create(({ cardId, cardQuestion }: Props) => {
  const modal = useModal()
  const [deleteCard, { isLoading: cardIsDeleting }] = useDeleteCardMutation()

  const deleteCardHandler = async () => {
    try {
      await deleteCard(cardId as string)
      await modal.hide()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ModalFC
      okText={'Delete'}
      danger={true}
      isOpen={modal.visible}
      isLoading={cardIsDeleting}
      handleOk={deleteCardHandler}
      handleCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <div>
        <StyledTitle>Delete pack</StyledTitle>
        <hr />
        <div>
          Do yo really want to delete <b>{cardQuestion}</b>?
        </div>
      </div>
    </ModalFC>
  )
})
